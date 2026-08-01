import AxeBuilder from '@axe-core/playwright';
import { annotateRequirements, expect, openPortfolio, test } from '../helpers/fixtures';

const states = [
  { name: 'desktop-light', width: 1440, height: 900, theme: 'light' as const, menuOpen: false },
  { name: 'desktop-dark', width: 1440, height: 900, theme: 'dark' as const, menuOpen: false },
  { name: 'mobile-light', width: 390, height: 844, theme: 'light' as const, menuOpen: false },
  { name: 'mobile-dark', width: 390, height: 844, theme: 'dark' as const, menuOpen: false },
  { name: 'mobile-open-menu', width: 390, height: 844, theme: 'dark' as const, menuOpen: true },
] as const;

for (const state of states) {
  test(`A11Y-003 ${state.name} has no serious or critical axe violations`, async ({ page }, testInfo) => {
    annotateRequirements(testInfo, 'A11Y-003');
    test.skip(testInfo.project.name !== 'chromium-desktop', 'One deterministic Chromium pass covers each explicit viewport/theme state.');

    await test.step('Create the accessibility state', async () => {
      await page.setViewportSize({ width: state.width, height: state.height });
      await openPortfolio(page, { theme: state.theme });
      if (state.menuOpen) {
        await page.getByRole('button', { name: 'Open navigation menu' }).click();
        await expect(page.getByTestId('mobile-navigation')).toBeVisible();
      }
    });

    await test.step('Scan WCAG A and AA rules', async () => {
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze();
      const highImpactViolations = results.violations.filter(
        (violation) => violation.impact === 'serious' || violation.impact === 'critical',
      );
      await testInfo.attach(`axe-${state.name}.json`, {
        body: JSON.stringify(results, null, 2),
        contentType: 'application/json',
      });
      expect(highImpactViolations).toEqual([]);
    });
  });
}

test('A11Y-004 headings, landmarks, names, and document language form a usable structure', async ({ page }, testInfo) => {
  annotateRequirements(testInfo, 'A11Y-004');
  test.skip(testInfo.project.name !== 'chromium-desktop', 'Semantic structure is browser-independent.');

  await openPortfolio(page);

  await test.step('Verify global semantics', async () => {
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByRole('banner')).toHaveCount(1);
    await expect(page.getByRole('main')).toHaveCount(1);
    await expect(page.getByRole('contentinfo')).toHaveCount(1);
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  });

  await test.step('Verify every primary section has an accessible heading relationship', async () => {
    const sections = page.locator('main > section');
    const missingNames = await sections.evaluateAll((nodes) =>
      nodes.flatMap((node) => {
        const labelledBy = node.getAttribute('aria-labelledby');
        if (!labelledBy) return [node.id || node.className];
        const label = document.getElementById(labelledBy);
        return label?.textContent?.trim() ? [] : [node.id || node.className];
      }),
    );
    expect(missingNames).toEqual([]);

    const headingLevels = await page.locator('h1, h2, h3, h4, h5, h6').evaluateAll((headings) =>
      headings.map((heading) => Number(heading.tagName.slice(1))),
    );
    const skippedLevels = headingLevels.flatMap((level, index) =>
      index > 0 && level > headingLevels[index - 1] + 1
        ? [{ previous: headingLevels[index - 1], current: level, index }]
        : [],
    );
    expect(skippedLevels, 'Heading levels should not skip when descending the document').toEqual([]);
  });

  await test.step('Verify interactive elements expose usable names', async () => {
    const unnamed = await page.locator('a, button').evaluateAll((elements) =>
      elements
        .filter((element) => {
          const name = element.getAttribute('aria-label') || element.textContent;
          return !name?.trim();
        })
        .map((element) => element.outerHTML),
    );
    expect(unnamed).toEqual([]);
    await expect(page.getByRole('img', { name: 'Portrait of Sai Vamsi Kolla' })).toBeVisible();
  });
});
