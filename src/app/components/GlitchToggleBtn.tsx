"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGlitch } from "./GlitchContext";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const rand  = () => CHARS[Math.floor(Math.random() * CHARS.length)];

function GlitchIcon({ active }: { active: boolean }) {
  const [lines, setLines] = useState(["REY", "CAN"]);

  useEffect(() => {
    if (!active) {
      setLines(["REY", "CAN"]);
      return;
    }
    const id = setInterval(() => {
      setLines([
        Math.random() > 0.4 ? "REY" : rand() + rand() + rand(),
        Math.random() > 0.4 ? "CAN" : rand() + rand() + rand(),
      ]);
    }, 100);
    return () => clearInterval(id);
  }, [active]);

  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: 2,
      fontFamily: "var(--font-dm-mono,monospace)",
      fontSize: 7, fontWeight: 600, letterSpacing: "0.05em",
      lineHeight: 1, userSelect: "none",
    }}>
      <span style={{ color: active ? "#ff3366" : "rgba(255,255,255,0.7)" }}>{lines[0]}</span>
      <span style={{ color: active ? "#22d3ee" : "rgba(255,255,255,0.5)", position: "relative", left: active ? 1 : 0 }}>{lines[1]}</span>
    </div>
  );
}

export default function GlitchToggleBtn() {
  const { mode, toggle } = useGlitch();
  const [mounted, setMounted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const isGlitch = mode === "glitch";

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div
      style={{ position: "fixed", bottom: "1.5rem", right: "5.5rem", zIndex: 9990 }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.92 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={   { opacity: 0, y: 4, scale: 0.92  }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              bottom: "calc(100% + 8px)",
              right: 0,
              background: "rgba(7,9,15,0.92)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(99,102,241,0.2)",
              borderRadius: 8,
              padding: "5px 10px",
              whiteSpace: "nowrap",
              pointerEvents: "none",
            }}
          >
            <span style={{
              fontFamily: "var(--font-dm-mono,monospace)",
              fontSize: "0.55rem", letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: isGlitch ? "#a5b4fc" : "#94a3b8",
            }}>
              {isGlitch ? "Glitch ON" : "Glitch OFF"}
            </span>
            <div style={{
              position: "absolute", bottom: -4, right: 14,
              width: 8, height: 8,
              background: "rgba(7,9,15,0.92)",
              border: "1px solid rgba(99,102,241,0.2)",
              borderTop: "none", borderLeft: "none",
              transform: "rotate(45deg)",
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ scale: 0, y: 20 }}
        animate={{ scale: 1, y: 0   }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={toggle}
        style={{
          width: 52, height: 52, borderRadius: 14,
          border: isGlitch
            ? "1px solid rgba(99,102,241,0.45)"
            : "1px solid rgba(255,255,255,0.1)",
          background: isGlitch
            ? "rgba(99,102,241,0.15)"
            : "rgba(7,9,15,0.75)",
          backdropFilter: "blur(12px)",
          boxShadow: isGlitch
            ? "0 8px 24px -4px rgba(99,102,241,0.35), inset 0 1px 0 rgba(255,255,255,0.05)"
            : "0 8px 24px -4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "none", position: "relative", overflow: "hidden",
          transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        {isGlitch && (
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(99,102,241,0.04) 2px, rgba(99,102,241,0.04) 4px)",
            borderRadius: 14,
          }} />
        )}

        <div style={{
          position: "absolute", top: 7, right: 7,
          width: 5, height: 5, borderRadius: "50%",
          background: isGlitch ? "#6366f1" : "rgba(255,255,255,0.15)",
          boxShadow: isGlitch ? "0 0 6px rgba(99,102,241,0.8)" : "none",
          transition: "all 0.3s ease",
          animation: isGlitch ? "glitch-dot-pulse 1.2s ease infinite" : "none",
        }} />

        <GlitchIcon active={isGlitch} />
      </motion.button>

      <style>{`
        @keyframes glitch-dot-pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.4; transform:scale(0.7); }
        }
      `}</style>
    </div>
  );
}