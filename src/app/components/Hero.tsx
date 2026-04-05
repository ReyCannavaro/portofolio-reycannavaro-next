"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { FiInstagram, FiGithub, FiLinkedin, FiMail, FiArrowUpRight, FiCode } from "react-icons/fi";
import CodeRain from "./CodeRain";

const ROLES = ["Fullstack Developer", "Laravel Craftsman", "React Enthusiast", "IoT Builder"];
function useTypewriter(words: string[], speed = 72, pause = 2000) {
  const [text, setText] = useState("");
  const [wi, setWi]     = useState(0);
  const [ci, setCi]     = useState(0);
  const [del, setDel]   = useState(false);
  useEffect(() => {
    const w = words[wi]; let t: ReturnType<typeof setTimeout>;
    if (!del && ci <= w.length) t = setTimeout(() => { setText(w.slice(0, ci)); setCi(c => c + 1); }, speed);
    else if (!del)              t = setTimeout(() => setDel(true), pause);
    else if (del && ci >= 0)   t = setTimeout(() => { setText(w.slice(0, ci)); setCi(c => c - 1); }, speed / 2);
    else { setDel(false); setWi(i => (i + 1) % words.length); }
    return () => clearTimeout(t);
  }, [ci, del, wi, words, speed, pause]);
  return text;
}

function useCountUp(target: number, trigger: boolean, delay = 0) {
  const [val, setVal] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    if (!trigger || done.current) return; done.current = true;
    setTimeout(() => {
      let i = 0; const N = 40;
      const id = setInterval(() => {
        i++; setVal(Math.round((1 - Math.pow(1 - i / N, 3)) * target));
        if (i >= N) clearInterval(id);
      }, 1000 / N);
    }, delay);
  }, [trigger, target, delay]);
  return val;
}

function Stat({ v, sx, label, trigger, delay = 0 }: { v: number; sx?: string; label: string; trigger: boolean; delay?: number }) {
  const n = useCountUp(v, trigger, delay);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "2rem", letterSpacing: "-0.04em", color: "var(--fg)", lineHeight: 1 }}>{n}{sx}</span>
      <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--fg-3)" }}>{label}</span>
    </div>
  );
}

const CODE_SNIPPETS = [
  { lang: "PHP",  line: "artisan make:model",  x: "-8%",  y: "18%",  delay: 0.8  },
  { lang: "TSX",  line: "useState<T>(null)",   x: "68%",  y: "12%",  delay: 1.1  },
  { lang: "SQL",  line: "SELECT * FROM users", x: "-10%", y: "72%",  delay: 1.4  },
  { lang: "GIT",  line: "git push origin main",x: "60%",  y: "78%",  delay: 1.7  },
];

function FloatingBadge({ lang, line, x, y, delay }: { lang:string; line:string; x:string; y:string; delay:number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
      transition={{
        opacity:  { duration: 0.5, delay },
        scale:    { duration: 0.5, delay },
        y:        { duration: 3.5 + delay * 0.4, repeat: Infinity, ease: "easeInOut", delay: delay + 0.5 },
      }}
      style={{
        position: "absolute", left: x, top: y,
        display: "flex", alignItems: "center", gap: "0.5rem",
        padding: "5px 10px 5px 7px", borderRadius: 8,
        background: "rgba(7,9,15,0.82)", backdropFilter: "blur(12px)",
        border: "1px solid rgba(99,102,241,0.18)",
        boxShadow: "0 8px 24px -4px rgba(0,0,0,0.5)",
        pointerEvents: "none", zIndex: 4, whiteSpace: "nowrap",
      }}
    >
      <span style={{
        fontFamily: "var(--font-dm-mono)", fontSize: "0.42rem",
        letterSpacing: "0.12em", textTransform: "uppercase",
        padding: "1px 5px", borderRadius: 3,
        background: "rgba(99,102,241,0.2)", color: "#a5b4fc",
      }}>{lang}</span>
      <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "0.5rem", color: "rgba(241,245,249,0.5)", letterSpacing: "0.02em" }}>
        {line}
      </span>
    </motion.div>
  );
}

function usePhotoTilt(strength = 14) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = useCallback((e: MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r  = el.getBoundingClientRect();
    const x  = (e.clientX - r.left) / r.width  - 0.5;
    const y  = (e.clientY - r.top)  / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${-y * strength}deg) rotateY(${x * strength}deg) scale3d(1.03,1.03,1.03)`;
    const img = el.querySelector(".hero-tilt-img") as HTMLElement;
    if (img) img.style.transform = `translate(${x * -12}px, ${y * -12}px) scale(1.06)`;
    const badge = el.querySelector(".hero-photo-badge") as HTMLElement;
    if (badge) badge.style.transform = `translateX(-50%) translateY(${y * -8}px)`;
    const tr = el.querySelector(".hero-photo-accent-tr") as HTMLElement;
    if (tr) tr.style.transform = `translate(${x * 6}px, ${y * -6}px)`;
    const bl = el.querySelector(".hero-photo-accent-bl") as HTMLElement;
    if (bl) bl.style.transform = `translate(${x * -6}px, ${y * 6}px)`;
  }, [strength]);
  const onLeave = useCallback(() => {
    const el = ref.current; if (!el) return;
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    (["hero-tilt-img","hero-photo-badge","hero-photo-accent-tr","hero-photo-accent-bl"] as const).forEach((cls, i) => {
      const el2 = ref.current?.querySelector(`.${cls}`) as HTMLElement;
      if (!el2) return;
      if (i === 0) el2.style.transform = "translate(0,0) scale(1)";
      else if (i === 1) el2.style.transform = "translateX(-50%) translateY(0)";
      else el2.style.transform = "translate(0,0)";
    });
  }, []);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, [onMove, onLeave]);
  return ref;
}

function useParallax() {
  const ref = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const rawY = useTransform(scrollY, [0, 600], [0, -60]);
  const y    = useSpring(rawY, { stiffness: 80, damping: 20 });
  return { ref, y };
}

export default function Hero() {
  const role = useTypewriter(ROLES);
  const [inView, setInView] = useState(false);
  const [lineVisible, setLineVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const tiltRef    = usePhotoTilt(14);
  const { y: parallaxY } = useParallax();

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => { const t = setTimeout(() => setLineVisible(true), 400); return () => clearTimeout(t); }, []);

  const anim = (delay: number) => ({
    initial:    { opacity: 0, y: 24 },
    animate:    { opacity: 1, y: 0  },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  });

  return (
    <>
      <style>{`
        .hero-root {
          min-height: 100svh; display: flex; align-items: center;
          padding: 6rem 0 4rem; position: relative; overflow: hidden;
        }
        .hero-container {
          width: 100%; max-width: 1200px; margin: 0 auto;
          padding: 0 2.5rem; display: grid;
          grid-template-columns: 1fr; gap: 4rem; align-items: center;
        }
        @media(min-width:1024px){ .hero-container{ grid-template-columns:1fr 380px; } }

        /* Photo column */
        .hero-photo-col { display:none; }
        @media(min-width:1024px){ .hero-photo-col{ display:block; position:relative; overflow:visible; } }

        .hero-photo-wrapper {
          position:relative; width:100%;
          transition:transform 0.3s cubic-bezier(0.23,1,0.32,1);
          will-change:transform; transform-style:preserve-3d;
        }
        .hero-photo-box {
          position:relative; width:100%; border-radius:20px; overflow:hidden;
          border:1px solid rgba(255,255,255,0.08); aspect-ratio:3/4;
          box-shadow:0 32px 64px -16px rgba(0,0,0,0.7), 0 0 0 1px rgba(99,102,241,0.08);
        }
        .hero-photo-box::after {
          content:''; position:absolute; inset:0; z-index:1; pointer-events:none;
          background:linear-gradient(to top, #07090f 5%, transparent 55%);
        }
        .hero-photo-accent-tr {
          position:absolute; top:-14px; right:-14px; width:32px; height:32px;
          border-top:2px solid var(--accent); border-right:2px solid var(--accent);
          border-radius:0 6px 0 0; z-index:2; pointer-events:none;
          transition:transform 0.3s cubic-bezier(0.23,1,0.32,1);
        }
        .hero-photo-accent-bl {
          position:absolute; bottom:-14px; left:-14px; width:32px; height:32px;
          border-bottom:2px solid var(--cyan); border-left:2px solid var(--cyan);
          border-radius:0 0 0 6px; z-index:2; pointer-events:none;
          transition:transform 0.3s cubic-bezier(0.23,1,0.32,1);
        }
        .hero-photo-badge {
          position:absolute; bottom:1rem; left:50%; transform:translateX(-50%);
          display:flex; align-items:center; gap:6px;
          background:rgba(7,9,15,0.85); border:1px solid rgba(255,255,255,0.08);
          border-radius:999px; padding:6px 14px; white-space:nowrap; z-index:4;
          backdrop-filter:blur(10px);
          transition:transform 0.3s cubic-bezier(0.23,1,0.32,1);
        }
        .hero-photo-shine {
          position:absolute; inset:0; z-index:2; pointer-events:none; border-radius:20px;
          background:radial-gradient(ellipse at 60% 20%, rgba(99,102,241,0.12), transparent 65%);
          opacity:0; transition:opacity 0.3s ease;
        }
        .hero-photo-wrapper:hover .hero-photo-shine { opacity:1; }

        /* Animated decorative line left */
        .hero-line {
          position:absolute; left:0; top:0; bottom:0; width:2px;
          background:linear-gradient(to bottom, transparent, var(--accent), transparent);
          opacity:0; transition:opacity 0.8s ease 0.3s;
        }
        .hero-line.visible { opacity:0.25; }

        /* Name */
        .hero-name {
          font-family:var(--font-syne); font-weight:800;
          font-size:clamp(2rem,4vw,3.6rem);
          letter-spacing:-0.04em; line-height:0.9;
          color:var(--fg); margin:0 0 1.5rem; position:relative;
        }
        .hero-name-outline {
          -webkit-text-stroke:1.5px rgba(241,245,249,0.2);
          color:transparent;
        }
        /* Shimmer on VARO */
        .hero-name-shimmer {
          background: linear-gradient(90deg, var(--fg) 0%, var(--accent) 45%, var(--cyan) 55%, var(--fg) 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: hero-shimmer 5s linear infinite 2s;
        }
        @keyframes hero-shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }

        .hero-bio {
          font-family:var(--font-syne); font-size:clamp(0.88rem,1.1vw,0.97rem);
          color:var(--fg-2); line-height:1.8; max-width:420px; margin:0 0 2rem;
        }
        .hbtn {
          display:inline-flex; align-items:center; gap:6px;
          padding:0.78rem 1.5rem; border-radius:10px;
          font-family:var(--font-syne); font-weight:700;
          font-size:0.82rem; letter-spacing:-0.01em;
          text-decoration:none; transition:all .25s ease;
        }
        .hbtn-p {
          background:var(--accent); color:#fff;
          box-shadow:0 8px 24px -4px rgba(99,102,241,0.4);
        }
        .hbtn-p:hover { opacity:0.9; transform:translateY(-2px); box-shadow:0 12px 28px -4px rgba(99,102,241,0.55); }
        .hbtn-s {
          background:transparent; color:var(--fg);
          border:1px solid var(--border-2);
        }
        .hbtn-s:hover { border-color:rgba(255,255,255,0.2); transform:translateY(-2px); }
        .hico { color:var(--fg-3); display:inline-flex; transition:color .2s, transform .2s; }
        .hico:hover { color:var(--fg); transform:translateY(-3px); }
        .hltr {
          font-family:var(--font-dm-mono); font-size:.6rem; letter-spacing:.14em;
          text-transform:uppercase; color:var(--fg-3); text-decoration:none;
          display:flex; align-items:center; gap:4px; transition:color .2s;
        }
        .hltr:hover { color:var(--accent); }
        .hcursor { animation:hcblink 1s step-end infinite; }
        @keyframes hcblink { 0%,100%{opacity:1} 50%{opacity:0} }
        .hero-tilt-img { transition:transform 0.4s cubic-bezier(0.23,1,0.32,1) !important; }
        .hero-dot-pulse { width:7px; height:7px; border-radius:50%; background:#4ade80; flex-shrink:0; animation:dotpulse 2s ease infinite; }
        @keyframes dotpulse { 0%,100%{box-shadow:0 0 0 0 rgba(74,222,128,0.4)} 50%{box-shadow:0 0 0 5px rgba(74,222,128,0)} }

        /* Stat divider glow */
        .hero-stat-divider {
          border-top: 1px solid var(--border);
          position: relative; overflow: hidden;
        }
        .hero-stat-divider::after {
          content:''; position:absolute; top:0; left:0; width:60%; height:1px;
          background:linear-gradient(90deg, var(--accent), transparent);
          opacity:0.4;
        }

        /* Available pill */
        .hero-avail {
          display:inline-flex; align-items:center; gap:6px;
          padding:4px 12px; border-radius:999px; margin-bottom:1.2rem;
          background:rgba(74,222,128,0.08); border:1px solid rgba(74,222,128,0.2);
          font-family:var(--font-dm-mono); font-size:0.52rem;
          letterSpacing:0.15em; text-transform:uppercase; color:#4ade80;
        }

        @keyframes hero-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      `}</style>

      <section ref={sectionRef} id="about" className="hero-root">
        <CodeRain />
        <div className={`hero-line ${lineVisible ? "visible" : ""}`} />
        <motion.div style={{ y: parallaxY, width:"100%", position:"relative", zIndex:1 }}>
          <div className="hero-container">

            <div>
              <motion.div {...anim(0.05)}>
                <span className="hero-avail">
                  <span style={{ width:6, height:6, borderRadius:"50%", background:"#4ade80", animation:"dotpulse 2s ease infinite", display:"block" }} />
                  Available for Freelance & Internship
                </span>
              </motion.div>

              <motion.div {...anim(0.12)} style={{ display:"flex", alignItems:"center", gap:"0.65rem", marginBottom:"1.2rem" }}>
                <FiCode size={12} color="var(--accent)" style={{ flexShrink:0 }} />
                <span style={{ fontFamily:"var(--font-dm-mono)", fontSize:"0.63rem", letterSpacing:"0.22em", textTransform:"uppercase", color:"var(--accent)" }}>
                  {role || "\u00a0"}
                  <span className="hcursor" style={{ display:"inline-block", width:2, height:"0.8em", background:"var(--accent)", marginLeft:2, verticalAlign:"middle" }} />
                </span>
              </motion.div>

              <motion.h1 {...anim(0.22)} className="hero-name">
                REY<br />
                <span className="hero-name-outline">CANN</span><span className="hero-name-shimmer">AVARO</span>
              </motion.h1>

              <motion.p {...anim(0.32)} className="hero-bio">
                Building scalable digital products with modern tech stacks. Based in{" "}
                <span style={{ color:"var(--fg)", fontWeight:600 }}>Sidoarjo, Indonesia</span> — working globally.
              </motion.p>

              <motion.div {...anim(0.42)} style={{ display:"flex", flexWrap:"wrap", gap:"0.65rem", marginBottom:"2rem" }}>
                <a href="#projects" className="hbtn hbtn-p">
                  View Projects <FiArrowUpRight size={13}/>
                </a>
                <a
                  href="https://drive.google.com/file/d/1bfAzSDLQY4yjgPsLs8cbjDqhV859WUkP/view?usp=sharing"
                  target="_blank" rel="noopener noreferrer" className="hbtn hbtn-s"
                >
                  Download CV
                </a>
              </motion.div>

              <motion.div
                {...anim(0.52)}
                className="hero-stat-divider"
                style={{ display:"flex", gap:"2.5rem", padding:"1.75rem 0", marginBottom:"1.75rem" }}
              >
                <Stat v={6}  label="Projects"     trigger={inView} delay={0}   />
                <Stat v={12} label="Achievements" trigger={inView} delay={120} />
                <Stat v={3}  sx="+" label="Yrs Building" trigger={inView} delay={240} />
              </motion.div>

              <motion.div {...anim(0.62)} style={{ display:"flex", gap:"1rem", alignItems:"center", flexWrap:"wrap" }}>
                {[
                  { href:"https://github.com/ReyCannavaro",           icon:<FiGithub size={17}/>,    label:"GitHub"    },
                  { href:"https://www.linkedin.com/in/reycannavaro/", icon:<FiLinkedin size={17}/>,  label:"LinkedIn"  },
                  { href:"https://www.instagram.com/reycannavaro/",   icon:<FiInstagram size={17}/>, label:"Instagram" },
                  { href:"mailto:reyjunoalcannavaro@gmail.com",       icon:<FiMail size={17}/>,      label:"Email"     },
                ].map(({ href, icon, label }) => (
                  <a key={label} href={href} target={href.startsWith("http")?"_blank":undefined} aria-label={label} className="hico">{icon}</a>
                ))}
                <span style={{ width:1, height:14, background:"var(--border-2)", display:"block" }} />
                <a href="https://linktr.ee/reycannavaro" target="_blank" rel="noopener noreferrer" className="hltr">
                  <FiArrowUpRight size={11}/> linktr.ee/reycannavaro
                </a>
              </motion.div>
            </div>

            <motion.div
              className="hero-photo-col"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1,    y: 0  }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22,1,0.36,1] }}
              style={{ position:"relative" }}
            >
              {CODE_SNIPPETS.map((s) => (
                <FloatingBadge key={s.lang} {...s} />
              ))}

              <div ref={tiltRef} className="hero-photo-wrapper">
                <div className="hero-photo-accent-tr" />
                <div className="hero-photo-accent-bl" />
                <div className="hero-photo-box">
                  <Image
                    src="/profile-picture.png"
                    alt="Rey Cannavaro"
                    fill priority
                    sizes="(max-width:1024px) 0px, 380px"
                    className="hero-tilt-img"
                    style={{ objectFit:"cover", objectPosition:"center top" }}
                  />
                  <div className="hero-photo-shine" />
                </div>
                <div className="hero-photo-badge">
                  <span className="hero-dot-pulse" />
                  <span style={{ fontFamily:"var(--font-dm-mono)", fontSize:"0.6rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--fg-2)" }}>
                    Available for Freelance
                  </span>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </section>
    </>
  );
}