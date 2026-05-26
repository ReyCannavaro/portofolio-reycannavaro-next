"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { achievements } from "../data/index";

const LEVEL_LABEL: Record<string, string> = {
  national: "NATIONAL",
  district: "DISTRICT",
  school: "SCHOOL",
};

const LEVEL_COLOR: Record<string, string> = {
  national: "var(--m-red)",
  district: "var(--m-blue-dark)",
  school: "var(--muted)",
};

export default function Prestasi() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<(typeof achievements)[0] | null>(achievements[0]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const featured = achievements.filter((a) => a.featured);
  const rest = achievements.filter((a) => !a.featured);

  return (
    <section id="achievements" ref={ref} style={{ background: "var(--canvas)", padding: "var(--space-section) 0" }}>
      <div className="container">
        <div style={{ marginBottom: "var(--space-xxl)" }}>
          <span className="label-upper" style={{ color: "var(--m-blue-dark)", opacity: visible ? 1 : 0, transition: "opacity 0.5s" }}>
            04 — Recognition
          </span>
          <div className="m-stripe" style={{ width: 48, marginTop: 12, marginBottom: 16 }} />
          <h2 className="display-lg" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease 0.1s" }}>
            ACHIEVEMENTS &<br />RECOGNITION
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1, background: "var(--hairline)", marginBottom: 1 }} className="feat-grid">
          {featured.map((a, i) => (
            <div
              key={a.id}
              style={{
                background: "var(--surface-card)",
                padding: "var(--space-xl)",
                display: "flex",
                gap: "var(--space-lg)",
                borderTop: `3px solid ${LEVEL_COLOR[a.level]}`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.7s ease ${0.2 + i * 0.1}s`,
              }}
            >
              <div style={{ position: "relative", width: 80, height: 80, flexShrink: 0, overflow: "hidden" }}>
                <Image src={a.image} alt={a.title} fill style={{ objectFit: "cover" }} />
              </div>
              <div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: LEVEL_COLOR[a.level] }}>
                    {LEVEL_LABEL[a.level]}
                  </span>
                  <span className="label-upper" style={{ color: "var(--muted)", fontSize: 9 }}>
                    {a.badge} {a.category}
                  </span>
                </div>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: "var(--on-dark)", lineHeight: 1.3, marginBottom: 8, textTransform: "uppercase" }}>
                  {a.titleShort}
                </h4>
                <p className="body-sm" style={{ fontSize: 12 }}>{a.organizer} · {a.year}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 1, background: "var(--hairline)" }} className="detail-grid">
          <div style={{ background: "var(--surface-soft)" }}>
            {rest.map((a, i) => (
              <div
                key={a.id}
                onClick={() => setSelected(a)}
                style={{
                  padding: "var(--space-lg) var(--space-xl)",
                  borderBottom: "1px solid var(--hairline)",
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-md)",
                  cursor: "pointer",
                  background: selected?.id === a.id ? "var(--surface-card)" : "transparent",
                  borderLeft: selected?.id === a.id ? "3px solid var(--on-dark)" : "3px solid transparent",
                  transition: "all 0.2s",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(-12px)",
                  transition2: `all 0.5s ease ${0.3 + i * 0.05}s`,
                } as React.CSSProperties}
              >
                <span style={{ fontSize: 20 }}>{a.badge}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                    <h5 style={{ fontSize: 13, fontWeight: 700, color: "var(--on-dark)", textTransform: "uppercase", truncate: true } as React.CSSProperties}>
                      {a.titleShort}
                    </h5>
                    <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: LEVEL_COLOR[a.level], flexShrink: 0 }}>
                      {LEVEL_LABEL[a.level]}
                    </span>
                  </div>
                  <p className="body-sm" style={{ fontSize: 11, marginTop: 2 }}>
                    {a.organizer} · {a.year}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: "var(--surface-card)", padding: "var(--space-xl)", position: "sticky", top: 80 }}>
            {selected ? (
              <>
                <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", marginBottom: "var(--space-lg)" }}>
                  <Image src={selected.image} alt={selected.title} fill style={{ objectFit: "cover" }} />
                </div>
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: LEVEL_COLOR[selected.level] }}>
                  {LEVEL_LABEL[selected.level]} · {selected.category}
                </span>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: "var(--on-dark)", textTransform: "uppercase", marginTop: 8, marginBottom: 12, lineHeight: 1.3 }}>
                  {selected.title}
                </h4>
                <p className="body-sm" style={{ fontSize: 12, lineHeight: 1.6 }}>{selected.description}</p>
                <div className="hairline" style={{ margin: "var(--space-lg) 0" }} />
                <p className="label-upper" style={{ fontSize: 10 }}>{selected.organizer}</p>
                <p className="label-upper" style={{ fontSize: 10, marginTop: 4 }}>{selected.year}</p>
              </>
            ) : (
              <div style={{ color: "var(--muted)", textAlign: "center", paddingTop: "var(--space-xxl)" }}>
                <p className="label-upper">Select an achievement</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .feat-grid { grid-template-columns: 1fr !important; }
          .detail-grid { grid-template-columns: 1fr !important; }
          .detail-grid > div:last-child { display: none; }
        }
      `}</style>
    </section>
  );
}