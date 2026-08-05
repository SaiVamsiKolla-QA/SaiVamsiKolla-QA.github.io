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
    await expect(page.getByRole('heading', { level: 1, name: 'Sai Vamsi Kolla' })).toBeVisible();
    await expect(page.locator('.hero .eyebrow')).toHaveText('Senior SDET · AI Quality Engineer');
  });

  await test.step('Verify the primary action and resume contract', async () => {
    await expect(page.getByTestId('hero-primary-action')).toBeVisible();
    const resumePreviews = page.locator('a[href="files/SaiVamsiKolla_Resume.pdf"]:not([download])');
    await expect(resumePreviews).toHaveCount(2);
    for (const previewLink of await resumePreviews.all()) {
      await expect(previewLink).toHaveAttribute('target', '_blank');
      await expect(previewLink).toHaveAttribute('rel', /\bnoopener\b/);
      await expect(previewLink).toHaveAttribute('rel', /\bnoreferrer\b/);
      await expect(previewLink).toHaveText('View resume');
    }

    const visibleResumeLinks = resumePreviews.filter({ visible: true });
    const expectedVisiblePreviewCount = testInfo.project.name.startsWith('mobile-') ? 1 : 2;
    await expect(visibleResumeLinks).toHaveCount(expectedVisiblePreviewCount);
    for (const resumeLink of await visibleResumeLinks.all()) {
      await expect(resumeLink).toHaveAccessibleName(/resume/i);
    }

    const resumeDownloads = page.locator('a[href="files/SaiVamsiKolla_Resume.pdf"][download]');
    await expect(resumeDownloads).toHaveCount(1);
    await expect(resumeDownloads).toHaveAccessibleName('Download resume');
    await expect(resumeDownloads).not.toHaveAttribute('target', '_blank');
  });

  await test.step('Verify the owner-approved positioning and expertise contract', async () => {
    const hero = page.locator('.hero-copy');
    const expertise = page.getByTestId('capability-list');
    const currentRole = page.locator('.experience-item').first();

    await expect(hero.getByRole('heading', { level: 1 })).toHaveText('Sai Vamsi Kolla');
    await expect(hero.locator('.hero-positioning')).toContainText('AI agents, APIs, microservices, and web automation');
    await expect(hero.locator('.hero-lead')).toContainText('behavioral obligations and tool use');
    await expect(hero.locator('.hero-lead')).toContainText('testability and observability');
    await expect(hero.locator('.hero-lead')).toContainText('browser, network, console, trace, and logging evidence');
    await expect(page.locator('.capability-strip li').first()).toHaveText('7+ years of quality engineering experience');
    await expect(page.locator('.capability-strip li')).toHaveCount(4);
    await expect(hero.locator('.availability')).toHaveText(
      'Vancouver, BC, Canada · Canadian citizen · Eligible to apply for TN status for qualifying U.S. roles',
    );
    expect(await page.locator('body').innerText()).not.toMatch(/eligible to work in (?:the )?US\s*\(TN visa\)/i);

    const capabilityHeadings = [
      'AI Systems and Behavioral Quality',
      'API, Microservices, and Realistic Data',
      'UI Automation, Testability, and Observability',
    ];
    await expect(expertise.locator('.expertise-card')).toHaveCount(capabilityHeadings.length);
    for (const heading of capabilityHeadings) {
      await expect(expertise.getByRole('heading', { name: heading, exact: true })).toBeVisible();
    }

    const restrictedPositioning = /Mobile and (?:Health-Data|health data) Quality|Mobile validation|Health data and device workflows|HealthKit ingestion|BLE-connected workflows|mobile testing specialist|health data testing specialist/i;
    expect(await hero.innerText()).not.toMatch(restrictedPositioning);
    expect(await expertise.innerText()).not.toMatch(restrictedPositioning);
    expect(await currentRole.innerText()).not.toMatch(/mobile|health|HealthKit|BLE|wearable|device synchronization/i);
    await expect(currentRole).toContainText('multi-agent AI product across agent behavior, APIs, microservices, data flows, and end-to-end product risk');

    const visiblePageText = await page.locator('body').innerText();
    expect(visiblePageText).not.toContain('Guidewire');
    expect(visiblePageText).not.toContain('\u2014');
  });

  await test.step('Verify recruiter metadata matches the positioning', async () => {
    await expect(page).toHaveTitle('Sai Vamsi Kolla | Senior SDET · AI Quality Engineer');
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      'Sai Vamsi Kolla is a Senior SDET and AI Quality Engineer who tests AI-agent behavior, APIs, microservices, and web applications through realistic data, automation, testability, and failure diagnosis.',
    );
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
      'content',
      'Quality engineering for AI-agent behavior, APIs, microservices, and web automation, backed by realistic data and observable failure evidence.',
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

test('CONTACT-001 email remains visible and copy feedback handles Clipboard API success and failure paths', async ({ page }, testInfo) => {
  annotateRequirements(testInfo, 'CONTACT-001', 'A11Y-004');
  test.skip(testInfo.project.name !== 'chromium-desktop', 'One Chromium pass covers the browser clipboard contract deterministically.');

  await openPortfolio(page);

  const emailLink = page.locator('#contact').getByRole('link', { name: 'Email Sai', exact: true });
  const copyButton = page.getByRole('button', { name: 'Copy email' });
  const status = page.locator('#copy-email-status');

  await test.step('Verify the visible and accessible contact controls', async () => {
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveAttribute('href', 'mailto:saivamsikolla@gmail.com');
    await expect(page.getByText('saivamsikolla@gmail.com', { exact: true })).toBeVisible();
    await expect(page.locator('#contact a[href^="mailto:"]')).toHaveCount(1);
    await expect(copyButton).toBeVisible();
    await expect(copyButton).toHaveAccessibleName('Copy email');
    await expect(copyButton).toHaveAttribute('aria-describedby', 'copy-email-status');
    await expect(status).toHaveAttribute('aria-live', 'polite');
    await expect(page.getByRole('list', { name: 'Professional links' }).getByRole('link')).toHaveCount(3);
    await expect(page.locator('.contact-details')).toContainText('Vancouver, BC');
    await expect(page.locator('.contact-details')).toContainText('Canada and US opportunities');
  });

  await test.step('Use the Clipboard API when it is available', async () => {
    await page.evaluate(() => {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: {
          writeText: async (text: string) => {
            (window as typeof window & { copiedEmail?: string }).copiedEmail = text;
          },
        },
      });
    });
    await copyButton.click();
    await expect(status).toHaveText('Email address copied to clipboard.');
    expect(await page.evaluate(() => (window as typeof window & { copiedEmail?: string }).copiedEmail)).toBe('saivamsikolla@gmail.com');
  });

  await test.step('Announce a safe failure without throwing an uncaught browser error', async () => {
    await page.evaluate(() => {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: { writeText: async () => Promise.reject(new Error('Permission denied')) },
      });
    });
    await copyButton.click();
    await expect(status).toHaveText('Could not copy the email address. Select and copy it manually.');
  });
});
