"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/app/data/index";
import { FiGithub, FiArrowUpRight } from "react-icons/fi";
import Image from "next/image";

function useTilt(strength = 12) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = useCallback((e: MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y*strength}deg) rotateY(${x*strength}deg) scale3d(1.02,1.02,1.02)`;
    const img = el.querySelector(".tilt-img") as HTMLElement;
    if (img) img.style.transform = `translate(${x*-16}px,${y*-16}px) scale(1.07)`;
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
    const id = setInterval(() => setIdx(i => (i+1) % images.length), 3800);
    return () => clearInterval(id);
  }, [images.length]);
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden" }}>
      <AnimatePresence mode="wait">
        <motion.div key={idx}
          initial={{ opacity:0, scale:1.05 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}
          transition={{ duration:0.65, ease:"easeInOut" }}
          style={{ position:"absolute", inset:0 }}
        >
          <Image src={images[idx]} alt={`${name} ${idx+1}`} fill className="tilt-img"
            sizes="(max-width:768px) 100vw, 600px"
            style={{ objectFit:"cover", objectPosition:"top", transition:"transform 0.4s cubic-bezier(0.23,1,0.32,1)" }}
          />
        </motion.div>
      </AnimatePresence>
      {images.length > 1 && (
        <div style={{ position:"absolute", bottom:12, left:"50%", transform:"translateX(-50%)", display:"flex", gap:4, zIndex:4 }}>
          {images.map((_,i) => (
            <button key={i} onClick={() => setIdx(i)} style={{
              height:2.5, width:i===idx?18:5, borderRadius:2,
              background:i===idx?"#fff":"rgba(255,255,255,0.2)",
              border:"none", padding:0, cursor:"none",
              transition:"all 0.3s ease",
            }} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const tiltRef = useTilt(10);
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
      transform: inView ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`,
    }}>
      <div ref={tiltRef} style={{
        borderRadius:18, overflow:"hidden",
        border:"1px solid var(--border)", background:"var(--bg-2)",
        transition:"transform 0.3s cubic-bezier(0.23,1,0.32,1), border-color 0.2s",
        cursor:"default", willChange:"transform",
        display:"flex", flexDirection:"column", height:"100%",
      }}
        onMouseEnter={e=>(e.currentTarget as HTMLElement).style.borderColor="rgba(99,102,241,0.4)"}
        onMouseLeave={e=>(e.currentTarget as HTMLElement).style.borderColor="var(--border)"}
      >
        <div style={{ position:"relative", height:220, overflow:"hidden", flexShrink:0 }}>
          <ImageSlider images={project.images} name={project.name} />
          <div style={{
            position:"absolute", inset:0, zIndex:2, pointerEvents:"none",
            background:"linear-gradient(to top, var(--bg-2) 0%, transparent 55%)",
          }} />
          <div style={{ position:"absolute", top:12, left:12, right:12, zIndex:3, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{
              fontFamily:"var(--font-dm-mono)", fontSize:"0.52rem",
              letterSpacing:"0.15em", textTransform:"uppercase",
              padding:"3px 9px", borderRadius:999,
              background:"rgba(7,9,15,0.7)", backdropFilter:"blur(8px)",
              border:"1px solid rgba(255,255,255,0.07)", color:"rgba(148,163,184,0.8)",
            }}>
              0{index + 1}
            </span>
            <span style={{
              fontFamily:"var(--font-dm-mono)", fontSize:"0.5rem",
              letterSpacing:"0.1em", textTransform:"uppercase",
              padding:"3px 9px", borderRadius:999,
              background:"rgba(99,102,241,0.15)", backdropFilter:"blur(8px)",
              border:"1px solid rgba(99,102,241,0.25)", color:"#a5b4fc",
            }}>
              {project.role}
            </span>
          </div>
        </div>

        <div style={{ padding:"1.4rem 1.5rem", display:"flex", flexDirection:"column", gap:"0.8rem", flex:1 }}>
          <h3 style={{
            fontFamily:"var(--font-syne)", fontWeight:800,
            fontSize:"clamp(1.25rem, 2.2vw, 1.55rem)",
            letterSpacing:"-0.03em", lineHeight:1.05,
            color:"var(--fg)", margin:0,
          }}>
            {project.name}
          </h3>

          <p style={{
            fontFamily:"var(--font-syne)", fontSize:"0.82rem",
            color:"var(--fg-2)", lineHeight:1.7, flex:1,
            display:"-webkit-box", WebkitLineClamp:3,
            WebkitBoxOrient:"vertical", overflow:"hidden",
          }}>
            {project.description}
          </p>

          <div style={{ display:"flex", flexWrap:"wrap", gap:"0.35rem" }}>
            {project.technologies.slice(0,4).map(t => (
              <span key={t} style={{
                fontFamily:"var(--font-dm-mono)", fontSize:"0.5rem",
                letterSpacing:"0.08em", textTransform:"uppercase",
                padding:"3px 8px", borderRadius:5,
                background:"var(--bg-3)", border:"1px solid var(--border)",
                color:"var(--fg-3)",
              }}>{t}</span>
            ))}
            {project.technologies.length > 4 && (
              <span style={{ fontFamily:"var(--font-dm-mono)", fontSize:"0.5rem", color:"var(--fg-3)", padding:"3px 6px" }}>
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:"0.6rem", borderTop:"1px solid var(--border)", marginTop:"auto" }}>
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
              style={{
                display:"inline-flex", alignItems:"center", gap:"0.4rem",
                fontFamily:"var(--font-syne)", fontWeight:700, fontSize:"0.75rem",
                letterSpacing:"-0.01em", color:"var(--fg-2)", textDecoration:"none",
                transition:"color 0.2s",
              }}
              onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color="var(--accent)"}
              onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color="var(--fg-2)"}
            >
              <FiGithub size={13}/> GitHub
            </a>
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
              style={{
                width:32, height:32, borderRadius:9,
                border:"1px solid var(--border)", color:"var(--fg-3)",
                display:"flex", alignItems:"center", justifyContent:"center",
                textDecoration:"none", transition:"all 0.2s", flexShrink:0,
              }}
              onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.background="var(--accent)";el.style.borderColor="var(--accent)";el.style.color="#fff";}}
              onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.background="transparent";el.style.borderColor="var(--border)";el.style.color="var(--fg-3)";}}
            >
              <FiArrowUpRight size={14}/>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [mounted, setMounted] = useState(false);
  const [inView, setInView]   = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold:0.15 });
    if (headerRef.current) obs.observe(headerRef.current);
    return () => obs.disconnect();
  }, []);

  if (!mounted) return null;

  return (
    <>
      <style>{`
        .proj-section { padding:7rem 2.5rem; border-top:1px solid var(--border); }
        .proj-inner   { max-width:1200px; margin:0 auto; }
        .proj-header  {
          display:flex; flex-direction:column; gap:1rem;
          margin-bottom:3.5rem; padding-bottom:2.5rem;
          border-bottom:1px solid var(--border);
        }
        @media(min-width:768px){ .proj-header{ flex-direction:row; align-items:flex-end; justify-content:space-between; } }
        .proj-heading {
          font-family:var(--font-syne); font-weight:800;
          font-size:clamp(2.2rem,5vw,4rem);
          letter-spacing:-0.04em; line-height:0.9; color:var(--fg); margin:0;
        }
        .proj-heading-ghost { -webkit-text-stroke:1px rgba(241,245,249,0.13); color:transparent; display:block; }
        .proj-grid {
          display:grid; grid-template-columns:1fr; gap:1.25rem;
        }
        @media(min-width:640px)  { .proj-grid{ grid-template-columns:1fr 1fr; } }
        @media(min-width:1024px) { .proj-grid{ grid-template-columns:repeat(3,1fr); } }
        .proj-reveal { opacity:0; transform:translateY(20px); transition:opacity .6s ease,transform .6s ease; }
        .proj-reveal.shown { opacity:1; transform:translateY(0); }
      `}</style>

      <section id="projects" className="proj-section">
        <div className="proj-inner">

          <div ref={headerRef} className={`proj-header proj-reveal ${inView?"shown":""}`}>
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
              <h2 className="proj-heading">
                Built &amp;<br />
                <span className="proj-heading-ghost">Shipped.</span>
              </h2>
            </div>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-start", gap:4 }} className="md:items-end">
              <span style={{
                fontFamily:"var(--font-syne)", fontWeight:800,
                fontSize:"clamp(3rem,6vw,5rem)",
                letterSpacing:"-0.05em", lineHeight:1, color:"var(--fg)",
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

          <div className="proj-grid">
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}