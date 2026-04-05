"use client";
import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number; y: number;
  alpha: number; size: number;
  vx: number; vy: number;
  hue: number;
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const onResize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const particles: Particle[] = [];
    let mouse = { x: -200, y: -200 };
    let lastMouse = { x: -200, y: -200 };
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };

      const dx = mouse.x - lastMouse.x;
      const dy = mouse.y - lastMouse.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed > 3) {
        const count = Math.min(Math.floor(speed / 5), 4);
        for (let i = 0; i < count; i++) {
          particles.push({
            x: mouse.x + (Math.random() - 0.5) * 4,
            y: mouse.y + (Math.random() - 0.5) * 4,
            alpha: 0.55 + Math.random() * 0.3,
            size:  2 + Math.random() * 3,
            vx: (Math.random() - 0.5) * 1.2,
            vy: (Math.random() - 0.5) * 1.2 - 0.4,
            hue: 238 + Math.random() * 30,
          });
        }
        lastMouse = { ...mouse };
      }
    };

    document.addEventListener("mousemove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.028;
        p.size  *= 0.96;

        if (p.alpha <= 0 || p.size < 0.4) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        gradient.addColorStop(0, `hsla(${p.hue}, 90%, 72%, ${p.alpha})`);
        gradient.addColorStop(1, `hsla(${p.hue}, 90%, 60%, 0)`);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      "fixed",
        inset:         0,
        pointerEvents: "none",
        zIndex:        99990,
        mixBlendMode:  "screen",
      }}
    />
  );
}