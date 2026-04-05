"use client";
import { useEffect, useRef, useState } from "react";

const CODE_CHARS = [
  "const","=>","{}","[]","()","&&","||","??","!=","==",
  "<?php","use","fn","return","async","await","import","export",
  "true","null","new","class","void","int","str","bool",
  "</>","<div>","useState","useEffect","props","ref",
  "$this","artisan","blade","route","model","schema",
  "0","1","git","npm","php","tsx","sql","env",
];

export default function CodeRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const FONT_SIZE = 11;
    let cols = Math.floor(canvas.width / (FONT_SIZE * 5.5));
    const drops: number[] = Array(cols).fill(0).map(() => -Math.random() * 80);
    const speeds: number[] = Array(cols).fill(0).map(() => 0.18 + Math.random() * 0.22);
    const words:  string[] = Array(cols).fill("").map(() => CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]);

    let raf: number;
    let frame = 0;

    const draw = () => {
      frame++;
      ctx.fillStyle = "rgba(7, 9, 15, 0.055)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      cols = Math.floor(canvas.width / (FONT_SIZE * 5.5));

      for (let i = 0; i < cols; i++) {
        if (drops[i] === undefined) { drops[i] = -Math.random() * 80; speeds[i] = 0.18 + Math.random() * 0.22; }
        const y = drops[i] * FONT_SIZE;
        const x = i * (FONT_SIZE * 5.5);

        ctx.font = `${FONT_SIZE}px 'DM Mono', monospace`;
        ctx.fillStyle = "rgba(165,180,252,0.85)";
        ctx.fillText(words[i], x, y);

        if (drops[i] > 2) {
          ctx.fillStyle = "rgba(99,102,241,0.18)";
          ctx.fillText(CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)], x, y - FONT_SIZE * 2.5);
        }

        drops[i] += speeds[i];

        if (y > canvas.height + 40 && Math.random() > 0.97) {
          drops[i] = -Math.random() * 30;
          words[i] = CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
        }
      }
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:  "absolute",
        inset:     0,
        width:     "100%",
        height:    "100%",
        opacity:   0.45,
        pointerEvents: "none",
        zIndex:    0,
        maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0.6) 80%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0.6) 80%, transparent 100%)",
      }}
    />
  );
}