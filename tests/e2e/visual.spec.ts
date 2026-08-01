import { annotateRequirements, expect, openPortfolio, test } from '../helpers/fixtures';

test('VISUAL-001 desktop light-theme landmarks match approved baselines', async ({ page }, testInfo) => {
  annotateRequirements(testInfo, 'VISUAL-001');
  test.skip(testInfo.project.name !== 'chromium-desktop', 'Desktop baselines belong to the Chromium desktop project.');

  await page.setViewportSize({ width: 1440, height: 900 });
  await openPortfolio(page, { theme: 'light' });

  await test.step('Compare header and hero', async () => {
    await expect(page.getByTestId('site-header')).toHaveScreenshot('desktop-header-light.png');
    await expect(page.locator('.hero')).toHaveScreenshot('desktop-hero-light.png');
  });

  await test.step('Compare capability, projects, and contact surfaces', async () => {
    await expect(page.locator('.capability-strip')).toHaveScreenshot('desktop-capabilities-light.png');
    await expect(page.getByTestId('building-project-list')).toHaveScreenshot('desktop-building-light.png');
    await expect(page.locator('.contact-panel')).toHaveScreenshot('desktop-contact-light.png');
  });
});

test('VISUAL-002 mobile dark-theme navigation matches the approved open-menu baseline', async ({ page }, testInfo) => {
  annotateRequirements(testInfo, 'VISUAL-002');
  test.skip(testInfo.project.name !== 'mobile-chrome', 'The compact navigation baseline belongs to the mobile Chromium project.');

  await page.setViewportSize({ width: 390, height: 844 });
  await openPortfolio(page, { theme: 'dark' });
  await page.getByRole('button', { name: 'Open navigation menu' }).click();
  await expect(page.getByTestId('site-header')).toHaveScreenshot('mobile-header-menu-dark.png');
});
