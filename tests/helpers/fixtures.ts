import {
  expect,
  test as base,
  type ConsoleMessage,
  type Page,
  type TestInfo,
} from '@playwright/test';

type Diagnostics = {
  consoleErrors: string[];
  pageErrors: string[];
  failedLocalRequests: string[];
};

function isLocal(url: string): boolean {
  return url.startsWith('http://127.0.0.1:4173') || url.startsWith('http://localhost:4173');
}

export const test = base.extend<{ diagnostics: Diagnostics }>({
  diagnostics: [
    async ({ page }, use, testInfo) => {
      const diagnostics: Diagnostics = {
        consoleErrors: [],
        pageErrors: [],
        failedLocalRequests: [],
      };

      page.on('console', (message: ConsoleMessage) => {
        if (message.type() === 'error') diagnostics.consoleErrors.push(message.text());
      });
      page.on('pageerror', (error: Error) => diagnostics.pageErrors.push(error.message));
      page.on('requestfailed', (request) => {
        if (isLocal(request.url())) {
          diagnostics.failedLocalRequests.push(`${request.method()} ${request.url()}: ${request.failure()?.errorText ?? 'failed'}`);
        }
      });
      page.on('response', (response) => {
        if (isLocal(response.url()) && response.status() >= 400) {
          diagnostics.failedLocalRequests.push(`${response.status()} ${response.url()}`);
        }
      });

      await use(diagnostics);

      const theme = await page.locator('html').getAttribute('data-theme').catch(() => null);
      await testInfo.attach('environment-and-diagnostics.json', {
        body: JSON.stringify(
          {
            project: testInfo.project.name,
            viewport: testInfo.project.use.viewport,
            theme,
            javaScriptEnabled: testInfo.project.use.javaScriptEnabled !== false,
            diagnostics,
          },
          null,
          2,
        ),
        contentType: 'application/json',
      });

      expect(diagnostics.pageErrors, 'Unexpected uncaught page errors').toEqual([]);
      expect(diagnostics.consoleErrors, 'Unexpected browser console errors').toEqual([]);
      expect(diagnostics.failedLocalRequests, 'Unexpected failed local requests').toEqual([]);
    },
    { auto: true },
  ],
});

export { expect } from '@playwright/test';

export function annotateRequirements(testInfo: TestInfo, ...requirementIds: string[]): void {
  for (const requirementId of requirementIds) {
    testInfo.annotations.push({ type: 'requirement', description: requirementId });
  }
}

export async function openPortfolio(page: Page, options: { theme?: 'light' | 'dark'; testMode?: boolean } = {}): Promise<void> {
  const parameters = new URLSearchParams();
  if (options.testMode !== false) parameters.set('testMode', '1');
  if (options.theme) parameters.set('theme', options.theme);
  const suffix = parameters.size > 0 ? `?${parameters.toString()}` : '';
  await page.goto(`/${suffix}`);
  await expect(page.locator('html')).toHaveAttribute('data-js', 'enabled');
}
