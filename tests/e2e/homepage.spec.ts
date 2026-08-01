import { annotateRequirements, expect, openPortfolio, test } from '../helpers/fixtures';

test('CONTENT-001 ASSET-001 homepage exposes the core recruiter path', async ({ page }, testInfo) => {
  annotateRequirements(testInfo, 'CONTENT-001', 'ASSET-001');

  await test.step('Open the deterministic portfolio homepage', async () => {
    await openPortfolio(page, { theme: 'dark' });
    await expect(page).toHaveTitle(/\S+/);
  });

  await test.step('Verify the primary document landmarks and heading contract', async () => {
    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible();
    await expect(page.getByRole('main')).toBeVisible();
    await expect(page.getByRole('contentinfo')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  await test.step('Verify the primary action and résumé contract', async () => {
    await expect(page.getByTestId('hero-primary-action')).toBeVisible();
    const resumeLinks = page.getByRole('link', { name: /résumé|resume/i });
    await expect(resumeLinks).toHaveCount(3);
    for (const resumeLink of await resumeLinks.all()) {
      await expect(resumeLink).toHaveAttribute('href', 'files/resume.pdf');
    }
  });

  await test.step('Attach the recruiter-facing content contract', async () => {
    const contract = await page.evaluate(() => ({
      headline: document.querySelector('h1')?.textContent?.trim(),
      sectionIds: [...document.querySelectorAll('main > section[id]')].map((section) => section.id),
      projectCount: document.querySelectorAll('[data-project-status="active-build"]').length,
    }));
    await testInfo.attach('content-contract.json', {
      body: JSON.stringify(contract, null, 2),
      contentType: 'application/json',
    });
  });
});
