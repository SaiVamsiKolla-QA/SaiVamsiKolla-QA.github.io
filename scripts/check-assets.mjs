import { access, readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const projectRoot = process.cwd();
const htmlPath = path.join(projectRoot, 'index.html');
const cssPath = path.join(projectRoot, 'css/style.css');
const contentPath = path.join(projectRoot, 'CONTENT.md');
const robotsPath = path.join(projectRoot, 'robots.txt');
const sitemapPath = path.join(projectRoot, 'sitemap.xml');
const canonicalUrl = 'https://saivamsikolla-qa.github.io/';
const requiredTnWording = 'Canadian citizen · Eligible to apply for TN status for qualifying U.S. roles';

const [html, css, content, robots, sitemap] = await Promise.all([
  readFile(htmlPath, 'utf8'),
  readFile(cssPath, 'utf8'),
  readFile(contentPath, 'utf8'),
  readFile(robotsPath, 'utf8'),
  readFile(sitemapPath, 'utf8'),
]);

const references = new Set();
for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)) {
  references.add(match[1]);
}
for (const match of css.matchAll(/url\(["']?([^"')]+)["']?\)/gi)) {
  references.add(match[1]);
}

const localReferences = [...references]
  .filter((reference) => !/^(?:#|https?:|mailto:|tel:|data:)/i.test(reference))
  .map((reference) => reference.split(/[?#]/, 1)[0])
  .filter(Boolean);
localReferences.push('images/social-preview.jpg', 'robots.txt', 'sitemap.xml');

const failures = [];
for (const reference of new Set(localReferences)) {
  const normalized = reference.startsWith('/') ? reference.slice(1) : reference;
  const resolved = path.resolve(projectRoot, normalized);
  if (!resolved.startsWith(`${projectRoot}${path.sep}`)) {
    failures.push(`${reference}: resolves outside the repository`);
    continue;
  }
  try {
    await access(resolved);
    const file = await stat(resolved);
    if (!file.isFile()) failures.push(`${reference}: is not a file`);
    if (file.size === 0) failures.push(`${reference}: is empty`);
  } catch {
    failures.push(`${reference}: missing`);
  }
}

if (!html.includes(requiredTnWording)) failures.push('index.html: required TN wording is missing');
if (!content.includes(requiredTnWording)) failures.push('CONTENT.md: required TN wording is missing');
if (!robots.includes(`Sitemap: ${canonicalUrl}sitemap.xml`)) failures.push('robots.txt: canonical sitemap URL is missing');
if (!sitemap.includes(`<loc>${canonicalUrl}</loc>`)) failures.push('sitemap.xml: canonical portfolio URL is missing');

const ignoredDirectories = new Set(['.git', 'node_modules', 'lighthouse-results', 'playwright-report', 'test-results']);
const textExtensions = new Set(['.css', '.html', '.js', '.json', '.md', '.mjs', '.ts', '.txt', '.xml', '.yaml', '.yml']);
const outdatedTnWording = /eligible to work in (?:the )?us\s*\(tn visa\)/i;

async function collectTextFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name.startsWith('.') && entry.name !== '.github') continue;
    if (ignoredDirectories.has(entry.name)) continue;
    const resolved = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectTextFiles(resolved));
    if (entry.isFile() && textExtensions.has(path.extname(entry.name).toLowerCase())) files.push(resolved);
  }
  return files;
}

for (const file of await collectTextFiles(projectRoot)) {
  const source = await readFile(file, 'utf8');
  if (outdatedTnWording.test(source)) {
    failures.push(`${path.relative(projectRoot, file)}: contains outdated TN wording`);
  }
}

if (failures.length > 0) {
  console.error('Local asset validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Validated ${new Set(localReferences).size} local assets, canonical discovery files, and TN wording.`);
}
