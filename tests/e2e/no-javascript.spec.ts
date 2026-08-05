import { annotateRequirements, expect, test } from '../helpers/fixtures';

test('A11Y-001 core portfolio content and navigation work without JavaScript', async ({ browser }, testInfo) => {
  annotateRequirements(testInfo, 'A11Y-001');
  test.skip(testInfo.project.name !== 'chromium-desktop', 'One browser is sufficient for the no-JavaScript fallback contract.');

  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const noJsPage = await context.newPage();

  try {
    await test.step('Open the site without JavaScript', async () => {
      const response = await noJsPage.goto('http://127.0.0.1:4173/');
      expect(response?.ok()).toBe(true);
    });

    await test.step('Verify the baseline is visible and navigable', async () => {
      await expect(noJsPage.getByRole('heading', { level: 1, name: 'Sai Vamsi Kolla' })).toBeVisible();
      await expect(noJsPage.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible();
      await expect(noJsPage.getByTestId('mobile-navigation')).toBeVisible();
      await expect(noJsPage.getByRole('button', { name: /navigation menu/i })).toBeHidden();
      await expect(noJsPage.getByTestId('theme-toggle')).toBeHidden();
      await expect(noJsPage.locator('main > section')).toHaveCount(9);
      const hiddenSections = await noJsPage.locator('main > section').evaluateAll((sections) =>
        sections
          .filter((section) => getComputedStyle(section).opacity === '0' || section.getBoundingClientRect().height === 0)
          .map((section) => section.id || section.className),
      );
      expect(hiddenSections).toEqual([]);
      await expect(noJsPage.locator('#contact').getByRole('link', { name: 'Email Sai' })).toBeVisible();
      await expect(noJsPage.getByText('saivamsikolla@gmail.com', { exact: true })).toBeVisible();
      await expect(noJsPage.locator('#contact a[href^="mailto:"]')).toHaveCount(1);
      await expect(noJsPage.getByRole('button', { name: 'Copy email' })).toBeHidden();
      const resumePreview = noJsPage.getByRole('link', { name: /resume/i }).first();
      await expect(resumePreview).toHaveAttribute('href', 'files/SaiVamsiKolla_Resume.pdf');
      expect(await resumePreview.getAttribute('download')).toBeNull();
      await expect(resumePreview).toHaveAttribute('target', '_blank');
      await noJsPage.getByRole('link', { name: 'Experience' }).click();
      await expect(noJsPage).toHaveURL(/#experience$/);
      await expect(noJsPage.getByRole('heading', { name: /Quality ownership across AI/ })).toBeVisible();
    });
  } finally {
    await context.close();
  }
});
