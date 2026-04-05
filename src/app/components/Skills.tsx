"use client";
import { useEffect, useRef, useState } from "react";
import { hardskills, softskills } from "@/app/data/index";

/* ── Category filter list ──────────────────────────────────────────────── */
const CATEGORIES = ["All", "Frontend", "Backend", "Database", "Mobile Dev", "CLI", "UI/UX", "Version Control", "API Testing", "Data Science", "Machine Learning", "Framework"];

/* ── Skill level map — add/adjust as needed ────────────────────────────── */
const SKILL_LEVELS: Record<string, number> = {
  "HTML5": 92, "CSS3": 88, "JavaScript": 82, "React": 80, "Vue.js": 65,
  "Next.js": 75, "Tailwind CSS": 90, "Bootstrap": 78,
  "PHP": 85, "Laravel": 88, "Node.js": 70, "Bash": 60,
  "MySQL": 82, "Pandas": 65, "Scikit-learn": 58,
  "Git": 85, "Figma": 72, "Postman": 75,
  "Android": 55, "React Native": 60,
};

/* ── Soft skill icon mapping — emoji as fallback ───────────────────────── */
const SOFT_ICONS: Record<string, string> = {
  "Komunikasi":          "◎",
  "Kerja Sama Tim":      "◈",
  "Manajemen Waktu":     "◷",
  "Problem Solving":     "⬡",
  "Kepemimpinan":        "◉",
  "Adaptasi & Belajar Cepat": "◬",
  "Kreativitas":         "✦",
};

const SOFT_DESC: Record<string, string> = {
  "Komunikasi":          "Clear & concise in team or client settings",
  "Kerja Sama Tim":      "Collaborative across cross-functional teams",
  "Manajemen Waktu":     "Deadline-driven with structured prioritisation",
  "Problem Solving":     "Analytical approach to technical challenges",
  "Kepemimpinan":        "Scout leader, OSIS Secretary, event organiser",
  "Adaptasi & Belajar Cepat": "Self-taught across multiple stacks",
  "Kreativitas":         "UI/UX thinking + out-of-the-box solutions",
};

export default function Skills() {
  const [activeFilter, setFilter] = useState("All");
  const [revealed, setRevealed]   = useState(false);
  const [hovered, setHovered]     = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setRevealed(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const filtered = activeFilter === "All"
    ? hardskills
    : hardskills.filter(s => s.type === activeFilter);

  const uniqueCats = ["All", ...Array.from(new Set(hardskills.map(s => s.type)))];

  return (
    <>
      <style>{`
        .skills-section {
          padding: 7rem 2.5rem;
          position: relative;
          overflow: hidden;
          border-top: 1px solid var(--border);
        }
        .skills-inner { max-width: 1200px; margin: 0 auto; }

        /* ── Header — editorial two-column ── */
        .skills-header {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-bottom: 4rem;
          padding-bottom: 2.5rem;
          border-bottom: 1px solid var(--border);
        }
        @media (min-width: 768px) {
          .skills-header { grid-template-columns: 1fr 1fr; align-items: end; }
        }
        .skills-heading {
          font-family: var(--font-syne);
          font-weight: 800;
          font-size: clamp(2.2rem, 5vw, 4rem);
          letter-spacing: -0.04em;
          line-height: 0.92;
          color: var(--fg);
          margin: 0;
        }
        .skills-heading-outline {
          -webkit-text-stroke: 1px rgba(241,245,249,0.18);
          color: transparent;
        }
        .skills-meta {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          justify-content: flex-end;
        }
        .skills-desc {
          font-family: var(--font-syne);
          font-size: 0.92rem;
          color: var(--fg-2);
          line-height: 1.75;
          max-width: 340px;
        }
        .skills-count {
          font-family: var(--font-dm-mono);
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--fg-3);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .skills-count-num {
          font-family: var(--font-syne);
          font-weight: 800;
          font-size: 1.4rem;
          color: var(--accent);
          letter-spacing: -0.04em;
        }

        /* ── Filter pills ── */
        .filter-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 2.5rem;
        }
        .filter-pill {
          font-family: var(--font-dm-mono);
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.35rem 0.85rem;
          border-radius: 999px;
          border: 1px solid var(--border);
          color: var(--fg-3);
          background: transparent;
          cursor: none;
          transition: all 0.2s ease;
        }
        .filter-pill:hover { border-color: var(--border-2); color: var(--fg); }
        .filter-pill.active {
          background: var(--accent);
          border-color: var(--accent);
          color: #fff;
        }

        /* ── Hard skill grid ── */
        .skill-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: 0.75rem;
          margin-bottom: 5rem;
        }
        .skill-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          padding: 1.25rem 0.75rem 1rem;
          border-radius: 14px;
          background: var(--bg-2);
          border: 1px solid var(--border);
          cursor: default;
          transition: border-color 0.2s, background 0.2s, transform 0.2s;
          overflow: hidden;
        }
        .skill-card:hover {
          border-color: rgba(99,102,241,0.4);
          background: var(--bg-3);
          transform: translateY(-4px);
        }
        .skill-card img {
          width: 36px;
          height: 36px;
          object-fit: contain;
          filter: grayscale(1) brightness(0.7);
          transition: filter 0.3s ease, transform 0.3s ease;
        }
        .skill-card:hover img {
          filter: grayscale(0) brightness(1);
          transform: scale(1.1);
        }
        .skill-name {
          font-family: var(--font-dm-mono);
          font-size: 0.55rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--fg-3);
          text-align: center;
          transition: color 0.2s;
          line-height: 1.3;
        }
        .skill-card:hover .skill-name { color: var(--accent); }

        /* level bar — only visible on hover */
        .skill-level-bar {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: var(--border);
        }
        .skill-level-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent), var(--cyan));
          border-radius: 2px;
          width: 0;
          transition: width 0.5s cubic-bezier(0.23,1,0.32,1);
        }
        .skill-card:hover .skill-level-fill { width: var(--level); }

        /* type badge */
        .skill-type {
          position: absolute;
          top: 6px; right: 6px;
          font-family: var(--font-dm-mono);
          font-size: 0.45rem;
          padding: 2px 5px;
          border-radius: 4px;
          background: rgba(99,102,241,0.1);
          color: var(--accent);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .skill-card:hover .skill-type { opacity: 1; }

        /* reveal animation */
        .skill-card {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.4s ease, transform 0.4s ease, border-color 0.2s, background 0.2s;
        }
        .skill-card.shown {
          opacity: 1;
          transform: translateY(0);
        }
        .skill-card.shown:hover { transform: translateY(-4px); }

        /* ── Soft skills — horizontal cards ── */
        .soft-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .soft-title {
          font-family: var(--font-syne);
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: -0.01em;
          color: var(--fg);
        }
        .soft-line {
          flex: 1;
          height: 1px;
          background: var(--border);
        }
        .soft-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.6rem;
        }
        @media (min-width: 640px) { .soft-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .soft-grid { grid-template-columns: repeat(3, 1fr); } }

        .soft-card {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.9rem 1rem;
          border-radius: 12px;
          background: var(--bg-2);
          border: 1px solid var(--border);
          transition: border-color 0.2s, background 0.2s;
          cursor: default;
        }
        .soft-card:hover {
          border-color: rgba(99,102,241,0.3);
          background: var(--bg-3);
        }
        .soft-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(99,102,241,0.08);
          border: 1px solid rgba(99,102,241,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          flex-shrink: 0;
          transition: background 0.2s, border-color 0.2s;
        }
        .soft-card:hover .soft-icon-box {
          background: rgba(99,102,241,0.15);
          border-color: rgba(99,102,241,0.3);
        }
        .soft-info { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .soft-name {
          font-family: var(--font-syne);
          font-weight: 600;
          font-size: 0.82rem;
          color: var(--fg);
          letter-spacing: -0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .soft-desc {
          font-family: var(--font-dm-mono);
          font-size: 0.55rem;
          letter-spacing: 0.06em;
          color: var(--fg-3);
          line-height: 1.4;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* section reveal */
        .skills-reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .skills-reveal.shown { opacity: 1; transform: translateY(0); }
      `}</style>

      <section ref={sectionRef} id="skills" className="skills-section">
        <div className="skills-inner">

          {/* ── Editorial header ── */}
          <div className={`skills-header skills-reveal ${revealed ? "shown" : ""}`}>
            <div>
              <p style={{
                fontFamily:"var(--font-dm-mono)", fontSize:"0.6rem",
                letterSpacing:"0.2em", textTransform:"uppercase",
                color:"var(--accent)", marginBottom:"0.75rem",
                display:"flex", alignItems:"center", gap:"0.5rem",
              }}>
                <span style={{ width:16, height:1, background:"var(--accent)", display:"block" }} />
                Capabilities
              </p>
              <h2 className="skills-heading">
                Tech Stack<br />
                <span className="skills-heading-outline">&</span>{" "}Skills
              </h2>
            </div>
            <div className="skills-meta">
              <p className="skills-desc">
                Tools and technologies I work with daily — from backend systems to interactive frontends.
              </p>
              <div className="skills-count">
                <span className="skills-count-num">{hardskills.length}</span>
                technologies mastered
                <span style={{ margin:"0 0.25rem", color:"var(--border-2)" }}>·</span>
                <span className="skills-count-num">{softskills.length}</span>
                soft skills
              </div>
            </div>
          </div>

          {/* ── Filter bar ── */}
          <div className={`filter-bar skills-reveal ${revealed ? "shown" : ""}`}
            style={{ transitionDelay:"0.1s" }}>
            {uniqueCats.map(cat => (
              <button
                key={cat}
                className={`filter-pill ${activeFilter === cat ? "active" : ""}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ── Hard skills grid ── */}
          <div className="skill-grid">
            {filtered.map((skill, i) => {
              const level = SKILL_LEVELS[skill.name] ?? 65;
              return (
                <div
                  key={skill.id}
                  className={`skill-card ${revealed ? "shown" : ""}`}
                  style={{
                    transitionDelay: revealed ? `${0.15 + i * 0.03}s` : "0s",
                    ["--level" as string]: `${level}%`,
                  }}
                  onMouseEnter={() => setHovered(skill.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <span className="skill-type">{skill.type}</span>
                  <img src={skill.icon} alt={skill.name} loading="lazy" />
                  <span className="skill-name">{skill.name}</span>
                  <div className="skill-level-bar">
                    <div className="skill-level-fill" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Soft skills ── */}
          <div className={`skills-reveal ${revealed ? "shown" : ""}`}
            style={{ transitionDelay:"0.3s" }}>
            <div className="soft-header">
              <span style={{ width:16, height:1, background:"var(--border-2)", display:"block" }} />
              <span className="soft-title">Soft Skills</span>
              <div className="soft-line" />
              <span style={{
                fontFamily:"var(--font-dm-mono)", fontSize:"0.55rem",
                letterSpacing:"0.15em", color:"var(--fg-3)", textTransform:"uppercase",
              }}>
                {softskills.length} traits
              </span>
            </div>

            <div className="soft-grid">
              {softskills.map((skill, i) => (
                <div
                  key={skill.id}
                  className="soft-card"
                  style={{
                    opacity: revealed ? 1 : 0,
                    transform: revealed ? "translateY(0)" : "translateY(12px)",
                    transition: `opacity 0.4s ease ${0.35 + i * 0.06}s, transform 0.4s ease ${0.35 + i * 0.06}s, border-color 0.2s, background 0.2s`,
                  }}
                >
                  <div className="soft-icon-box">
                    {SOFT_ICONS[skill.name] ?? "◎"}
                  </div>
                  <div className="soft-info">
                    <span className="soft-name">{skill.name}</span>
                    <span className="soft-desc">{SOFT_DESC[skill.name] ?? skill.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}