"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { hardSkills, softSkills, statistics } from "../data/index";

const EASE = [0.22, 1, 0.36, 1] as const;

const CATEGORIES = [
  "All",
  "Frontend",
  "Backend",
  "Database",
  "Mobile",
  "Data Science",
  "Machine Learning",
  "Tools",
  "Design",
] as const;

const CAT_THEME: Record<
  string,
  { bg: string; color: string; shadow: string; accent: string }
> = {
  Frontend:         { bg: "var(--navy)",        color: "#fff",            shadow: "var(--shadow-navy)",   accent: "var(--sky)" },
  Backend:          { bg: "var(--orange-light)", color: "var(--orange)",   shadow: "var(--shadow-orange)", accent: "var(--orange)" },
  Database:         { bg: "var(--rose)",         color: "var(--red)",      shadow: "var(--shadow-red)",    accent: "var(--red)" },
  Mobile:           { bg: "var(--sky-light)",    color: "var(--navy)",     shadow: "var(--shadow-navy)",   accent: "var(--navy)" },
  "Data Science":   { bg: "var(--lime-light)",   color: "var(--green-dark)", shadow: "var(--shadow-green)", accent: "var(--green-dark)" },
  "Machine Learning":{ bg: "var(--lime)",        color: "var(--green-dark)", shadow: "var(--shadow-green)", accent: "var(--green-dark)" },
  Tools:            { bg: "var(--bg-2)",         color: "var(--charcoal)", shadow: "var(--shadow-black)",  accent: "var(--charcoal)" },
  Design:           { bg: "var(--orange-pale)",  color: "var(--orange)",   shadow: "var(--shadow-orange)", accent: "var(--orange)" },
};

const DEFAULT_THEME = { bg: "var(--bg-3)", color: "var(--fg)", shadow: "var(--shadow-black)", accent: "var(--fg)" };

const LEVEL_MAP = {
  expert:       { label: "Expert",       bars: 4, color: "var(--green-dark)"  },
  advanced:     { label: "Advanced",     bars: 3, color: "var(--navy)"         },
  intermediate: { label: "Intermediate", bars: 2, color: "var(--orange)"       },
  beginner:     { label: "Beginner",     bars: 1, color: "var(--fg-3)"         },
};

function LevelBars({ level, color }: { level: string; color: string }) {
  const info = LEVEL_MAP[level as keyof typeof LEVEL_MAP] ?? LEVEL_MAP.beginner;
  return (
    <div style={{ display: "flex", gap: 3, alignItems: "flex-end" }}>
      {[1, 2, 3, 4].map((n) => (
        <div
          key={n}
          style={{
            width: 5,
            height: 5 + n * 3,
            background: n <= info.bars ? info.color : "rgba(0,0,0,0.12)",
            border: `1.5px solid ${n <= info.bars ? info.color : "rgba(0,0,0,0.1)"}`,
            borderRadius: 0,
            transition: "background 0.3s",
          }}
        />
      ))}
    </div>
  );
}

function SkillCard({
  skill,
  index,
  inView,
}: {
  skill: (typeof hardSkills)[0];
  index: number;
  inView: boolean;
}) {
  const theme = CAT_THEME[skill.category] ?? DEFAULT_THEME;
  const [imgOk, setImgOk] = useState(true);
  const [hovered, setHovered] = useState(false);

  const col = index % 3;
  const extraHeight = col === 0 ? 18 : col === 2 ? 10 : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 32, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 32, scale: 0.94 }}
      exit={{ opacity: 0, y: -16, scale: 0.94 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? theme.bg : "var(--bg-3)",
        border: "2px solid #000",
        boxShadow: hovered ? theme.shadow : "var(--shadow-black)",
        padding: `${18 + extraHeight}px 18px 18px`,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        cursor: "default",
        transition: "background 0.2s, box-shadow 0.15s, transform 0.15s",
        transform: hovered ? "translate(-2px,-2px)" : "translate(0,0)",
        breakInside: "avoid",
        marginBottom: 12,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div
          style={{
            width: 44,
            height: 44,
            background: hovered ? "rgba(255,255,255,0.2)" : "var(--bg-2)",
            border: "2px solid #000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background 0.2s",
          }}
        >
          {imgOk ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={skill.icon}
              alt={skill.name}
              width={26}
              height={26}
              style={{ objectFit: "contain" }}
              onError={() => setImgOk(false)}
            />
          ) : (
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 16,
                color: hovered ? theme.color : "var(--fg-2)",
              }}
            >
              {skill.name.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>

        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: hovered ? theme.color : "var(--fg-3)",
            opacity: hovered ? 0.8 : 0.6,
            lineHeight: 1.2,
            textAlign: "right",
            maxWidth: 80,
            transition: "color 0.2s",
          }}
        >
          {skill.category}
        </span>
      </div>

      <div>
        <div
          style={{
            fontFamily: "var(--font-accent)",
            fontWeight: 700,
            fontSize: 15,
            color: hovered ? theme.color : "var(--fg)",
            lineHeight: 1.2,
            marginBottom: 2,
            transition: "color 0.2s",
          }}
        >
          {skill.name}
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: hovered ? theme.color : "var(--fg-3)",
            opacity: hovered ? 0.65 : 0.5,
            letterSpacing: "0.06em",
            transition: "color 0.2s",
          }}
        >
          {skill.yearsOfExperience}yr{skill.yearsOfExperience !== 1 ? "s" : ""} exp
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <LevelBars level={skill.level} color={hovered ? theme.color : "var(--fg)"} />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: hovered
              ? theme.color
              : LEVEL_MAP[skill.level as keyof typeof LEVEL_MAP]?.color ?? "var(--fg-3)",
            transition: "color 0.2s",
          }}
        >
          {LEVEL_MAP[skill.level as keyof typeof LEVEL_MAP]?.label ?? skill.level}
        </span>
      </div>
    </motion.div>
  );
}

function SoftSkillCard({
  skill,
  index,
  inView,
}: {
  skill: (typeof softSkills)[0];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const variants = ["navy", "orange", "red", "green", "sky", "white"] as const;
  const v = variants[index % variants.length];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.08, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: "2px solid #000",
        boxShadow: hovered ? "6px 6px 0 #000" : "4px 4px 0 #000",
        padding: "20px 22px",
        background: "var(--bg-3)",
        transition: "box-shadow 0.15s, transform 0.15s",
        transform: hovered ? "translate(-2px,-2px)" : "translate(0,0)",
        breakInside: "avoid",
        marginBottom: 12,
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        <div
          style={{
            width: 40,
            height: 40,
            border: "2px solid #000",
            background: hovered ? "var(--navy)" : "var(--bg-2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background 0.2s",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={skill.icon}
            alt={skill.name}
            width={22}
            height={22}
            style={{ objectFit: "contain", filter: hovered ? "brightness(10)" : "none", transition: "filter 0.2s" }}
          />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span
              style={{
                fontFamily: "var(--font-accent)",
                fontWeight: 700,
                fontSize: 14,
                color: "var(--fg)",
                lineHeight: 1,
              }}
            >
              {skill.nameEn}
            </span>
            <span className={`sticker sticker--${v}`} style={{ fontSize: 10, padding: "3px 8px" }}>
              {skill.category}
            </span>
          </div>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: "var(--fg-3)",
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            {skill.description}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 10 }}>
            {skill.examples.map((ex) => (
              <span
                key={ex}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.06em",
                  padding: "3px 8px",
                  border: "1.5px solid rgba(0,0,0,0.15)",
                  background: "var(--bg-2)",
                  color: "var(--fg-3)",
                  whiteSpace: "nowrap",
                }}
              >
                {ex}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FilterBar({
  active,
  onChange,
  counts,
}: {
  active: string;
  onChange: (c: string) => void;
  counts: Record<string, number>;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 6,
        marginBottom: "clamp(24px, 4vw, 36px)",
      }}
    >
      {CATEGORIES.map((cat) => {
        const count = cat === "All" ? hardSkills.length : (counts[cat] ?? 0);
        const isActive = active === cat;
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "var(--font-accent)",
              fontWeight: 700,
              fontSize: 12,
              padding: "7px 14px",
              border: "2px solid #000",
              borderRadius: 0,
              background: isActive ? "var(--navy)" : "var(--bg-3)",
              color: isActive ? "#fff" : "var(--fg)",
              cursor: "pointer",
              boxShadow: isActive ? "3px 3px 0 var(--sky)" : "3px 3px 0 #000",
              transform: isActive ? "translate(-1px,-1px)" : "translate(0,0)",
              transition: "all 0.15s ease",
            }}
          >
            {cat}
            {count > 0 && (
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  opacity: 0.65,
                }}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function BigStat({
  value,
  label,
  bg,
  color,
  shadow,
  delay,
  inView,
}: {
  value: string;
  label: string;
  bg: string;
  color: string;
  shadow: string;
  delay: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay, ease: EASE }}
      style={{
        background: bg,
        border: "2px solid #000",
        boxShadow: shadow,
        padding: "20px 24px",
        flex: 1,
        minWidth: 120,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(32px, 5vw, 52px)",
          fontWeight: 400,
          lineHeight: 1,
          color,
          letterSpacing: "-0.02em",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color,
          opacity: 0.65,
          marginTop: 6,
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [tab, setTab] = useState<"hard" | "soft">("hard");

  const categoryCounts = Object.fromEntries(
    CATEGORIES.filter((c) => c !== "All").map((c) => [
      c,
      hardSkills.filter((s) => s.category === c).length,
    ])
  );

  const filtered =
    activeFilter === "All"
      ? hardSkills
      : hardSkills.filter((s) => s.category === activeFilter);

  return (
    <section
      ref={sectionRef}
      id="skills-detail"
      style={{
        background: "var(--bg)",
        paddingTop: "clamp(60px, 10vw, 100px)",
        paddingBottom: "clamp(60px, 10vw, 100px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -30,
          left: -30,
          fontFamily: "var(--font-display)",
          fontSize: "clamp(120px, 20vw, 240px)",
          fontWeight: 400,
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: "1px rgba(26,35,126,0.05)",
          pointerEvents: "none",
          userSelect: "none",
          whiteSpace: "nowrap",
          zIndex: 0,
        }}
      >
        SKILLS
      </div>

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 var(--gutter)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 20,
            marginBottom: "clamp(28px, 5vw, 48px)",
          }}
        >
          <div>
            <div className="section-tag" style={{ marginBottom: 12 }}>
              Capabilities
            </div>
            <motion.h2
              className="display-lg"
              style={{ color: "var(--navy)", margin: 0 }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: EASE }}
            >
              WHAT I
              <br />
              <span
                style={{
                  WebkitTextStroke: "3px var(--navy)",
                  color: "transparent",
                }}
              >
                KNOW
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
            style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}
          >
            <div className="sticker sticker--orange">
              {statistics.technologiesUsed} technologies mastered
            </div>
            <div className="sticker sticker--navy">
              {statistics.yearsOfExperience}+ years building
            </div>
          </motion.div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: "clamp(32px, 5vw, 52px)",
          }}
        >
          <BigStat
            value={`${hardSkills.filter((s) => s.level === "expert").length}`}
            label="Expert Level"
            bg="var(--navy)" color="#fff" shadow="4px 4px 0 var(--sky)"
            delay={0.1} inView={inView}
          />
          <BigStat
            value={`${hardSkills.filter((s) => s.level === "advanced").length}`}
            label="Advanced"
            bg="var(--orange-light)" color="var(--orange)" shadow="4px 4px 0 var(--orange)"
            delay={0.16} inView={inView}
          />
          <BigStat
            value={`${hardSkills.filter((s) => s.level === "intermediate").length}`}
            label="Intermediate"
            bg="var(--rose)" color="var(--red)" shadow="4px 4px 0 var(--red)"
            delay={0.22} inView={inView}
          />
          <BigStat
            value={`${softSkills.length}`}
            label="Soft Skills"
            bg="var(--lime)" color="var(--green-dark)" shadow="4px 4px 0 var(--green-dark)"
            delay={0.28} inView={inView}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.3, ease: EASE }}
          style={{
            display: "inline-flex",
            border: "2px solid #000",
            boxShadow: "4px 4px 0 #000",
            marginBottom: "clamp(24px, 4vw, 36px)",
            overflow: "hidden",
          }}
        >
          {(["hard", "soft"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "10px 28px",
                fontFamily: "var(--font-accent)",
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                border: "none",
                borderRight: t === "hard" ? "2px solid #000" : "none",
                background: tab === t ? "var(--navy)" : "var(--bg-3)",
                color: tab === t ? "#fff" : "var(--fg)",
                cursor: "pointer",
                transition: "background 0.2s, color 0.2s",
              }}
            >
              {t === "hard" ? "⚡ Hard Skills" : "🧠 Soft Skills"}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {tab === "hard" && (
            <motion.div
              key="hard"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <FilterBar
                active={activeFilter}
                onChange={(c) => setActiveFilter(c)}
                counts={categoryCounts}
              />

              <div
                style={{
                  columns: "repeat(auto-fill, minmax(180px, 1fr))",
                  columnGap: 12,
                }}
              >
                <AnimatePresence>
                  {filtered.map((skill, i) => (
                    <SkillCard
                      key={skill.id}
                      skill={skill}
                      index={i}
                      inView={inView}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {filtered.length === 0 && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "60px 20px",
                    fontFamily: "var(--font-display)",
                    fontSize: 40,
                    color: "var(--border-light)",
                  }}
                >
                  NOTHING HERE
                </div>
              )}

              <div
                style={{
                  marginTop: 20,
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--fg-3)",
                }}
              >
                {filtered.length} of {hardSkills.length} skills shown
                {activeFilter !== "All" && (
                  <button
                    onClick={() => setActiveFilter("All")}
                    style={{
                      marginLeft: 12,
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: "0.1em",
                      textDecoration: "underline",
                      color: "var(--orange)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    clear filter
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {tab === "soft" && (
            <motion.div
              key="soft"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 28,
                  padding: "14px 18px",
                  border: "2px solid #000",
                  boxShadow: "4px 4px 0 var(--navy)",
                  background: "var(--sky-light)",
                }}
              >
                <span style={{ fontSize: 20 }}>🧠</span>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    color: "var(--navy)",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  Beyond code — these are the human skills that make me an
                  effective collaborator and leader.
                </p>
              </div>

              <div
                style={{
                  columns: "repeat(auto-fill, minmax(280px, 1fr))",
                  columnGap: 12,
                }}
              >
                {softSkills.map((skill, i) => (
                  <SoftSkillCard
                    key={skill.id}
                    skill={skill}
                    index={i}
                    inView={inView}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5, ease: EASE }}
          style={{
            marginTop: "clamp(40px, 7vw, 72px)",
            border: "2px solid #000",
            boxShadow: "6px 6px 0 var(--navy)",
            background: "var(--navy)",
            padding: "28px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(22px, 3.5vw, 36px)",
                color: "#fff",
                lineHeight: 1,
                marginBottom: 6,
              }}
            >
              ALWAYS LEARNING
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.5,
              }}
            >
              Currently leveling up: Next.js 15, Hono.js &amp; AI Integration
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <a
              href="#projects"
              className="btn-raw btn-raw--sky"
              style={{ fontSize: 12, padding: "9px 18px" }}
            >
              See my projects →
            </a>
            <a
              href={`mailto:reyjunoalcannavaro@gmail.com`}
              className="btn-raw"
              style={{
                fontSize: 12,
                padding: "9px 18px",
                background: "transparent",
                color: "#fff",
                borderColor: "rgba(255,255,255,0.35)",
                boxShadow: "3px 3px 0 rgba(255,255,255,0.2)",
              }}
            >
              Hire me
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}