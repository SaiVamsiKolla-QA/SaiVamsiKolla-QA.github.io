/* Constellation background: drifting particles joined by short lines.
   Canvas sits behind all content; skips animation entirely for users
   who prefer reduced motion, and pauses when the tab is hidden. */
(() => {
  const canvas = document.getElementById('bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const DPR = Math.min(devicePixelRatio || 1, 2);
  const LINK_DIST = 120;
  let particles = [];
  let raf = null;

  const styles = () => {
    const s = getComputedStyle(document.documentElement);
    return {
      dot: s.getPropertyValue('--particle-dot').trim() || 'rgba(96, 165, 250, 0.55)',
      line: s.getPropertyValue('--particle-line').trim() || 'rgba(96, 165, 250, 0.16)',
    };
  };

  function resize() {
    canvas.width = innerWidth * DPR;
    canvas.height = innerHeight * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    const count = Math.min(90, Math.floor((innerWidth * innerHeight) / 22000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 1 + Math.random() * 1.6,
    }));
  }

  function frame() {
    const { dot, line } = styles();
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > innerWidth) p.vx *= -1;
      if (p.y < 0 || p.y > innerHeight) p.vy *= -1;
    }

    ctx.strokeStyle = line;
    ctx.lineWidth = 1;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < LINK_DIST * LINK_DIST) {
          ctx.globalAlpha = 1 - Math.sqrt(d2) / LINK_DIST;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 1;
    ctx.fillStyle = dot;
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function loop() {
    frame();
    raf = requestAnimationFrame(loop);
  }

  resize();
  addEventListener('resize', resize);

  if (reduceMotion) {
    frame(); // one static constellation, no animation
    return;
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
      raf = null;
    } else if (!raf) {
      loop();
    }
  });
  loop();
})();
