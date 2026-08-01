import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import process from 'node:process';
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import { chromium } from '@playwright/test';

const siteUrl = 'http://127.0.0.1:4173';
const shouldAssert = process.argv.includes('--assert');
const outputDirectory = new URL('../lighthouse-results/', import.meta.url);
const thresholds = JSON.parse(await readFile(new URL('../lighthouse-budget.json', import.meta.url), 'utf8'));

async function siteIsAvailable() {
  try {
    const response = await fetch(siteUrl);
    return response.ok;
  } catch {
    return false;
  }
}

async function waitForSite() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (await siteIsAvailable()) return;
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Static site did not become available at ${siteUrl}`);
}

let server;
if (!(await siteIsAvailable())) {
  server = spawn('python3', ['-m', 'http.server', '4173', '--bind', '127.0.0.1'], {
    cwd: new URL('..', import.meta.url),
    stdio: 'ignore',
  });
  await waitForSite();
}

const profiles = [
  {
    name: 'desktop',
    url: `${siteUrl}/?testMode=1&theme=light`,
    settings: {
      formFactor: 'desktop',
      screenEmulation: { mobile: false, width: 1440, height: 900, deviceScaleFactor: 1, disabled: false },
      throttlingMethod: 'simulate',
    },
  },
  {
    name: 'mobile',
    url: `${siteUrl}/?testMode=1&theme=dark`,
    settings: {
      formFactor: 'mobile',
      screenEmulation: { mobile: true, width: 390, height: 844, deviceScaleFactor: 2.75, disabled: false },
      throttlingMethod: 'simulate',
    },
  },
];

const failures = [];
const baseline = { generatedAt: new Date().toISOString(), profiles: {} };
let chrome;

try {
  chrome = await launch({
    chromePath: chromium.executablePath(),
    chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'],
  });

  await mkdir(outputDirectory, { recursive: true });
  for (const profile of profiles) {
    const result = await lighthouse(profile.url, {
      port: chrome.port,
      output: ['html', 'json'],
      logLevel: 'error',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      ...profile.settings,
    });
    if (!result?.lhr || !Array.isArray(result.report)) throw new Error(`Lighthouse did not return ${profile.name} results`);

    const categories = Object.fromEntries(
      Object.entries(result.lhr.categories).map(([key, value]) => [key, value.score]),
    );
    const resourceSummary = Object.fromEntries(
      result.lhr.audits['resource-summary'].details.items.map((item) => [item.resourceType, item.transferSize]),
    );
    baseline.profiles[profile.name] = { categories, resourceSummary };

    await Promise.all([
      writeFile(new URL(`${profile.name}.html`, outputDirectory), result.report[0]),
      writeFile(new URL(`${profile.name}.json`, outputDirectory), result.report[1]),
    ]);

    if (shouldAssert) {
      const budget = thresholds[profile.name];
      for (const category of ['performance', 'accessibility', 'best-practices', 'seo']) {
        if ((categories[category] ?? 0) < budget[category]) {
          failures.push(`${profile.name} ${category}: ${categories[category]} < ${budget[category]}`);
        }
      }
      const totalBytes = resourceSummary.total ?? 0;
      const scriptBytes = resourceSummary.script ?? 0;
      const imageBytes = resourceSummary.image ?? 0;
      if (totalBytes > budget.totalByteWeight) failures.push(`${profile.name} total bytes: ${totalBytes} > ${budget.totalByteWeight}`);
      if (scriptBytes > budget.scriptByteWeight) failures.push(`${profile.name} script bytes: ${scriptBytes} > ${budget.scriptByteWeight}`);
      if (imageBytes > budget.imageByteWeight) failures.push(`${profile.name} image bytes: ${imageBytes} > ${budget.imageByteWeight}`);
    }
  }

  await writeFile(new URL('baseline-summary.json', outputDirectory), `${JSON.stringify(baseline, null, 2)}\n`);
  console.log(JSON.stringify(baseline, null, 2));
  if (failures.length > 0) {
    console.error('Lighthouse budgets failed:');
    for (const failure of failures) console.error(`- ${failure}`);
    process.exitCode = 1;
  }
} finally {
  if (chrome) await chrome.kill();
  if (server) server.kill('SIGTERM');
}
