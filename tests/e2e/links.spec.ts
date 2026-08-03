import { annotateRequirements, expect, openPortfolio, test } from '../helpers/fixtures';

test('LINK-001 anchors, local assets, and outbound URLs satisfy the site contract', async ({ page, request }, testInfo) => {
  annotateRequirements(testInfo, 'LINK-001', 'ASSET-001');
  test.skip(testInfo.project.name !== 'chromium-desktop', 'Link integrity is independent of browser engine.');

  await openPortfolio(page);

  await test.step('Verify IDs are unique and internal fragments resolve exactly once', async () => {
    const audit = await page.evaluate(() => {
      const ids = [...document.querySelectorAll<HTMLElement>('[id]')].map((element) => element.id);
      const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
      const fragments = [...document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')].map((link) => ({
        label: link.textContent?.trim(),
        href: link.getAttribute('href'),
      }));
      return {
        duplicates: [...new Set(duplicates)],
        unresolved: fragments.filter(({ href }) => !href || document.querySelectorAll(href).length !== 1),
      };
    });
    expect(audit).toEqual({ duplicates: [], unresolved: [] });
  });

  await test.step('Verify required local assets return successfully', async () => {
    for (const path of ['/files/SaiVamsiKolla_Resume.pdf', '/images/profile.jpg', '/css/style.css', '/js/main.js', '/js/background.js']) {
      const response = await request.get(path);
      expect(response.ok(), `${path} should return a successful status`).toBe(true);
    }
  });

  await test.step('Verify outbound links are intentional and well formed', async () => {
    const invalid = await page.locator('a').evaluateAll((links) =>
      (links as HTMLAnchorElement[]).flatMap((link) => {
        const rawHref = link.getAttribute('href') ?? '';
        const problems: string[] = [];
        const relTokens = link.rel.split(/\s+/).filter(Boolean);
        const isExternalHttpLink = /^https?:\/\//i.test(rawHref);
        if (!rawHref.trim() || rawHref === '#') problems.push('empty or placeholder href');
        if (/^javascript:/i.test(rawHref)) problems.push('javascript URL');
        if (isExternalHttpLink && link.target !== '_blank') problems.push('external link does not open in a new tab');
        if (isExternalHttpLink && !relTokens.includes('noopener')) problems.push('external link is missing noopener');
        if (isExternalHttpLink && !relTokens.includes('noreferrer')) problems.push('external link is missing noreferrer');
        if (link.target === '_blank' && !relTokens.includes('noopener')) problems.push('unsafe target blank');
        if (link.target === '_blank' && !relTokens.includes('noreferrer')) problems.push('target blank is missing noreferrer');
        if (rawHref.startsWith('mailto:') && !/^mailto:[^@\s]+@[^@\s]+\.[^@\s]+$/i.test(rawHref)) problems.push('invalid email');
        if (/^http:/i.test(rawHref)) problems.push('insecure external URL');
        return problems.map((problem) => ({ href: rawHref, label: link.textContent?.trim() || link.getAttribute('aria-label'), problem }));
      }),
    );
    expect(invalid).toEqual([]);
  });
});
