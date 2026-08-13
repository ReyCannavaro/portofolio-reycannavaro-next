"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Project {
  id: string;
  title: string;
  role: string;
  techStack: string[];
  description: string;
  image: string;
}

interface Props {
  projects: Project[];
}

export default function CaseStudyProjects({ projects }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-section)" }}>
      {projects.map((project, index) => {
        const isEven = index % 2 !== 0;

        return (
          <div key={project.id}>
            <div
              className="project-row"
              style={{
                display: "flex",
                flexDirection: isEven ? "row-reverse" : "row",
                gap: "var(--space-xxl)",
                alignItems: "center",
              }}
            >
              {/* Image Column */}
              <motion.div
                initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  flex: "1 1 55%",
                  position: "relative",
                  aspectRatio: "16/10",
                  background: "var(--surface-soft)",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  style={{ objectFit: "cover" }}
                />
              </motion.div>

              {/* Content Column */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  flex: "1 1 45%",
                  display: "flex",
                  flexDirection: "column",
                  padding: "var(--space-lg) 0",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div className="m-stripe" style={{ width: 32, height: 3 }} />
                  <span className="label-upper" style={{ color: "var(--m-blue-light)" }}>
                    {project.role}
                  </span>
                </div>
                
                <h3
                  className="display-md"
                  style={{
                    lineHeight: 1.2,
                    marginBottom: "var(--space-md)",
                    color: "var(--on-dark)",
                  }}
                >
                  {project.title}
                </h3>
                
                <p className="body-md" style={{ marginBottom: "var(--space-xl)", color: "var(--body)" }}>
                  {project.description}
                </p>
                
                <div>
                  <span className="label-upper" style={{ color: "var(--muted)", display: "block", marginBottom: 12 }}>
                    TECH STACK
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          padding: "6px 16px",
                          border: "1px solid var(--hairline)",
                          color: "var(--body-strong)",
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: "1.5px",
                          textTransform: "uppercase",
                          background: "var(--surface-card)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        );
      })}

      <style>{`
        @media (max-width: 900px) {
          .project-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: var(--space-xl) !important;
          }
          .project-row > div {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
