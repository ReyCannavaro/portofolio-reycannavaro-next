"use client";
import { useEffect, useState } from "react";

const ITEMS = [
  "Currently Building: MediBot v2",
  "Stack: React · Laravel · MySQL",
  "Location: Sidoarjo, ID · UTC+7",
  "Status: Open to Opportunities",
  "GitHub: ReyCannavaro",
  "Latest: IoT Dashboard Project",
  "Studying: SMK Telkom Sidoarjo",
  "Crafting: Next.js · TypeScript",
];

const TICKER = [...ITEMS, ...ITEMS];

export default function BuildingTicker() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <>
      <style>{`
        .ticker-wrap {
          width: 100%;
          overflow: hidden;
          background: rgba(99,102,241,0.04);
          border-top: 1px solid rgba(99,102,241,0.1);
          border-bottom: 1px solid rgba(99,102,241,0.1);
          padding: 0.55rem 0;
          position: relative;
          z-index: 1;
        }
        .ticker-wrap::before,
        .ticker-wrap::after {
          content: '';
          position: absolute; top: 0; bottom: 0;
          width: 80px; z-index: 2; pointer-events: none;
        }
        .ticker-wrap::before {
          left: 0;
          background: linear-gradient(to right, var(--bg), transparent);
        }
        .ticker-wrap::after {
          right: 0;
          background: linear-gradient(to left, var(--bg), transparent);
        }
        .ticker-track {
          display: flex;
          width: max-content;
          animation: ticker-scroll 38s linear infinite;
        }
        .ticker-track:hover { animation-play-state: paused; }
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0 1.8rem;
          font-family: var(--font-dm-mono);
          font-size: 0.58rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--fg-3);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .ticker-dot {
          width: 3px; height: 3px; border-radius: 50%;
          background: var(--accent); opacity: 0.6; flex-shrink: 0;
        }
        .ticker-highlight {
          color: var(--accent);
          font-weight: 500;
        }
      `}</style>

      <div className="ticker-wrap" aria-hidden="true">
        <div className="ticker-track">
          {TICKER.map((item, i) => {
            const [label, ...rest] = item.split(": ");
            const value = rest.join(": ");
            return (
              <span key={i} className="ticker-item">
                <span className="ticker-dot" />
                {value ? (
                  <>
                    <span>{label}:</span>
                    <span className="ticker-highlight">{value}</span>
                  </>
                ) : (
                  <span>{label}</span>
                )}
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
}