import React, { useEffect, useRef } from 'react';

const FallingStars = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const starsRef = useRef([]);
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    let width = 0;
    let height = 0;
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const STAR_COUNT = reduceMotion ? 0 : 80;
    const MIN_SIZE = 0.6;
    const MAX_SIZE = 1.8;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createStars = () => {
      starsRef.current = new Array(STAR_COUNT).fill(0).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE),
        vy: 20 + Math.random() * 40, // px per second
        alpha: 0.4 + Math.random() * 0.6,
      }));
    };

    let lastTime = performance.now();
    const loop = (now) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000); // clamp delta time
      lastTime = now;

      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.fillStyle = '#ffffff';

      const stars = starsRef.current;
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.y += s.vy * dt * 0.5; // gentle fall
        if (s.y - s.r > height) {
          s.y = -s.r - Math.random() * 20;
          s.x = Math.random() * width;
        }
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      animationRef.current = requestAnimationFrame(loop);
    };

    const onResize = () => {
      resize();
      createStars();
    };

    resize();
    createStars();
    if (!reduceMotion) {
      animationRef.current = requestAnimationFrame(loop);
    }
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [reduceMotion]);

  return (
    <canvas ref={canvasRef} className="stars-layer" aria-hidden="true" />
  );
};

export default React.memo(FallingStars);


