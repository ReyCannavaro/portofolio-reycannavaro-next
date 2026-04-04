"use client";
import { useEffect, useState, useRef } from "react";

const NAME_CHARS = "REY CANNAVARO".split("");
const ROLE = "FULLSTACK DEVELOPER";
const STATS = [
  { value: 6,  suffix: "",  label: "projects" },
  { value: 12, suffix: "",  label: "achievements" },
  { value: 3,  suffix: "+", label: "years building" },
];

const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";
const rand = () => GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];

export default function LoadingScreen() {
  const [phase, setPhase]           = useState<"idle"|"chars"|"stats"|"role"|"exit">("idle");
  const [visibleChars, setVisible]  = useState(0);
  const [scramble, setScramble]     = useState<string[]>([]);
  const [statsVisible, setStatsVis] = useState(false);
  const [roleVisible, setRoleVis]   = useState(false);
  const [mounted, setMounted]       = useState(false);
  const [done, setDone]             = useState(false);

  const raf = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined" && sessionStorage.getItem("intro-done")) {
      setDone(true);
      return;
    }

    const t1 = setTimeout(() => setPhase("chars"),  150);
    const t2 = setTimeout(() => setStatsVis(true),  1500);
    const t3 = setTimeout(() => setRoleVis(true),   1950);
    const t4 = setTimeout(() => setPhase("exit"),   2600);
    const t5 = setTimeout(() => {
      setDone(true);
      sessionStorage.setItem("intro-done", "1");
    }, 3250);

    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (phase !== "chars") return;

    let current = 0;
    const total = NAME_CHARS.length;

    const step = () => {
      if (current > total) {
        setScramble([]);
        return;
      }
      setVisible(current);

      const ahead: string[] = [];
      for (let i = 0; i < 2; i++) {
        if (current + i < total && NAME_CHARS[current + i] !== " ") {
          ahead.push(rand());
        } else {
          ahead.push(NAME_CHARS[current + i] ?? "");
        }
      }
      setScramble(ahead);

      current++;
      raf.current = window.setTimeout(step, 58);
    };

    raf.current = window.setTimeout(step, 100);
    return () => { if (raf.current) clearTimeout(raf.current); };
  }, [phase]);

  if (!mounted || done) return null;

  const isExiting = phase === "exit";

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "#07090f",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "0 clamp(1.5rem, 6vw, 6rem)",
        transform: isExiting ? "translateY(-100%)" : "translateY(0)",
        transition: isExiting ? "transform 0.65s cubic-bezier(0.76, 0, 0.24, 1)" : "none",
        overflow: "hidden",
      }}
    >

      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage:
          "linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }} />

      <div style={{
        position: "absolute", top: "clamp(1.5rem,4vw,3rem)", left: "clamp(1.5rem,6vw,6rem)",
        display: "flex", alignItems: "center", gap: "0.75rem",
        opacity: phase === "idle" ? 0 : 1,
        transition: "opacity 0.4s ease",
      }}>
        <span style={{
          width: 28, height: 1,
          background: "linear-gradient(90deg, #6366f1, #22d3ee)",
          display: "block",
        }} />
        <span style={{
          fontFamily: "var(--font-dm-mono, monospace)",
          fontSize: "0.6rem",
          letterSpacing: "0.25em",
          color: "#6366f1",
          textTransform: "uppercase",
        }}>
          INITIALIZING
        </span>
      </div>

      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>

        <div style={{
          fontFamily: "var(--font-dm-mono, monospace)",
          fontSize: "clamp(0.55rem, 1.2vw, 0.7rem)",
          letterSpacing: "0.3em",
          color: "#6366f1",
          marginBottom: "1rem",
          opacity: visibleChars > 0 ? 1 : 0,
          transition: "opacity 0.3s ease",
          textTransform: "uppercase",
        }}>
          Portfolio v2.0 — {new Date().getFullYear()}
        </div>

        <h1 style={{
          fontFamily: "var(--font-syne, system-ui, sans-serif)",
          fontWeight: 800,
          fontSize: "clamp(3rem, 12vw, 9rem)",
          letterSpacing: "-0.04em",
          lineHeight: 0.9,
          color: "#f1f5f9",
          margin: 0,
          display: "flex",
          flexWrap: "wrap",
          gap: "0 0.2em",
          userSelect: "none",
        }}>
          {NAME_CHARS.map((char, i) => {
            if (char === " ") return (
              <span key={i} style={{ display: "inline-block", width: "0.25em" }} />
            );

            const isRevealed  = i < visibleChars;
            const isScrambled = i >= visibleChars && i < visibleChars + 2;
            const displayChar = isScrambled ? scramble[i - visibleChars] ?? char : char;

            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  opacity: isRevealed ? 1 : isScrambled ? 0.35 : 0,
                  transform: isRevealed ? "translateY(0)" : "translateY(16px)",
                  transition: isRevealed
                    ? "opacity 0.15s ease, transform 0.2s cubic-bezier(0.23,1,0.32,1)"
                    : "none",
                  color: isScrambled ? "#6366f1" : "#f1f5f9",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {displayChar}
              </span>
            );
          })}
        </h1>

        <div style={{
          display: "flex",
          gap: "clamp(1.5rem, 5vw, 4rem)",
          marginTop: "2.5rem",
          opacity: statsVisible ? 1 : 0,
          transform: statsVisible ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.5s ease 0.1s, transform 0.5s cubic-bezier(0.23,1,0.32,1) 0.1s",
        }}>
          {STATS.map((s, i) => (
            <CountStat key={i} {...s} trigger={statsVisible} delay={i * 120} />
          ))}
        </div>

        <div style={{
          marginTop: "3rem",
          opacity: roleVisible ? 1 : 0,
          transform: roleVisible ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.45s ease, transform 0.45s cubic-bezier(0.23,1,0.32,1)",
        }}>
          <div style={{
            fontFamily: "var(--font-dm-mono, monospace)",
            fontSize: "clamp(0.6rem, 1.5vw, 0.75rem)",
            letterSpacing: "0.25em",
            color: "#94a3b8",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}>
            {ROLE}
          </div>

          <div style={{
            width: "clamp(120px, 20vw, 220px)",
            height: "1px",
            background: "rgba(255,255,255,0.08)",
            borderRadius: 2,
            overflow: "hidden",
          }}>
            <div style={{
              height: "100%",
              background: "linear-gradient(90deg, #6366f1, #22d3ee)",
              width: roleVisible ? "100%" : "0%",
              transition: "width 0.55s cubic-bezier(0.23,1,0.32,1) 0.1s",
              borderRadius: 2,
            }} />
          </div>
        </div>
      </div>

      <div style={{
        position: "absolute",
        bottom: "clamp(1.5rem,4vw,3rem)",
        right: "clamp(1.5rem,6vw,6rem)",
        fontFamily: "var(--font-dm-mono, monospace)",
        fontSize: "0.6rem",
        letterSpacing: "0.2em",
        color: "#475569",
        opacity: roleVisible ? 1 : 0,
        transition: "opacity 0.4s ease 0.2s",
        textTransform: "uppercase",
      }}>
        Sidoarjo, Indonesia — UTC+7
      </div>

    </div>
  );
}

function CountStat({
  value, suffix, label, trigger, delay
}: {
  value: number; suffix: string; label: string; trigger: boolean; delay: number;
}) {
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!trigger || started.current) return;
    started.current = true;

    const duration = 900;
    const steps    = 28;
    const interval = duration / steps;
    let step = 0;

    const timer = setTimeout(() => {
      const id = setInterval(() => {
        step++;
        const progress = step / steps;
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(eased * value));
        if (step >= steps) clearInterval(id);
      }, interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [trigger, value, delay]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
      <span style={{
        fontFamily: "var(--font-syne, system-ui, sans-serif)",
        fontWeight: 800,
        fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
        letterSpacing: "-0.04em",
        color: "#f1f5f9",
        lineHeight: 1,
      }}>
        {display}{suffix}
      </span>
      <span style={{
        fontFamily: "var(--font-dm-mono, monospace)",
        fontSize: "0.6rem",
        letterSpacing: "0.2em",
        color: "#475569",
        textTransform: "uppercase",
      }}>
        {label}
      </span>
    </div>
  );
}