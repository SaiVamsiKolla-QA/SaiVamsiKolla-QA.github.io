import { annotateRequirements, expect, openPortfolio, test } from '../helpers/fixtures';

test('CONTENT-002 active projects disclose status, current evidence, and next milestones without inflated claims', async ({ page }, testInfo) => {
  annotateRequirements(testInfo, 'CONTENT-002');
  test.skip(testInfo.project.name !== 'chromium-desktop', 'Content truthfulness is browser-independent.');

  await openPortfolio(page);
  const projects = page.locator('[data-project-status="active-build"]');

  await test.step('Verify all three active builds use the same disclosure structure', async () => {
    await expect(projects).toHaveCount(3);
    for (const project of await projects.all()) {
      await expect(project.getByText('Active build', { exact: true })).toBeVisible();
      await expect(project.locator('dt', { hasText: 'Problem' })).toHaveCount(1);
      await expect(project.locator('dt', { hasText: 'What I’m building' })).toHaveCount(1);
      await expect(project.locator('dt', { hasText: 'Current status' })).toHaveCount(1);
      await expect(project.locator('dt', { hasText: 'Next milestone' })).toHaveCount(1);
      await expect(project.getByRole('link', { name: /repository/i })).toHaveAttribute('href', /^https:\/\/github\.com\/SaiVamsiKolla-QA\//);
    }
  });

  await test.step('Verify high-visibility positioning avoids prohibited or unsupported claims', async () => {
    const priorityContent = [
      await page.locator('.hero').innerText(),
      await page.locator('.capability-strip').innerText(),
      await page.getByTestId('building-project-list').innerText(),
    ].join('\n');
    expect(priorityContent).not.toMatch(/\b109\b/);
    expect(priorityContent).not.toMatch(/production[- ]ready|production[- ]grade|fully accessible|complete end[- ]to[- ]end suite/i);
  });
});
