"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { hardSkills } from "../data/index";

type Strip = {
  label: string;
  bg: string;
  color: string;
  shadow: string;
  items: typeof hardSkills;
  dir: "ltr" | "rtl";
  speed: number; // seconds for one full cycle
};

const ROWS: Strip[] = [
  {
    label: "// FRONTEND",
    bg: "var(--navy)",
    color: "#fff",
    shadow: "0 4px 0 var(--sky)",
    items: hardSkills.filter((s) => s.category === "Frontend"),
    dir: "ltr",
    speed: 28,
  },
  {
    label: "// BACKEND · DB",
    bg: "var(--orange-light)",
    color: "var(--orange)",
    shadow: "0 4px 0 var(--orange)",
    items: hardSkills.filter(
      (s) => s.category === "Backend" || s.category === "Database"
    ),
    dir: "rtl",
    speed: 22,
  },
  {
    label: "// AI · ML · TOOLS",
    bg: "var(--rose)",
    color: "var(--red)",
    shadow: "0 4px 0 var(--red)",
    items: hardSkills.filter(
      (s) =>
        s.category === "Data Science" ||
        s.category === "Machine Learning" ||
        s.category === "Tools" ||
        s.category === "Design"
    ),
    dir: "ltr",
    speed: 32,
  },
];

const LEVEL_COLOR: Record<string, string> = {
  expert: "var(--green-dark)",
  advanced: "var(--navy)",
  intermediate: "var(--orange)",
  beginner: "var(--fg-3)",
};

function LevelDot({ level }: { level: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: LEVEL_COLOR[level] ?? "var(--fg-3)",
        flexShrink: 0,
      }}
    />
  );
}

function SkillChip({
  skill,
  color,
}: {
  skill: (typeof hardSkills)[0];
  color: string;
}) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 18px",
        border: `2px solid ${color === "#fff" ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.18)"}`,
        borderRadius: 0,
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(2px)",
        whiteSpace: "nowrap",
        cursor: "default",
        userSelect: "none",
      }}
    >
      {imgOk ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={skill.icon}
          alt={skill.name}
          width={20}
          height={20}
          style={{ objectFit: "contain", flexShrink: 0 }}
          onError={() => setImgOk(false)}
        />
      ) : (
        <span style={{ width: 20, height: 20, display: "inline-block" }} />
      )}

      <span
        style={{
          fontFamily: "var(--font-accent)",
          fontWeight: 700,
          fontSize: 13,
          color,
          letterSpacing: "0.02em",
        }}
      >
        {skill.name}
      </span>

      <LevelDot level={skill.level} />
    </div>
  );
}

function Sep({ color }: { color: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "0 24px",
        opacity: 0.35,
        color,
        fontFamily: "var(--font-display)",
        fontSize: 22,
        userSelect: "none",
      }}
    >
      ×
    </span>
  );
}

function MarqueeStrip({ strip }: { strip: Strip }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const repeated = [...strip.items, ...strip.items, ...strip.items, ...strip.items];

  return (
    <div
      style={{
        background: strip.bg,
        borderTop: "2px solid #000",
        borderBottom: "2px solid #000",
        boxShadow: strip.shadow,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "6px 20px",
          borderBottom: `1.5px solid ${strip.color === "#fff" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"}`,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: strip.color,
            opacity: 0.65,
          }}
        >
          {strip.label}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: strip.color,
            opacity: 0.4,
            letterSpacing: "0.08em",
          }}
        >
          {strip.items.length} skills
        </span>
      </div>

      <div
        style={{
          padding: "12px 0",
          display: "flex",
          gap: 0,
        }}
      >
        <div
          ref={trackRef}
          className="marquee-track marquee-running"
          style={{
            animationDuration: `${strip.speed}s`,
            animationDirection: strip.dir === "rtl" ? "reverse" : "normal",
            gap: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          {repeated.map((skill, i) => (
            <React.Fragment key={`${skill.id}-${i}`}>
              <SkillChip skill={skill} color={strip.color} />
              <Sep color={strip.color} />
            </React.Fragment>
          ))}
        </div>
      </div>

      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(90deg, ${strip.bg} 0%, transparent 8%, transparent 92%, ${strip.bg} 100%)`,
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
    </div>
  );
}

function SectionHeader({ inView }: { inView: boolean }) {
  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 var(--gutter)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 16,
        marginBottom: "clamp(24px, 4vw, 40px)",
      }}
    >
      <div>
        <div className="section-tag" style={{ marginBottom: 12 }}>
          Tech Stack
        </div>
        <motion.h2
          className="display-lg"
          style={{ color: "var(--navy)", margin: 0 }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          SKILLS &amp;
          <br />
          <span
            style={{
              WebkitTextStroke: "3px var(--navy)",
              color: "transparent",
            }}
          >
            TOOLBOX
          </span>
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: "flex", flexDirection: "column", gap: 8 }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {Object.entries(LEVEL_COLOR).map(([lv, clr]) => (
            <div
              key={lv}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--fg-3)",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: clr,
                  display: "inline-block",
                }}
              />
              {lv}
            </div>
          ))}
        </div>
        <div
          className="sticker sticker--navy"
          style={{ alignSelf: "flex-end" }}
        >
          {hardSkills.length} technologies
        </div>
      </motion.div>
    </div>
  );
}

function MobileGrid({ inView }: { inView: boolean }) {
  const categories = [...new Set(hardSkills.map((s) => s.category))];

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 var(--gutter)",
        marginTop: 40,
      }}
    >
      {categories.map((cat, ci) => (
        <motion.div
          key={cat}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: 0.1 + ci * 0.07,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ marginBottom: 28 }}
        >
          <div className="section-tag" style={{ marginBottom: 12 }}>
            {cat}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {hardSkills
              .filter((s) => s.category === cat)
              .map((skill) => {
                const strip = ROWS.find((r) => r.items.some((i) => i.id === skill.id));
                const color = strip?.color ?? "var(--fg)";
                const bg = strip?.bg ?? "var(--bg-3)";
                return (
                  <div
                    key={skill.id}
                    className="card-raw"
                    style={{
                      background: bg,
                      padding: "8px 14px",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      boxShadow:
                        color === "#fff"
                          ? "3px 3px 0 rgba(0,0,0,0.8)"
                          : "3px 3px 0 #000",
                    }}
                  >
                    <LevelDot level={skill.level} />
                    <span
                      style={{
                        fontFamily: "var(--font-accent)",
                        fontWeight: 700,
                        fontSize: 13,
                        color,
                      }}
                    >
                      {skill.name}
                    </span>
                  </div>
                );
              })}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Marquee() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      ref={ref}
      id="skills"
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
          bottom: -40,
          right: -20,
          fontFamily: "var(--font-display)",
          fontSize: "clamp(100px, 18vw, 200px)",
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
        STACK
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <SectionHeader inView={inView} />
        <div
          style={{
            animationPlayState: paused ? "paused" : "running",
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <style>{`
            .marquee-running {
              animation-play-state: ${paused ? "paused" : "running"} !important;
            }
          `}</style>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {ROWS.map((strip) => (
              <motion.div
                key={strip.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: ROWS.indexOf(strip) * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <MarqueeStrip strip={strip} />
              </motion.div>
            ))}
          </div>
        </div>

        {isMobile && <MobileGrid inView={inView} />}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{
            maxWidth: 1200,
            margin: "clamp(32px, 5vw, 56px) auto 0",
            padding: "0 var(--gutter)",
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            alignItems: "center",
          }}
        >
          {[
            {
              label: "Frontend",
              count: hardSkills.filter((s) => s.category === "Frontend").length,
              v: "navy",
            },
            {
              label: "Backend",
              count: hardSkills.filter((s) => s.category === "Backend").length,
              v: "orange",
            },
            {
              label: "Database",
              count: hardSkills.filter((s) => s.category === "Database").length,
              v: "red",
            },
            {
              label: "AI / ML",
              count: hardSkills.filter(
                (s) =>
                  s.category === "Data Science" ||
                  s.category === "Machine Learning"
              ).length,
              v: "green",
            },
            {
              label: "Tools",
              count: hardSkills.filter(
                (s) => s.category === "Tools" || s.category === "Design"
              ).length,
              v: "sky",
            },
          ].map((cat) => (
            <div
              key={cat.label}
              className={`sticker sticker--${cat.v}`}
              style={{ fontSize: 12 }}
            >
              {cat.label}&nbsp;
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  opacity: 0.75,
                }}
              >
                ×{cat.count}
              </span>
            </div>
          ))}

          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--fg-3)",
            }}
          >
            <span style={{ opacity: 0.5 }}>hover to pause</span>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: paused ? "var(--orange)" : "var(--green-mid)",
                display: "inline-block",
                transition: "background 0.2s",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}