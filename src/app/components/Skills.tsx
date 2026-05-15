"use client";
import { useEffect, useRef, useState } from "react";
import { hardSkills, softSkills } from "@/app/data/index";

/* ── per-skill proficiency (0-100) ── */
const SKILL_LEVELS: Record<string, number> = {
  "HTML5": 92, "CSS3": 88, "JavaScript": 82, "React": 80, "Vue.js": 65,
  "Next.js": 75, "Tailwind CSS": 90, "Bootstrap": 78,
  "PHP": 85, "Laravel": 88, "Node.js": 70, "Bash": 60,
  "MySQL": 82, "Pandas": 65, "Scikit-learn": 58,
  "Git": 85, "Figma": 72, "Postman": 75,
  "Android": 55, "React Native": 60,
};

const LEVEL_LABEL = (n: number) =>
  n >= 85 ? "Expert" : n >= 70 ? "Advanced" : n >= 55 ? "Intermediate" : "Beginner";

const LEVEL_COLOR = (n: number) =>
  n >= 85
    ? { bg: "#EAFAF1", color: "#27AE60", bar: "#27AE60" }
    : n >= 70
    ? { bg: "#EEF2FD", color: "#4169E4", bar: "#4169E4" }
    : n >= 55
    ? { bg: "#F5EEF8", color: "#9B59B6", bar: "#9B59B6" }
    : { bg: "#FFF3EE", color: "#C0570A", bar: "#FF9B71" };

/* ── soft skill descriptions ── */
const SOFT_DESC: Record<string, string> = {
  "Komunikasi":               "Clear & concise in team or client settings",
  "Kerja Sama Tim":           "Collaborative across cross-functional teams",
  "Manajemen Waktu":          "Deadline-driven with structured prioritisation",
  "Problem Solving":          "Analytical approach to technical challenges",
  "Kepemimpinan":             "Scout leader, OSIS Secretary, event organiser",
  "Adaptasi & Belajar Cepat": "Self-taught across multiple stacks",
  "Kreativitas":              "UI/UX thinking + out-of-the-box solutions",
};

const SOFT_LEVEL_STYLE: Record<string, { bg: string; color: string }> = {
  expert:       { bg: "#EAFAF1", color: "#27AE60" },
  advanced:     { bg: "#EEF2FD", color: "#4169E4" },
  intermediate: { bg: "#F5EEF8", color: "#9B59B6" },
};

export default function Skills() {
  const [activeFilter, setFilter] = useState("All");
  const [revealed,     setRevealed] = useState(false);
  const [hoveredId,    setHoveredId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setRevealed(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const uniqueCats = ["All", ...Array.from(new Set(hardSkills.map(s => s.category ?? s.type)))];

  const filtered =
    activeFilter === "All"
      ? hardSkills
      : hardSkills.filter(s => (s.category ?? s.type) === activeFilter);

  return (
    <section
      ref={sectionRef}
      id="skills"
      style={{
        padding:         "5rem 24px",
        background:      "#F0F2F5",
        borderTop:       "1px solid #E8EAED",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* ── Section header ── */}
        <div
          style={{
            display:       "flex",
            alignItems:    "flex-end",
            justifyContent:"space-between",
            flexWrap:      "wrap",
            gap:           "16px",
            marginBottom:  "32px",
            opacity:       revealed ? 1 : 0,
            transform:     revealed ? "translateY(0)" : "translateY(18px)",
            transition:    "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <div>
            <span
              style={{
                display:       "inline-block",
                fontFamily:    "'Satoshi', sans-serif",
                fontSize:      "18px",
                fontWeight:    700,
                color:         "#4169E4",
                border:        "2px solid #4169E4",
                borderRadius:  "8px",
                padding:       "3px 14px",
                background:    "#EEF2FD",
                marginBottom:  "10px",
              }}
            >
              Tech Stack
            </span>
            <p
              style={{
                fontFamily:  "'Satoshi', sans-serif",
                fontSize:    "14px",
                color:       "#6B7280",
                lineHeight:  1.6,
                maxWidth:    420,
                margin:      0,
              }}
            >
              Tools and technologies I work with — from backend systems to interactive frontends.
            </p>
          </div>
          <div
            style={{
              display:    "flex",
              gap:        "16px",
              alignItems: "center",
            }}
          >
            {[
              { num: hardSkills.length, label: "Technologies" },
              { num: softSkills.length, label: "Soft Skills" },
            ].map(({ num, label }) => (
              <div
                key={label}
                style={{
                  background:   "#FFFFFF",
                  border:       "1.5px solid #E8EAED",
                  borderRadius: "14px",
                  padding:      "12px 20px",
                  textAlign:    "center",
                  boxShadow:    "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                <div style={{ fontFamily:"'Satoshi',sans-serif", fontWeight:900, fontSize:"22px", color:"#4169E4", lineHeight:1 }}>
                  {num}
                </div>
                <div style={{ fontFamily:"'Satoshi',sans-serif", fontSize:"10px", color:"#9CA3AF", textTransform:"uppercase", letterSpacing:"0.08em", marginTop:3 }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Filter pills ── */}
        <div
          style={{
            display:    "flex",
            flexWrap:   "wrap",
            gap:        "8px",
            marginBottom:"24px",
            opacity:    revealed ? 1 : 0,
            transform:  revealed ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.5s ease 0.08s, transform 0.5s ease 0.08s",
          }}
        >
          {uniqueCats.map(cat => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  fontFamily:    "'Satoshi', sans-serif",
                  fontWeight:    isActive ? 700 : 500,
                  fontSize:      "12px",
                  padding:       "6px 14px",
                  borderRadius:  "999px",
                  border:        isActive ? "1.5px solid #4169E4" : "1.5px solid #E8EAED",
                  background:    isActive ? "#4169E4" : "#FFFFFF",
                  color:         isActive ? "#FFFFFF" : "#6B7280",
                  cursor:        "pointer",
                  transition:    "all 0.18s ease",
                  whiteSpace:    "nowrap",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ── Hard skills grid ── */}
        <div
          style={{
            display:               "grid",
            gridTemplateColumns:   "repeat(auto-fill, minmax(110px, 1fr))",
            gap:                   "12px",
            marginBottom:          "48px",
          }}
        >
          {filtered.map((skill, i) => {
            const level  = SKILL_LEVELS[skill.name] ?? 65;
            const colors = LEVEL_COLOR(level);
            const isHov  = hoveredId === skill.id;

            return (
              <div
                key={skill.id}
                onMouseEnter={() => setHoveredId(skill.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  position:      "relative",
                  display:       "flex",
                  flexDirection: "column",
                  alignItems:    "center",
                  gap:           "10px",
                  padding:       "20px 12px 14px",
                  borderRadius:  "16px",
                  background:    isHov ? "#FFFFFF" : "#FFFFFF",
                  border:        isHov ? `1.5px solid ${colors.bar}40` : "1.5px solid #E8EAED",
                  boxShadow:     isHov ? `0 4px 20px rgba(0,0,0,0.08)` : "0 1px 4px rgba(0,0,0,0.04)",
                  cursor:        "default",
                  overflow:      "hidden",
                  opacity:       revealed ? 1 : 0,
                  transform:     revealed ? "translateY(0)" : "translateY(16px)",
                  transition:    `opacity 0.4s ease ${0.12 + i * 0.025}s, transform 0.4s ease ${0.12 + i * 0.025}s, border-color 0.2s, box-shadow 0.2s`,
                }}
              >
                {/* level badge — appears on hover */}
                <span
                  style={{
                    position:      "absolute",
                    top:           6,
                    right:         6,
                    fontFamily:    "'Satoshi', sans-serif",
                    fontSize:      "9px",
                    fontWeight:    700,
                    padding:       "2px 7px",
                    borderRadius:  "999px",
                    background:    colors.bg,
                    color:         colors.color,
                    opacity:       isHov ? 1 : 0,
                    transition:    "opacity 0.18s ease",
                    pointerEvents: "none",
                    letterSpacing: "0.04em",
                  }}
                >
                  {LEVEL_LABEL(level)}
                </span>

                <img
                  src={skill.icon}
                  alt={skill.name}
                  loading="lazy"
                  style={{
                    width:      36,
                    height:     36,
                    objectFit:  "contain",
                    filter:     isHov ? "none" : "grayscale(0.3) opacity(0.8)",
                    transform:  isHov ? "scale(1.1)" : "scale(1)",
                    transition: "filter 0.25s ease, transform 0.25s ease",
                  }}
                />

                <span
                  style={{
                    fontFamily:  "'Satoshi', sans-serif",
                    fontWeight:  600,
                    fontSize:    "11px",
                    color:       isHov ? "#1A1D23" : "#6B7280",
                    textAlign:   "center",
                    lineHeight:  1.3,
                    transition:  "color 0.2s",
                  }}
                >
                  {skill.name}
                </span>

                {/* progress bar at bottom */}
                <div
                  style={{
                    position:     "absolute",
                    bottom:       0,
                    left:         0,
                    right:        0,
                    height:       3,
                    background:   "#F0F2F5",
                  }}
                >
                  <div
                    style={{
                      height:       "100%",
                      width:        isHov ? `${level}%` : "0%",
                      background:   `linear-gradient(90deg, ${colors.bar}, ${colors.bar}99)`,
                      borderRadius: "0 2px 2px 0",
                      transition:   "width 0.5s cubic-bezier(0.23,1,0.32,1)",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Soft Skills ── */}
        <div
          style={{
            opacity:    revealed ? 1 : 0,
            transform:  revealed ? "translateY(0)" : "translateY(18px)",
            transition: "opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s",
          }}
        >
          {/* sub-header */}
          <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"16px" }}>
            <span
              style={{
                display:      "inline-block",
                fontFamily:   "'Satoshi', sans-serif",
                fontSize:     "18px",
                fontWeight:   700,
                color:        "#9B59B6",
                border:       "2px solid #9B59B6",
                borderRadius: "8px",
                padding:      "3px 14px",
                background:   "#F5EEF8",
              }}
            >
              Soft Skills
            </span>
            <div style={{ flex:1, height:1, background:"#E8EAED" }} />
            <span
              style={{
                fontFamily:  "'Satoshi', sans-serif",
                fontSize:    "11px",
                color:       "#9CA3AF",
                fontWeight:  600,
              }}
            >
              {softSkills.length} traits
            </span>
          </div>

          <div
            style={{
              display:             "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap:                 "10px",
            }}
          >
            {softSkills.map((skill, i) => {
              const lvlStyle = SOFT_LEVEL_STYLE[skill.level ?? "intermediate"] ?? SOFT_LEVEL_STYLE.intermediate;
              return (
                <div
                  key={skill.id}
                  style={{
                    display:       "flex",
                    alignItems:    "center",
                    gap:           "12px",
                    padding:       "14px 16px",
                    borderRadius:  "14px",
                    background:    "#FFFFFF",
                    border:        "1.5px solid #E8EAED",
                    boxShadow:     "0 1px 4px rgba(0,0,0,0.04)",
                    cursor:        "default",
                    opacity:       revealed ? 1 : 0,
                    transform:     revealed ? "translateY(0)" : "translateY(12px)",
                    transition:    `opacity 0.4s ease ${0.33 + i * 0.06}s, transform 0.4s ease ${0.33 + i * 0.06}s`,
                  }}
                >
                  {/* icon box */}
                  <div
                    style={{
                      width:        42,
                      height:       42,
                      borderRadius: "12px",
                      background:   "#F0F2F5",
                      border:       "1.5px solid #E8EAED",
                      display:      "flex",
                      alignItems:   "center",
                      justifyContent:"center",
                      flexShrink:   0,
                      overflow:     "hidden",
                    }}
                  >
                    {skill.icon
                      ? <img src={skill.icon} alt={skill.name} style={{ width:26, height:26, objectFit:"contain" }} />
                      : <span style={{ fontSize:18 }}>—</span>
                    }
                  </div>

                  {/* text */}
                  <div style={{ flex:1, minWidth:0 }}>
                    <div
                      style={{
                        fontFamily:   "'Satoshi', sans-serif",
                        fontWeight:   700,
                        fontSize:     "13px",
                        color:        "#1A1D23",
                        marginBottom: "2px",
                        whiteSpace:   "nowrap",
                        overflow:     "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {skill.nameEn ?? skill.name}
                    </div>
                    <div
                      style={{
                        fontFamily:   "'Satoshi', sans-serif",
                        fontSize:     "11px",
                        color:        "#9CA3AF",
                        whiteSpace:   "nowrap",
                        overflow:     "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {SOFT_DESC[skill.name] ?? skill.description}
                    </div>
                  </div>

                  {/* level badge */}
                  <span
                    style={{
                      flexShrink:    0,
                      fontFamily:    "'Satoshi', sans-serif",
                      fontSize:      "10px",
                      fontWeight:    700,
                      padding:       "3px 10px",
                      borderRadius:  "999px",
                      background:    lvlStyle.bg,
                      color:         lvlStyle.color,
                      textTransform: "capitalize",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {skill.level ?? "Intermediate"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}