"use client";
import { useEffect, useState } from "react";

export default function Loader() {
  const [phase, setPhase] = useState<"intro" | "counting" | "exit" | "done">("intro");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("counting"), 300);
    let frame: number;
    let start: number | null = null;
    const duration = 900; // was 1800ms

    const tick = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * 100));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    const t2 = setTimeout(() => {
      frame = requestAnimationFrame(tick);
    }, 300);
    const t3 = setTimeout(() => setPhase("exit"), 1100);
    const t4 = setTimeout(() => setPhase("done"), 1500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (phase === "done") return null;

  const isExiting = phase === "exit";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? "translateY(-8px)" : "translateY(0)",
        transition: isExiting ? "opacity 0.4s ease, transform 0.4s ease" : "none",
        willChange: isExiting ? "opacity, transform" : "auto",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: "linear-gradient(to right, #0066b1 0%, #0066b1 33.3%, #1c69d4 33.3%, #1c69d4 66.6%, #e22718 66.6%, #e22718 100%)",
          opacity: phase === "intro" ? 0 : 1,
          transition: "opacity 0.3s ease 0.1s",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background: "linear-gradient(to right, #0066b1 0%, #0066b1 33.3%, #1c69d4 33.3%, #1c69d4 66.6%, #e22718 66.6%, #e22718 100%)",
          opacity: phase === "intro" ? 0 : 1,
          transition: "opacity 0.3s ease 0.1s",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
          opacity: phase === "intro" ? 0 : 1,
          transform: phase === "intro" ? "translateY(10px)" : "translateY(0)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
      >
        <div
          style={{
            fontSize: "clamp(11px, 1.5vw, 13px)",
            fontWeight: 700,
            letterSpacing: "5px",
            textTransform: "uppercase",
            color: "#7e7e7e",
            fontFamily: "'Inter', sans-serif",
            marginBottom: 20,
          }}
        >
          Rey Cannavaro
        </div>

        <div
          style={{
            fontSize: "clamp(72px, 14vw, 140px)",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1,
            fontFamily: "'Inter', sans-serif",
            letterSpacing: "-0.04em",
            fontVariantNumeric: "tabular-nums",
            minWidth: "3ch",
            textAlign: "center",
          }}
        >
          {count}
        </div>

        <div
          style={{
            width: "clamp(180px, 28vw, 320px)",
            height: 1,
            background: "#1a1a1a",
            marginTop: 32,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, #0066b1, #1c69d4, #e22718)",
              transform: `scaleX(${count / 100})`,
              transformOrigin: "left",
              transition: "transform 0.05s linear",
            }}
          />
        </div>

        <div
          style={{
            marginTop: 16,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#3c3c3c",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Loading
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 28,
          left: 32,
          opacity: phase === "intro" ? 0 : 1,
          transition: "opacity 0.4s ease 0.2s",
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "#3c3c3c",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Fullstack Developer · Sidoarjo, Indonesia
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 28,
          right: 32,
          opacity: phase === "intro" ? 0 : 1,
          transition: "opacity 0.4s ease 0.2s",
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "#3c3c3c",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          © 2026
        </span>
      </div>
    </div>
  );
}
