"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  FiGithub, FiArrowUpRight, FiExternalLink,
  FiClock, FiUsers, FiLayers, FiZap,
} from "react-icons/fi";
import { projects, statistics } from "../data/index";

const EASE = [0.22, 1, 0.36, 1] as const;

const FILTERS = ["All", "Web Development", "AI/ML", "IoT", "Game Development"] as const;

const CAT_THEME: Record<string, { bg: string; color: string; shadow: string; sticker: string }> = {
  "Web Development": { bg: "var(--navy)",       color: "#fff",            shadow: "4px 4px 0 var(--sky)",        sticker: "navy"   },
  "AI/ML":           { bg: "var(--orange-light)",color: "var(--orange)",   shadow: "4px 4px 0 var(--orange)",     sticker: "orange" },
  "IoT":             { bg: "var(--lime)",        color: "var(--green-dark)",shadow:"4px 4px 0 var(--green-dark)", sticker: "green"  },
  "Game Development":{ bg: "var(--rose)",        color: "var(--red)",      shadow: "4px 4px 0 var(--red)",        sticker: "red"    },
};
const DEFAULT_THEME = { bg: "var(--bg-2)", color: "var(--fg)", shadow: "4px 4px 0 #000", sticker: "white" };

const STATUS_STYLE: Record<string, { label: string; sticker: string; dot: string }> = {
  completed: { label: "Completed",  sticker: "green",  dot: "var(--green-mid)"  },
  ongoing:   { label: "In Progress",sticker: "orange", dot: "var(--orange-mid)" },
  archived:  { label: "Archived",   sticker: "white",  dot: "var(--fg-3)"       },
};

function ImageSlider({ images, name }: { images: string[]; name: string }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % images.length), 3600);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ position: "absolute", inset: 0 }}
        >
          <Image
            src={images[idx]}
            alt={`${name} screenshot ${idx + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 4,
            zIndex: 4,
          }}
        >
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setIdx(i); }}
              style={{
                height: 3,
                width: i === idx ? 18 : 5,
                background: i === idx ? "#fff" : "rgba(255,255,255,0.3)",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectCard({
  project,
  index,
  inView,
  featured,
}: {
  project: (typeof projects)[0];
  index: number;
  inView: boolean;
  featured?: boolean;
}) {
  const theme = CAT_THEME[project.category] ?? DEFAULT_THEME;
  const status = STATUS_STYLE[project.status] ?? STATUS_STYLE.completed;
  const [hovered, setHovered] = useState(false);

  const images = project.images?.gallery ?? [project.images?.thumbnail].filter(Boolean) as string[];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      exit={{ opacity: 0, y: -16, scale: 0.96 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: "2px solid #000",
        boxShadow: hovered ? "8px 8px 0 #000" : "4px 4px 0 #000",
        background: "var(--bg-3)",
        display: "flex",
        flexDirection: "column",
        transform: hovered ? "translate(-3px,-3px)" : "translate(0,0)",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        overflow: "hidden",
        height: "100%",
      }}
    >
      <div
        style={{
          position: "relative",
          height: featured ? 280 : 220,
          flexShrink: 0,
          overflow: "hidden",
          borderBottom: "2px solid #000",
          background: theme.bg,
        }}
      >
        {images.length > 0 ? (
          <ImageSlider images={images} name={project.name} />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: theme.bg,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(48px, 8vw, 80px)",
                color: theme.color,
                opacity: 0.18,
                letterSpacing: "-0.04em",
              }}
            >
              {project.name.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            right: 12,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            zIndex: 3,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.14em",
              color: "rgba(255,255,255,0.7)",
              background: "rgba(0,0,0,0.5)",
              padding: "3px 8px",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.9)",
                background: "rgba(0,0,0,0.55)",
                padding: "3px 9px",
                backdropFilter: "blur(4px)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: status.dot,
                  display: "inline-block",
                }}
              />
              {status.label}
            </div>

            {featured && (
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--navy)",
                  background: "var(--sky)",
                  padding: "3px 9px",
                  border: "1px solid #000",
                  fontWeight: 700,
                }}
              >
                ★ Featured
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: 12,
            right: 28,
            zIndex: 3,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.75)",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <FiUsers size={9} /> {project.teamSize} member{project.teamSize !== 1 ? "s" : ""}
          </span>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 9 }}>·</span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.75)",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <FiClock size={9} /> {project.duration}
          </span>
        </div>
      </div>

      <div
        style={{
          padding: "20px 22px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          flex: 1,
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          <span className={`sticker sticker--${theme.sticker}`} style={{ fontSize: 10 }}>
            {project.category}
          </span>
          <span className="sticker" style={{ fontSize: 10, textTransform: "capitalize" }}>
            {project.type}
          </span>
        </div>

        <div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(22px, 3vw, 30px)",
              fontWeight: 400,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              color: "var(--navy)",
              margin: "0 0 6px",
            }}
          >
            {project.name}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--fg-3)",
              margin: 0,
            }}
          >
            {project.tagline}
          </p>
        </div>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            lineHeight: 1.65,
            color: "var(--fg-2)",
            margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            flex: 1,
          }}
        >
          {project.description}
        </p>

        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--fg-3)",
              marginBottom: 6,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <FiLayers size={9} /> Stack
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "3px 8px",
                  border: "1.5px solid rgba(0,0,0,0.15)",
                  background: "var(--bg-2)",
                  color: "var(--fg-2)",
                }}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  padding: "3px 6px",
                  color: "var(--fg-3)",
                  border: "1.5px dashed rgba(0,0,0,0.1)",
                }}
              >
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>
        </div>

        <div
          style={{
            padding: "8px 12px",
            background: hovered ? theme.bg : "var(--bg-2)",
            border: "1.5px solid rgba(0,0,0,0.12)",
            display: "flex",
            alignItems: "center",
            gap: 6,
            transition: "background 0.2s",
          }}
        >
          <FiZap size={10} style={{ color: hovered ? theme.color : "var(--fg-3)", transition: "color 0.2s" }} />
          <span
            style={{
              fontFamily: "var(--font-accent)",
              fontWeight: 700,
              fontSize: 11,
              color: hovered ? theme.color : "var(--fg-2)",
              transition: "color 0.2s",
            }}
          >
            {project.role}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            gap: 8,
            paddingTop: 4,
            marginTop: "auto",
          }}
        >
          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-raw"
              style={{ flex: 1, fontSize: 11, padding: "8px 12px", justifyContent: "center" }}
            >
              <FiGithub size={12} /> GitHub
            </a>
          )}

          {project.links?.live ? (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-raw btn-raw--navy"
              style={{ flex: 1, fontSize: 11, padding: "8px 12px", justifyContent: "center" }}
            >
              <FiExternalLink size={12} /> Live
            </a>
          ) : (
            <div
              style={{
                flex: 1,
                fontSize: 11,
                padding: "8px 12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                border: "2px dashed rgba(0,0,0,0.15)",
                fontFamily: "var(--font-accent)",
                fontWeight: 700,
                color: "var(--fg-3)",
                cursor: "not-allowed",
              }}
            >
              Private / WIP
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function FeaturedCard({ project, inView }: { project: (typeof projects)[0]; inView: boolean }) {
  const theme = CAT_THEME[project.category] ?? DEFAULT_THEME;
  const status = STATUS_STYLE[project.status] ?? STATUS_STYLE.completed;
  const [hovered, setHovered] = useState(false);

  const images = project.images?.gallery ?? [project.images?.thumbnail].filter(Boolean) as string[];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.55, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: "2px solid #000",
        boxShadow: hovered ? "10px 10px 0 #000" : "6px 6px 0 #000",
        background: "var(--bg-3)",
        display: "grid",
        gridTemplateColumns: "1fr",
        transform: hovered ? "translate(-3px,-3px)" : "translate(0,0)",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        overflow: "hidden",
      }}
    >
      <style>{`
        @media (min-width: 768px) {
          .featured-inner { grid-template-columns: 1.1fr 1fr !important; }
        }
      `}</style>
      <div
        className="featured-inner"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 0,
        }}
      >
        <div
          style={{
            position: "relative",
            minHeight: 300,
            borderBottom: "2px solid #000",
            background: theme.bg,
            overflow: "hidden",
          }}
        >
          {images.length > 0 && <ImageSlider images={images} name={project.name} />}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 14,
              left: 14,
              zIndex: 3,
              background: "var(--sky)",
              border: "2px solid #000",
              padding: "4px 12px",
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--navy)",
              fontWeight: 700,
            }}
          >
            ★ Featured Project
          </div>
        </div>

        <div
          style={{
            padding: "28px 28px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            borderLeft: "2px solid #000",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            <span className={`sticker sticker--${theme.sticker}`} style={{ fontSize: 10 }}>
              {project.category}
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: status.dot === "var(--green-mid)" ? "var(--green-dark)" : "var(--orange)",
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: status.dot,
                  display: "inline-block",
                }}
              />
              {status.label}
            </span>
          </div>

          <div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 400,
                lineHeight: 0.92,
                letterSpacing: "-0.03em",
                color: "var(--navy)",
                margin: "0 0 8px",
              }}
            >
              {project.name}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--fg-3)",
                margin: 0,
              }}
            >
              {project.tagline}
            </p>
          </div>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              lineHeight: 1.65,
              color: "var(--fg-2)",
              margin: 0,
            }}
          >
            {project.description}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {[
              { icon: <FiClock size={10} />, val: project.duration },
              { icon: <FiUsers size={10} />, val: `${project.teamSize} member${project.teamSize !== 1 ? "s" : ""}` },
              { icon: <FiZap size={10} />, val: project.role },
            ].map((item, i) => (
              <span
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.08em",
                  color: "var(--fg-3)",
                }}
              >
                {item.icon} {item.val}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {project.technologies.map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "3px 9px",
                  border: "1.5px solid rgba(0,0,0,0.15)",
                  background: "var(--bg-2)",
                  color: "var(--fg-2)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: "auto" }}>
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-raw"
                style={{ fontSize: 12, padding: "9px 18px" }}
              >
                <FiGithub size={13} /> GitHub
              </a>
            )}
            {project.links?.live ? (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-raw btn-raw--navy"
                style={{ fontSize: 12, padding: "9px 18px" }}
              >
                <FiExternalLink size={13} /> Live Demo
              </a>
            ) : (
              <span
                className="btn-raw"
                style={{
                  fontSize: 12,
                  padding: "9px 18px",
                  opacity: 0.45,
                  cursor: "not-allowed",
                  borderStyle: "dashed",
                  boxShadow: "none",
                }}
              >
                Private / WIP
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function FilterBar({
  active,
  onChange,
}: {
  active: string;
  onChange: (f: string) => void;
}) {
  const counts: Record<string, number> = { All: projects.length };
  FILTERS.slice(1).forEach((f) => {
    counts[f] = projects.filter((p) => p.category === f).length;
  });

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      {FILTERS.map((f) => {
        const isActive = active === f;
        return (
          <button
            key={f}
            onClick={() => onChange(f)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "var(--font-accent)",
              fontWeight: 700,
              fontSize: 12,
              padding: "7px 14px",
              border: "2px solid #000",
              borderRadius: 0,
              background: isActive ? "var(--navy)" : "var(--bg-3)",
              color: isActive ? "#fff" : "var(--fg)",
              cursor: "pointer",
              boxShadow: isActive ? "3px 3px 0 var(--sky)" : "3px 3px 0 #000",
              transform: isActive ? "translate(-1px,-1px)" : "translate(0,0)",
              transition: "all 0.15s ease",
            }}
          >
            {f}
            {counts[f] != null && (
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, opacity: 0.65 }}>
                {counts[f]}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  const [filter, setFilter] = useState("All");

  const filtered = filter === "All"
    ? projects
    : projects.filter((p) => p.category === filter);

  const featuredProjects = filtered.filter((p) => p.featured);
  const regularProjects  = filtered.filter((p) => !p.featured);

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{
        background: "var(--bg)",
        paddingTop: "clamp(60px, 10vw, 100px)",
        paddingBottom: "clamp(60px, 10vw, 100px)",
        position: "relative",
        overflow: "hidden",
        borderTop: "2px solid var(--border-light)",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -20,
          right: -40,
          fontFamily: "var(--font-display)",
          fontSize: "clamp(100px, 18vw, 200px)",
          fontWeight: 400,
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: "1px rgba(26,35,126,0.05)",
          pointerEvents: "none",
          userSelect: "none",
          whiteSpace: "nowrap",
          zIndex: 0,
        }}
      >
        WORKS
      </div>

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 var(--gutter)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 20,
            marginBottom: "clamp(28px, 5vw, 52px)",
          }}
        >
          <div>
            <div className="section-tag" style={{ marginBottom: 12 }}>
              Selected Works
            </div>
            <motion.h2
              className="display-lg"
              style={{ color: "var(--navy)", margin: 0 }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: EASE }}
            >
              BUILT &amp;
              <br />
              <span style={{ WebkitTextStroke: "3px var(--navy)", color: "transparent" }}>
                SHIPPED
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
            style={{
              border: "2px solid #000",
              boxShadow: "4px 4px 0 var(--navy)",
              background: "var(--navy)",
              padding: "16px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(40px, 7vw, 64px)",
                fontWeight: 400,
                lineHeight: 1,
                color: "#fff",
                letterSpacing: "-0.03em",
              }}
            >
              0{statistics.totalProjects}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
                marginTop: 4,
              }}
            >
              projects shipped
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.2, ease: EASE }}
          style={{ marginBottom: "clamp(28px, 5vw, 44px)" }}
        >
          <FilterBar active={filter} onChange={setFilter} />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {featuredProjects.length > 0 && (
              <div style={{ marginBottom: "clamp(24px, 4vw, 36px)" }}>
                <div
                  className="section-tag"
                  style={{ marginBottom: 16 }}
                >
                  Featured
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  {featuredProjects.map((p) => (
                    <FeaturedCard key={p.id} project={p} inView={inView} />
                  ))}
                </div>
              </div>
            )}

            {regularProjects.length > 0 && (
              <div>
                {featuredProjects.length > 0 && (
                  <div className="section-tag" style={{ marginBottom: 16 }}>
                    All Projects
                  </div>
                )}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: 12,
                  }}
                >
                  {regularProjects.map((p, i) => (
                    <ProjectCard
                      key={p.id}
                      project={p}
                      index={i}
                      inView={inView}
                    />
                  ))}
                </div>
              </div>
            )}

            {filtered.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "80px 20px",
                  border: "2px dashed rgba(0,0,0,0.12)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(32px, 6vw, 56px)",
                    color: "var(--border-light)",
                    marginBottom: 12,
                  }}
                >
                  NOTHING HERE
                </div>
                <button
                  onClick={() => setFilter("All")}
                  className="btn-raw"
                  style={{ fontSize: 12 }}
                >
                  Show all →
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5, ease: EASE }}
          style={{
            marginTop: "clamp(40px, 7vw, 72px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: 8,
          }}
        >
          {[
            { val: `${statistics.projectsCompleted}`, label: "Completed",   bg: "var(--navy)",        color: "#fff",            shadow: "4px 4px 0 var(--sky)"        },
            { val: `${statistics.ongoingProjects}`,   label: "In Progress", bg: "var(--orange-light)", color: "var(--orange)",   shadow: "4px 4px 0 var(--orange)"     },
            { val: `${statistics.technologiesUsed}+`, label: "Technologies",bg: "var(--lime)",         color: "var(--green-dark)",shadow: "4px 4px 0 var(--green-dark)" },
            { val: `${statistics.githubCommits}+`,    label: "Commits",     bg: "var(--rose)",         color: "var(--red)",      shadow: "4px 4px 0 var(--red)"        },
          ].map(({ val, label, bg, color, shadow }) => (
            <div
              key={label}
              style={{
                border: "2px solid #000",
                boxShadow: shadow,
                background: bg,
                padding: "18px 20px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(28px, 4vw, 42px)",
                  fontWeight: 400,
                  lineHeight: 1,
                  color,
                  letterSpacing: "-0.02em",
                }}
              >
                {val}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color,
                  opacity: 0.65,
                  marginTop: 6,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}