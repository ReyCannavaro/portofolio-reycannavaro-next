"use client";
import { useEffect, useRef, useState } from "react";
import { hardSkills } from "@/app/data/index";
import Image from "next/image";

const CATEGORIES = ["All", "Frontend", "Backend", "Database", "Tools", "Design"];

export default function Skills() {
  const [activeFilter, setFilter] = useState("All");
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

  const filtered = activeFilter === "All"
    ? hardSkills
    : hardSkills.filter(s => s.category === activeFilter);

  return (
    <section ref={ref} id="skills" style={{ padding: "4rem 1rem", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: "1.5rem" }}>
            <span className="section-label section-label--purple">
              Software Skills
            </span>

            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  style={{
                    padding: "4px 12px",
                    borderRadius: 20,
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    border: "1px solid",
                    borderColor: activeFilter === cat ? "var(--accent-3)" : "rgba(0,0,0,0.10)",
                    background: activeFilter === cat ? "#F0EEFF" : "transparent",
                    color: activeFilter === cat ? "var(--accent-3)" : "var(--fg-3)",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            {filtered.map((skill, i) => (
              <div
                key={skill.id}
                title={skill.name}
                style={{
                  width: 56, height: 56,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#FAFAFA",
                  border: "1.5px solid rgba(0,0,0,0.09)",
                  borderRadius: 12,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                  cursor: "default",
                  opacity: inView ? 1 : 0,
                  animation: inView ? `fadeIn 0.4s ease ${0.05 * i}s forwards` : "none",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 18px rgba(0,0,0,0.10)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";
                }}
              >
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  width={30}
                  height={30}
                  style={{ objectFit: "contain" }}
                  unoptimized
                />
              </div>
            ))}
          </div>

          <div style={{ marginTop: "1rem", fontSize: "0.68rem", color: "var(--fg-3)", fontFamily: "var(--font-mono)" }}>
            {filtered.length} tools · hover untuk nama
          </div>
        </div>

      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}