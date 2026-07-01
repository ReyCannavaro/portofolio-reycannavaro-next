"use client";
import { useRef, useEffect, useState } from "react";
import { experienceHistory } from "../data/index";

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
              color: "var(--m-blue-dark)",
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
                      border: "1px solid var(--m-blue-dark)",
                      color: "var(--on-dark)",
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
                    <span className="label-upper" style={{ color: "var(--m-blue-dark)", fontSize: 10 }}>
                      {item.period} / {item.scope}
                    </span>
                    <h3
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
                    </h3>
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

                <div className="hairline" style={{ marginBottom: "var(--space-lg)" }} />

                <div className="experience-detail-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "var(--space-xl)" }}>
                  <div>
                    <span className="label-upper" style={{ color: "var(--muted)", fontSize: 10 }}>What I do</span>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: "var(--space-md)" }}>
                      {item.responsibilities.map((responsibility, index) => (
                        <div key={responsibility} style={{ display: "grid", gridTemplateColumns: "32px 1fr", gap: 12, alignItems: "start" }}>
                          <span
                            style={{
                              color: "var(--m-blue-dark)",
                              fontSize: 11,
                              fontWeight: 700,
                              letterSpacing: "1.5px",
                            }}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <p className="body-sm">{responsibility}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="label-upper" style={{ color: "var(--muted)", fontSize: 10 }}>Stack & Focus</span>
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
                    <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "var(--hairline)" }}>
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
