"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  FiAward, FiMic, FiBriefcase, FiStar,
  FiMapPin, FiCalendar, FiUsers,
} from "react-icons/fi";
import { achievements, statistics } from "../data/index";

const EASE = [0.22, 1, 0.36, 1] as const;
const FILTERS = ["All", "Competition", "Leadership", "Organization", "Honor"] as const;
const TYPE_THEME: Record<string, {
  bg: string; color: string; shadow: string;
  sticker: string; icon: React.ReactNode; label: string;
}> = {
  competition: {
    bg: "var(--navy)",        color: "#fff",
    shadow: "4px 4px 0 var(--sky)",
    sticker: "navy", icon: <FiAward size={12} />, label: "Competition",
  },
  position: {
    bg: "var(--orange-light)", color: "var(--orange)",
    shadow: "4px 4px 0 var(--orange)",
    sticker: "orange", icon: <FiBriefcase size={12} />, label: "Position",
  },
  speaker: {
    bg: "var(--sky-light)",   color: "var(--navy)",
    shadow: "4px 4px 0 var(--navy)",
    sticker: "sky", icon: <FiMic size={12} />, label: "Speaker",
  },
  award: {
    bg: "var(--lime)",        color: "var(--green-dark)",
    shadow: "4px 4px 0 var(--green-dark)",
    sticker: "green", icon: <FiStar size={12} />, label: "Award",
  },
};
const DEFAULT_TYPE_THEME = TYPE_THEME.competition;
const LEVEL_THEME: Record<string, { label: string; sticker: string; dot: string }> = {
  national: { label: "National",  sticker: "red",    dot: "var(--red)"        },
  district: { label: "District",  sticker: "navy",   dot: "var(--navy)"       },
  school:   { label: "School",    sticker: "white",  dot: "var(--fg-3)"       },
};

const RANK_LABEL: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

function TimelineCard({
  achievement: a,
  index,
  inView,
  isLeft,
}: {
  achievement: (typeof achievements)[0];
  index: number;
  inView: boolean;
  isLeft: boolean;
}) {
  const typeTheme  = TYPE_THEME[a.type]  ?? DEFAULT_TYPE_THEME;
  const levelTheme = LEVEL_THEME[a.level] ?? LEVEL_THEME.school;
  const [imgOk, setImgOk] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -40 : 40 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: "2px solid #000",
        boxShadow: hovered ? typeTheme.shadow.replace("4px 4px", "8px 8px") : typeTheme.shadow,
        background: hovered ? typeTheme.bg : "var(--bg-3)",
        transform: hovered ? "translate(-2px,-2px)" : "translate(0,0)",
        transition: "all 0.15s ease",
        overflow: "hidden",
        cursor: "pointer",
      }}
      onClick={() => setExpanded((e) => !e)}
    >
      {imgOk && a.image && (
        <div
          style={{
            position: "relative",
            height: 140,
            borderBottom: "2px solid #000",
            background: typeTheme.bg,
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <Image
            src={`/prestasi/${a.image.split("/").pop()}`}
            alt={a.title}
            fill
            style={{ objectFit: "cover", objectPosition: "center top" }}
            onError={() => setImgOk(false)}
          />
          <div
            style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)",
              zIndex: 2, pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute", top: 10, right: 10, zIndex: 3,
              width: 36, height: 36,
              background: "rgba(255,255,255,0.92)",
              border: "2px solid #000",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18,
            }}
          >
            {a.rank ? RANK_LABEL[a.rank] ?? a.badge : a.badge}
          </div>
          <div
            style={{
              position: "absolute", bottom: 10, left: 12, zIndex: 3,
              fontFamily: "var(--font-display)",
              fontSize: 28, fontWeight: 400, lineHeight: 1,
              color: "#fff", letterSpacing: "-0.02em",
              textShadow: "2px 2px 0 rgba(0,0,0,0.4)",
            }}
          >
            {a.year}
          </div>
        </div>
      )}

      <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          <span className={`sticker sticker--${levelTheme.sticker}`} style={{ fontSize: 10 }}>
            <span
              style={{
                width: 5, height: 5, borderRadius: "50%",
                background: levelTheme.dot, display: "inline-block",
              }}
            />
            {levelTheme.label}
          </span>
          <span className={`sticker sticker--${typeTheme.sticker}`} style={{ fontSize: 10 }}>
            {typeTheme.icon} {typeTheme.label}
          </span>
          {a.rank && (
            <span className="sticker sticker--red" style={{ fontSize: 10 }}>
              Rank #{a.rank}
            </span>
          )}
        </div>

        <div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(17px, 2.5vw, 22px)",
              fontWeight: 400, lineHeight: 0.95,
              letterSpacing: "-0.02em",
              color: hovered ? typeTheme.color : "var(--navy)",
              margin: "0 0 6px",
              transition: "color 0.15s",
            }}
          >
            {a.titleShort ?? a.title}
          </h3>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <span
              style={{
                display: "flex", alignItems: "center", gap: 4,
                fontFamily: "var(--font-mono)", fontSize: 9,
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: hovered ? typeTheme.color : "var(--fg-3)",
                transition: "color 0.15s",
              }}
            >
              <FiCalendar size={9} /> {a.date}
            </span>
            <span
              style={{
                display: "flex", alignItems: "center", gap: 4,
                fontFamily: "var(--font-mono)", fontSize: 9,
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: hovered ? typeTheme.color : "var(--fg-3)",
                transition: "color 0.15s",
              }}
            >
              <FiMapPin size={9} /> {a.level}
            </span>
          </div>
        </div>

        <div
          style={{
            padding: "7px 10px",
            background: hovered ? "rgba(255,255,255,0.15)" : "var(--bg-2)",
            border: "1.5px solid rgba(0,0,0,0.1)",
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.08em",
            color: hovered ? typeTheme.color : "var(--fg-3)",
            transition: "all 0.15s",
            display: "flex", alignItems: "center", gap: 5,
          }}
        >
          <FiUsers size={9} />
          {a.organizer}
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              style={{ overflow: "hidden" }}
            >
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  lineHeight: 1.65,
                  color: hovered ? typeTheme.color : "var(--fg-2)",
                  margin: 0,
                  paddingTop: 4,
                  borderTop: "1.5px dashed rgba(0,0,0,0.12)",
                  transition: "color 0.15s",
                }}
              >
                {a.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: hovered ? typeTheme.color : "var(--fg-3)",
            opacity: 0.65,
            transition: "color 0.15s",
          }}
        >
          {expanded ? "▲ collapse" : "▼ expand"}
        </div>
      </div>
    </motion.div>
  );
}

function FeaturedCard({ achievement: a, inView }: { achievement: (typeof achievements)[0]; inView: boolean }) {
  const typeTheme  = TYPE_THEME[a.type]  ?? DEFAULT_TYPE_THEME;
  const levelTheme = LEVEL_THEME[a.level] ?? LEVEL_THEME.school;
  const [imgOk, setImgOk] = useState(true);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: "2px solid #000",
        boxShadow: hovered ? "10px 10px 0 #000" : "6px 6px 0 #000",
        background: "var(--bg-3)",
        transform: hovered ? "translate(-3px,-3px)" : "translate(0,0)",
        transition: "all 0.15s ease",
        overflow: "hidden",
      }}
    >
      <style>{`
        @media (min-width: 640px) { .feat-inner { grid-template-columns: 1.2fr 1fr !important; } }
      `}</style>
      <div
        className="feat-inner"
        style={{ display: "grid", gridTemplateColumns: "1fr" }}
      >
        <div
          style={{
            position: "relative", minHeight: 280,
            background: typeTheme.bg, borderBottom: "2px solid #000",
            overflow: "hidden",
          }}
        >
          {imgOk && a.image ? (
            <Image
              src={`/prestasi/${a.image.split("/").pop()}`}
              alt={a.title} fill
              style={{ objectFit: "cover", objectPosition: "center top" }}
              onError={() => setImgOk(false)}
            />
          ) : (
            <div
              style={{
                position: "absolute", inset: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)", fontSize: 80,
                  color: typeTheme.color, opacity: 0.18,
                }}
              >
                {a.badge}
              </span>
            </div>
          )}
          <div
            style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)",
              zIndex: 2, pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute", top: 14, left: 14, zIndex: 3,
              background: "var(--sky)", border: "2px solid #000",
              padding: "4px 12px",
              fontFamily: "var(--font-mono)", fontSize: 9,
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: "var(--navy)", fontWeight: 700,
            }}
          >
            ★ Highlight
          </div>
          <div
            style={{
              position: "absolute", bottom: 16, left: 16, zIndex: 3,
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 6vw, 56px)",
              fontWeight: 400, lineHeight: 1,
              color: "#fff", letterSpacing: "-0.03em",
              textShadow: "3px 3px 0 rgba(0,0,0,0.4)",
            }}
          >
            {a.year}
          </div>
          {a.rank && (
            <div
              style={{
                position: "absolute", bottom: 14, right: 14, zIndex: 3,
                width: 44, height: 44,
                background: "rgba(255,255,255,0.95)",
                border: "2px solid #000",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22,
              }}
            >
              {RANK_LABEL[a.rank] ?? a.badge}
            </div>
          )}
        </div>

        <div
          style={{
            padding: "28px 28px",
            borderLeft: "2px solid #000",
            display: "flex", flexDirection: "column", gap: 16,
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            <span className={`sticker sticker--${levelTheme.sticker}`} style={{ fontSize: 10 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: levelTheme.dot, display: "inline-block" }} />
              {levelTheme.label}
            </span>
            <span className={`sticker sticker--${typeTheme.sticker}`} style={{ fontSize: 10 }}>
              {typeTheme.icon} {typeTheme.label}
            </span>
          </div>

          <div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(22px, 3.5vw, 36px)",
                fontWeight: 400, lineHeight: 0.92,
                letterSpacing: "-0.03em",
                color: hovered ? typeTheme.color : "var(--navy)",
                margin: "0 0 8px",
                transition: "color 0.15s",
              }}
            >
              {a.title}
            </h3>
            <div
              style={{
                fontFamily: "var(--font-mono)", fontSize: 10,
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: "var(--fg-3)",
              }}
            >
              {a.date}
            </div>
          </div>

          <p
            style={{
              fontFamily: "var(--font-body)", fontSize: 13,
              lineHeight: 1.7, color: "var(--fg-2)", margin: 0,
            }}
          >
            {a.description}
          </p>

          <div
            style={{
              padding: "10px 14px",
              background: hovered ? typeTheme.bg : "var(--bg-2)",
              border: "1.5px solid rgba(0,0,0,0.12)",
              display: "flex", alignItems: "center", gap: 6,
              transition: "background 0.2s",
            }}
          >
            <FiUsers size={10} style={{ color: hovered ? typeTheme.color : "var(--fg-3)", transition: "color 0.2s", flexShrink: 0 }} />
            <span
              style={{
                fontFamily: "var(--font-mono)", fontSize: 10,
                letterSpacing: "0.06em",
                color: hovered ? typeTheme.color : "var(--fg-2)",
                transition: "color 0.2s",
              }}
            >
              {a.organizer}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TimelineNode({ type }: { type: string }) {
  const theme = TYPE_THEME[type] ?? DEFAULT_TYPE_THEME;
  return (
    <div
      style={{
        width: 32, height: 32,
        background: theme.bg,
        border: "2px solid #000",
        boxShadow: "3px 3px 0 #000",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, zIndex: 2, color: theme.color,
      }}
    >
      {theme.icon}
    </div>
  );
}

function FilterBar({ active, onChange }: { active: string; onChange: (f: string) => void }) {
  const counts: Record<string, number> = { All: achievements.length };
  FILTERS.slice(1).forEach((f) => {
    counts[f] = achievements.filter((a) => a.category === f).length;
  });

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      {FILTERS.map((f) => {
        const isActive = active === f;
        return (
          <button
            key={f}
            onClick={() => onChange(f)}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontFamily: "var(--font-accent)", fontWeight: 700, fontSize: 12,
              padding: "7px 14px",
              border: "2px solid #000", borderRadius: 0,
              background: isActive ? "var(--navy)" : "var(--bg-3)",
              color: isActive ? "#fff" : "var(--fg)",
              cursor: "pointer",
              boxShadow: isActive ? "3px 3px 0 var(--sky)" : "3px 3px 0 #000",
              transform: isActive ? "translate(-1px,-1px)" : "translate(0,0)",
              transition: "all 0.15s ease",
            }}
          >
            {f}
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, opacity: 0.65 }}>
              {counts[f] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function Prestasi() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });
  const [filter, setFilter] = useState("All");

  const featured = achievements.filter((a) => a.featured);
  const filtered  = filter === "All"
    ? achievements.filter((a) => !a.featured)
    : achievements.filter((a) => a.category === filter && !a.featured);

  const byYear = filtered.reduce<Record<number, typeof achievements>>((acc, a) => {
    (acc[a.year] ??= []).push(a);
    return acc;
  }, {});
  const years = Object.keys(byYear).map(Number).sort((a, b) => b - a);

  return (
    <section
      ref={sectionRef}
      id="achievements"
      style={{
        background: "var(--bg)",
        paddingTop: "clamp(60px, 10vw, 100px)",
        paddingBottom: "clamp(60px, 10vw, 100px)",
        position: "relative", overflow: "hidden",
        borderTop: "2px solid var(--border-light)",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute", top: -20, left: -40,
          fontFamily: "var(--font-display)",
          fontSize: "clamp(100px, 18vw, 200px)",
          fontWeight: 400, lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: "1px rgba(26,35,126,0.05)",
          pointerEvents: "none", userSelect: "none",
          whiteSpace: "nowrap", zIndex: 0,
        }}
      >
        WINS
      </div>

      <div
        style={{
          maxWidth: 1200, margin: "0 auto",
          padding: "0 var(--gutter)",
          position: "relative", zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex", alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap", gap: 20,
            marginBottom: "clamp(28px, 5vw, 52px)",
          }}
        >
          <div>
            <div className="section-tag" style={{ marginBottom: 12 }}>
              Achievements
            </div>
            <motion.h2
              className="display-lg"
              style={{ color: "var(--navy)", margin: 0 }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: EASE }}
            >
              WINS &amp;
              <br />
              <span style={{ WebkitTextStroke: "3px var(--navy)", color: "transparent" }}>
                HONOURS
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
            style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}
          >
            <div className="sticker sticker--red">
              {statistics.nationalAwards}× National Winner
            </div>
            <div className="sticker sticker--navy">
              {statistics.achievements} total achievements
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: 8,
            marginBottom: "clamp(28px, 5vw, 48px)",
          }}
        >
          {[
            { val: `${statistics.nationalAwards}`, label: "National",    bg: "var(--rose)",         color: "var(--red)",       shadow: "4px 4px 0 var(--red)"        },
            { val: `${statistics.competitionWins}`,label: "Competitions", bg: "var(--navy)",         color: "#fff",             shadow: "4px 4px 0 var(--sky)"        },
            { val: `${statistics.leadershipRoles}`, label: "Leadership",  bg: "var(--orange-light)", color: "var(--orange)",    shadow: "4px 4px 0 var(--orange)"     },
            { val: `${achievements.filter(a => a.type === "award" || a.type === "speaker").length}`, label: "Honours / Talks", bg: "var(--lime)", color: "var(--green-dark)", shadow: "4px 4px 0 var(--green-dark)" },
          ].map(({ val, label, bg, color, shadow }) => (
            <div
              key={label}
              style={{
                border: "2px solid #000", boxShadow: shadow,
                background: bg, padding: "18px 20px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(28px, 5vw, 48px)",
                  fontWeight: 400, lineHeight: 1,
                  color, letterSpacing: "-0.02em",
                }}
              >
                {val}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)", fontSize: 9,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  color, opacity: 0.65, marginTop: 6,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </motion.div>

        {featured.length > 0 && (
          <div style={{ marginBottom: "clamp(36px, 6vw, 60px)" }}>
            <div className="section-tag" style={{ marginBottom: 16 }}>
              Highlights
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {featured.map((a) => (
                <FeaturedCard key={a.id} achievement={a} inView={inView} />
              ))}
            </div>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.25, ease: EASE }}
          style={{ marginBottom: "clamp(24px, 4vw, 40px)" }}
        >
          <div className="section-tag" style={{ marginBottom: 12 }}>Timeline</div>
          <FilterBar active={filter} onChange={setFilter} />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {years.map((year) => (
              <div key={year} style={{ marginBottom: 40 }}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, ease: EASE }}
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    marginBottom: 20,
                  }}
                >
                  <div
                    style={{
                      background: "var(--navy)", border: "2px solid #000",
                      boxShadow: "3px 3px 0 var(--sky)",
                      padding: "6px 18px",
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(22px, 3vw, 32px)",
                      fontWeight: 400, lineHeight: 1,
                      color: "#fff", letterSpacing: "-0.02em",
                    }}
                  >
                    {year}
                  </div>
                  <div
                    style={{
                      flex: 1, height: 2,
                      background: "repeating-linear-gradient(90deg, #000 0, #000 6px, transparent 6px, transparent 12px)",
                      opacity: 0.15,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-mono)", fontSize: 9,
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      color: "var(--fg-3)",
                    }}
                  >
                    {byYear[year].length} item{byYear[year].length !== 1 ? "s" : ""}
                  </span>
                </motion.div>

                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {byYear[year].map((a, i) => (
                    <div key={a.id} style={{ display: "flex", gap: 0 }}>
                      <div
                        style={{
                          display: "flex", flexDirection: "column",
                          alignItems: "center", gap: 0,
                          paddingRight: 16, flexShrink: 0,
                          width: 48,
                        }}
                      >
                        <TimelineNode type={a.type} />
                        {/* Vertical line (except last in year) */}
                        {i < byYear[year].length - 1 && (
                          <div
                            style={{
                              flex: 1, width: 2, minHeight: 24,
                              background: "repeating-linear-gradient(180deg, #000 0, #000 4px, transparent 4px, transparent 8px)",
                              opacity: 0.12, margin: "4px 0",
                            }}
                          />
                        )}
                      </div>

                      <div style={{ flex: 1, paddingBottom: i < byYear[year].length - 1 ? 12 : 0 }}>
                        <TimelineCard
                          achievement={a}
                          index={i}
                          inView={inView}
                          isLeft={i % 2 === 0}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div
                style={{
                  textAlign: "center", padding: "60px 20px",
                  border: "2px dashed rgba(0,0,0,0.12)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(28px, 5vw, 48px)",
                    color: "var(--border-light)", marginBottom: 12,
                  }}
                >
                  NOTHING HERE
                </div>
                <button onClick={() => setFilter("All")} className="btn-raw" style={{ fontSize: 12 }}>
                  Show all →
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5, ease: EASE }}
          style={{
            marginTop: "clamp(40px, 7vw, 72px)",
            border: "2px solid #000",
            boxShadow: "6px 6px 0 var(--red)",
            background: "var(--rose)",
            padding: "24px 28px",
            display: "flex", alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap", gap: 16,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(20px, 3vw, 32px)",
                lineHeight: 1, color: "var(--red)",
                marginBottom: 4,
              }}
            >
              STILL COMPETING
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)", fontSize: 13,
                color: "var(--red)", opacity: 0.7, lineHeight: 1.5,
              }}
            >
              Always looking for the next challenge — open to collaborations & opportunities.
            </div>
          </div>
          <a
            href={`mailto:reyjunoalcannavaro@gmail.com`}
            className="btn-raw btn-raw--navy"
            style={{ fontSize: 12, padding: "9px 18px" }}
          >
            Get in touch →
          </a>
        </motion.div>
      </div>
    </section>
  );
}