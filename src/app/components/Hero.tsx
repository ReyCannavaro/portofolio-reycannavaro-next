"use client";

import React from "react";
import { motion, type MotionProps } from "framer-motion";
import Image from "next/image";
import { personalInfo, socialLinks, statistics, currentStatus, educationHistory } from "../data/index";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: EASE },
});

const TraitPill = ({ icon, label, color }: { icon: string; label: string; color: string }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
      padding: "10px 8px",
      background: color,
      border: "1px solid rgba(0,0,0,0.07)",
      borderRadius: 14,
      boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.04)",
      minWidth: 68,
      flex: 1,
    }}
  >
    <span style={{ fontSize: "1.2rem" }}>{icon}</span>
    <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "#111110", textAlign: "center", lineHeight: 1.3 }}>
      {label}
    </span>
  </div>
);

export default function Hero() {
  const age = personalInfo.age;
  const edu = educationHistory[0];

  return (
    <section
      id="about"
      style={{
        minHeight: "100svh",
        padding: "6rem 1rem 2rem",
        background: "var(--bg)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div
          {...fadeUp(0.05)}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
            fontSize: "0.72rem",
            fontFamily: "var(--font-mono)",
            color: "var(--fg-3)",
            letterSpacing: "0.05em",
          }}
        >
          <span>{new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
          <span>{personalInfo.title}</span>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gridTemplateRows: "auto",
            gap: 10,
          }}
        >
          <motion.div
            {...fadeUp(0.1)}
            style={{
              gridColumn: "1 / 5",
              gridRow: "1 / 3",
              background: "#fff",
              borderRadius: 22,
              border: "1px solid rgba(0,0,0,0.07)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 6px 20px rgba(0,0,0,0.05)",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 40, height: 40,
                  background: "linear-gradient(135deg, #FFA94D, #FF6B35)",
                  borderRadius: 12,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.1rem",
                }}
              >
                🔔
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "var(--fg)" }}>About User</div>
                <div style={{ fontSize: "0.68rem", color: "var(--fg-3)", fontFamily: "var(--font-mono)" }}>
                  {personalInfo.location}
                </div>
              </div>
            </div>

            <p style={{ fontSize: "0.78rem", color: "var(--fg-2)", lineHeight: 1.7, margin: 0 }}>
              {personalInfo.bio}
            </p>

            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <TraitPill icon="🎯" label="Critical Thinking" color="#FFF0E6" />
              <TraitPill icon="👁️" label="Attention to Detail" color="#F0F0EE" />
              <TraitPill icon="💡" label="Creativity" color="#F0EEFF" />
              <TraitPill icon="📊" label="Visual Aesthetic" color="#E8F4FF" />
              <TraitPill icon="📁" label="Organized" color="#F0F0EE" />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: "auto" }}>
              <span className="status-dot" />
              <span style={{ fontSize: "0.72rem", color: "var(--fg-2)" }}>
                {currentStatus.availableForWork}
              </span>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp(0.15)}
            style={{
              gridColumn: "5 / 9",
              gridRow: "1 / 4",
              background: "#E8E8E6",
              borderRadius: 22,
              border: "1px solid rgba(0,0,0,0.07)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 6px 20px rgba(0,0,0,0.05)",
              overflow: "hidden",
              position: "relative",
              minHeight: 380,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%", left: "50%",
                transform: "translate(-50%, -55%)",
                width: 280, height: 280,
                borderRadius: "50%",
                border: "32px solid rgba(0,0,0,0.10)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 180, height: 240,
                  borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                  background: "linear-gradient(180deg, #C8C8C5 0%, #A8A8A5 100%)",
                  border: "3px solid rgba(255,255,255,0.6)",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Image
                  src={personalInfo.profileImage}
                  alt={personalInfo.profileImageAlt}
                  fill
                  style={{ objectFit: "cover", objectPosition: "top" }}
                  onError={() => {}}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp(0.2)}
            style={{
              gridColumn: "9 / 13",
              gridRow: "1 / 2",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              paddingBottom: 4,
            }}
          >
            <div style={{ fontSize: "0.7rem", color: "var(--fg-3)", fontFamily: "var(--font-mono)", marginBottom: 6 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
                Developer
              </span>
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                letterSpacing: "-0.04em",
                lineHeight: 0.92,
                color: "var(--fg)",
                margin: 0,
              }}
            >
              {personalInfo.name.split(" ").map((word, i) => (
                <span key={i} style={{ display: "block" }}>{word}</span>
              ))}
            </h1>
            <div style={{ marginTop: 8, fontSize: "0.78rem", color: "var(--fg-3)" }}>
              {personalInfo.location}
            </div>
          </motion.div>

          <motion.div
            {...fadeUp(0.25)}
            style={{
              gridColumn: "9 / 11",
              gridRow: "2 / 3",
              background: "#fff",
              borderRadius: 22,
              border: "1px solid rgba(0,0,0,0.07)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 6px 20px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.2rem",
              gap: 4,
            }}
          >
            <div
              style={{
                position: "relative",
                width: 64, height: 64,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <svg width="64" height="64" viewBox="0 0 64 64" style={{ position: "absolute", inset: 0 }}>
                <circle cx="32" cy="32" r="28" fill="none" stroke="#E8E8E6" strokeWidth="6" />
                <circle
                  cx="32" cy="32" r="28"
                  fill="none" stroke="var(--accent)" strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 28 * 0.75} ${2 * Math.PI * 28}`}
                  transform="rotate(-90 32 32)"
                />
              </svg>
              <span style={{ fontWeight: 800, fontSize: "1.3rem", color: "var(--accent)", position: "relative", zIndex: 1 }}>
                {age}
              </span>
            </div>
            <span style={{ fontSize: "0.6rem", color: "var(--fg-3)", fontFamily: "var(--font-mono)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              yrs old
            </span>
          </motion.div>

          <motion.div
            {...fadeUp(0.28)}
            style={{
              gridColumn: "11 / 13",
              gridRow: "2 / 3",
              background: "var(--accent)",
              borderRadius: 22,
              border: "1px solid rgba(0,0,0,0.07)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 6px 20px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.2rem",
              gap: 2,
            }}
          >
            <span style={{ fontWeight: 800, fontSize: "2rem", color: "#fff", lineHeight: 1 }}>
              {statistics.totalProjects}
            </span>
            <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-mono)", letterSpacing: "0.08em", textTransform: "uppercase", textAlign: "center" }}>
              Projects
            </span>
          </motion.div>

          <motion.div
            {...fadeUp(0.3)}
            style={{
              gridColumn: "1 / 5",
              gridRow: "3 / 4",
              background: "#fff",
              borderRadius: 22,
              border: "1px solid rgba(0,0,0,0.07)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 6px 20px rgba(0,0,0,0.05)",
              padding: "1.25rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <span className="section-label section-label--blue" style={{ alignSelf: "flex-start", fontSize: "0.8rem", padding: "4px 10px" }}>
              Education
            </span>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--fg)", marginTop: 4 }}>
              {edu.institution}
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--fg-2)" }}>
              {edu.degree} · {edu.startYear}–{edu.graduationYear}
            </div>
          </motion.div>

          <motion.div
            {...fadeUp(0.32)}
            style={{
              gridColumn: "9 / 13",
              gridRow: "3 / 4",
              background: "#F0FBF4",
              borderRadius: 22,
              border: "1px solid rgba(34,197,94,0.2)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 6px 20px rgba(0,0,0,0.04)",
              padding: "1.25rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span className="status-dot" />
              <span style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "#16a34a", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Building
              </span>
            </div>
            <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--fg)" }}>
              {currentStatus.currentlyBuilding.project}
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--fg-2)" }}>
              {currentStatus.currentlyBuilding.description}
            </div>
            <div
              style={{
                height: 4, borderRadius: 4,
                background: "rgba(34,197,94,0.15)",
                overflow: "hidden",
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${currentStatus.currentlyBuilding.progress}%` }}
                transition={{ duration: 1.2, delay: 0.8 }}
                style={{ height: "100%", background: "#22c55e", borderRadius: 4 }}
              />
            </div>
            <span style={{ fontSize: "0.65rem", color: "#16a34a", textAlign: "right", fontFamily: "var(--font-mono)" }}>
              {currentStatus.currentlyBuilding.progress}%
            </span>
          </motion.div>

          <motion.div
            {...fadeUp(0.35)}
            style={{
              gridColumn: "1 / 5",
              gridRow: "4 / 5",
              background: "#fff",
              borderRadius: 22,
              border: "1px solid rgba(0,0,0,0.07)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 6px 20px rgba(0,0,0,0.05)",
              padding: "1.25rem 1.5rem",
            }}
          >
            <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--fg-3)", marginBottom: 12, letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
              Connect
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[
                { label: "GitHub", href: socialLinks.github.url, bg: "#1A1D23", color: "#fff" },
                { label: "LinkedIn", href: socialLinks.linkedin.url, bg: "#0A66C2", color: "#fff" },
                { label: "Instagram", href: socialLinks.instagram.url, bg: "#E1306C", color: "#fff" },
                { label: "Email", href: `mailto:${personalInfo.email}`, bg: "var(--accent)", color: "#fff" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  style={{
                    padding: "6px 14px",
                    borderRadius: 10,
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    background: s.bg,
                    color: s.color,
                    textDecoration: "none",
                    transition: "transform 0.15s ease, opacity 0.15s ease",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            {...fadeUp(0.38)}
            style={{
              gridColumn: "5 / 9",
              gridRow: "4 / 5",
              background: "#fff",
              borderRadius: 22,
              border: "1px solid rgba(0,0,0,0.07)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 6px 20px rgba(0,0,0,0.05)",
              padding: "1.25rem 1.5rem",
            }}
          >
            <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--fg-3)", marginBottom: 12, letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
              Learning
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {currentStatus.currentlyLearning.map((item) => (
                <div
                  key={item.name}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "6px 12px",
                    background: "var(--bg)",
                    borderRadius: 10,
                    border: "1px solid rgba(0,0,0,0.07)",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    color: "var(--fg)",
                  }}
                >
                  <span>{item.icon}</span>
                  {item.name}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            {...fadeUp(0.4)}
            style={{
              gridColumn: "9 / 13",
              gridRow: "4 / 5",
              background: "#1A1D23",
              borderRadius: 22,
              border: "1px solid rgba(0,0,0,0.07)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 6px 20px rgba(0,0,0,0.05)",
              padding: "1.25rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 4,
            }}
          >
            <span style={{ fontWeight: 800, fontSize: "2.4rem", color: "#fff", lineHeight: 1, letterSpacing: "-0.04em" }}>
              {personalInfo.yearsExperience}+
            </span>
            <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-mono)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Years Experience
            </span>
          </motion.div>

        </div>
      </div>
    </section>
  );
}