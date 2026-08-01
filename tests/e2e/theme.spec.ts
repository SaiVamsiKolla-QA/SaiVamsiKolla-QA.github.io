import { annotateRequirements, expect, test } from '../helpers/fixtures';

test('THEME-001 theme state, accessible action, focus, and persistence stay aligned', async ({ page }, testInfo) => {
  annotateRequirements(testInfo, 'THEME-001');

  await test.step('Start from a deterministic dark preference', async () => {
    await page.addInitScript(() => localStorage.setItem('theme', 'dark'));
    await page.goto('/?testMode=1');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    const toggle = page.getByTestId('theme-toggle');
    await expect(toggle).toHaveAccessibleName('Switch to light theme');
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  });

  await test.step('Activate the light theme and expose the next action', async () => {
    const toggle = page.getByTestId('theme-toggle');
    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await expect(toggle).toHaveAccessibleName('Switch to dark theme');
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  });

  await test.step('Verify preference persistence after reload', async () => {
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await expect(page.getByTestId('theme-toggle')).toHaveAccessibleName('Switch to dark theme');
  });

  await test.step('Verify the theme control has a visible focus indicator', async () => {
    const toggle = page.getByTestId('theme-toggle');
    await toggle.focus();
    await expect(toggle).toBeFocused();
    const focusStyle = await toggle.evaluate((element) => {
      const style = getComputedStyle(element);
      return { width: style.outlineWidth, style: style.outlineStyle };
    });
    expect(Number.parseFloat(focusStyle.width)).toBeGreaterThanOrEqual(3);
    expect(focusStyle.style).not.toBe('none');
  });
});
