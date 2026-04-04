"use client";
import { useState, useEffect } from "react";
import { nowStatus } from "@/app/data/index";

export default function NowPlaying() {
  const [expanded, setExpanded] = useState(false);
  const [mounted,  setMounted]  = useState(false);
  const [pulse,    setPulse]    = useState(true);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setPulse(p => !p), 1800);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return null;

  return (
    <div
      style={{
        position:   "fixed",
        bottom:     "1.75rem",
        left:       "1.75rem",
        zIndex:     990,
        display:    "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap:        "0.5rem",
      }}
      className="hidden lg:flex"
    >
      <div
        style={{
          background:     "rgba(12,16,24,0.92)",
          border:         "1px solid rgba(99,102,241,0.2)",
          borderRadius:   14,
          backdropFilter: "blur(16px)",
          padding:        expanded ? "1.1rem 1.25rem" : "0",
          maxHeight:      expanded ? "320px" : "0",
          overflow:       "hidden",
          opacity:        expanded ? 1 : 0,
          transition:     "max-height 0.4s cubic-bezier(0.23,1,0.32,1), opacity 0.3s ease, padding 0.35s ease",
          minWidth:       "220px",
          pointerEvents:  expanded ? "auto" : "none",
        }}
      >
        <div style={{
          fontFamily:    "var(--font-dm-mono, monospace)",
          fontSize:      "0.6rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color:         "#6366f1",
          marginBottom:  "0.9rem",
        }}>
          Status — Live
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <Row icon="◉" label="Availability" value={nowStatus.available ? "Open to work" : "Not available"} valueColor={nowStatus.available ? "#4ade80" : "#f87171"} />
          <Row icon="⬡" label="Currently Building" value={nowStatus.building} />
          <Row icon="◈" label="Learning" value={nowStatus.learning} />
          <Row icon="◎" label="Location" value={nowStatus.location} />
          <Row icon="◷" label="Timezone" value={nowStatus.timezone} />
        </div>
      </div>

      <button
        onClick={() => setExpanded(e => !e)}
        className="magnetic"
        style={{
          display:        "flex",
          alignItems:     "center",
          gap:            "0.6rem",
          background:     "rgba(12,16,24,0.9)",
          border:         `1px solid ${expanded ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.08)"}`,
          borderRadius:   999,
          padding:        "0.5rem 0.85rem",
          backdropFilter: "blur(16px)",
          cursor:         "none",
          transition:     "border-color 0.25s ease",
        }}
      >
        <span style={{
          width:        7,
          height:       7,
          borderRadius: "50%",
          background:   nowStatus.available ? "#4ade80" : "#f87171",
          display:      "block",
          boxShadow:    `0 0 ${pulse ? "8px" : "3px"} ${nowStatus.available ? "#4ade80" : "#f87171"}`,
          transition:   "box-shadow 0.9s ease",
          flexShrink:   0,
        }} />

        <span style={{
          fontFamily:    "var(--font-dm-mono, monospace)",
          fontSize:      "0.65rem",
          letterSpacing: "0.1em",
          color:         "#94a3b8",
          textTransform: "uppercase",
          userSelect:    "none",
        }}>
          {nowStatus.available ? "Available" : "Busy"}
        </span>

        <span style={{
          color:      "#475569",
          fontSize:   "0.6rem",
          transform:  expanded ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.3s ease",
          marginLeft: "0.1rem",
        }}>
          ▲
        </span>
      </button>
    </div>
  );
}

function Row({ icon, label, value, valueColor }: {
  icon: string; label: string; value: string; valueColor?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
      <span style={{
        fontFamily:    "var(--font-dm-mono, monospace)",
        fontSize:      "0.58rem",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color:         "#475569",
        display:       "flex",
        alignItems:    "center",
        gap:           "0.4rem",
      }}>
        <span style={{ color: "#6366f1", fontSize: "0.65rem" }}>{icon}</span>
        {label}
      </span>
      <span style={{
        fontFamily: "var(--font-syne, system-ui, sans-serif)",
        fontWeight: 600,
        fontSize:   "0.78rem",
        color:      valueColor ?? "#f1f5f9",
        paddingLeft:"1.05rem",
      }}>
        {value}
      </span>
    </div>
  );
}