"use client";
import { useRef, useEffect, useState } from "react";
import type { JSX } from "react";
import Image from "next/image";
import { achievements } from "../data/index";

const BADGE_ICONS: Record<string, JSX.Element> = {
  mic: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
    </svg>
  ),
  medal: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
  flag: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
    </svg>
  ),
  crown: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/><path d="M5 20h14"/>
    </svg>
  ),
  star: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  clipboard: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
    </svg>
  ),
  pen: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  ),
  trophy: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="8 17 12 21 16 17"/><line x1="12" y1="12" x2="12" y2="21"/>
      <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"/>
    </svg>
  ),
  film: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
      <line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/>
      <line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/>
      <line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/>
      <line x1="17" y1="7" x2="22" y2="7"/>
    </svg>
  ),
  shield: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
  national: "var(--m-red-text)",
  district: "var(--m-blue-text)",
  school: "var(--muted)",
};

const PODIUM_ACCENTS: Record<number, { border: string; label: string; tagColor: string }> = {
  1: { border: "var(--m-red)", label: "1ST PLACE · NATIONAL", tagColor: "#f59e0b" },
  2: { border: "var(--m-blue-light)", label: "2ND PLACE · NATIONAL", tagColor: "#93c5fd" },
  3: { border: "var(--m-blue-dark)", label: "3RD PLACE · NATIONAL", tagColor: "#60a5fa" },
};

type FilterCategory = "all" | "tech" | "leadership";

export default function Prestasi() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [filter, setFilter] = useState<FilterCategory>("all");

  const featured = achievements.filter((a) => a.featured);
  const [selected, setSelected] = useState<(typeof achievements)[0] | null>(
    featured[0] ?? achievements[0] ?? null
  );

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Filter lists
  const isTech = (a: (typeof achievements)[0]) =>
    a.category === "Competition" || a.type === "competition";
  const isLeadership = (a: (typeof achievements)[0]) =>
    a.category === "Leadership" || a.category === "Honor" || a.category === "Organization" || a.type === "position";

  const nonFeatured = achievements.filter((a) => !a.featured);

  const getFilteredItems = () => {
    let items = nonFeatured;
    if (filter === "tech") {
      items = achievements.filter(isTech);
    } else if (filter === "leadership") {
      items = achievements.filter(isLeadership);
    }
    return items;
  };

  const filteredItems = getFilteredItems();
  const initialLimit = 6;
  const listItems = showMore ? filteredItems : filteredItems.slice(0, initialLimit);

  return (
    <section id="achievements" ref={ref} style={{ background: "var(--canvas)", padding: "var(--space-section) 0" }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: "var(--space-xxl)" }}>
          <span className="label-upper" style={{ color: "var(--m-blue-text)", opacity: visible ? 1 : 0, transition: "opacity 0.5s" }}>
            06 - Recognition & Honors
          </span>
          <div className="m-stripe" style={{ width: 48, marginTop: 12, marginBottom: 16 }} />
          <h2 className="display-lg" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease 0.1s" }}>
            ACHIEVEMENTS &<br />HALL OF FAME
          </h2>
          <p className="body-md" style={{ color: "var(--muted)", maxWidth: 640, marginTop: 12 }}>
            Rekam jejak kompetisi teknologi tingkat nasional, inovasi digital, serta pembuktian dedikasi kepemimpinan organisasi.
          </p>
        </div>

        {/* TOP PODIUM: Featured National Highlights */}
        <div style={{ marginBottom: "var(--space-xxl)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <span className="label-upper" style={{ color: "var(--on-dark)", letterSpacing: "1.5px" }}>
              ⚡ NATIONAL PODIUM HIGHLIGHTS
            </span>
            <span className="label-upper" style={{ color: "var(--m-red-text)", fontSize: 10 }}>
              {featured.length} NATIONAL AWARDS
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 1,
              background: "var(--hairline)",
            }}
            className="podium-grid"
          >
            {featured.map((a, i) => {
              const accent = PODIUM_ACCENTS[a.rank ?? (i + 1)] ?? {
                border: "var(--m-red)",
                label: "NATIONAL COMPETITION",
                tagColor: "var(--m-red-text)",
              };
              const isSelected = selected?.id === a.id;

              return (
                <div
                  key={a.id}
                  onClick={() => setSelected(a)}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  aria-label={`Lihat detail: ${a.title}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelected(a);
                    }
                  }}
                  style={{
                    background: isSelected ? "var(--surface-elevated)" : "var(--surface-card)",
                    padding: "var(--space-lg)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-md)",
                    borderTop: `3px solid ${accent.border}`,
                    cursor: "pointer",
                    position: "relative",
                    transition: "all 0.25s ease",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transitionDelay: `${0.15 + i * 0.1}s`,
                  }}
                >
                  {/* Photo & Badges */}
                  <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden", background: "var(--surface-soft)" }}>
                    <Image
                      src={a.image}
                      alt={a.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: "6px 10px",
                        background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: accent.tagColor }}>
                        {accent.label}
                      </span>
                      <span className="label-upper" style={{ fontSize: 9, color: "var(--on-dark)" }}>
                        {a.year}
                      </span>
                    </div>
                  </div>

                  {/* Title & Info */}
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <h3
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: "var(--on-dark)",
                          lineHeight: 1.35,
                          marginBottom: 8,
                          textTransform: "uppercase",
                        }}
                      >
                        {a.title}
                      </h3>
                      <p className="body-sm" style={{ fontSize: 11, color: "var(--body)" }}>
                        {a.organizer}
                      </p>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, paddingTop: 8, borderTop: "1px solid var(--hairline)" }}>
                      <span className="label-upper" style={{ color: "var(--muted)", fontSize: 9 }}>
                        <BadgeIcon name={a.badge} /> {a.category}
                      </span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: "var(--on-dark)", letterSpacing: "1px", textTransform: "uppercase" }}>
                        {isSelected ? "● INSPECTED" : "VIEW DETAILS →"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* COCKPIT SWITCHER: Category Tabs */}
        <div
          style={{
            display: "flex",
            gap: 1,
            background: "var(--hairline)",
            marginBottom: 1,
            flexWrap: "wrap",
          }}
        >
          {[
            { id: "all", label: "ALL AWARDS", count: achievements.length },
            { id: "tech", label: "TECH & INNOVATION", count: achievements.filter(isTech).length },
            { id: "leadership", label: "LEADERSHIP & HONORS", count: achievements.filter(isLeadership).length },
          ].map((tab) => {
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setFilter(tab.id as FilterCategory);
                  setShowMore(false);
                }}
                style={{
                  background: isActive ? "var(--surface-card)" : "var(--surface-soft)",
                  border: "none",
                  borderTop: isActive ? "2px solid var(--m-red)" : "2px solid transparent",
                  color: isActive ? "var(--on-dark)" : "var(--muted)",
                  padding: "12px 20px",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  transition: "all 0.2s",
                }}
              >
                <span>{tab.label}</span>
                <span
                  style={{
                    fontSize: 9,
                    padding: "2px 6px",
                    background: isActive ? "var(--surface-elevated)" : "var(--canvas)",
                    color: isActive ? "var(--m-red-text)" : "var(--muted)",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                  }}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* MASTER-DETAIL GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 380px",
            gap: 1,
            background: "var(--hairline)",
          }}
          className="detail-grid"
        >
          {/* Left Column: Achievement List */}
          <div style={{ background: "var(--surface-soft)" }}>
            {listItems.map((a) => {
              const isSelected = selected?.id === a.id;
              return (
                <div key={a.id} style={{ borderBottom: "1px solid var(--hairline)" }}>
                  <div
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSelected}
                    aria-label={`Pilih prestasi: ${a.titleShort}`}
                    onClick={() => setSelected(a)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelected(a);
                      }
                    }}
                    style={{
                      padding: "var(--space-md) var(--space-xl)",
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--space-md)",
                      cursor: "pointer",
                      background: isSelected ? "var(--surface-card)" : "transparent",
                      borderLeft: isSelected ? "3px solid var(--m-red)" : "3px solid transparent",
                      transition: "all 0.2s",
                    } as React.CSSProperties}
                  >
                    <span style={{ display: "inline-flex", alignItems: "center", color: isSelected ? "var(--m-red-text)" : "var(--on-dark)" }}>
                      <BadgeIcon name={a.badge} size={20} />
                    </span>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                        <h4 style={{ fontSize: 13, fontWeight: 700, color: "var(--on-dark)", textTransform: "uppercase" }}>
                          {a.titleShort}
                        </h4>
                        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: LEVEL_COLOR[a.level], flexShrink: 0 }}>
                          {LEVEL_LABEL[a.level]}
                        </span>
                      </div>
                      <p className="body-sm" style={{ fontSize: 11, marginTop: 2, color: "var(--muted)" }}>
                        {a.organizer} · {a.year}
                      </p>
                    </div>
                  </div>

                  {/* Mobile Inline Expander: Visible on mobile when selected */}
                  {isSelected && (
                    <div className="mobile-detail-card" style={{ padding: "0 var(--space-xl) var(--space-lg) var(--space-xl)", background: "var(--surface-card)" }}>
                      <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden", margin: "10px 0" }}>
                        <Image src={a.image} alt={a.title} fill sizes="100vw" style={{ objectFit: "cover" }} />
                      </div>
                      <p style={{ fontSize: 12, lineHeight: 1.6, color: "var(--body-strong)" }}>
                        {a.description}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}

            {/* See More Toggle */}
            {filteredItems.length > initialLimit && (
              <div style={{ padding: "var(--space-md) var(--space-xl)" }}>
                <button
                  onClick={() => setShowMore((v) => !v)}
                  aria-expanded={showMore}
                  aria-label={showMore ? "Tampilkan lebih sedikit" : "Tampilkan semua prestasi"}
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
                    padding: "10px 16px",
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
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="18 15 12 9 6 15"/>
                      </svg>
                      SHOW LESS
                    </>
                  ) : (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                      SEE ALL ({filteredItems.length - initialLimit} MORE AWARDS)
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Inspector (Desktop) */}
          <div className="desktop-inspector" style={{ background: "var(--surface-card)", padding: "var(--space-xl)", position: "sticky", top: 80, alignSelf: "start" }}>
            {selected ? (
              <>
                <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", marginBottom: "var(--space-lg)", background: "var(--surface-soft)" }}>
                  <Image src={selected.image} alt={selected.title} fill sizes="380px" style={{ objectFit: "cover" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: LEVEL_COLOR[selected.level] }}>
                    {LEVEL_LABEL[selected.level]} · {selected.category}
                  </span>
                  <span className="label-upper" style={{ fontSize: 9, color: "var(--muted)" }}>
                    {selected.year}
                  </span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--on-dark)", textTransform: "uppercase", marginTop: 4, marginBottom: 12, lineHeight: 1.35 }}>
                  {selected.title}
                </h3>
                <p className="body-sm" style={{ fontSize: 12, lineHeight: 1.6, color: "var(--body-strong)" }}>
                  {selected.description}
                </p>
                <div className="hairline" style={{ margin: "var(--space-lg) 0", height: 1, background: "var(--hairline)" }} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <span className="label-upper" style={{ fontSize: 9, color: "var(--muted)", display: "block" }}>ORGANIZER</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "var(--on-dark)" }}>{selected.organizer}</span>
                  </div>
                  <div>
                    <span className="label-upper" style={{ fontSize: 9, color: "var(--muted)", display: "block" }}>TYPE / LEVEL</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "var(--on-dark)", textTransform: "uppercase" }}>{selected.type} · {selected.level}</span>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ color: "var(--muted)", textAlign: "center", paddingTop: "var(--space-xxl)" }}>
                <p className="label-upper">SELECT AN ACHIEVEMENT</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 901px) {
          .mobile-detail-card {
            display: none !important;
          }
        }
        @media (max-width: 900px) {
          .detail-grid {
            grid-template-columns: 1fr !important;
          }
          .desktop-inspector {
            display: none !important;
          }
          .mobile-detail-card {
            display: block;
          }
        }
      `}</style>
    </section>
  );
}
