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
    for (const path of ['/files/resume.pdf', '/images/profile.jpg', '/css/style.css', '/js/main.js', '/js/background.js']) {
      const response = await request.get(path);
      expect(response.ok(), `${path} should return a successful status`).toBe(true);
    }
  });

  await test.step('Verify outbound links are intentional and well formed', async () => {
    const invalid = await page.locator('a').evaluateAll((links) =>
      (links as HTMLAnchorElement[]).flatMap((link) => {
        const rawHref = link.getAttribute('href') ?? '';
        const problems: string[] = [];
        if (!rawHref.trim() || rawHref === '#') problems.push('empty or placeholder href');
        if (/^javascript:/i.test(rawHref)) problems.push('javascript URL');
        if (link.target === '_blank' && !link.rel.split(/\s+/).includes('noopener')) problems.push('unsafe target blank');
        if (rawHref.startsWith('mailto:') && !/^mailto:[^@\s]+@[^@\s]+\.[^@\s]+$/i.test(rawHref)) problems.push('invalid email');
        if (/^http:/i.test(rawHref)) problems.push('insecure external URL');
        return problems.map((problem) => ({ href: rawHref, problem }));
      }),
    );
    expect(invalid).toEqual([]);
  });
});
