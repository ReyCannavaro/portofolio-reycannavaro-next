"use client";
import { useRef, useEffect, useState } from "react";
import { skillCategories, techStats, currentlyLearning } from "../data/index";

export default function Skills() {
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
    <section id="skills" ref={ref} style={{ background: "var(--canvas)", padding: "var(--space-section) 0" }}>
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
            02 — Technical Arsenal
          </span>
          <div className="m-stripe" style={{ width: 48, marginTop: 12, marginBottom: 16 }} />
          <h2
            className="display-lg"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease 0.1s",
            }}
          >
            SKILLS &<br />EXPERTISE
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 1,
            marginBottom: "var(--space-xxl)",
            background: "var(--hairline)",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.2s",
          }}
          className="grid-cols-2 md:grid-cols-4"
        >
          {techStats.map((s) => (
            <div key={s.label} className="spec-cell" style={{ background: "var(--surface-soft)" }}>
              <div className="spec-value">{s.value}</div>
              <div className="spec-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1,
            background: "var(--hairline)",
          }}
        >
          {skillCategories.map((cat, i) => (
            <div
              key={cat.id}
              style={{
                background: "var(--surface-card)",
                padding: "var(--space-xl)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.6s ease ${0.1 + i * 0.08}s`,
              }}
            >
              <div style={{ marginBottom: "var(--space-lg)" }}>
                <span className="label-upper" style={{ color: "var(--m-blue-dark)", fontSize: 10 }}>
                  {cat.label}
                </span>
              </div>
              <div className="hairline" style={{ marginBottom: "var(--space-md)" }} />

              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      padding: "4px 10px",
                      border: "1px solid var(--hairline)",
                      color: "var(--body)",
                      fontSize: 12,
                      fontWeight: 300,
                      lineHeight: 1.4,
                      transition: "border-color 0.2s, color 0.2s",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLSpanElement).style.borderColor = "var(--on-dark)";
                      (e.currentTarget as HTMLSpanElement).style.color = "var(--on-dark)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLSpanElement).style.borderColor = "var(--hairline)";
                      (e.currentTarget as HTMLSpanElement).style.color = "var(--body)";
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "var(--space-xxl)",
            padding: "var(--space-xl)",
            border: "1px solid var(--hairline)",
            display: "flex",
            alignItems: "center",
            gap: "var(--space-xl)",
            flexWrap: "wrap",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.7s",
          }}
        >
          <span className="label-upper" style={{ color: "var(--muted)", whiteSpace: "nowrap" }}>
            Currently Learning
          </span>
          <div className="hairline" style={{ width: 40, height: 1, background: "var(--hairline)" }} />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {currentlyLearning.map((t) => (
              <span
                key={t}
                style={{
                  padding: "5px 14px",
                  background: "var(--surface-elevated)",
                  color: "var(--body-strong)",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #skills .container > div:nth-child(3) {
            grid-template-columns: repeat(1, 1fr) !important;
          }
          #skills .container > div:nth-child(2) {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          #skills .container > div:nth-child(3) {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}