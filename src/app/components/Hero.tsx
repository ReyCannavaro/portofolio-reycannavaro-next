"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FiMapPin, FiClock, FiGithub, FiLinkedin, FiInstagram, FiMail,
  FiAward, FiGitCommit, FiBriefcase, FiCode, FiTarget, FiEye,
  FiZap, FiBarChart2, FiFolder, FiBookOpen, FiTrendingUp,
} from "react-icons/fi";
import {
  personalInfo,
  socialLinks,
  statistics,
  currentStatus,
  achievements,
} from "../data/index";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 28 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.55, delay, ease: EASE },
});

const nationalWins = achievements.filter(
  (a) => a.level === "national" && a.type === "competition"
).length;

function Sticker({
  children,
  rotate = 0,
  variant = "white",
  style,
}: {
  children: React.ReactNode;
  rotate?: number;
  variant?: "white" | "navy" | "sky" | "orange" | "red" | "green";
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`sticker sticker--${variant}`}
      style={{ transform: `rotate(${rotate}deg)`, ...style }}
    >
      {children}
    </div>
  );
}

function StatBlock({
  value, label, icon, bg, color, shadow, delay,
}: {
  value: string; label: string; icon: React.ReactNode;
  bg: string; color: string; shadow: string; delay: number;
}) {
  return (
    <motion.div
      {...fadeUp(delay)}
      style={{
        background: bg, border: "2px solid #000", boxShadow: shadow,
        padding: "18px 20px", display: "flex", flexDirection: "column",
        gap: 6, flex: 1, minWidth: 100,
      }}
    >
      <span style={{ color, opacity: 0.7 }}>{icon}</span>
      <span style={{
        fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 44px)",
        fontWeight: 400, lineHeight: 1, color, letterSpacing: "-0.02em",
      }}>
        {value}
      </span>
      <span style={{
        fontFamily: "var(--font-mono)", fontSize: "10px",
        letterSpacing: "0.12em", textTransform: "uppercase", color, opacity: 0.65,
      }}>
        {label}
      </span>
    </motion.div>
  );
}

const FUN_FACT_ICONS: Record<string, React.ReactNode> = {
  "Critical Thinking": <FiTarget size={12} />,
  "Visual Aesthetic":  <FiEye size={12} />,
  "Creativity":        <FiZap size={12} />,
  "Attention to Detail": <FiBarChart2 size={12} />,
  "Organized":         <FiFolder size={12} />,
};

export default function Hero() {
  const [mounted,  setMounted]  = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <section
      id="about"
      style={{
        minHeight: "100svh",
        padding:   "clamp(80px,10vw,120px) var(--gutter) 60px",
        background:"var(--bg)",
        position:  "relative",
        overflow:  "hidden",
      }}
    >
      <div aria-hidden style={{
        position: "absolute", top: -20, left: -10,
        fontFamily: "var(--font-display)",
        fontSize:   "clamp(120px, 22vw, 260px)",
        fontWeight: 400, lineHeight: 1,
        color: "transparent",
        WebkitTextStroke: "1px rgba(26,35,126,0.06)",
        pointerEvents: "none", userSelect: "none",
        whiteSpace: "nowrap", zIndex: 0,
      }}>
        REY
      </div>

      <div aria-hidden style={{
        position: "absolute", top: 60, right: -80,
        width: 320, height: 320, borderRadius: "50%",
        border: "2px dashed rgba(79,195,247,0.25)",
        pointerEvents: "none", zIndex: 0,
      }} />
      <div aria-hidden style={{
        position: "absolute", top: 100, right: -40,
        width: 220, height: 220, borderRadius: "50%",
        border: "2px dashed rgba(230,81,0,0.15)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div
          {...fadeUp(0.05)}
          style={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "clamp(24px, 4vw, 40px)",
            flexWrap: "wrap", gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="status-dot" />
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "11px",
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: "var(--green-dark)",
            }}>
              {currentStatus.availableForWork}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 5,
              fontFamily: "var(--font-mono)", fontSize: "11px",
              color: "var(--fg-3)", letterSpacing: "0.06em",
            }}>
              <FiMapPin size={11} /> {personalInfo.location}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 5,
              fontFamily: "var(--font-mono)", fontSize: "11px",
              color: "var(--fg-3)", letterSpacing: "0.06em",
            }}>
              <FiClock size={11} /> {personalInfo.timezone}
            </span>
          </div>
        </motion.div>

        <div
          className="hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gridTemplateAreas: `"headline" "photo" "bio" "stats"`,
            gap: "clamp(16px, 3vw, 24px)",
          }}
        >

          <motion.div {...fadeUp(0.1)} style={{ gridArea: "headline", position: "relative" }}>
            <div className="section-tag" style={{ marginBottom: 16 }}>
              <FiCode size={11} style={{ marginRight: 4 }} />
              Fullstack Developer & Designer
            </div>

            <h1 style={{
              fontFamily: "var(--font-display)",
              fontSize:   "clamp(56px, 11vw, 140px)",
              fontWeight: 400, lineHeight: 0.9,
              letterSpacing: "-0.03em",
              color: "var(--navy)", margin: 0, position: "relative",
            }}>
              REY
              <br />
              <span style={{
                WebkitTextStroke: "3px var(--navy)",
                color: "transparent", display: "block",
              }}>
                CAN
              </span>
              <span style={{ color: "var(--orange)" }}>NAVARO</span>
            </h1>

            <Sticker variant="orange" rotate={-4} style={{ position: "absolute", top: 0, right: 0, fontSize: 12 }}>
              <FiBookOpen size={11} /> SMK Telkom Sidoarjo
            </Sticker>
            <Sticker variant="sky" rotate={3} style={{ position: "absolute", bottom: "10%", right: "5%", fontSize: 12 }}>
              <FiTrendingUp size={11} /> {personalInfo.age} y.o.
            </Sticker>
          </motion.div>

          <motion.div {...fadeUp(0.18)} style={{ gridArea: "photo", position: "relative" }}>
            <div style={{
              position: "relative", background: "var(--sky-light)",
              border: "2px solid #000", boxShadow: "var(--shadow-navy)",
              aspectRatio: "4/5", overflow: "hidden", maxWidth: 360,
            }}>
              {!imgError ? (
                <Image
                  src={personalInfo.profileImage}
                  alt={personalInfo.profileImageAlt}
                  fill
                  style={{ objectFit: "cover", objectPosition: "top" }}
                  onError={() => setImgError(true)}
                />
              ) : (
                <div style={{
                  inset: 0, position: "absolute",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "linear-gradient(135deg, var(--sky-light), var(--orange-pale))",
                }}>
                  <span style={{
                    fontFamily: "var(--font-display)", fontSize: "80px",
                    color: "var(--navy)", opacity: 0.3,
                  }}>RC</span>
                </div>
              )}

              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                background: "var(--navy)", padding: "10px 14px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <span style={{
                  fontFamily: "var(--font-display)", fontSize: "16px",
                  color: "var(--sky)", letterSpacing: "0.02em",
                }}>
                  {personalInfo.name}
                </span>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: "10px",
                  color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em",
                  textTransform: "uppercase", display: "flex", alignItems: "center", gap: 4,
                }}>
                  <FiBriefcase size={9} /> {personalInfo.title}
                </span>
              </div>
            </div>

            <Sticker variant="red" rotate={-6} style={{ position: "absolute", top: -12, left: -8, zIndex: 2 }}>
              <FiAward size={11} />
              {nationalWins > 0 ? `${nationalWins}× National Winner` : "Award Winner"}
            </Sticker>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16, maxWidth: 360 }}>
              {personalInfo.funFacts.map((fact, i) => (
                <Sticker
                  key={fact.label}
                  variant={(["white", "navy", "sky", "orange", "green"] as const)[i % 5]}
                  rotate={[-3, 2, -1, 4, -2][i % 5]}
                >
                  {FUN_FACT_ICONS[fact.label] ?? <FiZap size={11} />}
                  {fact.label}
                </Sticker>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.24)} style={{ gridArea: "bio" }}>
            <div className="card-raw card-raw--orange" style={{ padding: "24px", marginBottom: 20 }}>
              <div className="section-tag" style={{ marginBottom: 12 }}>About</div>
              <p style={{
                fontFamily: "var(--font-body)",
                fontSize:   "clamp(15px, 2vw, 18px)",
                lineHeight: 1.7, color: "var(--fg)", margin: 0,
              }}>
                {personalInfo.bio}
              </p>
            </div>

            <div style={{
              background: "var(--navy)", border: "2px solid #000",
              boxShadow: "4px 4px 0 var(--sky)",
              padding: "18px 20px", marginBottom: 20,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span className="status-dot" />
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: "10px",
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  color: "var(--lime)",
                }}>
                  Currently Building
                </span>
              </div>
              <div style={{
                fontFamily: "var(--font-display)", fontSize: "22px",
                color: "#fff", letterSpacing: "0.01em", marginBottom: 4,
              }}>
                {currentStatus.currentlyBuilding.project}
              </div>
              <div style={{
                fontFamily: "var(--font-body)", fontSize: "13px",
                color: "rgba(255,255,255,0.6)", marginBottom: 12,
              }}>
                {currentStatus.currentlyBuilding.description}
              </div>
              <div className="progress-raw">
                <motion.div
                  className="progress-raw__fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${currentStatus.currentlyBuilding.progress}%` }}
                  transition={{ duration: 1.4, delay: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                  style={{ background: "var(--sky)" }}
                />
              </div>
              <div style={{
                textAlign: "right", fontFamily: "var(--font-mono)", fontSize: "11px",
                color: "var(--sky)", marginTop: 6, letterSpacing: "0.08em",
              }}>
                {currentStatus.currentlyBuilding.progress}%
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <div className="section-tag" style={{ marginBottom: 10 }}>Currently Learning</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {currentStatus.currentlyLearning.map((item, i) => (
                  <Sticker
                    key={item.name}
                    variant={(["navy", "orange", "sky"] as const)[i % 3]}
                    rotate={[-2, 2, -1][i % 3]}
                  >
                    <FiZap size={11} /> {item.name}
                  </Sticker>
                ))}
              </div>
            </div>

            <div>
              <div className="section-tag" style={{ marginBottom: 10 }}>Connect</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[
                  { label: "GitHub",    href: socialLinks.github.url,    icon: <FiGithub size={13} />,   v: "navy"   },
                  { label: "LinkedIn",  href: socialLinks.linkedin.url,  icon: <FiLinkedin size={13} />, v: "sky"    },
                  { label: "Instagram", href: socialLinks.instagram.url, icon: <FiInstagram size={13}/>, v: "orange" },
                  { label: "Email",     href: `mailto:${personalInfo.email}`, icon: <FiMail size={13}/>, v: "navy"   },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noreferrer"
                    className={`btn-raw btn-raw--${s.v as "navy" | "sky" | "orange"}`}
                    style={{ fontSize: 12, padding: "8px 14px", gap: 6 }}
                  >
                    {s.icon} {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.3)} style={{ gridArea: "stats" }}>
            <div className="section-tag" style={{ marginBottom: 12 }}>By the numbers</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <StatBlock
                value={`${statistics.totalProjects}`} label="Projects"
                icon={<FiBriefcase size={16} />}
                bg="var(--navy)" color="#fff"
                shadow="4px 4px 0 var(--sky)" delay={0.32}
              />
              <StatBlock
                value={`${personalInfo.yearsExperience}+`} label="Yrs Experience"
                icon={<FiTrendingUp size={16} />}
                bg="var(--orange-light)" color="var(--orange)"
                shadow="4px 4px 0 var(--orange)" delay={0.36}
              />
              <StatBlock
                value={`${statistics.achievements}`} label="Awards"
                icon={<FiAward size={16} />}
                bg="var(--rose)" color="var(--red)"
                shadow="4px 4px 0 var(--red)" delay={0.4}
              />
              <StatBlock
                value={`${statistics.githubCommits}+`} label="Commits"
                icon={<FiGitCommit size={16} />}
                bg="var(--lime)" color="var(--green-dark)"
                shadow="4px 4px 0 var(--green-dark)" delay={0.44}
              />
            </div>
          </motion.div>

        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr 1fr !important;
            grid-template-areas:
              "headline photo"
              "bio      photo"
              "stats    stats" !important;
          }
        }
        @media (min-width: 1100px) {
          .hero-grid {
            grid-template-columns: 1.2fr 0.9fr 1fr !important;
            grid-template-areas:
              "headline headline photo"
              "bio      bio      photo"
              "stats    stats    stats" !important;
          }
        }
      `}</style>
    </section>
  );
}