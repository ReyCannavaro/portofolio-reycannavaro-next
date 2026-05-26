"use client";
import { useEffect, useRef, useState } from "react";

type Phase = "build" | "hold" | "exit" | "done";
const BMW_BLUE  = "#1c69d4";
const BMW_DBLUE = "#0066b1";
const BMW_RED   = "#e22718";
const BG        = "#000508";
const GRID_DIM  = "#0d1520";
const lerp   = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp  = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const ramp   = (t: number, from: number, to: number) =>
  clamp((t - from) / (to - from), 0, 1);
const ease4  = (t: number) => t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2;
export default function Loader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase]   = useState<Phase>("build");
  const [wipeY, setWipeY]   = useState(0);
  const rafRef  = useRef<number>(0);
  const startRef = useRef<number>(0);
  const frameRef = useRef<number>(0);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const W = () => canvas.width;
    const H = () => canvas.height;
    const CX = () => W() / 2;
    const CY = () => H() / 2;
    const drawGrid = (alpha: number) => {
      if (alpha <= 0) return;
      const step = 64; const minor = 16;
      ctx.lineWidth = 0.3;
      ctx.strokeStyle = `rgba(20,34,52,${alpha})`;
      for (let x = 0; x < W() + step; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H()); ctx.stroke();
      }
      for (let y = 0; y < H() + step; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W(), y); ctx.stroke();
      }
      ctx.strokeStyle = `rgba(14,24,36,${alpha * 0.6})`;
      for (let x = 0; x < W() + minor; x += minor) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H()); ctx.stroke();
      }
      for (let y = 0; y < H() + minor; y += minor) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W(), y); ctx.stroke();
      }
    };

    const drawCornerTarget = (x: number, y: number, alpha: number, pulse: number) => {
      if (alpha <= 0) return;
      const pmod = 1 + Math.sin(pulse * 0.04) * 0.03;
      [24, 16, 8].forEach((r, i) => {
        ctx.strokeStyle = `rgba(28,105,212,${alpha * (0.3 - i * 0.07)})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.arc(x, y, r * pmod, 0, Math.PI * 2); ctx.stroke();
      });
      ctx.strokeStyle = `rgba(28,105,212,${alpha * 0.6})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath(); ctx.moveTo(x - 34, y); ctx.lineTo(x + 34, y); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x, y - 34); ctx.lineTo(x, y + 34); ctx.stroke();
      const b = 14;
      ctx.strokeStyle = `rgba(28,105,212,${alpha * 0.9})`;
      ctx.lineWidth = 1.2;
      [[1,1],[-1,1],[1,-1],[-1,-1]].forEach(([sx, sy]) => {
        ctx.beginPath();
        ctx.moveTo(x + sx * 28, y + sy * 28);
        ctx.lineTo(x + sx * 28, y + sy * (28 - b));
        ctx.moveTo(x + sx * 28, y + sy * 28);
        ctx.lineTo(x + sx * (28 - b), y + sy * 28);
        ctx.stroke();
      });
      ctx.fillStyle = `rgba(28,105,212,${alpha})`;
      ctx.beginPath(); ctx.arc(x, y, 1.8, 0, Math.PI * 2); ctx.fill();
    };

    const radarPips: { angle: number; r: number; born: number }[] = [];

    const drawRadar = (alpha: number, pulse: number) => {
      if (alpha <= 0) return;
      const rx = CX() - Math.min(W() * 0.3, 260);
      const ry = CY();
      const rr = Math.min(H() * 0.18, 110);
      const angle = (pulse * 0.018) % (Math.PI * 2);

      [1, 0.66, 0.33].forEach((fr) => {
        ctx.strokeStyle = `rgba(28,105,212,${alpha * 0.18})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.arc(rx, ry, rr * fr, 0, Math.PI * 2); ctx.stroke();
      });
      ctx.strokeStyle = `rgba(28,105,212,${alpha * 0.12})`;
      ctx.lineWidth = 0.4;
      ctx.beginPath(); ctx.moveTo(rx - rr, ry); ctx.lineTo(rx + rr, ry); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(rx, ry - rr); ctx.lineTo(rx, ry + rr); ctx.stroke();

      const sweepArc = Math.PI / 2.5;
      const grad = ctx.createConicalGradient
        ? null
        : null;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(rx, ry);
      ctx.arc(rx, ry, rr, angle - sweepArc, angle);
      ctx.closePath();
      const sweepGrad = ctx.createLinearGradient(
        rx + Math.cos(angle - sweepArc) * rr, ry + Math.sin(angle - sweepArc) * rr,
        rx + Math.cos(angle) * rr,             ry + Math.sin(angle) * rr
      );
      sweepGrad.addColorStop(0, `rgba(28,105,212,0)`);
      sweepGrad.addColorStop(1, `rgba(28,105,212,${alpha * 0.25})`);
      ctx.fillStyle = sweepGrad;
      ctx.fill();
      ctx.restore();

      ctx.strokeStyle = `rgba(28,105,212,${alpha * 0.8})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(rx, ry);
      ctx.lineTo(rx + Math.cos(angle) * rr, ry + Math.sin(angle) * rr);
      ctx.stroke();

      if (pulse % 7 === 0 && radarPips.length < 12) {
        const pr = rr * (0.25 + Math.random() * 0.65);
        const pa = angle + (Math.random() - 0.5) * 0.4;
        radarPips.push({ angle: pa, r: pr, born: pulse });
      }
      for (let i = radarPips.length - 1; i >= 0; i--) {
        const pip = radarPips[i];
        const age = pulse - pip.born;
        const maxAge = 180;
        if (age > maxAge) { radarPips.splice(i, 1); continue; }
        const fa = (1 - age / maxAge) * alpha * 0.9;
        const px = rx + Math.cos(pip.angle) * pip.r;
        const py = ry + Math.sin(pip.angle) * pip.r;
        ctx.fillStyle = `rgba(28,212,105,${fa})`;
        ctx.beginPath(); ctx.arc(px, py, 2, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = `rgba(28,212,105,${fa * 0.5})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2); ctx.stroke();
      }

      ctx.font = `500 8px 'JetBrains Mono', monospace`;
      ctx.fillStyle = `rgba(28,105,212,${alpha * 0.5})`;
      ctx.textAlign = "center";
      ctx.fillText("RADAR · ACT", rx, ry + rr + 14);
      ctx.fillText(`HDG ${String(Math.floor((angle / (Math.PI * 2)) * 360)).padStart(3, "0")}°`, rx, ry + rr + 25);
      ctx.textAlign = "left";
    };

    const drawOscilloscope = (alpha: number, pulse: number) => {
      if (alpha <= 0) return;
      const ox = CX() + Math.min(W() * 0.3, 260);
      const oy = CY();
      const ow = Math.min(W() * 0.17, 120);
      const oh = Math.min(H() * 0.12, 80);

      ctx.strokeStyle = `rgba(28,105,212,${alpha * 0.2})`;
      ctx.lineWidth = 0.5;
      ctx.strokeRect(ox - ow / 2, oy - oh / 2, ow, oh);

      for (let i = 1; i < 4; i++) {
        const ly = oy - oh / 2 + (oh / 4) * i;
        ctx.beginPath(); ctx.moveTo(ox - ow / 2, ly); ctx.lineTo(ox + ow / 2, ly); ctx.stroke();
      }
      for (let i = 1; i < 4; i++) {
        const lx = ox - ow / 2 + (ow / 4) * i;
        ctx.beginPath(); ctx.moveTo(lx, oy - oh / 2); ctx.lineTo(lx, oy + oh / 2); ctx.stroke();
      }

      ctx.strokeStyle = `rgba(28,212,105,${alpha * 0.9})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      const pts = 80;
      for (let i = 0; i <= pts; i++) {
        const fx = i / pts;
        const px = ox - ow / 2 + fx * ow;
        const py = oy +
          Math.sin((fx * 6 + pulse * 0.05) * Math.PI) * oh * 0.22 +
          Math.sin((fx * 14 + pulse * 0.03) * Math.PI) * oh * 0.08 +
          Math.sin((fx * 2.5 + pulse * 0.08) * Math.PI) * oh * 0.12;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.stroke();

      const cx2 = ox - ow / 2 + ((pulse * 0.8) % ow);
      ctx.strokeStyle = `rgba(255,200,0,${alpha * 0.4})`;
      ctx.lineWidth = 0.5;
      ctx.setLineDash([2, 3]);
      ctx.beginPath(); ctx.moveTo(cx2, oy - oh / 2); ctx.lineTo(cx2, oy + oh / 2); ctx.stroke();
      ctx.setLineDash([]);

      ctx.font = `500 8px 'JetBrains Mono', monospace`;
      ctx.fillStyle = `rgba(28,105,212,${alpha * 0.5})`;
      ctx.textAlign = "center";
      ctx.fillText("OSC · CH1", ox, oy + oh / 2 + 14);
      ctx.fillText("5V / DIV", ox, oy + oh / 2 + 24);
      ctx.textAlign = "left";
    };

    const drawCircuitTraces = (alpha: number, pulse: number) => {
      if (alpha <= 0) return;
      const traces = [
        { points: [[0, H() * 0.15], [W() * 0.12, H() * 0.15], [W() * 0.12, H() * 0.32], [W() * 0.22, H() * 0.32]], d: 0 },
        { points: [[W(), H() * 0.7], [W() * 0.88, H() * 0.7], [W() * 0.88, H() * 0.55], [W() * 0.72, H() * 0.55]], d: 0.1 },
        { points: [[0, H() * 0.62], [W() * 0.08, H() * 0.62], [W() * 0.08, H() * 0.78], [W() * 0.2, H() * 0.78]], d: 0.05 },
        { points: [[W(), H() * 0.28], [W() * 0.9, H() * 0.28], [W() * 0.9, H() * 0.18], [W() * 0.76, H() * 0.18]], d: 0.15 },
      ];

      traces.forEach((trace) => {
        const p = ramp(alpha, 0, 1) * ramp(pulse / 60, trace.d, trace.d + 0.5);
        const pts = trace.points as [number, number][];
        const totalLen = pts.slice(1).reduce((acc, pt, i) => {
          const dx = pt[0] - pts[i][0], dy = pt[1] - pts[i][1];
          return acc + Math.sqrt(dx * dx + dy * dy);
        }, 0);
        let drawn = 0;
        const target = totalLen * Math.min(p * 2, 1);

        ctx.strokeStyle = `rgba(0,66,120,${alpha * 0.7})`;
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);

        for (let i = 1; i < pts.length; i++) {
          const dx = pts[i][0] - pts[i-1][0];
          const dy = pts[i][1] - pts[i-1][1];
          const segLen = Math.sqrt(dx * dx + dy * dy);
          if (drawn + segLen <= target) {
            ctx.lineTo(pts[i][0], pts[i][1]);
            drawn += segLen;
          } else {
            const t2 = (target - drawn) / segLen;
            ctx.lineTo(pts[i-1][0] + dx * t2, pts[i-1][1] + dy * t2);
            break;
          }
        }
        ctx.stroke();

        const travelPhase = ((pulse * 0.015) % 1);
        let tDist = 0;
        for (let i = 1; i < pts.length && tDist < totalLen * travelPhase; i++) {
          const dx = pts[i][0] - pts[i-1][0];
          const dy = pts[i][1] - pts[i-1][1];
          const segLen = Math.sqrt(dx * dx + dy * dy);
          const remaining = totalLen * travelPhase - tDist;
          if (remaining <= segLen) {
            const tx = pts[i-1][0] + dx * (remaining / segLen);
            const ty = pts[i-1][1] + dy * (remaining / segLen);
            ctx.fillStyle = `rgba(0,200,255,${alpha * 0.8})`;
            ctx.beginPath(); ctx.arc(tx, ty, 2.5, 0, Math.PI * 2); ctx.fill();
            break;
          }
          tDist += segLen;
        }

        pts.slice(1, -1).forEach(([cx3, cy3]) => {
          ctx.fillStyle = `rgba(10,40,80,${alpha * 0.9})`;
          ctx.fillRect(cx3 - 4, cy3 - 2.5, 8, 5);
          ctx.strokeStyle = `rgba(0,150,220,${alpha * 0.5})`;
          ctx.lineWidth = 0.5;
          ctx.strokeRect(cx3 - 4, cy3 - 2.5, 8, 5);
        });
      });
      ctx.lineCap = "butt";
    };

    const hexPath = (cx: number, cy: number, r: number, rot = 0) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i + rot;
        const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
    };

    const drawHexCluster = (progress: number, pulse: number) => {
      if (progress <= 0) return;
      const cx = CX(), cy = CY();
      const outerR = 80;

      ctx.strokeStyle = `rgba(28,105,212,${progress * 0.12})`;
      ctx.lineWidth = 0.5;
      ctx.setLineDash([3, 6]);
      ctx.beginPath(); ctx.arc(cx, cy, outerR + 20, 0, Math.PI * 2); ctx.stroke();
      ctx.setLineDash([]);

      for (let i = 0; i < 6; i++) {
        const delay = i * (1 / 6);
        const p = clamp((progress - delay * 0.3) / 0.45, 0, 1);
        if (p <= 0) continue;
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const hx = cx + outerR * Math.cos(angle);
        const hy = cy + outerR * Math.sin(angle);

        ctx.strokeStyle = `rgba(28,105,212,${p * 0.3})`;
        ctx.lineWidth = 0.5;
        ctx.setLineDash([3, 5]);
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(hx, hy); ctx.stroke();
        ctx.setLineDash([]);

        hexPath(hx, hy, 20 * p, Math.PI / 6);
        ctx.strokeStyle = `rgba(28,105,212,${p * 0.55})`;
        ctx.lineWidth = 0.7; ctx.stroke();
        hexPath(hx, hy, 20 * p, Math.PI / 6);
        ctx.fillStyle = `rgba(8,22,48,${p * 0.5})`; ctx.fill();

        hexPath(hx, hy, 10 * p, Math.PI / 6 + pulse * 0.008);
        ctx.strokeStyle = `rgba(28,105,212,${p * 0.35})`;
        ctx.lineWidth = 0.4; ctx.stroke();

        ctx.fillStyle = `rgba(28,105,212,${p * 0.9})`;
        ctx.beginPath(); ctx.arc(hx, hy, 1.5, 0, Math.PI * 2); ctx.fill();

        ctx.font = `500 7px 'JetBrains Mono', monospace`;
        ctx.fillStyle = `rgba(28,105,212,${p * 0.45})`;
        ctx.textAlign = "center";
        const labels = ["SYS", "NET", "GPU", "MEM", "I/O", "PWR"];
        ctx.fillText(labels[i], hx, hy + 32 * p);
        ctx.fillText(`${String(Math.floor((Math.sin(pulse * 0.02 + i) * 0.5 + 0.5) * 99) + 1).padStart(2, "0")}%`, hx, hy + 41 * p);
        ctx.textAlign = "left";
      }

      const midP = clamp((progress - 0.15) / 0.5, 0, 1);
      hexPath(cx, cy, 48 * midP, Math.PI / 6);
      ctx.strokeStyle = `rgba(28,105,212,${midP * 0.65})`;
      ctx.lineWidth = 0.9; ctx.stroke();
      hexPath(cx, cy, 48 * midP, Math.PI / 6);
      ctx.fillStyle = `rgba(4,14,32,${midP * 0.55})`; ctx.fill();

      hexPath(cx, cy, 36 * midP, -Math.PI / 6 - pulse * 0.006);
      ctx.strokeStyle = `rgba(28,105,212,${midP * 0.3})`;
      ctx.lineWidth = 0.4; ctx.stroke();

      const coreP = clamp((progress - 0.35) / 0.45, 0, 1);
      if (coreP > 0) {
        const pm = 1 + Math.sin(pulse * 0.06) * 0.04;
        hexPath(cx, cy, 24 * coreP * pm, Math.PI / 6);
        const g = ctx.createLinearGradient(cx - 24, cy, cx + 24, cy);
        g.addColorStop(0, `rgba(0,102,177,${coreP * 0.95})`);
        g.addColorStop(0.4, `rgba(28,105,212,${coreP * 0.95})`);
        g.addColorStop(1, `rgba(226,39,24,${coreP * 0.95})`);
        ctx.fillStyle = g; ctx.fill();
        hexPath(cx, cy, 24 * coreP * pm, Math.PI / 6);
        ctx.strokeStyle = `rgba(255,255,255,${coreP * 0.4})`;
        ctx.lineWidth = 0.8; ctx.stroke();

        hexPath(cx, cy, 14 * coreP, pulse * 0.01);
        ctx.strokeStyle = `rgba(255,255,255,${coreP * 0.25})`;
        ctx.lineWidth = 0.5; ctx.stroke();

        ctx.fillStyle = `rgba(255,255,255,${coreP * 0.9})`;
        ctx.beginPath(); ctx.arc(cx, cy, 2, 0, Math.PI * 2); ctx.fill();
      }
    };

    const drawScan = (progress: number, alpha: number) => {
      if (alpha <= 0 || progress <= 0 || progress >= 1) return;
      const y = progress * H();
      const g = ctx.createLinearGradient(0, y - 90, 0, y + 4);
      g.addColorStop(0, `rgba(0,102,177,0)`);
      g.addColorStop(1, `rgba(0,102,177,${alpha * 0.10})`);
      ctx.fillStyle = g;
      ctx.fillRect(0, y - 90, W(), 94);
      ctx.strokeStyle = `rgba(0,102,177,${alpha * 0.45})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W(), y); ctx.stroke();
    };

    const drawStructural = (progress: number) => {
      const lines = [
        { x1: 0,   y1: H()*0.08, x2: W()*0.22, y2: 0,         d: 0    },
        { x1: W(), y1: H()*0.82, x2: W()*0.78, y2: H(),        d: 0.08 },
        { x1: 0,   y1: H()*0.62, x2: W()*0.16, y2: H(),        d: 0.15 },
        { x1: W(), y1: H()*0.16, x2: W()*0.84, y2: 0,          d: 0.05 },
        { x1: 0,   y1: H()*0.38, x2: W()*0.06, y2: H()*0.18,  d: 0.22 },
        { x1: W(), y1: H()*0.5,  x2: W()*0.92, y2: H()*0.28,  d: 0.18 },
      ];
      lines.forEach((l) => {
        const p = ramp(progress, l.d, l.d + 0.4);
        if (p <= 0) return;
        ctx.strokeStyle = `rgba(18,26,40,${p * 0.9})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(l.x1, l.y1);
        ctx.lineTo(l.x1 + (l.x2 - l.x1) * p, l.y1 + (l.y2 - l.y1) * p);
        ctx.stroke();
      });
    };

    const drawDimLine = (x1: number, y1: number, x2: number, y2: number, alpha: number, progress: number) => {
      if (alpha <= 0 || progress <= 0) return;
      const dx = x2 - x1, dy = y2 - y1;
      const ex = x1 + dx * progress, ey = y1 + dy * progress;
      ctx.strokeStyle = `rgba(28,105,212,${alpha * 0.55})`;
      ctx.lineWidth = 0.6;
      ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(ex, ey); ctx.stroke();
      ctx.setLineDash([]);
      const len = Math.sqrt(dx * dx + dy * dy);
      const nx = -dy / len * 6, ny = dx / len * 6;
      ctx.strokeStyle = `rgba(28,105,212,${alpha * 0.8})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.moveTo(x1 + nx, y1 + ny); ctx.lineTo(x1 - nx, y1 - ny); ctx.stroke();
      if (progress >= 1) {
        ctx.beginPath(); ctx.moveTo(ex + nx, ey + ny); ctx.lineTo(ex - nx, ey - ny); ctx.stroke();
      }
    };

    const telHistory: number[][] = Array.from({ length: 4 }, () => Array(50).fill(0));

    const drawTelemetry = (alpha: number, pulse: number) => {
      if (alpha <= 0) return;
      const px = 40, py = H() - 200;
      const panW = Math.min(W() * 0.18, 140), panH = 160;

      ctx.strokeStyle = `rgba(28,105,212,${alpha * 0.2})`;
      ctx.lineWidth = 0.5;
      ctx.strokeRect(px, py, panW, panH);

      if (pulse % 2 === 0) {
        const vals = [
          50 + Math.sin(pulse * 0.03) * 40,
          30 + Math.sin(pulse * 0.05 + 1) * 25,
          70 + Math.cos(pulse * 0.04 + 2) * 20,
          20 + Math.sin(pulse * 0.07 + 3) * 15,
        ];
        vals.forEach((v, i) => {
          telHistory[i].push(v);
          if (telHistory[i].length > 50) telHistory[i].shift();
        });
      }

      const colors = ["rgba(28,105,212", "rgba(28,212,105", "rgba(212,105,28", "rgba(212,28,105"];
      const labels2 = ["CPU", "MEM", "NET", "I/O"];

      telHistory.forEach((hist, i) => {
        const rowY = py + 12 + i * 38;
        ctx.font = `500 8px 'JetBrains Mono', monospace`;
        ctx.fillStyle = `${colors[i]},${alpha * 0.7})`;
        ctx.fillText(`${labels2[i]}`, px + 6, rowY + 4);

        const val = hist[hist.length - 1] ?? 0;
        ctx.fillStyle = `${colors[i]},${alpha * 0.9})`;
        ctx.textAlign = "right";
        ctx.fillText(`${Math.round(val)}%`, px + panW - 6, rowY + 4);
        ctx.textAlign = "left";

        if (hist.length < 2) return;
        ctx.strokeStyle = `${colors[i]},${alpha * 0.7})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        hist.forEach((v, j) => {
          const sx = px + 6 + (j / 49) * (panW - 12);
          const sy = rowY + 28 - (v / 100) * 20;
          j === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
        });
        ctx.stroke();
      });

      ctx.font = `500 8px 'JetBrains Mono', monospace`;
      ctx.fillStyle = `rgba(28,105,212,${alpha * 0.4})`;
      ctx.fillText("TELEMETRY", px + 4, py - 6);
    };

    const streamLines: { text: string; y: number; speed: number; alpha: number }[] = [];
    const streamChars = "0123456789ABCDEF:. <>[]{}|=-_/\\^~";
    const genStreamLine = (yStart: number) => ({
      text: Array.from({ length: 18 }, () => streamChars[Math.floor(Math.random() * streamChars.length)]).join(""),
      y: yStart,
      speed: 0.4 + Math.random() * 0.6,
      alpha: 0.15 + Math.random() * 0.35,
    });

    if (streamLines.length === 0) {
      for (let i = 0; i < 20; i++) streamLines.push(genStreamLine(Math.random() * H()));
    }

    const drawDataStream = (alpha: number, pulse: number) => {
      if (alpha <= 0) return;
      const sx = W() - Math.min(W() * 0.14, 110);

      if (pulse % 3 === 0) {
        streamLines.forEach((sl) => {
          sl.y += sl.speed * 1.5;
          if (sl.y > H() + 20) {
            sl.y = -10;
            sl.text = Array.from({ length: 18 }, () => streamChars[Math.floor(Math.random() * streamChars.length)]).join("");
          }
          if (pulse % 12 === 0) {
            const ci = Math.floor(Math.random() * sl.text.length);
            sl.text = sl.text.substring(0, ci) + streamChars[Math.floor(Math.random() * streamChars.length)] + sl.text.substring(ci + 1);
          }
        });
      }

      ctx.font = `400 9px 'JetBrains Mono', monospace`;
      streamLines.forEach((sl) => {
        ctx.fillStyle = `rgba(28,105,212,${sl.alpha * alpha})`;
        ctx.fillText(sl.text, sx, sl.y);
        if (pulse % 8 === 0) {
          const hi = Math.floor(Math.random() * sl.text.length);
          ctx.fillStyle = `rgba(0,200,255,${alpha * 0.9})`;
          ctx.fillText(sl.text[hi], sx + hi * 7.2, sl.y);
        }
      });

      ctx.font = `500 8px 'JetBrains Mono', monospace`;
      ctx.fillStyle = `rgba(28,105,212,${alpha * 0.4})`;
      ctx.fillText("DATA STREAM", sx, H() - 20);
    };

    const drawAnnotations = (alpha: number) => {
      if (alpha <= 0) return;
      ctx.font = `500 9px 'JetBrains Mono', monospace`;
      ctx.fillStyle = `rgba(28,105,212,${alpha * 0.5})`;
      const cx = CX(), cy = CY();
      [
        { text: "NODE_01",  x: cx + 88,  y: cy - 72 },
        { text: "NODE_02",  x: cx - 100, y: cy - 28 },
        { text: "NODE_03",  x: cx + 88,  y: cy + 52 },
        { text: "SYS_HEX",  x: cx + 54,  y: cy + 8  },
        { text: "CORE",     x: cx - 22,  y: cy + 82 },
        { text: "ORBIT_A",  x: cx - 110, y: cy + 58 },
      ].forEach(({ text, x, y }) => ctx.fillText(text, x, y));
      ctx.fillStyle = `rgba(28,105,212,${alpha * 0.4})`;
      ctx.fillText("∅ 96.0",  cx + 56, cy - 96);
      ctx.fillText("∅ 48.0",  cx - 84, cy - 12);
      ctx.fillText("R 20.0",  cx + 94, cy + 74);
    };

    const drawStripe = (progress: number) => {
      if (progress <= 0) return;
      const cx = CX(), cy = CY();
      const totalW = Math.min(W() * 0.55, 500);
      const w = totalW * Math.min(progress, 1);
      const seg = w / 3;
      const y = cy + 130;
      ctx.fillStyle = BMW_DBLUE; ctx.fillRect(cx - w / 2,           y, seg,     2);
      ctx.fillStyle = BMW_BLUE;  ctx.fillRect(cx - w / 2 + seg,     y, seg,     2);
      ctx.fillStyle = BMW_RED;   ctx.fillRect(cx - w / 2 + seg * 2, y, seg,     2);
    };

    const drawCompassRose = (alpha: number, pulse: number) => {
      if (alpha <= 0) return;
      const crx = W() - 70, cry = 70;
      const crr = 38;
      const rot = pulse * 0.003;

      ctx.strokeStyle = `rgba(28,105,212,${alpha * 0.2})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath(); ctx.arc(crx, cry, crr, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = `rgba(28,105,212,${alpha * 0.1})`;
      ctx.beginPath(); ctx.arc(crx, cry, crr * 0.6, 0, Math.PI * 2); ctx.stroke();

      ctx.strokeStyle = `rgba(28,105,212,${alpha * 0.35})`;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 36; i++) {
        const a = (i / 36) * Math.PI * 2 + rot;
        const inner = i % 9 === 0 ? crr * 0.72 : i % 3 === 0 ? crr * 0.8 : crr * 0.86;
        ctx.beginPath();
        ctx.moveTo(crx + Math.cos(a) * inner, cry + Math.sin(a) * inner);
        ctx.lineTo(crx + Math.cos(a) * crr,   cry + Math.sin(a) * crr);
        ctx.stroke();
      }

      const dirs = [
        { label: "N", a: -Math.PI / 2, col: `rgba(226,39,24,${alpha * 0.9})` },
        { label: "S", a:  Math.PI / 2, col: `rgba(28,105,212,${alpha * 0.6})` },
        { label: "E", a:  0,           col: `rgba(28,105,212,${alpha * 0.6})` },
        { label: "W", a:  Math.PI,     col: `rgba(28,105,212,${alpha * 0.6})` },
      ];
      dirs.forEach(({ label, a, col }) => {
        const ex2 = crx + Math.cos(a + rot) * crr * 0.55;
        const ey2 = cry + Math.sin(a + rot) * crr * 0.55;
        ctx.strokeStyle = col;
        ctx.lineWidth = label === "N" ? 1.5 : 0.8;
        ctx.beginPath(); ctx.moveTo(crx, cry); ctx.lineTo(ex2, ey2); ctx.stroke();
        ctx.font = `500 7px 'JetBrains Mono', monospace`;
        ctx.fillStyle = col;
        ctx.textAlign = "center";
        ctx.fillText(label, crx + Math.cos(a + rot) * (crr * 0.55 + 10), cry + Math.sin(a + rot) * (crr * 0.55 + 10) + 3);
      });
      ctx.textAlign = "left";

      ctx.fillStyle = `rgba(255,255,255,${alpha * 0.7})`;
      ctx.beginPath(); ctx.arc(crx, cry, 2, 0, Math.PI * 2); ctx.fill();
    };

    const drawSignalBars = (alpha: number, pulse: number) => {
      if (alpha <= 0) return;
      const bx = W() - Math.min(W() * 0.18, 150);
      const by = H() - 120;
      const barW = 6, gap = 4, count = 12;

      ctx.font = `500 8px 'JetBrains Mono', monospace`;
      ctx.fillStyle = `rgba(28,105,212,${alpha * 0.4})`;
      ctx.fillText("SIG LEVEL", bx, by - 8);

      for (let i = 0; i < count; i++) {
        const t2 = pulse * 0.04 + i * 0.4;
        const h2 = 20 + Math.sin(t2) * 15 + Math.sin(t2 * 2.3) * 8;
        const col = h2 > 30 ? `rgba(28,212,105,${alpha * 0.85})` :
                    h2 > 20 ? `rgba(255,180,0,${alpha * 0.85})`  :
                               `rgba(226,39,24,${alpha * 0.85})`;
        ctx.fillStyle = col;
        ctx.fillRect(bx + i * (barW + gap), by + 50 - h2, barW, h2);

        ctx.fillStyle = `rgba(255,255,255,${alpha * 0.4})`;
        ctx.fillRect(bx + i * (barW + gap), by + 50 - h2 - 2, barW, 1);
      }
    };

    const drawLoadBar = (progress: number) => {
      const barW = Math.min(W() * 0.55, 500);
      const cx = CX(), y = H() - 52;
      ctx.strokeStyle = "rgba(28,36,48,0.8)";
      ctx.lineWidth = 0.5;
      ctx.strokeRect(cx - barW / 2, y, barW, 1);
      const filled = barW * Math.min(progress, 1);
      const seg = filled / 3;
      if (filled > 0) {
        ctx.fillStyle = BMW_DBLUE;
        ctx.fillRect(cx - barW / 2, y, Math.min(seg, filled), 1);
        if (filled > seg) {
          ctx.fillStyle = BMW_BLUE;
          ctx.fillRect(cx - barW / 2 + seg, y, Math.min(seg, filled - seg), 1);
        }
        if (filled > seg * 2) {
          ctx.fillStyle = BMW_RED;
          ctx.fillRect(cx - barW / 2 + seg * 2, y, filled - seg * 2, 1);
        }
      }
    };

    const drawCounter = (value: number, alpha: number, pulse: number) => {
      if (alpha <= 0) return;
      const cx = CX(), cy = CY();
      ctx.font = `700 11px 'JetBrains Mono', monospace`;
      ctx.fillStyle = `rgba(28,105,212,${alpha * 0.7})`;
      ctx.textAlign = "center";
      ctx.fillText(`${String(Math.floor(value)).padStart(3, "0")} / 100`, cx, cy + 158);

      const statuses = ["INITIALIZING SYSTEMS", "LOADING MODULES", "CALIBRATING SENSORS", "ESTABLISHING LINK", "READY"];
      const si = Math.floor((value / 100) * (statuses.length - 1));
      const blink = Math.sin(pulse * 0.15) > 0;
      if (blink || value >= 99) {
        ctx.font = `500 8px 'JetBrains Mono', monospace`;
        ctx.fillStyle = `rgba(28,105,212,${alpha * 0.5})`;
        ctx.fillText(statuses[Math.min(si, statuses.length - 1)], cx, cy + 172);
      }
      ctx.textAlign = "left";
    };

    const drawCoordinateReadout = (alpha: number, pulse: number) => {
      if (alpha <= 0) return;
      const px = 40, py = 40;
      ctx.font = `500 8px 'JetBrains Mono', monospace`;
      ctx.fillStyle = `rgba(28,105,212,${alpha * 0.35})`;
      ctx.fillText("COORDINATE", px, py);
      ctx.fillStyle = `rgba(28,105,212,${alpha * 0.6})`;
      const lat = 48.1374 + Math.sin(pulse * 0.002) * 0.0001;
      const lon = 11.5755 + Math.cos(pulse * 0.003) * 0.0001;
      ctx.fillText(`LAT  ${lat.toFixed(4)}° N`, px, py + 14);
      ctx.fillText(`LON  ${Math.abs(lon).toFixed(4)}° E`, px, py + 26);
      ctx.fillText(`ALT  ${(523 + Math.sin(pulse * 0.01) * 2).toFixed(1)} m`, px, py + 38);
      ctx.fillText(`HDG  ${String(Math.floor(((pulse * 0.5) % 360))).padStart(3,"0")}°`, px, py + 50);

      ctx.strokeStyle = `rgba(28,105,212,${alpha * 0.2})`;
      ctx.lineWidth = 0.4;
      ctx.beginPath(); ctx.moveTo(px, py + 58); ctx.lineTo(px + 130, py + 58); ctx.stroke();

      ctx.fillStyle = `rgba(28,105,212,${alpha * 0.35})`;
      ctx.fillText("TIMESTAMP", px, py + 70);
      const d = new Date();
      ctx.fillStyle = `rgba(28,105,212,${alpha * 0.6})`;
      ctx.fillText(`${d.getUTCFullYear()}-${String(d.getUTCMonth()+1).padStart(2,"0")}-${String(d.getUTCDate()).padStart(2,"0")}`, px, py + 82);
      ctx.fillText(`${String(d.getUTCHours()).padStart(2,"0")}:${String(d.getUTCMinutes()).padStart(2,"0")}:${String(d.getUTCSeconds()).padStart(2,"0")}.${String(Math.floor((pulse * 16.7) % 1000)).padStart(3,"0")}`, px, py + 94);
    };

    const drawSpectrum = (alpha: number, pulse: number) => {
      if (alpha <= 0) return;
      const sx = CX() - 110, sy = 30, sw = 220, sh = 40;
      const bands = 22;
      for (let i = 0; i < bands; i++) {
        const freq = i / bands;
        const amp = (
          0.4 * Math.sin(freq * 8 + pulse * 0.04) +
          0.3 * Math.sin(freq * 20 + pulse * 0.06 + 1) +
          0.2 * Math.abs(Math.sin(freq * 4 + pulse * 0.02)) +
          0.1
        );
        const h2 = clamp(amp, 0.05, 1) * sh;
        const bx = sx + (i / bands) * sw;
        const bw = (sw / bands) * 0.7;

        const col = i < bands * 0.5
          ? `rgba(28,105,212,${alpha * 0.7})`
          : i < bands * 0.8
          ? `rgba(28,212,105,${alpha * 0.7})`
          : `rgba(226,39,24,${alpha * 0.7})`;
        ctx.fillStyle = col;
        ctx.fillRect(bx, sy + sh - h2, bw, h2);
      }
      ctx.strokeStyle = `rgba(28,105,212,${alpha * 0.15})`;
      ctx.lineWidth = 0.4;
      ctx.strokeRect(sx, sy, sw, sh);

      ctx.font = `500 8px 'JetBrains Mono', monospace`;
      ctx.fillStyle = `rgba(28,105,212,${alpha * 0.35})`;
      ctx.textAlign = "center";
      ctx.fillText("SPECTRUM ANALYSER", CX(), sy + sh + 12);
      ctx.textAlign = "left";
    };

    const drawPolarPlot = (alpha: number, pulse: number) => {
      if (alpha <= 0) return;
      const ppx = 80 + Math.min(W() * 0.12, 100);
      const ppy = H() - 100;
      const ppr = 48;

      ctx.strokeStyle = `rgba(28,105,212,${alpha * 0.12})`;
      ctx.lineWidth = 0.4;
      [1, 0.66, 0.33].forEach(f => {
        ctx.beginPath(); ctx.arc(ppx, ppy, ppr * f, 0, Math.PI * 2); ctx.stroke();
      });
      for (let i = 0; i < 4; i++) {
        const a = i * Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(ppx, ppy);
        ctx.lineTo(ppx + Math.cos(a) * ppr, ppy + Math.sin(a) * ppr);
        ctx.stroke();
      }

      ctx.strokeStyle = `rgba(28,212,105,${alpha * 0.6})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      for (let i = 0; i < 60; i++) {
        const t2 = i / 60;
        const a = t2 * Math.PI * 6 + pulse * 0.02;
        const r = ppr * (0.3 + 0.6 * Math.sin(t2 * Math.PI));
        const x = ppx + Math.cos(a) * r;
        const y = ppy + Math.sin(a) * r;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      const ca = pulse * 0.04;
      const cr = ppr * (0.5 + 0.4 * Math.sin(pulse * 0.02));
      ctx.fillStyle = `rgba(226,39,24,${alpha * 0.9})`;
      ctx.beginPath();
      ctx.arc(ppx + Math.cos(ca) * cr, ppy + Math.sin(ca) * cr, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = `500 8px 'JetBrains Mono', monospace`;
      ctx.fillStyle = `rgba(28,105,212,${alpha * 0.35})`;
      ctx.textAlign = "center";
      ctx.fillText("PHASE PLOT", ppx, ppy + ppr + 12);
      ctx.textAlign = "left";
    };

    const BUILD = 3000;
    let pulse = 0;

    const render = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const raw = Math.min(elapsed / BUILD, 1);
      const t = ease4(raw);
      pulse++;
      frameRef.current = pulse;

      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W(), H());

      drawGrid(Math.min(t * 4, 0.85));
      drawStructural(t);
      drawScan(Math.min(raw / 0.5, 1), Math.max(0, 1 - raw / 0.55));

      const earlyA = Math.min(t * 6, 1);
      drawCoordinateReadout(earlyA, pulse);
      drawSpectrum(earlyA * ramp(t, 0.1, 0.5), pulse);
      drawCircuitTraces(earlyA, pulse);
      drawCompassRose(earlyA, pulse);

      const ctA = Math.min(t * 5, 0.9);
      const ctMargin = 50;
      drawCornerTarget(ctMargin,          ctMargin,          ctA, pulse);
      drawCornerTarget(W() - ctMargin,    ctMargin,          ctA, pulse + 30);
      drawCornerTarget(ctMargin,          H() - ctMargin,    ctA, pulse + 60);
      drawCornerTarget(W() - ctMargin,    H() - ctMargin,    ctA, pulse + 90);

      const dimA = Math.min(Math.max(t - 0.2, 0) * 4, 0.9);
      const dimP = ramp(t, 0.2, 0.8);
      const cx2 = CX(), cy2 = CY();
      const dOff = 240;
      drawDimLine(cx2 - dOff, cy2 - 140, cx2 + dOff, cy2 - 140, dimA, dimP);
      drawDimLine(cx2 - dOff, cy2 + 140, cx2 + dOff, cy2 + 140, dimA, dimP);
      drawDimLine(cx2 - dOff, cy2 - 140, cx2 - dOff, cy2 + 140, dimA, dimP * 0.8);
      drawDimLine(cx2 + dOff, cy2 - 140, cx2 + dOff, cy2 + 140, dimA, dimP * 0.8);

      const midA = ramp(t, 0.2, 0.7);
      drawRadar(midA, pulse);
      drawOscilloscope(midA, pulse);
      drawTelemetry(midA, pulse);
      drawDataStream(midA, pulse);
      drawSignalBars(midA, pulse);
      drawPolarPlot(midA, pulse);

      const hexP = ramp(t, 0.05, 0.8);
      drawHexCluster(hexP, pulse);
      drawAnnotations(Math.min(ramp(t, 0.5, 0.9) * 2, 1));

      const stripeP = ramp(t, 0.72, 1);
      drawStripe(1 - (1 - stripeP) ** 4);
      drawLoadBar(t);
      drawCounter(t * 100, Math.min(t * 5, 1), pulse);

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("hold"), 3800),
      setTimeout(() => setPhase("exit"), 4400),
      setTimeout(() => setPhase("done"), 5300),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (phase !== "exit") return;
    let start: number | null = null;
    const dur = 800;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setWipeY(1 - (1 - p) ** 3);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        overflow: "hidden", background: BG,
        pointerEvents: phase === "exit" ? "none" : "all",
      }}
    >
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, display: "block" }} />

      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3, zIndex: 6,
        background: `linear-gradient(to right, ${BMW_DBLUE} 33.3%, ${BMW_BLUE} 33.3% 66.6%, ${BMW_RED} 66.6%)`,
        opacity: phase === "exit" ? 0 : 1, transition: "opacity 0.3s",
      }} />

      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 2, zIndex: 6,
        background: `linear-gradient(to right, ${BMW_RED} 33.3%, ${BMW_BLUE} 33.3% 66.6%, ${BMW_DBLUE} 66.6%)`,
        opacity: phase === "exit" ? 0 : 1, transition: "opacity 0.3s",
      }} />

      {([
        { pos: { top: 24, left: 36 },    text: "PROJECT · RC-2026"  },
        { pos: { top: 24, right: 36 },   text: "REV · A / SHT · 01" },
        { pos: { bottom: 28, left: 36 }, text: "SCALE · 1:1"        },
        { pos: { bottom: 28, right: 36 },text: "DO NOT SCALE"       },
      ] as const).map(({ pos, text }) => (
        <div key={text} style={{
          position: "absolute", ...pos, zIndex: 6,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9, fontWeight: 400, letterSpacing: "2px",
          textTransform: "uppercase", color: "rgba(28,105,212,0.35)",
          opacity: phase === "exit" ? 0 : 1, transition: "opacity 0.2s",
        }}>{text}</div>
      ))}

      <div style={{
        position: "absolute", top: "50%", right: 16, transform: "translateY(-50%)",
        zIndex: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 8,
        color: "rgba(28,105,212,0.25)", letterSpacing: "1px", writingMode: "vertical-rl",
        opacity: phase === "exit" ? 0 : 1, transition: "opacity 0.2s",
      }}>ENGINEERING DESIGN SYSTEM · EDS-2026</div>

      <div style={{
        position: "absolute", top: "50%", left: 16, transform: "translateY(-50%) rotate(180deg)",
        zIndex: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 8,
        color: "rgba(28,105,212,0.25)", letterSpacing: "1px", writingMode: "vertical-rl",
        opacity: phase === "exit" ? 0 : 1, transition: "opacity 0.2s",
      }}>CONFIDENTIAL · PROPRIETARY</div>

      {phase === "exit" && [0, 1, 2].map((i) => {
        const delay = i * 0.08;
        const p = clamp((wipeY - delay) / (1 - delay * 2.1), 0, 1);
        const eased = 1 - (1 - p) ** 3;
        return (
          <div key={i} style={{
            position: "absolute",
            left: `${(i / 3) * 100}%`,
            width: `${100 / 3 + 0.5}%`,
            top: 0, height: "100%",
            background: "#000",
            transform: `translateY(${-eased * 102}%)`,
            zIndex: 20,
          }} />
        );
      })}
    </div>
  );
}