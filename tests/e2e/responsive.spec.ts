import { attachGeometry, expectNoHorizontalOverflow } from '../helpers/assertions';
import { annotateRequirements, expect, openPortfolio, test } from '../helpers/fixtures';

const viewports = [
  { name: 'wide-desktop', width: 1440, height: 900 },
  { name: 'small-desktop', width: 1024, height: 768 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
] as const;

for (const viewport of viewports) {
  test(`RESP-001 ${viewport.name} keeps the recruiter path usable at ${viewport.width}x${viewport.height}`, async ({ page }, testInfo) => {
    annotateRequirements(testInfo, 'RESP-001');

    await test.step('Open at the target viewport', async () => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await openPortfolio(page, { theme: 'light' });
    });

    await test.step('Verify primary content and controls remain visible', async () => {
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.getByTestId('hero-primary-action')).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Active systems, documented honestly.' })).toBeVisible();

      const header = page.getByTestId('site-header');
      const main = page.getByRole('main');
      const geometry = await Promise.all([
        header.boundingBox(),
        main.boundingBox(),
      ]);
      expect(geometry[0]?.height ?? 0, 'Header should have a measurable height').toBeGreaterThan(0);
      expect(geometry[1]?.width ?? 0, 'Main content should have a measurable width').toBeGreaterThan(0);
    });

    await test.step('Verify layout stays within the viewport', async () => {
      await expectNoHorizontalOverflow(page);
      await attachGeometry(page, testInfo, `${viewport.name}-geometry`);
      const outOfBounds = await page.locator('main article, main a, main button').evaluateAll((elements) =>
        elements
          .map((element) => {
            const bounds = element.getBoundingClientRect();
            return {
              label: element.textContent?.trim().replace(/\s+/g, ' ').slice(0, 80),
              left: bounds.left,
              right: bounds.right,
            };
          })
          .filter(({ left, right }) => left < -1 || right > window.innerWidth + 1),
      );
      expect(outOfBounds, 'Interactive controls and content cards should stay within the viewport').toEqual([]);
    });

    await test.step('Verify the appropriate navigation mode', async () => {
      const trigger = page.getByRole('button', { name: 'Open navigation menu' });
      if (viewport.width < 1080) {
        await expect(trigger).toBeVisible();
        await expect(page.getByTestId('mobile-navigation')).toBeHidden();
      } else {
        await expect(trigger).toBeHidden();
        await expect(page.getByTestId('mobile-navigation')).toBeVisible();
      }
    });

    await test.step('Verify sticky navigation leaves the anchored heading visible', async () => {
      await page.evaluate(() => {
        window.location.hash = '#experience';
      });
      await expect(page).toHaveURL(/#experience$/);
      await expect.poll(async () => {
        const headerHeight = await page.getByTestId('site-header').evaluate((header) => header.getBoundingClientRect().height);
        const sectionTop = await page.locator('#experience').evaluate((section) => section.getBoundingClientRect().top);
        return sectionTop >= headerHeight - 1;
      }).toBe(true);
    });
  });
}
