"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiInstagram, FiGithub, FiLinkedin, FiMail, FiArrowUpRight } from "react-icons/fi";

/* ─── Typewriter ─────────────────────────────────────────────────────────── */
const ROLES = ["Fullstack Developer", "Laravel Craftsman", "React Enthusiast", "IoT Builder"];
function useTypewriter(words: string[], speed = 75, pause = 1800) {
  const [text, setText] = useState("");
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[wi]; let t: ReturnType<typeof setTimeout>;
    if (!del && ci <= w.length) t = setTimeout(() => { setText(w.slice(0, ci)); setCi(c=>c+1); }, speed);
    else if (!del) t = setTimeout(() => setDel(true), pause);
    else if (del && ci >= 0) t = setTimeout(() => { setText(w.slice(0, ci)); setCi(c=>c-1); }, speed/2);
    else { setDel(false); setWi(i=>(i+1)%words.length); }
    return () => clearTimeout(t);
  }, [ci, del, wi, words, speed, pause]);
  return text;
}

/* ─── Count-up ───────────────────────────────────────────────────────────── */
function useCountUp(target: number, trigger: boolean, delay = 0) {
  const [val, setVal] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    if (!trigger || done.current) return; done.current = true;
    setTimeout(() => {
      let i = 0; const N = 40;
      const id = setInterval(() => {
        i++; setVal(Math.round((1 - Math.pow(1 - i/N, 3)) * target));
        if (i >= N) clearInterval(id);
      }, 1000/N);
    }, delay);
  }, [trigger, target, delay]);
  return val;
}

function Stat({ v, sx, label, trigger, delay=0 }: { v:number; sx?:string; label:string; trigger:boolean; delay?:number }) {
  const n = useCountUp(v, trigger, delay);
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
      <span style={{ fontFamily:"var(--font-syne)", fontWeight:800, fontSize:"2rem", letterSpacing:"-0.04em", color:"var(--fg)", lineHeight:1 }}>{n}{sx}</span>
      <span style={{ fontFamily:"var(--font-dm-mono)", fontSize:"0.55rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--fg-3)" }}>{label}</span>
    </div>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────────────── */
export default function Hero() {
  const role = useTypewriter(ROLES);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const anim = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  });

  return (
    <>
      <style>{`
        .hero-root {
          min-height: 100svh;
          display: flex;
          align-items: center;
          padding: 6rem 0 4rem;
          position: relative;
          overflow: hidden;
        }
        .hero-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2.5rem;
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .hero-container { grid-template-columns: 1fr 380px; }
        }

        /* photo */
        .hero-photo-col { display: none; }
        @media (min-width: 1024px) { .hero-photo-col { display: block; position: relative; } }

        .hero-photo-box {
          position: relative;
          width: 100%;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          aspect-ratio: 3/4;
        }
        .hero-photo-box::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(to top, #07090f 5%, transparent 55%);
          pointer-events: none; z-index: 1;
        }
        .hero-photo-accent-tr {
          position: absolute; top: -14px; right: -14px;
          width: 32px; height: 32px;
          border-top: 2px solid var(--accent);
          border-right: 2px solid var(--accent);
          border-radius: 0 6px 0 0;
          z-index: 2; pointer-events: none;
        }
        .hero-photo-accent-bl {
          position: absolute; bottom: -14px; left: -14px;
          width: 32px; height: 32px;
          border-bottom: 2px solid var(--cyan);
          border-left: 2px solid var(--cyan);
          border-radius: 0 0 0 6px;
          z-index: 2; pointer-events: none;
        }
        .hero-photo-badge {
          position: absolute; bottom: 1rem; left: 50%; transform: translateX(-50%);
          display: flex; align-items: center; gap: 6px;
          background: rgba(7,9,15,0.85);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 999px;
          padding: 6px 14px;
          white-space: nowrap; z-index: 3;
          backdrop-filter: blur(10px);
        }
        .hero-dot-pulse {
          width: 7px; height: 7px; border-radius: 50%;
          background: #4ade80; flex-shrink: 0;
          animation: dotpulse 2s ease infinite;
        }
        @keyframes dotpulse { 0%,100%{box-shadow:0 0 0 0 rgba(74,222,128,0.4)} 50%{box-shadow:0 0 0 5px rgba(74,222,128,0)} }

        /* name — clamp keeps it in-column */
        .hero-name {
          font-family: var(--font-syne);
          font-weight: 800;
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          letter-spacing: -0.04em;
          line-height: 0.92;
          color: var(--fg);
          margin: 0 0 1.5rem;
        }
        .hero-name-outline {
          -webkit-text-stroke: 1px rgba(241,245,249,0.18);
          color: transparent;
        }
        .hero-bio {
          font-family: var(--font-syne);
          font-size: clamp(0.88rem, 1.1vw, 0.97rem);
          color: var(--fg-2);
          line-height: 1.8;
          max-width: 400px;
          margin: 0 0 2rem;
        }
        .hbtn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 0.78rem 1.5rem; border-radius: 10px;
          font-family: var(--font-syne); font-weight: 700;
          font-size: 0.82rem; letter-spacing: -0.01em;
          text-decoration: none; transition: opacity .2s;
        }
        .hbtn:hover { opacity: .8; }
        .hbtn-p { background: var(--accent); color: #fff; }
        .hbtn-s { background: transparent; color: var(--fg); border: 1px solid var(--border-2); }
        .hico { color: var(--fg-3); display: inline-flex; transition: color .2s, transform .2s; }
        .hico:hover { color: var(--fg); transform: translateY(-3px); }
        .hltr { font-family: var(--font-dm-mono); font-size: .6rem; letter-spacing: .14em; text-transform: uppercase; color: var(--fg-3); text-decoration: none; display: flex; align-items: center; gap: 4px; transition: color .2s; }
        .hltr:hover { color: var(--accent); }
        .hcursor { animation: hcblink 1s step-end infinite; }
        @keyframes hcblink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>

      <section ref={ref} id="about" className="hero-root">
        <div className="hero-container">

          {/* ── LEFT ── */}
          <div>
            {/* Eyebrow */}
            <motion.div {...anim(0.1)} style={{ display:"flex", alignItems:"center", gap:"0.65rem", marginBottom:"1.4rem" }}>
              <span style={{ width:20, height:1, background:"var(--accent)", display:"block", flexShrink:0 }} />
              <span style={{ fontFamily:"var(--font-dm-mono)", fontSize:"0.63rem", letterSpacing:"0.22em", textTransform:"uppercase", color:"var(--accent)" }}>
                {role || "\u00a0"}
                <span className="hcursor" style={{ display:"inline-block", width:2, height:"0.8em", background:"var(--accent)", marginLeft:2, verticalAlign:"middle" }} />
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1 {...anim(0.2)} className="hero-name">
              REY<br />
              <span className="hero-name-outline">CANNA</span>VARO
            </motion.h1>

            {/* Bio */}
            <motion.p {...anim(0.3)} className="hero-bio">
              Building scalable digital products with modern tech stacks. Based in{" "}
              <span style={{ color:"var(--fg)", fontWeight:600 }}>Sidoarjo, Indonesia</span> — working globally.
            </motion.p>

            {/* CTAs */}
            <motion.div {...anim(0.4)} style={{ display:"flex", flexWrap:"wrap", gap:"0.65rem", marginBottom:"2rem" }}>
              <a href="#projects" className="hbtn hbtn-p">View Projects <FiArrowUpRight size={13}/></a>
              <a href="https://drive.google.com/file/d/1bfAzSDLQY4yjgPsLs8cbjDqhV859WUkP/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="hbtn hbtn-s">Download CV</a>
            </motion.div>

            {/* Stats */}
            <motion.div {...anim(0.5)} style={{ display:"flex", gap:"2.5rem", padding:"1.75rem 0", borderTop:"1px solid var(--border)", marginBottom:"1.75rem" }}>
              <Stat v={6}  label="Projects"     trigger={inView} delay={0}   />
              <Stat v={12} label="Achievements" trigger={inView} delay={120} />
              <Stat v={3}  sx="+" label="Yrs Building" trigger={inView} delay={240} />
            </motion.div>

            {/* Socials */}
            <motion.div {...anim(0.6)} style={{ display:"flex", gap:"1rem", alignItems:"center", flexWrap:"wrap" }}>
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

          {/* ── RIGHT — Photo ── */}
          <motion.div
            className="hero-photo-col"
            initial={{ opacity:0, scale:0.96 }}
            animate={{ opacity:1, scale:1 }}
            transition={{ duration:0.9, delay:0.5, ease:[0.22,1,0.36,1] }}
          >
            <div className="hero-photo-accent-tr" />
            <div className="hero-photo-accent-bl" />
            <div className="hero-photo-box">
              <Image
                src="/profile-picture.png"
                alt="Rey Cannavaro"
                fill
                priority
                sizes="(max-width:1024px) 0px, 380px"
                style={{ objectFit:"cover", objectPosition:"center top" }}
              />
            </div>
            <div className="hero-photo-badge">
              <span className="hero-dot-pulse" />
              <span style={{ fontFamily:"var(--font-dm-mono)", fontSize:"0.6rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--fg-2)" }}>
                Available for Freelance
              </span>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}