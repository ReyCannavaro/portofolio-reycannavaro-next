"use client";
import { useState, useEffect } from "react";
import { currentStatus, personalInfo } from "@/app/data/index";

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
        position:      "fixed",
        bottom:        "1.75rem",
        left:          "1.75rem",
        zIndex:        990,
        display:       "flex",
        flexDirection: "column",
        alignItems:    "flex-start",
        gap:           "0.5rem",
      }}
      className="hidden lg:flex"
    >
      <div
        style={{
          background:    "#fff",
          border:        "1px solid rgba(0,0,0,0.09)",
          borderRadius:  16,
          boxShadow:     "0 4px 24px rgba(0,0,0,0.10)",
          padding:       expanded ? "1.1rem 1.25rem" : "0",
          maxHeight:     expanded ? "320px" : "0",
          overflow:      "hidden",
          opacity:       expanded ? 1 : 0,
          transition:    "max-height 0.4s cubic-bezier(0.23,1,0.32,1), opacity 0.3s ease, padding 0.35s ease",
          minWidth:      "220px",
          pointerEvents: expanded ? "auto" : "none",
        }}
      >
        <div style={{
          fontFamily:    "var(--font-mono)",
          fontSize:      "0.58rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color:         "var(--accent)",
          marginBottom:  "0.9rem",
        }}>
          Status — Live
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <Row label="Availability"       value={currentStatus.available ? "Open to work" : "Not available"} valueColor={currentStatus.available ? "#16a34a" : "#dc2626"} />
          <Row label="Building"           value={currentStatus.currentlyBuilding.project} />
          <Row label="Learning"           value={currentStatus.currentlyLearning.map(l => l.name).join(", ")} />
          <Row label="Location"           value={personalInfo.location} />
          <Row label="Timezone"           value={personalInfo.timezone} />
        </div>
      </div>

      <button
        onClick={() => setExpanded(e => !e)}
        style={{
          display:       "flex",
          alignItems:    "center",
          gap:           "0.6rem",
          background:    "#fff",
          border:        `1px solid ${expanded ? "rgba(79,106,245,0.35)" : "rgba(0,0,0,0.10)"}`,
          borderRadius:  999,
          padding:       "0.45rem 0.85rem",
          boxShadow:     "0 2px 10px rgba(0,0,0,0.07)",
          cursor:        "pointer",
          transition:    "border-color 0.25s ease, box-shadow 0.25s ease",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.12)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 10px rgba(0,0,0,0.07)"; }}
      >
        <span style={{
          width:        7,
          height:       7,
          borderRadius: "50%",
          background:   currentStatus.available ? "#22c55e" : "#ef4444",
          display:      "block",
          boxShadow:    `0 0 ${pulse ? "7px" : "2px"} ${currentStatus.available ? "#22c55e" : "#ef4444"}`,
          transition:   "box-shadow 0.9s ease",
          flexShrink:   0,
        }} />

        <span style={{
          fontFamily:    "var(--font-mono)",
          fontSize:      "0.62rem",
          letterSpacing: "0.08em",
          color:         "var(--fg-2)",
          textTransform: "uppercase",
          userSelect:    "none",
        }}>
          {currentStatus.available ? "Available" : "Busy"}
        </span>

        <span style={{
          color:      "var(--fg-3)",
          fontSize:   "0.55rem",
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

function Row({ label, value, valueColor }: {
  label: string; value: string; valueColor?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
      <span style={{
        fontFamily:    "var(--font-mono)",
        fontSize:      "0.56rem",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color:         "var(--fg-3)",
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize:   "0.78rem",
        color:      valueColor ?? "var(--fg)",
      }}>
        {value}
      </span>
    </div>
  );
}