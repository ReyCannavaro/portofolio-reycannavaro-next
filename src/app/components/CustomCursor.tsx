"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const ringRef  = useRef<HTMLDivElement>(null);
  const dotRef   = useRef<HTMLDivElement>(null);
  const pos      = useRef({ x: -100, y: -100 });
  const ringPos  = useRef({ x: -100, y: -100 });
  const raf      = useRef<number>(0);
  const [hovered, setHovered]   = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hidden, setHidden]     = useState(false);
  const [mounted, setMounted]   = useState(false);

  useEffect(() => {
    setMounted(true);

    if (window.matchMedia("(hover: none)").matches) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
      }
    };

    const onEnter = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [role='button'], .magnetic, input, textarea, select, label")) {
        setHovered(true);
      }
    };

    const onLeave = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [role='button'], .magnetic, input, textarea, select, label")) {
        setHovered(false);
      }
    };

    const onDown  = () => setClicking(true);
    const onUp    = () => setClicking(false);
    const onOut   = () => setHidden(true);
    const onOver  = () => setHidden(false);

    document.addEventListener("mousemove",    onMove);
    document.addEventListener("mouseover",    onEnter);
    document.addEventListener("mouseout",     onLeave);
    document.addEventListener("mousedown",    onDown);
    document.addEventListener("mouseup",      onUp);
    document.addEventListener("mouseleave",   onOut);
    document.addEventListener("mouseenter",   onOver);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const loop = () => {
      ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.1);
      ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.1);

      if (ringRef.current) {
        const size = hovered ? 56 : clicking ? 28 : 36;
        ringRef.current.style.transform =
          `translate(${ringPos.current.x - size / 2}px, ${ringPos.current.y - size / 2}px)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf.current);
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseover",  onEnter);
      document.removeEventListener("mouseout",   onLeave);
      document.removeEventListener("mousedown",  onDown);
      document.removeEventListener("mouseup",    onUp);
      document.removeEventListener("mouseleave", onOut);
      document.removeEventListener("mouseenter", onOver);
    };
  }, [hovered, clicking]);

  if (!mounted) return null;

  const ringSize  = hovered ? 56 : clicking ? 28 : 36;
  const ringColor = hovered ? "rgba(99,102,241,0.5)" : "rgba(241,245,249,0.25)";

  return (
    <>
      <div
        ref={ringRef}
        style={{
          position:       "fixed",
          top:            0,
          left:           0,
          width:          ringSize,
          height:         ringSize,
          borderRadius:   "50%",
          border:         `1.5px solid ${ringColor}`,
          backdropFilter: hovered ? "invert(1)" : "none",
          mixBlendMode:   hovered ? "difference" : "normal",
          pointerEvents:  "none",
          zIndex:         99998,
          transition:     `width 0.3s cubic-bezier(0.23,1,0.32,1),
                           height 0.3s cubic-bezier(0.23,1,0.32,1),
                           border-color 0.3s ease,
                           opacity 0.2s ease`,
          opacity:        hidden ? 0 : 1,
          willChange:     "transform",
        }}
      />

      <div
        ref={dotRef}
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          width:         6,
          height:        6,
          borderRadius:  "50%",
          background:    hovered ? "#6366f1" : "#f1f5f9",
          pointerEvents: "none",
          zIndex:        99999,
          transition:    "background 0.2s ease, opacity 0.2s ease",
          opacity:       hidden ? 0 : 1,
          willChange:    "transform",
        }}
      />
    </>
  );
}