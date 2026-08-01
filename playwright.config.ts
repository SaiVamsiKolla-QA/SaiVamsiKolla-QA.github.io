import { defineConfig, devices } from '@playwright/test';

const reportSuffix = process.env.PW_REPORT_SUFFIX ?? 'full';
const visualComparisonEnabled = process.env.PW_VISUAL === '1';

export default defineConfig({
  testDir: './tests/e2e',
  testIgnore: visualComparisonEnabled ? [] : ['**/visual.spec.ts'],
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  timeout: 30_000,
  expect: {
    timeout: 5_000,
    toHaveScreenshot: {
      animations: 'disabled',
      maxDiffPixelRatio: 0.01,
    },
  },
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: `playwright-report/${reportSuffix}` }],
    ['json', { outputFile: `test-results/${reportSuffix}/results.json` }],
    ['junit', { outputFile: `test-results/${reportSuffix}/junit.xml` }],
  ],
  outputDir: `test-results/${reportSuffix}/artifacts`,
  snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{projectName}/{arg}{ext}',
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
    contextOptions: { reducedMotion: 'reduce' },
  },
  webServer: {
    command: 'npm run start',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    stdout: 'pipe',
    timeout: 60_000,
  },
  projects: [
    {
      name: 'chromium-desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'firefox-desktop',
      use: { ...devices['Desktop Firefox'], viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'webkit-desktop',
      use: { ...devices['Desktop Safari'], viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'], viewport: { width: 390, height: 844 } },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 13'], viewport: { width: 390, height: 844 } },
    },
  ],
});
