"use client";
import { useState, useEffect } from "react";
import { currentStatus } from "@/app/data/index";
import { FiCircle } from "react-icons/fi";

export default function NowPlaying() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div
      className="hidden lg:flex"
      style={{
        position:    "fixed",
        bottom:      "100px",
        left:        "24px",
        zIndex:      8900,
        alignItems:  "center",
        gap:         8,
        background:  "#fff",
        border:      "2px solid #000",
        boxShadow:   "3px 3px 0 var(--navy)",
        padding:     "8px 14px",
        borderRadius: 0,
      }}
    >
      <span className="status-dot" style={{ width: 7, height: 7 }} />
      <span style={{
        fontFamily:    "var(--font-mono)",
        fontSize:      "10px",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color:         "var(--fg-2)",
      }}>
        {currentStatus.available ? "Available" : "Busy"}
      </span>
    </div>
  );
}