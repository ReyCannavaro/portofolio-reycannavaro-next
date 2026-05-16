"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FiMapPin, FiClock, FiGithub, FiLinkedin,
  FiInstagram, FiMail, FiAward, FiGitCommit,
  FiBriefcase, FiCode, FiTrendingUp,
} from "react-icons/fi";
import {
  personalInfo, socialLinks, statistics, currentStatus, achievements,
} from "../data/index";

/* ─────────── constants ─────────── */
const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 24 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: EASE },
});

const nationalWins = achievements.filter(
  (a) => a.level === "national" && a.type === "competition"
).length;

const SOCIAL = [
  { label: "GitHub",    href: socialLinks.github.url,        icon: <FiGithub size={14} />,    v: "navy"   },
  { label: "LinkedIn",  href: socialLinks.linkedin.url,       icon: <FiLinkedin size={14} />,  v: "sky"    },
  { label: "Instagram", href: socialLinks.instagram.url,      icon: <FiInstagram size={14} />, v: "orange" },
  { label: "Email",     href: `mailto:${personalInfo.email}`, icon: <FiMail size={14} />,      v: "navy"   },
] as const;

const STATS = [
  { value: `${statistics.totalProjects}`,       label: "Projects",   icon: <FiBriefcase size={15} />, bg: "var(--navy)",         color: "#fff",              shadow: "4px 4px 0 var(--sky)"         },
  { value: `${personalInfo.yearsExperience}+`,  label: "Yrs Exp",    icon: <FiTrendingUp size={15} />,bg: "var(--orange-light)", color: "var(--orange)",     shadow: "4px 4px 0 var(--orange)"      },
  { value: `${statistics.achievements}`,        label: "Awards",     icon: <FiAward size={15} />,     bg: "var(--rose)",         color: "var(--red)",        shadow: "4px 4px 0 var(--red)"         },
  { value: `${statistics.githubCommits}+`,      label: "Commits",    icon: <FiGitCommit size={15} />, bg: "var(--lime)",         color: "var(--green-dark)", shadow: "4px 4px 0 var(--green-dark)"  },
] as const;

/* ═══════════════════════════════════════ */
export default function Hero() {
  const [mounted,  setMounted]  = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <section
      id="about"
      style={{
        background: "var(--bg)",
        position: "relative",
        overflow: "hidden",
        paddingTop:    "clamp(80px, 11vw, 112px)",
        paddingBottom: "clamp(48px,  7vw,  72px)",
      }}
    >
      {/* Ghost watermark — pure decoration, behind everything */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, zIndex: 0,
        display: "flex", alignItems: "flex-start",
        fontFamily: "var(--font-display)",
        fontSize: "clamp(160px, 30vw, 380px)",
        fontWeight: 400, lineHeight: 0.82, letterSpacing: "-0.04em",
        color: "transparent",
        WebkitTextStroke: "1.5px rgba(26,35,126,0.052)",
        pointerEvents: "none", userSelect: "none",
        paddingLeft: "var(--gutter)", paddingTop: "clamp(80px,11vw,112px)",
        overflow: "hidden",
      }}>REY</div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 var(--gutter)", position: "relative", zIndex: 1 }}>

        {/* ─────────────────────────────────
            STATUS BAR
        ───────────────────────────────── */}
        <motion.div {...fadeUp(0)} style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between", flexWrap: "wrap", gap: 10,
          marginBottom: "clamp(28px, 4.5vw, 48px)",
        }}>
          {/* Available pill */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            border: "2px solid #000", boxShadow: "3px 3px 0 var(--green-dark)",
            background: "var(--bg-3)", padding: "6px 14px",
          }}>
            <span className="status-dot" />
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: 10,
              letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--green-dark)",
            }}>
              {currentStatus.availableForWork}
            </span>
          </div>

          {/* Meta info */}
          <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
            {[
              { icon: <FiMapPin size={10} />, text: personalInfo.location },
              { icon: <FiClock  size={10} />, text: personalInfo.timezone },
            ].map(({ icon, text }) => (
              <span key={text} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ color: "var(--fg-3)", display: "flex" }}>{icon}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.11em", textTransform: "uppercase", color: "var(--fg-3)" }}>
                  {text}
                </span>
              </span>
            ))}
          </div>
        </motion.div>

        {/* ─────────────────────────────────
            MAIN CONTENT: left + right
        ───────────────────────────────── */}
        <div className="hero-main">

          {/* ══════════════════════
              LEFT — name / bio / connect
          ══════════════════════ */}
          <div className="hero-left">

            {/* Role tag */}
            <motion.div {...fadeUp(0.06)}>
              <div className="section-tag" style={{ marginBottom: 16 }}>
                <FiCode size={11} style={{ marginRight: 2 }} />
                Fullstack Developer &amp; Designer
              </div>
            </motion.div>

            {/* NAME: REY / CANNAVARO */}
            <motion.h1 {...fadeUp(0.10)} style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(64px, 12vw, 148px)",
              fontWeight: 400, lineHeight: 0.88, letterSpacing: "-0.03em",
              color: "var(--navy)", margin: "0 0 20px",
            }}>
              REY
              <br />
              <span style={{ color: "var(--orange)" }}>CANNAVARO</span>
            </motion.h1>

            {/* Stickers row */}
            <motion.div {...fadeUp(0.14)} style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
              <span className="sticker sticker--orange" style={{ transform: "rotate(-2deg)" }}>
                🏫 SMK Telkom Sidoarjo
              </span>
              <span className="sticker sticker--sky" style={{ transform: "rotate(2deg)" }}>
                <FiTrendingUp size={11} /> {personalInfo.age} y.o.
              </span>
              <span className="sticker sticker--red" style={{ transform: "rotate(-1.5deg)" }}>
                <FiAward size={11} />
                {nationalWins > 0 ? `${nationalWins}× National Winner` : "Award Winner"}
              </span>
            </motion.div>

            {/* Divider */}
            <motion.div {...fadeUp(0.16)} style={{
              height: 2, background: "#000",
              marginBottom: 24, opacity: 0.08,
            }} />

            {/* Bio */}
            <motion.div {...fadeUp(0.18)} style={{ marginBottom: 28 }}>
              <div className="section-tag" style={{ marginBottom: 10 }}>About</div>
              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(14px, 1.6vw, 16px)",
                lineHeight: 1.78, color: "var(--fg-2)", margin: 0,
              }}>
                {personalInfo.bio}
              </p>
            </motion.div>

            {/* Divider */}
            <motion.div {...fadeUp(0.20)} style={{
              height: 2, background: "#000",
              marginBottom: 24, opacity: 0.08,
            }} />

            {/* Connect */}
            <motion.div {...fadeUp(0.22)}>
              <div className="section-tag" style={{ marginBottom: 12 }}>Connect</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {SOCIAL.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noreferrer"
                    className={`btn-raw btn-raw--${s.v}`}
                    style={{ fontSize: 12, padding: "9px 16px" }}
                  >
                    {s.icon} {s.label}
                  </a>
                ))}
              </div>
            </motion.div>

          </div>

          {/* ══════════════════════
              RIGHT — photo
          ══════════════════════ */}
          <motion.div {...fadeUp(0.12)} className="hero-right">
            <div style={{
              position: "relative",
              width: "100%", height: "100%",
              border: "2px solid #000",
              boxShadow: "var(--shadow-navy)",
              background: "var(--sky-light)",
              overflow: "hidden",
              minHeight: 360,
            }}>
              {!imgError ? (
                <Image
                  src={personalInfo.profileImage}
                  alt={personalInfo.profileImageAlt}
                  fill priority
                  style={{ objectFit: "cover", objectPosition: "top center" }}
                  onError={() => setImgError(true)}
                />
              ) : (
                <div style={{
                  position: "absolute", inset: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{
                    fontFamily: "var(--font-display)", fontSize: 80,
                    color: "var(--navy)", opacity: 0.18,
                  }}>RC</span>
                </div>
              )}

              {/* Bottom gradient */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.68) 0%, transparent 42%)",
                zIndex: 1, pointerEvents: "none",
              }} />

              {/* Name bar */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 2,
                padding: "14px 18px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <span style={{
                  fontFamily: "var(--font-display)", fontSize: 18,
                  color: "#fff", letterSpacing: "0.01em",
                }}>
                  {personalInfo.name}
                </span>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: 9,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                  display: "flex", alignItems: "center", gap: 4,
                }}>
                  <FiBriefcase size={8} /> {personalInfo.title}
                </span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ─────────────────────────────────
            STATS ROW — full width
        ───────────────────────────────── */}
        <motion.div {...fadeUp(0.28)} style={{ marginTop: "clamp(24px, 4vw, 40px)" }}>
          <div className="section-tag" style={{ marginBottom: 12 }}>By the numbers</div>
          <div className="stats-grid">
            {STATS.map(({ value, label, icon, bg, color, shadow }) => (
              <div key={label} style={{
                background: bg, border: "2px solid #000", boxShadow: shadow,
                padding: "clamp(14px, 2.5vw, 22px)",
                display: "flex", flexDirection: "column", gap: 5,
              }}>
                <span style={{ color, opacity: 0.7 }}>{icon}</span>
                <span style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(28px, 5.5vw, 52px)",
                  fontWeight: 400, lineHeight: 1, color, letterSpacing: "-0.02em",
                }}>
                  {value}
                </span>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: 9,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color, opacity: 0.65,
                }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* ─── Responsive ─── */}
      <style>{`
        /* Mobile: stack vertically, photo first */
        .hero-main {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .hero-left  { order: 2; }
        .hero-right {
          order: 1;
          aspect-ratio: 4/5;
          max-height: 500px;
        }

        /* Stats: 2-col on mobile */
        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        /* Tablet ≥ 640px: side by side, photo right */
        @media (min-width: 640px) {
          .hero-main {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            align-items: center;
          }
          .hero-left  { order: 1; }
          .hero-right {
            order: 2;
            aspect-ratio: auto;
            align-self: stretch;
            min-height: 480px;
            max-height: none;
          }

          /* Stats: 4-col */
          .stats-grid { grid-template-columns: repeat(4, 1fr); }
        }

        /* Desktop ≥ 1024px: wider left column */
        @media (min-width: 1024px) {
          .hero-main {
            grid-template-columns: 1.1fr 0.9fr;
            gap: 32px;
            align-items: center;
          }
          .hero-right { min-height: 540px; }
        }
      `}</style>
    </section>
  );
}