"use client";
import { useEffect, useRef, useState } from "react";
import { achievements } from "@/app/data/index";
import Image from "next/image";

const LEVEL_STYLE: Record<string, { bg: string; color: string }> = {
  national: { bg: "#FFF0E6", color: "#C2440A" },
  district: { bg: "#EEF0FF", color: "#4F6AF5" },
  school:   { bg: "#F4F4F2", color: "#555552" },
};

const TYPE_LABEL: Record<string, string> = {
  competition: "🏆 Competition",
  position:    "👑 Position",
  speaker:     "🎤 Speaker",
  award:       "🦅 Award",
};

export default function Prestasi() {
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

  const featured = achievements.filter(a => a.featured);
  const rest     = achievements.filter(a => !a.featured);

  return (
    <section ref={ref} id="achievements" style={{ padding: "4rem 1rem", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <div
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: "1.25rem",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <span className="section-label section-label--orange">
            Achievements
          </span>
          <span style={{ fontSize: "0.72rem", color: "var(--fg-3)", fontFamily: "var(--font-mono)" }}>
            {achievements.length} total
          </span>
        </div>

        {featured.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 10, marginBottom: 10 }}>
            {featured.map((a, i) => (
              <div
                key={a.id}
                style={{
                  background: "#fff",
                  borderRadius: 22,
                  border: "1px solid rgba(0,0,0,0.07)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 6px 20px rgba(0,0,0,0.05)",
                  overflow: "hidden",
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
                }}
              >
                {a.image && (
                  <div style={{ position: "relative", height: 180, background: "#F4F4F2" }}>
                    <Image
                      src={a.image}
                      alt={a.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <div style={{
                      position: "absolute", top: 12, right: 12,
                      width: 40, height: 40, borderRadius: "50%",
                      background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1.2rem",
                    }}>
                      {a.badge}
                    </div>
                  </div>
                )}

                <div style={{ padding: "1.25rem 1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                    <span style={{
                      fontSize: "0.6rem", fontWeight: 600, padding: "2px 8px", borderRadius: 6,
                      ...( LEVEL_STYLE[a.level] ?? LEVEL_STYLE.school ),
                    }}>
                      {a.level?.toUpperCase()}
                    </span>
                    <span style={{ fontSize: "0.6rem", color: "var(--fg-3)", fontFamily: "var(--font-mono)" }}>
                      {a.date}
                    </span>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: "1rem", color: "var(--fg)", letterSpacing: "-0.02em", lineHeight: 1.3, marginBottom: 6 }}>
                    {a.title}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--fg-2)", lineHeight: 1.6 }}>
                    {a.description}
                  </div>
                  <div style={{ marginTop: 10, fontSize: "0.68rem", color: "var(--fg-3)", fontFamily: "var(--font-mono)" }}>
                    {a.organizer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 8 }}>
          {rest.map((a, i) => (
            <div
              key={a.id}
              style={{
                background: "#fff",
                borderRadius: 16,
                border: "1px solid rgba(0,0,0,0.07)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                padding: "1rem 1.25rem",
                display: "flex", alignItems: "flex-start", gap: 12,
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.5s ease ${0.2 + i * 0.06}s, transform 0.5s ease ${0.2 + i * 0.06}s`,
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                background: LEVEL_STYLE[a.level]?.bg ?? "#F4F4F2",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1rem",
              }}>
                {a.badge}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: "0.82rem", color: "var(--fg)", letterSpacing: "-0.01em", lineHeight: 1.3 }}>
                  {a.titleShort ?? a.title}
                </div>
                <div style={{ fontSize: "0.68rem", color: "var(--fg-3)", marginTop: 3, fontFamily: "var(--font-mono)" }}>
                  {a.date} · {a.level}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}