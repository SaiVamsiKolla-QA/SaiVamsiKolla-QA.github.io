import type { Locator, Page } from '@playwright/test';
import { annotateRequirements, expect, openPortfolio, test } from '../helpers/fixtures';

async function exposeThemeControl(page: Page): Promise<Locator> {
  const toggle = page.getByTestId('theme-toggle');
  if (await toggle.isHidden()) {
    await page.locator('button[aria-controls="primary-navigation"]').click();
  }
  await expect(toggle).toBeVisible();
  return toggle;
}

test('THEME-001 theme state, accessible action, focus, and persistence stay aligned', async ({ page }, testInfo) => {
  annotateRequirements(testInfo, 'THEME-001');

  await test.step('Start from a deterministic dark preference', async () => {
    await page.addInitScript(() => {
      if (!localStorage.getItem('theme')) localStorage.setItem('theme', 'dark');
    });
    await openPortfolio(page);
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    const toggle = await exposeThemeControl(page);
    await expect(toggle).toHaveAccessibleName('Switch to light theme');
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  });

  await test.step('Activate the light theme and expose the next action', async () => {
    const toggle = await exposeThemeControl(page);
    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await expect(toggle).toHaveAccessibleName('Switch to dark theme');
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  });

  await test.step('Verify preference persistence after reload', async () => {
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-js', 'enabled');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await expect(await exposeThemeControl(page)).toHaveAccessibleName('Switch to dark theme');
  });

  await test.step('Verify the theme control has a visible focus indicator', async () => {
    const toggle = await exposeThemeControl(page);
    const resumeLink = page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'View resume' });
    await resumeLink.focus();
    await page.keyboard.press('Tab');
    await expect(toggle).toBeFocused();
    const focusStyle = await toggle.evaluate((element) => {
      const style = getComputedStyle(element);
      return { width: style.outlineWidth, style: style.outlineStyle };
    });
    expect(Number.parseFloat(focusStyle.width)).toBeGreaterThanOrEqual(3);
    expect(focusStyle.style).not.toBe('none');
  });
});
