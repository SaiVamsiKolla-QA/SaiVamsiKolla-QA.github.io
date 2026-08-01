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

  await test.step('Verify the primary action and resume contract', async () => {
    await expect(page.getByTestId('hero-primary-action')).toBeVisible();
    const resumeLinks = page.locator('a[href="files/SaiVamsiKolla_Resume.pdf"][download]');
    await expect(resumeLinks).toHaveCount(3);
    for (const resumeLink of await resumeLinks.all()) {
      await expect(resumeLink).toHaveAttribute('href', 'files/SaiVamsiKolla_Resume.pdf');
      await expect(resumeLink).toHaveAccessibleName(/resume/i);
    }
  });

  await test.step('Verify the owner-approved positioning and expertise contract', async () => {
    const hero = page.locator('.hero-copy');
    const expertise = page.getByTestId('capability-list');
    const currentRole = page.locator('.experience-item').first();

    await expect(hero.getByRole('heading', { level: 1 })).toHaveText('I build quality systems for AI-powered products.');
    await expect(hero.locator('.hero-lead')).toHaveText(
      'I design test systems for AI agents, APIs and web applications using realistic data, behavioral validation and observable failure evidence.',
    );

    const capabilityHeadings = [
      'AI Systems Quality',
      'API and Microservice Quality',
      'UI Automation and Web Quality',
      'Testability and Observability',
    ];
    await expect(expertise.locator('.expertise-card')).toHaveCount(capabilityHeadings.length);
    for (const heading of capabilityHeadings) {
      await expect(expertise.getByRole('heading', { name: heading, exact: true })).toBeVisible();
    }

    const restrictedPositioning = /Mobile and (?:Health-Data|health data) Quality|Mobile validation|Health data and device workflows|HealthKit ingestion|BLE-connected workflows|mobile testing specialist|health data testing specialist/i;
    expect(await hero.innerText()).not.toMatch(restrictedPositioning);
    expect(await expertise.innerText()).not.toMatch(restrictedPositioning);
    expect(await currentRole.innerText()).not.toMatch(/mobile|health|HealthKit|BLE|wearable|device synchronization/i);
    await expect(currentRole).toContainText('multi-agent AI product across agent behavior, APIs, microservices, data flows and end-to-end product risk');

    const visiblePageText = await page.locator('body').innerText();
    expect(visiblePageText).not.toContain('Guidewire');
    expect(visiblePageText).not.toContain('\u2014');
  });

  await test.step('Verify recruiter metadata matches the positioning', async () => {
    await expect(page).toHaveTitle('Sai Vamsi Kolla | AI Quality Engineer · Senior SDET');
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      'Sai Vamsi Kolla designs test systems for AI agents, APIs, microservices and web applications with a focus on testability, automation and observable failure evidence.',
    );
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
      'content',
      'Test systems for AI agents, APIs, microservices and web applications, with a focus on testability, automation and observable failure evidence.',
    );
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
