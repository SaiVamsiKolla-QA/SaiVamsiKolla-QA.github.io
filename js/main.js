(() => {
  const root = document.documentElement;
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  const desktopQuery = window.matchMedia('(min-width: 1081px)');

  function setMenuState(open, { restoreFocus = false } = {}) {
    if (!header || !menuButton || !menu) return;

    const canOpen = !desktopQuery.matches;
    const nextOpen = Boolean(open && canOpen);
    menuButton.setAttribute('aria-expanded', String(nextOpen));
    menuButton.setAttribute('aria-label', nextOpen ? 'Close navigation menu' : 'Open navigation menu');
    header.dataset.navOpen = String(nextOpen);
    menu.hidden = canOpen ? !nextOpen : false;

    if (restoreFocus) menuButton.focus();
  }

  function initializeNavigation() {
    if (!header || !menuButton || !menu) return;

    header.dataset.navEnhanced = 'true';
    menuButton.hidden = false;
    setMenuState(false);

    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      setMenuState(!isOpen);
    });

    menu.addEventListener('click', (event) => {
      if (event.target instanceof Element && event.target.closest('a')) {
        setMenuState(false);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        event.preventDefault();
        setMenuState(false, { restoreFocus: true });
      }
    });

    document.addEventListener('pointerdown', (event) => {
      if (
        menuButton.getAttribute('aria-expanded') === 'true' &&
        event.target instanceof Node &&
        !header.contains(event.target)
      ) {
        setMenuState(false);
      }
    });

    desktopQuery.addEventListener('change', () => setMenuState(false));
  }

  const themeButton = document.querySelector('.theme-toggle');
  const themeColor = document.querySelector('meta[name="theme-color"]');

  function setTheme(theme, { persist = false } = {}) {
    const nextTheme = theme === 'dark' ? 'dark' : 'light';
    root.dataset.theme = nextTheme;

    if (themeButton) {
      themeButton.setAttribute('aria-pressed', String(nextTheme === 'dark'));
      themeButton.setAttribute('aria-label', `Switch to ${nextTheme === 'dark' ? 'light' : 'dark'} theme`);
    }

    if (themeColor) {
      themeColor.setAttribute('content', nextTheme === 'dark' ? '#08111f' : '#f7f9fc');
    }

    if (persist) {
      try {
        localStorage.setItem('theme', nextTheme);
      } catch (error) {
        // Theme persistence is an enhancement; the visible state is already updated.
      }
    }
  }

  function initializeTheme() {
    setTheme(root.dataset.theme);
    if (!themeButton) return;

    themeButton.addEventListener('click', () => {
      setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', { persist: true });
    });
  }

  function initializeReveal() {
    const testMode = root.dataset.testMode === 'true';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (testMode || reduceMotion || !('IntersectionObserver' in window)) return;

    const revealables = [...document.querySelectorAll('.reveal')];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    for (const element of revealables) {
      const rect = element.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.92) {
        element.classList.add('reveal-pending', 'reveal-visible');
      } else {
        element.classList.add('reveal-pending');
        observer.observe(element);
      }
    }

    root.dataset.motionReady = 'true';
  }

  const copyEmailButton = document.querySelector('[data-copy-email]');
  const copyEmailStatus = document.getElementById('copy-email-status');

  function copyTextFallback(text) {
    if (typeof document.execCommand !== 'function') return false;

    const activeElement = document.activeElement;
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.readOnly = true;
    textArea.setAttribute('aria-hidden', 'true');
    Object.assign(textArea.style, {
      position: 'fixed',
      inset: '0 auto auto 0',
      opacity: '0',
      pointerEvents: 'none',
    });
    document.body.append(textArea);
    textArea.select();
    textArea.setSelectionRange(0, text.length);

    let copied = false;
    try {
      copied = document.execCommand('copy');
    } catch (error) {
      copied = false;
    } finally {
      textArea.remove();
      if (activeElement instanceof HTMLElement) activeElement.focus({ preventScroll: true });
    }
    return copied;
  }

  async function copyText(text) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      try {
        await navigator.clipboard.writeText(text);
        return;
      } catch (error) {
        // A denied Clipboard API request may still succeed through the selection fallback.
      }
    }

    if (!copyTextFallback(text)) {
      throw new Error('Clipboard access is unavailable');
    }
  }

  function initializeCopyEmail() {
    if (!(copyEmailButton instanceof HTMLButtonElement) || !copyEmailStatus) return;

    copyEmailButton.hidden = false;
    copyEmailButton.addEventListener('click', async () => {
      const email = copyEmailButton.dataset.copyEmail;
      if (!email) return;

      copyEmailStatus.textContent = 'Copying email address…';
      try {
        await copyText(email);
        copyEmailStatus.textContent = 'Email address copied to clipboard.';
      } catch (error) {
        copyEmailStatus.textContent = 'Could not copy the email address. Select and copy it manually.';
      }
    });
  }

  initializeNavigation();
  initializeTheme();
  initializeReveal();
  initializeCopyEmail();
  root.dataset.js = 'enabled';
})();
