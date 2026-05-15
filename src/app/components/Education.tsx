"use client";
import { useEffect, useRef, useState } from "react";
import { educationHistory, achievements } from "@/app/data/index";

const organizations = achievements.filter(a => a.type === "position").slice(0, 3);

export default function Education() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="education" style={{ padding: "4rem 1rem", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div
            style={{
              background: "#fff",
              borderRadius: 22,
              border: "1px solid rgba(0,0,0,0.07)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 6px 20px rgba(0,0,0,0.05)",
              padding: "1.75rem 2rem",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <span className="section-label section-label--blue" style={{ marginBottom: "1.5rem", display: "inline-flex" }}>
              Education
            </span>

            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 8 }}>
              {educationHistory.map((edu) => (
                <div key={edu.id} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ minWidth: 56, textAlign: "right" }}>
                    <div style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "var(--fg-3)", lineHeight: 1.4 }}>
                      {edu.startYear}–
                    </div>
                    <div style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "var(--fg-3)", lineHeight: 1.4, fontWeight: 700 }}>
                      {edu.graduationYear}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 3 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
                    <div style={{ width: 1, flex: 1, background: "rgba(0,0,0,0.08)", marginTop: 4 }} />
                  </div>

                  <div style={{ paddingBottom: 16 }}>
                    <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "var(--fg)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                      {edu.institution}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "var(--fg-2)", marginTop: 3 }}>
                      {edu.degree}
                    </div>
                    <div style={{ fontSize: "0.68rem", color: "var(--fg-3)", marginTop: 2, fontFamily: "var(--font-mono)" }}>
                      {edu.location}
                    </div>
                    {edu.highlights && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
                        {edu.highlights.slice(0, 2).map((h, i) => (
                          <span
                            key={i}
                            style={{
                              fontSize: "0.6rem",
                              padding: "2px 8px",
                              background: "#EEF0FF",
                              color: "var(--accent)",
                              borderRadius: 6,
                              fontWeight: 600,
                            }}
                          >
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
            style={{
              background: "#fff",
              borderRadius: 22,
              border: "1px solid rgba(0,0,0,0.07)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 6px 20px rgba(0,0,0,0.05)",
              padding: "1.75rem 2rem",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.12s, transform 0.6s ease 0.12s",
            }}
          >
            <span className="section-label section-label--orange" style={{ marginBottom: "1.5rem", display: "inline-flex" }}>
              Organization
            </span>

            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 8 }}>
              {organizations.map((org, i) => (
                <div key={org.id} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ minWidth: 56, textAlign: "right" }}>
                    <div style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "var(--fg-3)", lineHeight: 1.4 }}>
                      {org.date?.split("-")[0]}–
                    </div>
                    <div style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "var(--fg-3)", lineHeight: 1.4, fontWeight: 700 }}>
                      Now
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 3 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent-2)", flexShrink: 0 }} />
                    {i < organizations.length - 1 && (
                      <div style={{ width: 1, flex: 1, background: "rgba(0,0,0,0.08)", marginTop: 4 }} />
                    )}
                  </div>

                  <div style={{ paddingBottom: i < organizations.length - 1 ? 16 : 0 }}>
                    <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "var(--fg)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                      {org.titleShort}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "var(--fg-2)", marginTop: 3 }}>
                      {org.organizer}
                    </div>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        marginTop: 6,
                        fontSize: "0.6rem",
                        padding: "2px 8px",
                        background: org.level === "national" ? "#FFF0E6" : "#F4F4F2",
                        color: org.level === "national" ? "var(--accent-2)" : "var(--fg-3)",
                        borderRadius: 6,
                        fontWeight: 600,
                        textTransform: "capitalize",
                      }}
                    >
                      {org.level}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}