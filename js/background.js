(() => {
  const canvas = document.getElementById('bg');
  if (!(canvas instanceof HTMLCanvasElement)) return;

  const root = document.documentElement;
  if (root.dataset.testMode === 'true') {
    canvas.hidden = true;
    return;
  }

  const context = canvas.getContext('2d');
  if (!context) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  const linkDistance = 116;
  let particles = [];
  let animationFrame = null;
  let resizeFrame = null;
  let heroVisible = true;
  let colours = readColours();

  function readColours() {
    const dark = root.dataset.theme === 'dark';
    return dark
      ? { dot: 'rgba(103, 183, 255, 0.42)', line: 'rgba(103, 183, 255, 0.14)' }
      : { dot: 'rgba(23, 92, 211, 0.30)', line: 'rgba(23, 92, 211, 0.11)' };
  }

  function resize() {
    const bounds = canvas.getBoundingClientRect();
    const width = Math.max(1, Math.round(bounds.width));
    const height = Math.max(1, Math.round(bounds.height));
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    const count = Math.min(36, Math.max(12, Math.floor((width * height) / 36000)));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      radius: 1 + Math.random() * 1.2,
    }));
    draw();
  }

  function draw() {
    const bounds = canvas.getBoundingClientRect();
    const width = bounds.width;
    const height = bounds.height;
    context.clearRect(0, 0, width, height);

    context.strokeStyle = colours.line;
    context.lineWidth = 1;
    for (let first = 0; first < particles.length; first += 1) {
      for (let second = first + 1; second < particles.length; second += 1) {
        const a = particles[first];
        const b = particles[second];
        const xDistance = a.x - b.x;
        const yDistance = a.y - b.y;
        const distanceSquared = xDistance * xDistance + yDistance * yDistance;
        if (distanceSquared < linkDistance * linkDistance) {
          context.globalAlpha = 1 - Math.sqrt(distanceSquared) / linkDistance;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }
      }
    }

    context.globalAlpha = 1;
    context.fillStyle = colours.dot;
    for (const particle of particles) {
      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();
    }
  }

  function tick() {
    const bounds = canvas.getBoundingClientRect();
    for (const particle of particles) {
      particle.x += particle.vx;
      particle.y += particle.vy;
      if (particle.x < 0 || particle.x > bounds.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > bounds.height) particle.vy *= -1;
    }
    draw();
    animationFrame = window.requestAnimationFrame(tick);
  }

  function shouldAnimate() {
    return !reducedMotion && !document.hidden && heroVisible;
  }

  function syncAnimation() {
    if (shouldAnimate() && animationFrame === null) {
      animationFrame = window.requestAnimationFrame(tick);
    } else if (!shouldAnimate() && animationFrame !== null) {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
  }

  window.addEventListener('resize', () => {
    if (resizeFrame !== null) window.cancelAnimationFrame(resizeFrame);
    resizeFrame = window.requestAnimationFrame(() => {
      resizeFrame = null;
      resize();
    });
  });

  document.addEventListener('visibilitychange', syncAnimation);

  const heroObserver = new IntersectionObserver((entries) => {
    heroVisible = entries.some((entry) => entry.isIntersecting);
    syncAnimation();
  });
  heroObserver.observe(canvas);

  const themeObserver = new MutationObserver(() => {
    colours = readColours();
    draw();
  });
  themeObserver.observe(root, { attributes: true, attributeFilter: ['data-theme'] });

  resize();
  syncAnimation();
})();
