"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/app/data/index";
import { FiGithub, FiArrowUpRight, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import Image from "next/image";

function useTilt(strength = 12) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: MouseEvent) => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * strength}deg) rotateY(${x * strength}deg) scale3d(1.02,1.02,1.02)`;
    const img = el.querySelector(".tilt-img") as HTMLElement;
    if (img) img.style.transform = `translate(${x * -18}px, ${y * -18}px) scale(1.08)`;
  }, [strength]);

  const onLeave = useCallback(() => {
    const el = ref.current; if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    const img = el.querySelector(".tilt-img") as HTMLElement;
    if (img) img.style.transform = "translate(0,0) scale(1)";
  }, []);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, [onMove, onLeave]);

  return ref;
}

function ImageSlider({ images, name }: { images: string[]; name: string }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => setIdx(i => (i + 1) % images.length), 3800);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden" }}>
      <AnimatePresence mode="wait">
        <motion.div key={idx}
          initial={{ opacity:0, scale:1.06 }}
          animate={{ opacity:1, scale:1 }}
          exit={{ opacity:0 }}
          transition={{ duration:0.7, ease:"easeInOut" }}
          style={{ position:"absolute", inset:0 }}
        >
          <Image
            src={images[idx]} alt={`${name} ${idx+1}`} fill
            className="tilt-img"
            sizes="(max-width:768px) 100vw, 50vw"
            style={{ objectFit:"cover", objectPosition:"top", transition:"transform 0.4s cubic-bezier(0.23,1,0.32,1)" }}
          />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <div style={{ position:"absolute", bottom:14, left:"50%", transform:"translateX(-50%)", display:"flex", gap:5, zIndex:4 }}>
          {images.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)}
              style={{
                height:3, width: i===idx ? 20 : 6, borderRadius:3,
                background: i===idx ? "#fff" : "rgba(255,255,255,0.25)",
                border:"none", padding:0, cursor:"none",
                transition:"all 0.3s ease",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FeaturedCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const tiltRef = useTilt(8);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold:0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(40px)",
      transition: "opacity 0.7s ease, transform 0.7s ease",
    }}>
      <div ref={tiltRef} style={{
        position:"relative", borderRadius:20, overflow:"hidden",
        border:"1px solid var(--border)",
        background:"var(--bg-2)",
        transition:"transform 0.35s cubic-bezier(0.23,1,0.32,1), border-color 0.3s",
        cursor:"default",
        willChange:"transform",
      }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.4)"}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"}
      >
        <div style={{ display:"grid", gridTemplateColumns:"1fr", minHeight:480 }}
          className="lg:grid-cols-2"
        >
          <div style={{ padding:"3rem 2.5rem", display:"flex", flexDirection:"column", justifyContent:"space-between", position:"relative", zIndex:2 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"2rem" }}>
              <span style={{
                fontFamily:"var(--font-dm-mono)", fontSize:"0.58rem",
                letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--fg-3)",
              }}>
                0{index + 1} / Featured
              </span>
              <span style={{
                fontFamily:"var(--font-dm-mono)", fontSize:"0.55rem",
                letterSpacing:"0.12em", textTransform:"uppercase",
                padding:"3px 10px", borderRadius:999,
                background:"rgba(99,102,241,0.1)", color:"var(--accent)",
                border:"1px solid rgba(99,102,241,0.2)",
              }}>
                {project.role}
              </span>
            </div>

            <div>
              <h3 style={{
                fontFamily:"var(--font-syne)", fontWeight:800,
                fontSize:"clamp(2rem, 4.5vw, 3.5rem)",
                letterSpacing:"-0.04em", lineHeight:0.9,
                color:"var(--fg)", margin:"0 0 1.25rem",
              }}>
                {project.name}
              </h3>
              <p style={{
                fontFamily:"var(--font-syne)", fontSize:"0.9rem",
                color:"var(--fg-2)", lineHeight:1.75, margin:"0 0 2rem",
                maxWidth:400,
              }}>
                {project.description}
              </p>
            </div>

            <div style={{ display:"flex", flexWrap:"wrap", gap:"0.4rem", marginBottom:"2rem" }}>
              {project.technologies.map(t => (
                <span key={t} style={{
                  fontFamily:"var(--font-dm-mono)", fontSize:"0.55rem",
                  letterSpacing:"0.1em", textTransform:"uppercase",
                  padding:"4px 10px", borderRadius:6,
                  background:"var(--bg-3)", border:"1px solid var(--border)",
                  color:"var(--fg-3)",
                }}>
                  {t}
                </span>
              ))}
            </div>

            <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
              style={{
                display:"inline-flex", alignItems:"center", gap:"0.5rem",
                padding:"0.75rem 1.4rem", borderRadius:10,
                fontFamily:"var(--font-syne)", fontWeight:700, fontSize:"0.8rem",
                letterSpacing:"-0.01em", textDecoration:"none",
                background:"var(--accent)", color:"#fff",
                width:"fit-content", transition:"opacity 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity="0.82"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity="1"}
            >
              <FiGithub size={14}/> View on GitHub
            </a>
          </div>

          <div style={{ position:"relative", minHeight:320, overflow:"hidden" }}>
            <ImageSlider images={project.images} name={project.name} />
            <div style={{
              position:"absolute", inset:0, pointerEvents:"none", zIndex:2,
              background:"linear-gradient(to right, var(--bg-2) 0%, transparent 30%)",
            }} className="hidden lg:block" />
            <div style={{
              position:"absolute", inset:0, pointerEvents:"none", zIndex:2,
              background:"linear-gradient(to top, var(--bg-2) 0%, transparent 40%)",
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function CompactCard({ project, index, delay=0 }: { project: typeof projects[0]; index: number; delay?: number }) {
  const tiltRef = useTilt(14);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold:0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(36px)",
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    }}>
      <div ref={tiltRef} style={{
        position:"relative", borderRadius:18, overflow:"hidden",
        border:"1px solid var(--border)", background:"var(--bg-2)",
        transition:"transform 0.3s cubic-bezier(0.23,1,0.32,1), border-color 0.2s",
        cursor:"default", height:"100%", willChange:"transform",
        display:"flex", flexDirection:"column",
      }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor="rgba(99,102,241,0.4)"}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor="var(--border)"}
      >
        <div style={{ position:"relative", height:200, overflow:"hidden", flexShrink:0 }}>
          <ImageSlider images={project.images} name={project.name} />
          <div style={{
            position:"absolute", inset:0, zIndex:2, pointerEvents:"none",
            background:"linear-gradient(to top, var(--bg-2) 0%, transparent 50%)",
          }} />
          <div style={{
            position:"absolute", top:12, left:12, zIndex:3,
            fontFamily:"var(--font-dm-mono)", fontSize:"0.55rem",
            letterSpacing:"0.15em", textTransform:"uppercase",
            padding:"3px 9px", borderRadius:999,
            background:"rgba(7,9,15,0.75)", backdropFilter:"blur(8px)",
            border:"1px solid var(--border)", color:"var(--fg-3)",
          }}>
            0{index + 1}
          </div>
        </div>

        <div style={{ padding:"1.4rem 1.5rem", display:"flex", flexDirection:"column", gap:"0.85rem", flex:1 }}>
          <div>
            <h3 style={{
              fontFamily:"var(--font-syne)", fontWeight:800,
              fontSize:"clamp(1.3rem, 2.5vw, 1.6rem)",
              letterSpacing:"-0.03em", lineHeight:1,
              color:"var(--fg)", margin:"0 0 0.4rem",
            }}>
              {project.name}
            </h3>
            <span style={{
              fontFamily:"var(--font-dm-mono)", fontSize:"0.55rem",
              letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--accent)",
            }}>
              {project.role}
            </span>
          </div>

          <p style={{
            fontFamily:"var(--font-syne)", fontSize:"0.82rem",
            color:"var(--fg-2)", lineHeight:1.7,
            display:"-webkit-box", WebkitLineClamp:3,
            WebkitBoxOrient:"vertical", overflow:"hidden",
            flex:1,
          }}>
            {project.description}
          </p>

          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:"auto" }}>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"0.35rem" }}>
              {project.technologies.slice(0, 3).map(t => (
                <span key={t} style={{
                  fontFamily:"var(--font-dm-mono)", fontSize:"0.5rem",
                  letterSpacing:"0.08em", textTransform:"uppercase",
                  padding:"3px 8px", borderRadius:5,
                  background:"var(--bg-3)", border:"1px solid var(--border)",
                  color:"var(--fg-3)",
                }}>
                  {t}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span style={{
                  fontFamily:"var(--font-dm-mono)", fontSize:"0.5rem",
                  color:"var(--fg-3)", padding:"3px 8px",
                }}>
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
              style={{
                display:"inline-flex", alignItems:"center", justifyContent:"center",
                width:34, height:34, borderRadius:10,
                border:"1px solid var(--border)", color:"var(--fg-3)",
                textDecoration:"none", transition:"all 0.2s", flexShrink:0,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background="var(--accent)"; el.style.borderColor="var(--accent)"; el.style.color="#fff";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background="transparent"; el.style.borderColor="var(--border)"; el.style.color="var(--fg-3)";
              }}
            >
              <FiArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [mounted, setMounted] = useState(false);
  const [headerInView, setHeaderInView] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHeaderInView(true); }, { threshold:0.2 });
    if (headerRef.current) obs.observe(headerRef.current);
    return () => obs.disconnect();
  }, []);

  if (!mounted) return null;

  const [featured, ...rest] = projects;

  return (
    <>
      <style>{`
        .projects-section {
          padding: 7rem 2.5rem;
          border-top: 1px solid var(--border);
          position: relative;
        }
        .projects-inner { max-width: 1200px; margin: 0 auto; }

        /* header */
        .projects-header {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 4rem;
        }
        @media (min-width: 768px) {
          .projects-header { flex-direction: row; align-items: flex-end; justify-content: space-between; }
        }
        .projects-heading {
          font-family: var(--font-syne);
          font-weight: 800;
          font-size: clamp(2.2rem, 5vw, 4rem);
          letter-spacing: -0.04em;
          line-height: 0.9;
          color: var(--fg);
          margin: 0;
        }
        .projects-heading-ghost {
          -webkit-text-stroke: 1px rgba(241,245,249,0.12);
          color: transparent;
          display: block;
        }
        .projects-count-block {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
        }
        @media (min-width: 768px) { .projects-count-block { align-items: flex-end; } }

        /* compact grid */
        .compact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          margin-top: 1rem;
        }
        @media (min-width: 640px)  { .compact-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .compact-grid { grid-template-columns: repeat(3, 1fr); } }

        /* divider */
        .section-divider-line {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, transparent, var(--border-2) 30%, var(--border-2) 70%, transparent);
          margin: 3rem 0;
        }

        /* header reveal */
        .hdr-reveal {
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .hdr-reveal.shown { opacity: 1; transform: translateY(0); }
      `}</style>

      <section id="projects" className="projects-section">
        <div className="projects-inner">

          <div ref={headerRef} className={`projects-header hdr-reveal ${headerInView ? "shown" : ""}`}>
            <div>
              <p style={{
                fontFamily:"var(--font-dm-mono)", fontSize:"0.6rem",
                letterSpacing:"0.2em", textTransform:"uppercase",
                color:"var(--accent)", marginBottom:"0.75rem",
                display:"flex", alignItems:"center", gap:"0.5rem",
              }}>
                <span style={{ width:16, height:1, background:"var(--accent)", display:"block" }} />
                Selected Works
              </p>
              <h2 className="projects-heading">
                Built &amp;<br />
                <span className="projects-heading-ghost">Shipped.</span>
              </h2>
            </div>

            <div className="projects-count-block">
              <span style={{
                fontFamily:"var(--font-syne)", fontWeight:800,
                fontSize:"clamp(3rem,6vw,5rem)",
                letterSpacing:"-0.05em", lineHeight:1,
                color:"var(--fg)",
              }}>
                0{projects.length}
              </span>
              <span style={{
                fontFamily:"var(--font-dm-mono)", fontSize:"0.58rem",
                letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--fg-3)",
              }}>
                Projects shipped
              </span>
            </div>
          </div>

          <FeaturedCard project={featured} index={0} />

          <div className="section-divider-line" />

          <div className={`hdr-reveal ${headerInView ? "shown" : ""}`}
            style={{ transitionDelay:"0.2s", marginBottom:"1.5rem" }}>
            <p style={{
              fontFamily:"var(--font-dm-mono)", fontSize:"0.58rem",
              letterSpacing:"0.18em", textTransform:"uppercase", color:"var(--fg-3)",
              display:"flex", alignItems:"center", gap:"0.6rem",
            }}>
              <span style={{ width:12, height:1, background:"var(--border-2)", display:"block" }} />
              More projects
            </p>
          </div>

          <div className="compact-grid">
            {rest.map((project, i) => (
              <CompactCard
                key={project.id}
                project={project}
                index={i + 1}
                delay={i * 0.08}
              />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}