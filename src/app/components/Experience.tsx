"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { experienceHistory, type ExperienceSubRole } from "../data/index";

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="experience" ref={ref} style={{ background: "var(--canvas)", padding: "var(--space-section) 0" }}>
      <div className="container">
        <div style={{ marginBottom: "var(--space-xxl)" }}>
          <span
            className="label-upper"
            style={{
              color: "var(--m-blue-text)",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            04 - Professional Track
          </span>
          <div className="m-stripe" style={{ width: 48, marginTop: 12, marginBottom: 16 }} />
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
            <h2
              className="display-lg"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease 0.1s",
              }}
            >
              WORK<br />EXPERIENCE
            </h2>
            <p
              className="body-sm"
              style={{
                maxWidth: 360,
                color: "var(--muted)",
                opacity: visible ? 1 : 0,
                transition: "opacity 0.6s ease 0.2s",
              }}
            >
              Professional work in enterprise ERP, turning business workflows into reliable web systems.
            </p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "var(--hairline)" }}>
          {experienceHistory.map((item, i) => (
            <article
              key={item.id}
              className="experience-row"
              style={{
                display: "grid",
                gridTemplateColumns: "320px 1fr",
                gap: 1,
                background: "var(--hairline)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `all 0.7s ease ${0.2 + i * 0.12}s`,
              }}
            >
              <div style={{ background: "var(--surface-soft)", padding: "var(--space-xl)", minWidth: 0 }}>
                <span className="label-upper" style={{ color: "var(--muted)", fontSize: 10 }}>
                  {item.type}
                </span>
                <h3
                  style={{
                    marginTop: 12,
                    fontSize: 26,
                    fontWeight: 700,
                    lineHeight: 1,
                    textTransform: "uppercase",
                    color: "var(--on-dark)",
                  }}
                >
                  {item.company}
                </h3>
                <div className="m-stripe" style={{ width: 72, marginTop: 18, marginBottom: 18 }} />

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--hairline)" }}>
                  <div className="spec-cell" style={{ background: "var(--canvas)" }}>
                    <div className="spec-value" style={{ fontSize: 22 }}>{item.startYear}</div>
                    <div className="spec-label">Start</div>
                  </div>
                  <div className="spec-cell" style={{ background: "var(--canvas)" }}>
                    <div className="spec-value" style={{ fontSize: 22 }}>{item.endYear ?? "Now"}</div>
                    <div className="spec-label">Status</div>
                  </div>
                </div>

                <div style={{ marginTop: "var(--space-lg)", display: "flex", flexWrap: "wrap", gap: 8 }}>
                  <span
                    style={{
                      padding: "5px 12px",
                      border: "1px solid var(--m-blue-text)",
                      color: "#fff",
                      background: item.status === "ongoing" ? "var(--m-blue-dark)" : "transparent",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.status}
                  </span>
                  <span
                    style={{
                      padding: "5px 12px",
                      border: "1px solid var(--hairline)",
                      color: "var(--body)",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.industry}
                  </span>
                </div>
              </div>

              <div style={{ background: "var(--surface-card)", padding: "var(--space-xl)", minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap", marginBottom: "var(--space-lg)" }}>
                  <div>
                    <span className="label-upper" style={{ color: "var(--m-blue-text)", fontSize: 10 }}>
                      {item.period} / {item.scope}
                    </span>
                    <h4
                      style={{
                        marginTop: 8,
                        fontSize: 22,
                        fontWeight: 700,
                        lineHeight: 1.2,
                        textTransform: "uppercase",
                        color: "var(--on-dark)",
                      }}
                    >
                      {item.role}
                    </h4>
                  </div>
                  <span className="label-upper" style={{ color: "var(--muted)", fontSize: 10 }}>
                    {item.location}
                  </span>
                </div>

                <p className="body-md" style={{ maxWidth: 760, color: "var(--body-strong)", marginBottom: "var(--space-md)" }}>
                  {item.summary}
                </p>
                <p className="body-sm" style={{ maxWidth: 760, marginBottom: "var(--space-lg)" }}>
                  {item.description}
                </p>

                {/* LinkedIn-style Role Progression Timeline */}
                {Boolean(item.roles && item.roles.length > 0) && (
                  <div style={{ marginTop: "var(--space-lg)", marginBottom: "var(--space-xl)" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: "var(--space-lg)",
                        paddingBottom: 8,
                        borderBottom: "1px solid var(--hairline)",
                      }}
                    >
                      <span className="label-upper" style={{ color: "var(--m-blue-text)", fontSize: 10, letterSpacing: "1.5px" }}>
                        ROLE PROGRESSION &middot; 2 STAGES
                      </span>
                      <div className="m-stripe" style={{ width: 36, height: 2 }} />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 28,
                        position: "relative",
                        paddingLeft: 24,
                        borderLeft: "2px solid var(--hairline)",
                        marginLeft: 6,
                      }}
                    >
                      {item.roles?.map((r: ExperienceSubRole) => {
                        const isCurrent = r.status === "current";
                        return (
                          <div key={r.id} style={{ position: "relative" }}>
                            {/* Timeline node */}
                            <div
                              style={{
                                position: "absolute",
                                left: -31,
                                top: 4,
                                width: 12,
                                height: 12,
                                background: isCurrent ? "var(--m-red)" : "var(--canvas)",
                                border: isCurrent ? "2px solid #fff" : "2px solid var(--m-blue-text)",
                                boxShadow: isCurrent ? "0 0 10px rgba(224, 0, 0, 0.5)" : "none",
                              }}
                            />

                            {/* Role meta & header */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                flexWrap: "wrap",
                                marginBottom: 6,
                              }}
                            >
                              <span
                                style={{
                                  fontSize: 10,
                                  fontWeight: 700,
                                  letterSpacing: "1px",
                                  textTransform: "uppercase",
                                  padding: "3px 8px",
                                  background: isCurrent ? "rgba(224, 0, 0, 0.15)" : "rgba(0, 102, 177, 0.15)",
                                  color: isCurrent ? "var(--m-red)" : "var(--m-blue-text)",
                                  border: `1px solid ${isCurrent ? "var(--m-red)" : "var(--m-blue-text)"}`,
                                }}
                              >
                                {r.badge}
                              </span>
                              <span className="label-upper" style={{ color: "var(--muted)", fontSize: 10 }}>
                                {r.period} &middot; {r.type}
                              </span>
                            </div>

                            <h5
                              style={{
                                fontSize: 18,
                                fontWeight: 700,
                                textTransform: "uppercase",
                                color: "var(--on-dark)",
                                marginBottom: 6,
                              }}
                            >
                              {r.role}
                            </h5>

                            <p className="body-sm" style={{ color: "var(--body-strong)", marginBottom: 12, maxWidth: 720 }}>
                              {r.summary}
                            </p>

                            {/* What I do in this stage */}
                            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
                              {r.responsibilities.map((resp: string, idx: number) => (
                                <div key={resp} style={{ display: "grid", gridTemplateColumns: "24px 1fr", gap: 8, alignItems: "start" }}>
                                  <span
                                    style={{
                                      color: isCurrent ? "var(--m-red)" : "var(--m-blue-text)",
                                      fontSize: 10,
                                      fontWeight: 700,
                                      letterSpacing: "1px",
                                    }}
                                  >
                                    {String(idx + 1).padStart(2, "0")}
                                  </span>
                                  <p className="body-sm" style={{ fontSize: 13, color: "var(--body)" }}>{resp}</p>
                                </div>
                              ))}
                            </div>

                            {/* Tech pills for this stage */}
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                              {r.technologies.map((t: string) => (
                                <span
                                  key={t}
                                  style={{
                                    padding: "2px 8px",
                                    fontSize: 10,
                                    border: "1px solid var(--hairline)",
                                    color: "var(--muted)",
                                    background: "var(--canvas)",
                                  }}
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="hairline" style={{ marginBottom: "var(--space-lg)" }} />

                <div className="experience-detail-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "var(--space-xl)" }}>
                  <div>
                    <span className="label-upper" style={{ color: "var(--muted)", fontSize: 10 }}>Overall Stack</span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "var(--space-md)", marginBottom: "var(--space-lg)" }}>
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          style={{
                            padding: "4px 10px",
                            border: "1px solid var(--hairline)",
                            color: "var(--body)",
                            fontSize: 11,
                            fontWeight: 300,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="label-upper" style={{ color: "var(--muted)", fontSize: 10 }}>Tenure Highlights</span>
                    <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "var(--hairline)", marginTop: "var(--space-md)" }}>
                      {item.highlights.map((highlight) => (
                        <div key={highlight} style={{ background: "var(--surface-soft)", padding: "12px 14px" }}>
                          <span className="label-upper" style={{ color: "var(--body-strong)", fontSize: 10 }}>
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {item.slug && (
                  <div style={{ marginTop: "var(--space-xl)", display: "flex", justifyContent: "flex-end" }}>
                    <Link
                      href={`/experience/${item.slug}`}
                      className="btn-primary"
                      aria-label={`Explore case study for ${item.company} - ${item.role}`}
                      style={{ width: "fit-content" }}
                    >
                      EXPLORE CASE STUDY →
                    </Link>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .experience-row {
            grid-template-columns: 1fr !important;
          }
          .experience-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
