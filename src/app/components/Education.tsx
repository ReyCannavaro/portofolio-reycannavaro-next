"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { educationHistory } from "../data/index";

export default function Education() {
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
    <section id="education" ref={ref} style={{ background: "var(--surface-soft)", padding: "var(--space-section) 0" }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: "var(--space-xxl)" }}>
          <span className="label-upper" style={{ color: "var(--m-blue-dark)", opacity: visible ? 1 : 0, transition: "opacity 0.5s" }}>
            05 — Background
          </span>
          <div className="m-stripe" style={{ width: 48, marginTop: 12, marginBottom: 16 }} />
          <h2 className="display-lg" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease 0.1s" }}>
            EDUCATION
          </h2>
        </div>

        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 1,
              background: "var(--hairline)",
            }}
            className="hidden md:block"
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {educationHistory.map((edu, i) => (
              <div
                key={edu.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "240px 1fr",
                  gap: 0,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(24px)",
                  transition: `all 0.7s ease ${0.2 + i * 0.15}s`,
                }}
                className="edu-row"
              >
                <div
                  style={{
                    padding: "var(--space-xl)",
                    paddingLeft: "var(--space-xxl)",
                    borderRight: "1px solid var(--hairline)",
                    borderBottom: i < educationHistory.length - 1 ? "1px solid var(--hairline)" : "none",
                  }}
                  className="edu-year"
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "var(--space-md)" }}>
                    <div style={{ position: "relative", width: 40, height: 40, flexShrink: 0 }}>
                      <Image src={edu.logo} alt={edu.institution} fill style={{ objectFit: "contain" }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: "var(--on-dark)", lineHeight: 1 }}>
                        {edu.startYear}
                      </div>
                      <div className="label-upper" style={{ fontSize: 9, color: "var(--muted)", marginTop: 2 }}>
                        — {edu.endYear ?? "Present"}
                      </div>
                    </div>
                  </div>

                  <span
                    style={{
                      display: "inline-block",
                      padding: "3px 10px",
                      background: edu.status === "ongoing" ? "var(--m-blue-dark)" : "transparent",
                      border: `1px solid ${edu.status === "ongoing" ? "var(--m-blue-dark)" : "var(--hairline)"}`,
                      color: edu.status === "ongoing" ? "#fff" : "var(--muted)",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                    }}
                  >
                    {edu.status === "ongoing" ? "Ongoing" : "Graduated"}
                  </span>
                </div>

                <div
                  style={{
                    padding: "var(--space-xl)",
                    background: "var(--surface-card)",
                    borderBottom: i < educationHistory.length - 1 ? "1px solid var(--hairline)" : "none",
                  }}
                >
                  <h3
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      color: "var(--on-dark)",
                      marginBottom: 4,
                    }}
                  >
                    {edu.institutionShort}
                  </h3>
                  <p className="label-upper" style={{ color: "var(--m-blue-dark)", marginBottom: "var(--space-md)", fontSize: 11 }}>
                    {edu.degreeShort}
                  </p>
                  <p className="body-sm" style={{ marginBottom: "var(--space-lg)" }}>{edu.description}</p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {edu.highlights.map((h) => (
                      <span
                        key={h}
                        style={{
                          padding: "4px 10px",
                          border: "1px solid var(--hairline)",
                          color: "var(--body)",
                          fontSize: 11,
                          fontWeight: 300,
                        }}
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .edu-row { grid-template-columns: 1fr !important; }
          .edu-year { border-right: none !important; border-bottom: 1px solid var(--hairline) !important; padding-left: var(--space-md) !important; }
        }
      `}</style>
    </section>
  );
}