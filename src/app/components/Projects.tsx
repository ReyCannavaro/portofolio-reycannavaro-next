"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { projects } from "../data/index";

// 3 project unggulan yang menonjol di bagian atas
const HERO_PROJECT_IDS = ["findor", "sira", "pt-rizza-jaya-abadi"];

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeHero, setActiveHero] = useState(0);

  const FILTERS = ["ALL", "Web Development", "AI/ML", "IoT", "Game Development"];

  const heroProjects = HERO_PROJECT_IDS.map((id) => projects.find((p) => p.id === id)!).filter(Boolean);
  const otherProjects =
    activeFilter === "ALL"
      ? projects.filter((p) => !HERO_PROJECT_IDS.includes(p.id))
      : projects.filter((p) => !HERO_PROJECT_IDS.includes(p.id) && p.category === activeFilter);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Auto-rotate hero project highlight
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHero((i) => (i + 1) % heroProjects.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroProjects.length]);

  const active = heroProjects[activeHero];

  return (
    <section id="projects" ref={ref} style={{ background: "var(--surface-soft)", padding: "var(--space-section) 0" }}>
      <div className="container">

        {/* ── Section header ── */}
        <div style={{ marginBottom: "var(--space-xxl)" }}>
          <span
            className="label-upper"
            style={{
              color: "var(--m-blue-dark)",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            03 — Work
          </span>
          <div className="m-stripe" style={{ width: 48, marginTop: 12, marginBottom: 16 }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
            <h2
              className="display-lg"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease 0.1s",
              }}
            >
              SELECTED<br />PROJECTS
            </h2>
            <p
              className="body-sm"
              style={{
                maxWidth: 320,
                opacity: visible ? 1 : 0,
                transition: "opacity 0.6s ease 0.2s",
                color: "var(--muted)",
              }}
            >
              Karya pilihan yang mencerminkan kemampuan teknis dan kepedulian terhadap pengalaman pengguna.
            </p>
          </div>
        </div>

        {/* ── FEATURED TRIO — Showcase panel ── */}
        <div
          className="featured-showcase"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 340px",
            gap: 1,
            background: "var(--hairline)",
            marginBottom: "var(--space-xxl)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: "all 0.8s ease 0.3s",
            minHeight: 480,
          }}
        >
          {/* Main image panel */}
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              background: "var(--canvas)",
              minHeight: 380,
            }}
          >
            {heroProjects.map((p, i) => (
              <div
                key={p.id}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: i === activeHero ? 1 : 0,
                  transition: "opacity 0.7s ease",
                  zIndex: i === activeHero ? 1 : 0,
                }}
              >
                <Image
                  src={p.images.thumbnail}
                  alt={p.name}
                  fill
                  style={{ objectFit: "cover", objectPosition: "top center" }}
                  priority={i === 0}
                />
                {/* soft gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)",
                  }}
                />
              </div>
            ))}

            {/* Bottom-left badge */}
            <div
              style={{
                position: "absolute",
                bottom: 24,
                left: 24,
                zIndex: 10,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <span
                style={{
                  padding: "4px 12px",
                  background: "rgba(28, 105, 212, 0.85)",
                  backdropFilter: "blur(8px)",
                  color: "#fff",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  display: "inline-block",
                  width: "fit-content",
                }}
              >
                Featured
              </span>
              <h3
                style={{
                  fontSize: "clamp(22px, 3vw, 36px)",
                  fontWeight: 700,
                  color: "#fff",
                  textTransform: "uppercase",
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                }}
              >
                {active?.name}
              </h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", fontWeight: 300 }}>
                {active?.tagline}
              </p>
            </div>

            {/* Dot indicators */}
            <div
              style={{
                position: "absolute",
                bottom: 24,
                right: 24,
                zIndex: 10,
                display: "flex",
                gap: 6,
              }}
            >
              {heroProjects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveHero(i)}
                  style={{
                    width: i === activeHero ? 24 : 6,
                    height: 6,
                    borderRadius: 999,
                    background: i === activeHero ? "#fff" : "rgba(255,255,255,0.3)",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    transition: "all 0.35s ease",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right panel — stacked project tabs */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              background: "var(--surface-card)",
            }}
          >
            {heroProjects.map((p, i) => {
              const isActive = i === activeHero;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveHero(i)}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "var(--space-lg) var(--space-xl)",
                    background: isActive ? "var(--surface-elevated)" : "transparent",
                    border: "none",
                    borderBottom: i < heroProjects.length - 1 ? "1px solid var(--hairline)" : "none",
                    borderLeft: isActive ? "2px solid var(--m-blue-dark)" : "2px solid transparent",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.25s ease",
                    gap: 8,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: "1.5px",
                          textTransform: "uppercase",
                          color: isActive ? "var(--m-blue-dark)" : "var(--muted)",
                          display: "block",
                          marginBottom: 4,
                          transition: "color 0.25s",
                        }}
                      >
                        {p.category}
                      </span>
                      <span
                        style={{
                          fontSize: 15,
                          fontWeight: 700,
                          color: isActive ? "var(--on-dark)" : "var(--body-strong)",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          transition: "color 0.25s",
                        }}
                      >
                        {p.name}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: 16,
                        color: isActive ? "var(--on-dark)" : "var(--muted)",
                        transition: "all 0.25s",
                        transform: isActive ? "translateX(0)" : "translateX(-4px)",
                        display: "inline-block",
                      }}
                    >
                      →
                    </span>
                  </div>

                  {isActive && (
                    <div style={{ marginTop: 8 }}>
                      <p style={{ fontSize: 12, color: "var(--body)", lineHeight: 1.55, fontWeight: 300, marginBottom: 12 }}>
                        {p.description}
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 14 }}>
                        {p.technologies.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            style={{
                              padding: "2px 8px",
                              border: "1px solid var(--hairline)",
                              color: "var(--muted)",
                              fontSize: 10,
                              fontWeight: 400,
                              borderRadius: 2,
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        {p.links.github && (
                          <a
                            href={p.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              fontSize: 10,
                              fontWeight: 700,
                              letterSpacing: "1.2px",
                              textTransform: "uppercase",
                              color: "var(--muted)",
                              textDecoration: "none",
                              border: "1px solid var(--hairline)",
                              padding: "5px 10px",
                              transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLAnchorElement).style.color = "var(--on-dark)";
                              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--on-dark)";
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)";
                              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--hairline)";
                            }}
                          >
                            GitHub →
                          </a>
                        )}
                        {p.links.live && (
                          <a
                            href={p.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              fontSize: 10,
                              fontWeight: 700,
                              letterSpacing: "1.2px",
                              textTransform: "uppercase",
                              color: "#fff",
                              background: "var(--m-blue-dark)",
                              textDecoration: "none",
                              padding: "5px 10px",
                              transition: "opacity 0.2s",
                            }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.8")}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
                          >
                            Live Demo →
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Progress bar (active indicator) */}
                  {isActive && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 2,
                        background: "var(--hairline)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        key={activeHero}
                        style={{
                          height: "100%",
                          background: "var(--m-blue-dark)",
                          animation: "progressBar 4s linear forwards",
                        }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Filter bar ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "var(--space-xl)",
            flexWrap: "wrap",
            gap: 12,
            opacity: visible ? 1 : 0,
            transition: "opacity 0.5s ease 0.5s",
          }}
        >
          <span className="label-upper" style={{ color: "var(--muted)" }}>
            More Projects
          </span>
          <div style={{ display: "flex", gap: 0, border: "1px solid var(--hairline)" }}>
            {FILTERS.map((f, idx) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  padding: "7px 14px",
                  background: activeFilter === f ? "var(--on-dark)" : "transparent",
                  color: activeFilter === f ? "var(--canvas)" : "var(--muted)",
                  border: "none",
                  borderRight: idx !== FILTERS.length - 1 ? "1px solid var(--hairline)" : "none",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* ── Other projects grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "var(--space-sm)",
          }}
          className="projects-grid"
        >
          {otherProjects.map((project, i) => {
            const isHov = hoveredId === project.id;
            return (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  background: isHov ? "var(--surface-elevated)" : "var(--surface-card)",
                  border: `1px solid ${isHov ? "var(--hairline-strong)" : "var(--hairline)"}`,
                  display: "flex",
                  flexDirection: "column",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.6s ease ${0.5 + i * 0.07}s, transform 0.6s ease ${0.5 + i * 0.07}s, background 0.2s, border-color 0.2s`,
                  overflow: "hidden",
                  borderRadius: 2,
                  cursor: "default",
                }}
              >
                {/* Image */}
                <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
                  <Image
                    src={project.images.thumbnail}
                    alt={project.name}
                    fill
                    style={{
                      objectFit: "cover",
                      transition: "transform 0.5s ease",
                      transform: isHov ? "scale(1.04)" : "scale(1)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: isHov ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.35)",
                      transition: "background 0.3s",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      padding: "3px 8px",
                      background: "rgba(0,0,0,0.6)",
                      backdropFilter: "blur(4px)",
                      color: "var(--muted)",
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                    }}
                  >
                    {project.category}
                  </span>
                  <span
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      padding: "3px 8px",
                      background: project.status === "ongoing" ? "rgba(15,163,54,0.8)" : "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(4px)",
                      color: "#fff",
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                    }}
                  >
                    {project.status === "ongoing" ? "● Ongoing" : "Completed"}
                  </span>
                </div>

                {/* Content */}
                <div style={{ padding: "var(--space-md) var(--space-lg)", flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                  <h4
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "var(--on-dark)",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      lineHeight: 1.2,
                    }}
                  >
                    {project.name}
                  </h4>
                  <p style={{ fontSize: 12, color: "var(--body)", lineHeight: 1.5, fontWeight: 300, flex: 1 }}>
                    {project.tagline}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
                    {project.technologies.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        style={{
                          padding: "2px 6px",
                          border: "1px solid var(--hairline)",
                          color: "var(--muted)",
                          fontSize: 10,
                          fontWeight: 300,
                          borderRadius: 2,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div style={{ height: 1, background: "var(--hairline)", marginTop: 8 }} />

                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                          color: "var(--muted)",
                          textDecoration: "none",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--on-dark)")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)")}
                      >
                        GitHub →
                      </a>
                    )}
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                          color: "var(--m-blue-dark)",
                          textDecoration: "none",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#fff")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--m-blue-dark)")}
                      >
                        Live Demo →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes progressBar {
          from { width: 0%; }
          to   { width: 100%; }
        }

        /* Featured showcase responsive */
        @media (max-width: 768px) {
          .featured-showcase {
            grid-template-columns: 1fr !important;
          }
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .featured-showcase {
            grid-template-columns: 1fr 280px !important;
          }
          .projects-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}