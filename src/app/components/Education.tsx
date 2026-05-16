"use client";
import { useEffect, useRef, useState } from "react";
import { educationHistory, achievements, personalInfo } from "@/app/data/index";
import { FiBriefcase, FiBook } from "react-icons/fi";

const organizations = achievements.filter(a => a.type === "position").slice(0, 4);

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Education() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="education"
      style={{
        background: "var(--bg)",
        paddingTop: "clamp(60px, 10vw, 100px)",
        paddingBottom: "clamp(60px, 10vw, 100px)",
        position: "relative",
        overflow: "hidden",
        borderTop: "2px solid var(--border-light)",
      }}
    >
      <div aria-hidden style={{
        position: "absolute", top: -20, right: -40,
        fontFamily: "var(--font-display)",
        fontSize: "clamp(100px, 18vw, 200px)",
        fontWeight: 400, lineHeight: 1,
        color: "transparent",
        WebkitTextStroke: "1px rgba(26,35,126,0.05)",
        pointerEvents: "none", userSelect: "none",
        whiteSpace: "nowrap", zIndex: 0,
      }}>
        EDU
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 var(--gutter)", position: "relative", zIndex: 1 }}>

        <div style={{
          display: "flex", alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap", gap: 20,
          marginBottom: "clamp(28px, 5vw, 52px)",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.55s ease, transform 0.55s ease",
        }}>
          <div>
            <div className="section-tag" style={{ marginBottom: 12 }}>Background</div>
            <h2 className="display-lg" style={{ color: "var(--navy)", margin: 0 }}>
              EDU &amp;<br />
              <span style={{ WebkitTextStroke: "3px var(--navy)", color: "transparent" }}>
                ORGS
              </span>
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
            <div className="sticker sticker--navy">
              <FiBook size={11} /> {educationHistory.length} Schools
            </div>
            <div className="sticker sticker--orange">
              <FiBriefcase size={11} /> {organizations.length} Positions
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 12 }}>
          <div
            className="card-raw card-raw--navy"
            style={{
              padding: "28px 28px",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.05s, transform 0.6s ease 0.05s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
              <div className="section-tag">Education</div>
              <div style={{
                background: "var(--navy)", border: "2px solid #000",
                padding: "4px 12px",
                fontFamily: "var(--font-mono)", fontSize: 9,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: "#fff", fontWeight: 700,
              }}>
                <FiBook size={9} style={{ marginRight: 4 }} />
                ACADEMIC
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {educationHistory.map((edu, i) => (
                <div key={edu.id} style={{ display: "flex", gap: 0 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingRight: 16, flexShrink: 0, width: 32 }}>
                    <div style={{
                      width: 32, height: 32,
                      background: "var(--navy)", border: "2px solid #000",
                      boxShadow: "3px 3px 0 var(--sky)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, zIndex: 2, color: "#fff", fontSize: 12,
                    }}>
                      <FiBook size={12} />
                    </div>
                    {i < educationHistory.length - 1 && (
                      <div style={{
                        flex: 1, width: 2, minHeight: 24,
                        background: "repeating-linear-gradient(180deg, #000 0, #000 4px, transparent 4px, transparent 8px)",
                        opacity: 0.12, margin: "4px 0",
                      }} />
                    )}
                  </div>

                  <div style={{ flex: 1, paddingBottom: i < educationHistory.length - 1 ? 24 : 0 }}>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
                      <span style={{
                        fontFamily: "var(--font-mono)", fontSize: 9,
                        letterSpacing: "0.12em", textTransform: "uppercase",
                        color: "var(--fg-3)", padding: "2px 8px",
                        border: "1.5px solid rgba(0,0,0,0.12)",
                        background: "var(--bg-2)",
                      }}>
                        {edu.startYear}–{edu.graduationYear}
                      </span>
                    </div>

                    <div style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(18px, 2.5vw, 24px)",
                      fontWeight: 400, lineHeight: 0.95,
                      letterSpacing: "-0.02em",
                      color: "var(--navy)", marginBottom: 6,
                    }}>
                      {edu.institution}
                    </div>

                    <div style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 13, lineHeight: 1.5,
                      color: "var(--fg-2)", marginBottom: 8,
                    }}>
                      {edu.degree}
                    </div>

                    <div style={{
                      fontFamily: "var(--font-mono)", fontSize: 9,
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      color: "var(--fg-3)", marginBottom: 8,
                      display: "flex", alignItems: "center", gap: 4,
                    }}>
                      📍 {edu.location}
                    </div>

                    {edu.highlights && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                        {edu.highlights.slice(0, 3).map((h, j) => (
                          <span key={j} className="sticker" style={{ fontSize: 10, padding: "3px 10px" }}>
                            {h}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="card-raw card-raw--orange"
            style={{
              padding: "28px 28px",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
              <div className="section-tag">Organization</div>
              <div style={{
                background: "var(--orange)", border: "2px solid #000",
                padding: "4px 12px",
                fontFamily: "var(--font-mono)", fontSize: 9,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: "#fff", fontWeight: 700,
              }}>
                <FiBriefcase size={9} style={{ marginRight: 4 }} />
                POSITIONS
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {organizations.map((org, i) => (
                <div key={org.id} style={{ display: "flex", gap: 0 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingRight: 16, flexShrink: 0, width: 32 }}>
                    <div style={{
                      width: 32, height: 32,
                      background: "var(--orange-light)", border: "2px solid #000",
                      boxShadow: "3px 3px 0 var(--orange)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, zIndex: 2, color: "var(--orange)", fontSize: 14,
                    }}>
                      {org.badge ?? "🏢"}
                    </div>
                    {i < organizations.length - 1 && (
                      <div style={{
                        flex: 1, width: 2, minHeight: 24,
                        background: "repeating-linear-gradient(180deg, #000 0, #000 4px, transparent 4px, transparent 8px)",
                        opacity: 0.12, margin: "4px 0",
                      }} />
                    )}
                  </div>

                  <div style={{ flex: 1, paddingBottom: i < organizations.length - 1 ? 24 : 0 }}>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8, alignItems: "center" }}>
                      <span style={{
                        fontFamily: "var(--font-mono)", fontSize: 9,
                        letterSpacing: "0.12em", textTransform: "uppercase",
                        color: "var(--fg-3)", padding: "2px 8px",
                        border: "1.5px solid rgba(0,0,0,0.12)",
                        background: "var(--bg-2)",
                      }}>
                        {org.date?.split("-")[0] ?? "2025"}–Now
                      </span>
                      {org.level === "national" && (
                        <span className="sticker sticker--red" style={{ fontSize: 10, padding: "2px 8px" }}>
                          National
                        </span>
                      )}
                    </div>

                    <div style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(17px, 2.2vw, 22px)",
                      fontWeight: 400, lineHeight: 0.95,
                      letterSpacing: "-0.02em",
                      color: "var(--orange)", marginBottom: 6,
                    }}>
                      {org.titleShort ?? org.title}
                    </div>

                    <div style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 13, lineHeight: 1.5,
                      color: "var(--fg-2)",
                    }}>
                      {org.organizer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "clamp(28px, 5vw, 48px)",
            border: "2px solid #000",
            boxShadow: "6px 6px 0 var(--navy)",
            background: "var(--sky-light)",
            padding: "20px 28px",
            display: "flex", alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap", gap: 16,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
          }}
        >
          <div>
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(18px, 2.8vw, 28px)",
              lineHeight: 1, color: "var(--navy)", marginBottom: 4,
            }}>
              STILL STUDYING
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--navy)", opacity: 0.65 }}>
              SMK Telkom Sidoarjo · Sistem Informasi Jaringan dan Aplikasi · Expected 2027
            </div>
          </div>
          <a
            href={`mailto:${personalInfo.email}`}
            className="btn-raw btn-raw--navy"
            style={{ fontSize: 12, padding: "9px 18px" }}
          >
            Collaborate →
          </a>
        </div>

      </div>
    </section>
  );
}