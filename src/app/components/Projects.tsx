"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { projects } from "../data/index";

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("ALL");

  const FILTERS = ["ALL", "Web Development", "AI/ML", "IoT", "Game Development"];

  const featured = projects.filter((p) => p.featured);
  const filtered =
    activeFilter === "ALL"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="projects" ref={ref} style={{ background: "var(--surface-soft)", padding: "var(--space-section) 0" }}>
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "var(--space-xxl)",
            flexWrap: "wrap",
            gap: "var(--space-lg)",
          }}
        >
          <div>
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
          </div>

          <div
            style={{
              display: "flex",
              gap: 0,
              border: "1px solid var(--hairline)",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.6s ease 0.3s",
            }}
          >
            {FILTERS.map((f, idx) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  padding: "8px 16px",
                  background: activeFilter === f ? "var(--on-dark)" : "transparent",
                  color: activeFilter === f ? "var(--canvas)" : "var(--muted)",
                  border: "none",
                  borderRight: idx !== FILTERS.length - 1 ? "1px solid var(--hairline)" : "none",
                  fontSize: 11,
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

        {featured.slice(0, 2).map((project, i) => (
          <div
            key={project.id}
            style={{
              display: "grid",
              gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr",
              gap: 0,
              border: "1px solid var(--hairline)",
              marginBottom: 1,
              background: "var(--surface-card)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: `all 0.7s ease ${0.2 + i * 0.15}s`,
            }}
            className="featured-project"
          >
            <div
              style={{
                position: "relative",
                aspectRatio: "16/10",
                overflow: "hidden",
                order: i % 2 === 0 ? 0 : 1,
              }}
            >
              <Image
                src={project.images.thumbnail}
                alt={project.name}
                fill
                style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                className="project-img"
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.25)",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  padding: "4px 10px",
                  background: "rgba(0,0,0,0.7)",
                  border: "1px solid var(--hairline)",
                  color: "var(--muted)",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  backdropFilter: "blur(4px)",
                }}
              >
                {project.category}
              </span>
            </div>

            <div
              style={{
                padding: "var(--space-xxl) var(--space-xl)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                order: i % 2 === 0 ? 1 : 0,
              }}
            >
              <div>
                <span className="label-upper" style={{ color: "var(--muted)" }}>
                  {project.duration} · {project.status === "ongoing" ? "Ongoing" : "Completed"}
                </span>
                <h3 className="display-md" style={{ marginTop: 12, marginBottom: 12, textTransform: "uppercase" }}>
                  {project.name}
                </h3>
                <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.5px", color: "var(--muted)", textTransform: "uppercase", marginBottom: 16 }}>
                  {project.tagline}
                </p>
                <p className="body-md" style={{ fontSize: 14 }}>
                  {project.description}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "var(--space-lg)" }}>
                  {project.technologies.slice(0, 5).map((t) => (
                    <span
                      key={t}
                      style={{
                        padding: "3px 8px",
                        border: "1px solid var(--hairline)",
                        color: "var(--muted)",
                        fontSize: 11,
                        fontWeight: 300,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: "var(--space-md)", marginTop: "var(--space-xl)", flexWrap: "wrap" }}>
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                    style={{ fontSize: 11 }}
                  >
                    GitHub →
                  </a>
                )}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ fontSize: 11 }}
                  >
                    Live Demo →
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1,
            marginTop: 1,
            background: "var(--hairline)",
          }}
          className="projects-grid"
        >
          {filtered.slice(2).map((project, i) => (
            <div
              key={project.id}
              style={{
                background: "var(--surface-card)",
                display: "flex",
                flexDirection: "column",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.6s ease ${0.5 + i * 0.08}s`,
                overflow: "hidden",
              }}
            >
              <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
                <Image
                  src={project.images.thumbnail}
                  alt={project.name}
                  fill
                  style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                  className="project-img"
                />
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)" }} />
              </div>

              <div style={{ padding: "var(--space-lg)", flex: 1, display: "flex", flexDirection: "column" }}>
                <span className="label-upper" style={{ color: "var(--m-blue-dark)", fontSize: 10 }}>
                  {project.category}
                </span>
                <h4 className="title-lg" style={{ marginTop: 8, marginBottom: 6, textTransform: "uppercase", fontSize: 16 }}>
                  {project.name}
                </h4>
                <p className="body-sm" style={{ flex: 1, fontSize: 13, lineHeight: 1.5 }}>
                  {project.tagline}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: "var(--space-md)" }}>
                  {project.technologies.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      style={{
                        padding: "2px 6px",
                        border: "1px solid var(--hairline)",
                        color: "var(--muted)",
                        fontSize: 10,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="hairline" style={{ margin: "var(--space-md) 0" }} />

                <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: 11,
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
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        color: "var(--canvas)",
                        background: "var(--on-dark)",
                        textDecoration: "none",
                        padding: "5px 12px",
                        transition: "opacity 0.2s",
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.8")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
                    >
                      Live →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .project-img:hover { transform: scale(1.04); }
        @media (max-width: 768px) {
          .featured-project { grid-template-columns: 1fr !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}