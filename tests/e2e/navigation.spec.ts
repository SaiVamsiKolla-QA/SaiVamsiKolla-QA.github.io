import { annotateRequirements, expect, openPortfolio, test } from '../helpers/fixtures';

test('NAV-001 LINK-001 desktop navigation targets unique existing sections without wrapping', async ({ page }, testInfo) => {
  annotateRequirements(testInfo, 'NAV-001', 'LINK-001');
  test.skip(testInfo.project.name.startsWith('mobile-'), 'Desktop navigation geometry is covered by desktop browser projects.');

  await test.step('Open the desktop portfolio', async () => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await openPortfolio(page);
  });

  await test.step('Verify every header destination resolves to one section', async () => {
    const navigation = page.getByRole('navigation', { name: 'Primary navigation' });
    const sectionLinks = navigation.locator('a[href^="#"]');
    const hrefs = await sectionLinks.evaluateAll((links) => links.map((link) => link.getAttribute('href')));
    expect(hrefs).toEqual(['#top', '#expertise', '#building', '#experience', '#about', '#contact']);

    for (const href of hrefs) {
      expect(href).not.toBeNull();
      await expect(page.locator(href!)).toHaveCount(1);
    }
  });

  await test.step('Verify desktop labels stay on one visual line', async () => {
    const labels = page.getByRole('navigation', { name: 'Primary navigation' }).locator('.nav-menu a');
    const measurements = await labels.evaluateAll((links) =>
      links.map((link) => {
        const style = getComputedStyle(link);
        const lineHeight = Number.parseFloat(style.lineHeight);
        return { label: link.textContent?.trim(), height: link.getBoundingClientRect().height, lineHeight };
      }),
    );
    for (const measurement of measurements) {
      expect(measurement.height, `${measurement.label} should remain on one line`).toBeLessThanOrEqual(measurement.lineHeight * 1.6);
    }
  });
});

test('A11Y-002 skip link moves focus to the main landmark', async ({ page }, testInfo) => {
  annotateRequirements(testInfo, 'A11Y-002');

  await test.step('Open and focus the skip link', async () => {
    await openPortfolio(page);
    const skipLink = page.getByRole('link', { name: 'Skip to main content' });
    await skipLink.focus();
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeVisible();
    await skipLink.press('Enter');
  });

  await test.step('Verify the main landmark receives focus', async () => {
    await expect(page).toHaveURL(/#main-content$/);
    await expect(page.getByRole('main')).toBeFocused();
  });
});

test('NAV-002 NAV-003 mobile navigation exposes deterministic keyboard states', async ({ page }, testInfo) => {
  annotateRequirements(testInfo, 'NAV-002', 'NAV-003');

  await test.step('Open the compact navigation with Enter', async () => {
    await page.setViewportSize({ width: 390, height: 844 });
    await openPortfolio(page);
    const trigger = page.getByRole('button', { name: 'Open navigation menu' });
    await expect(trigger).toBeVisible();
    await trigger.focus();
    await trigger.press('Enter');
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(trigger).toHaveAccessibleName('Close navigation menu');
    await expect(page.getByTestId('mobile-navigation')).toBeVisible();
  });

  await test.step('Move keyboard focus into the open menu', async () => {
    await page.getByRole('button', { name: 'Close navigation menu' }).press('Tab');
    await expect(page.getByRole('link', { name: 'Expertise' })).toBeFocused();
  });

  await test.step('Close with Escape and return focus to the trigger', async () => {
    await page.keyboard.press('Escape');
    const trigger = page.getByRole('button', { name: 'Open navigation menu' });
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger).toBeFocused();
    await expect(page.getByTestId('mobile-navigation')).toBeHidden();
  });

  await test.step('Open with Space and close by choosing a destination', async () => {
    const trigger = page.getByRole('button', { name: 'Open navigation menu' });
    await trigger.press('Space');
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL(/#about$/);
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(page.getByTestId('mobile-navigation')).toBeHidden();
  });

  await test.step('Reset menu state when resizing to desktop', async () => {
    const trigger = page.getByRole('button', { name: 'Open navigation menu' });
    await trigger.press('Space');
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(page.getByTestId('mobile-navigation')).toBeVisible();
  });
});
