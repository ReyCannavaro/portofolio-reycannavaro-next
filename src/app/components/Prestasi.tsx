"use client";
import { useRef, useEffect, useState } from "react";
import type { JSX } from "react";
import Image from "next/image";
import { achievements } from "../data/index";


const BADGE_ICONS: Record<string, JSX.Element> = {
  mic: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
    </svg>
  ),
  medal: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
  flag: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
    </svg>
  ),
  crown: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/><path d="M5 20h14"/>
    </svg>
  ),
  star: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  clipboard: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
    </svg>
  ),
  pen: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  ),
  trophy: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="8 17 12 21 16 17"/><line x1="12" y1="12" x2="12" y2="21"/>
      <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"/>
    </svg>
  ),
  film: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
      <line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/>
      <line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/>
      <line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/>
      <line x1="17" y1="7" x2="22" y2="7"/>
    </svg>
  ),
  shield: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
};

function BadgeIcon({ name, size = 16 }: { name: string; size?: number }) {
  const icon = BADGE_ICONS[name];
  if (!icon) return null;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: size, height: size }}>
      {icon}
    </span>
  );
}

const LEVEL_LABEL: Record<string, string> = {
  national: "NATIONAL",
  district: "DISTRICT",
  school: "SCHOOL",
};

const LEVEL_COLOR: Record<string, string> = {
  national: "var(--m-red)",
  district: "var(--m-blue-dark)",
  school: "var(--muted)",
};

const FEATURED_IDS = new Set([13, 11]);
const RELEVANT_IDS = new Set([13, 11, 8, 2, 9, 1, 7, 6, 10]);
const DEFAULT_SELECTED = achievements.find((a) => FEATURED_IDS.has(a.id)) ?? achievements[0] ?? null;

export default function Prestasi() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [selected, setSelected] = useState<(typeof achievements)[0] | null>(DEFAULT_SELECTED);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const featured = achievements.filter((a) => FEATURED_IDS.has(a.id));
  const relevantList = achievements.filter((a) => RELEVANT_IDS.has(a.id) && !FEATURED_IDS.has(a.id));
  const restList = achievements.filter((a) => !RELEVANT_IDS.has(a.id) && !FEATURED_IDS.has(a.id));
  const listItems = showMore ? [...relevantList, ...restList] : relevantList;

  return (
    <section id="achievements" ref={ref} style={{ background: "var(--canvas)", padding: "var(--space-section) 0" }}>
      <div className="container">
        <div style={{ marginBottom: "var(--space-xxl)" }}>
          <span className="label-upper" style={{ color: "var(--m-blue-dark)", opacity: visible ? 1 : 0, transition: "opacity 0.5s" }}>
            06 - Recognition
          </span>
          <div className="m-stripe" style={{ width: 48, marginTop: 12, marginBottom: 16 }} />
          <h2 className="display-lg" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease 0.1s" }}>
            ACHIEVEMENTS &<br />RECOGNITION
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 1, background: "var(--hairline)", marginBottom: 1 }} className="feat-grid">
          {featured.map((a, i) => (
            <div
              key={a.id}
              style={{
                background: "var(--surface-card)",
                padding: "var(--space-xl)",
                display: "flex",
                gap: "var(--space-lg)",
                borderTop: `3px solid ${LEVEL_COLOR[a.level]}`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.7s ease ${0.2 + i * 0.1}s`,
              }}
            >
              <div style={{ position: "relative", width: 80, height: 80, flexShrink: 0, overflow: "hidden" }}>
                <Image src={a.image} alt={a.title} fill style={{ objectFit: "cover" }} />
              </div>
              <div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: LEVEL_COLOR[a.level] }}>
                    {LEVEL_LABEL[a.level]}
                  </span>
                  <span className="label-upper" style={{ color: "var(--muted)", fontSize: 9 }}>
                    <BadgeIcon name={a.badge} /> {a.category}
                  </span>
                </div>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: "var(--on-dark)", lineHeight: 1.3, marginBottom: 8, textTransform: "uppercase" }}>
                  {a.titleShort}
                </h4>
                <p className="body-sm" style={{ fontSize: 12 }}>{a.organizer} · {a.year}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 1, background: "var(--hairline)" }} className="detail-grid">
          <div style={{ background: "var(--surface-soft)" }}>
            {listItems.map((a) => (
              <div
                key={a.id}
                onClick={() => setSelected(a)}
                style={{
                  padding: "var(--space-lg) var(--space-xl)",
                  borderBottom: "1px solid var(--hairline)",
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-md)",
                  cursor: "pointer",
                  background: selected?.id === a.id ? "var(--surface-card)" : "transparent",
                  borderLeft: selected?.id === a.id ? "3px solid var(--on-dark)" : "3px solid transparent",
                  transition: "all 0.2s",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(-12px)",
                } as React.CSSProperties}
              >
                <span style={{ display: "inline-flex", alignItems: "center", color: "var(--on-dark)" }}><BadgeIcon name={a.badge} size={20} /></span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                    <h5 style={{ fontSize: 13, fontWeight: 700, color: "var(--on-dark)", textTransform: "uppercase" } as React.CSSProperties}>
                      {a.titleShort}
                    </h5>
                    <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: LEVEL_COLOR[a.level], flexShrink: 0 }}>
                      {LEVEL_LABEL[a.level]}
                    </span>
                  </div>
                  <p className="body-sm" style={{ fontSize: 11, marginTop: 2 }}>
                    {a.organizer} · {a.year}
                  </p>
                </div>
              </div>
            ))}

            <div style={{ padding: "var(--space-lg) var(--space-xl)", borderTop: "1px solid var(--hairline)" }}>
              <button
                onClick={() => setShowMore((v) => !v)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "none",
                  border: "1px solid var(--hairline)",
                  color: "var(--on-dark)",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  padding: "8px 16px",
                  transition: "all 0.2s",
                  width: "100%",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--surface-card)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "none";
                }}
              >
                {showMore ? (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="18 15 12 9 6 15"/>
                    </svg>
                    See Less
                  </>
                ) : (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                    See More ({restList.length} more achievements)
                  </>
                )}
              </button>
            </div>
          </div>

          <div style={{ background: "var(--surface-card)", padding: "var(--space-xl)", position: "sticky", top: 80 }}>
            {selected ? (
              <>
                <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", marginBottom: "var(--space-lg)" }}>
                  <Image src={selected.image} alt={selected.title} fill style={{ objectFit: "cover" }} />
                </div>
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: LEVEL_COLOR[selected.level] }}>
                  {LEVEL_LABEL[selected.level]} · {selected.category}
                </span>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: "var(--on-dark)", textTransform: "uppercase", marginTop: 8, marginBottom: 12, lineHeight: 1.3 }}>
                  {selected.title}
                </h4>
                <p className="body-sm" style={{ fontSize: 12, lineHeight: 1.6 }}>{selected.description}</p>
                <div className="hairline" style={{ margin: "var(--space-lg) 0" }} />
                <p className="label-upper" style={{ fontSize: 10 }}>{selected.organizer}</p>
                <p className="label-upper" style={{ fontSize: 10, marginTop: 4 }}>{selected.year}</p>
              </>
            ) : (
              <div style={{ color: "var(--muted)", textAlign: "center", paddingTop: "var(--space-xxl)" }}>
                <p className="label-upper">Select an achievement</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .feat-grid { grid-template-columns: 1fr !important; }
          .detail-grid { grid-template-columns: 1fr !important; }
          .detail-grid > div:last-child { display: none; }
        }
      `}</style>
    </section>
  );
}
