'use client';

import { useEffect, useRef } from 'react';

const COLORS = ['#62E38A', '#9AF6C0', '#E7FFF1', '#3DDC84', '#FFFFFF'];
const DURATION = 2500;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  rot: number;
  vr: number;
  gravity: number;
  color: string;
  shape: number;
};

export function Confetti() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    resize();

    const width = canvas.width;
    const height = canvas.height;
    const originX = width / 2;
    const originY = height * 0.32;
    const particles: Particle[] = [];
    for (let i = 0; i < 48; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (3.2 + Math.random() * 8.5) * dpr;
      particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.4 * dpr,
        w: (4 + Math.random() * 7) * dpr,
        h: (7 + Math.random() * 12) * dpr,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.28,
        gravity: (0.14 + Math.random() * 0.08) * dpr,
        color: COLORS[i % COLORS.length],
        shape: i % 3,
      });
    }

    const start = performance.now();
    let raf = 0;

    const frame = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      ctx.clearRect(0, 0, width, height);
      const fade = t > 0.72 ? 1 - (t - 0.72) / 0.28 : 1;
      for (const p of particles) {
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.992;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, fade);
        ctx.fillStyle = p.color;
        if (p.shape === 0) ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        else if (p.shape === 1) {
          ctx.beginPath();
          ctx.arc(0, 0, p.w * 0.45, 0, Math.PI * 2);
          ctx.fill();
        } else ctx.fillRect(-p.h / 2, -p.w * 0.18, p.h, p.w * 0.36);
        ctx.restore();
      }
      if (t < 1) raf = requestAnimationFrame(frame);
      else ctx.clearRect(0, 0, width, height);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={ref} className="promo-confetti" aria-hidden="true" />;
}
