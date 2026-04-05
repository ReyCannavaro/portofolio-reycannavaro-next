"use client";
import { useEffect, useRef, useState } from "react";
import { useGlitch } from "./GlitchContext";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!?";
const rand  = () => CHARS[Math.floor(Math.random() * CHARS.length)];

interface GlitchTextProps {
  children: string;
  as?: "span" | "h1" | "h2" | "h3";
  className?: string;
  style?: React.CSSProperties;
  intensity?: number;
  tickMs?: number;
}

export default function GlitchText({
  children,
  as: Tag = "span",
  className,
  style,
  intensity = 0.07,
  tickMs = 120,
}: GlitchTextProps) {
  const { mode } = useGlitch();
  const original = children;
  const [display, setDisplay] = useState<string[]>(original.split(""));
  const [glitchFlash, setGlitchFlash] = useState(false);
  const tickRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const flashRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (mode !== "glitch") {
      if (tickRef.current)  clearInterval(tickRef.current);
      if (flashRef.current) clearTimeout(flashRef.current);
      setDisplay(original.split(""));
      setGlitchFlash(false);
      return;
    }

    tickRef.current = setInterval(() => {
      setDisplay(original.split("").map((ch) => {
        if (ch === " ") return " ";
        return Math.random() < intensity ? rand() : ch;
      }));
    }, tickMs);

    const scheduleFlash = () => {
      const wait = 2800 + Math.random() * 4500;
      flashRef.current = setTimeout(() => {
        setGlitchFlash(true);
        setTimeout(() => {
          setGlitchFlash(false);
          if (Math.random() > 0.45) {
            setTimeout(() => {
              setGlitchFlash(true);
              setTimeout(() => { setGlitchFlash(false); scheduleFlash(); }, 85);
            }, 110);
          } else {
            scheduleFlash();
          }
        }, 95);
      }, wait);
    };
    scheduleFlash();

    return () => {
      if (tickRef.current)  clearInterval(tickRef.current);
      if (flashRef.current) clearTimeout(flashRef.current);
      setDisplay(original.split(""));
      setGlitchFlash(false);
    };
  }, [mode, intensity, tickMs, original]);

  const ghostStyle: React.CSSProperties = {
    position: "absolute", inset: 0,
    pointerEvents: "none", userSelect: "none",
    fontFamily: "inherit", fontWeight: "inherit",
    fontSize: "inherit", letterSpacing: "inherit",
    lineHeight: "inherit", whiteSpace: "pre",
  };

  return (
    <>
      <style>{`
        @keyframes gt-r{0%,100%{clip-path:none;transform:none}20%{clip-path:polygon(0 8%,100% 8%,100% 26%,0 26%);transform:translateX(3px)}50%{clip-path:polygon(0 52%,100% 52%,100% 64%,0 64%);transform:translateX(-2px)}75%{clip-path:polygon(0 76%,100% 76%,100% 87%,0 87%);transform:translateX(4px)}}
        @keyframes gt-b{0%,100%{clip-path:none;transform:none}20%{clip-path:polygon(0 14%,100% 14%,100% 30%,0 30%);transform:translateX(-3px)}50%{clip-path:polygon(0 48%,100% 48%,100% 60%,0 60%);transform:translateX(2px)}75%{clip-path:polygon(0 72%,100% 72%,100% 84%,0 84%);transform:translateX(-4px)}}
      `}</style>
      <Tag className={className} style={{ position: "relative", display: "inline-block", ...style }}>
        {mode === "glitch" && glitchFlash && (
          <>
            <span aria-hidden style={{ ...ghostStyle, color: "#ff3366", animation: "gt-r 0.12s steps(1) infinite" }}>{original}</span>
            <span aria-hidden style={{ ...ghostStyle, color: "#22d3ee", animation: "gt-b 0.12s steps(1) infinite 0.04s" }}>{original}</span>
          </>
        )}
        {display.map((ch, i) => {
          const corrupted = mode === "glitch" && ch !== original[i] && original[i] !== " ";
          return (
            <span key={i} style={{
              display: "inline-block",
              width: original[i] === " " ? "0.28em" : undefined,
              color: corrupted ? "#6366f1" : undefined,
              transition: corrupted ? "none" : "color 0.15s",
            }}>
              {original[i] === " " ? "\u00a0" : ch}
            </span>
          );
        })}
      </Tag>
    </>
  );
}