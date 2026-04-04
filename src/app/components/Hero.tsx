"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FiInstagram, FiGithub, FiLinkedin, FiMail, FiArrowUpRight
} from "react-icons/fi";

const ROLES = [
  "Fullstack Developer",
  "Laravel Craftsman",
  "React Enthusiast",
  "IoT Builder",
];

function useTypewriter(words: string[], typingSpeed = 70, pause = 1600) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx,   setWordIdx]   = useState(0);
  const [charIdx,   setCharIdx]   = useState(0);
  const [deleting,  setDeleting]  = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx(c => c + 1);
      }, typingSpeed);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx(c => c - 1);
      }, typingSpeed / 2);
    } else {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, typingSpeed, pause]);

  return displayed;
}

function useCountUp(target: number, trigger: boolean, duration = 1200) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!trigger || started.current) return;
    started.current = true;
    const steps    = 40;
    const interval = duration / steps;
    let step = 0;
    const id = setInterval(() => {
      step++;
      const eased = 1 - Math.pow(1 - step / steps, 3);
      setVal(Math.round(eased * target));
      if (step >= steps) clearInterval(id);
    }, interval);
    return () => clearInterval(id);
  }, [trigger, target, duration]);
  return val;
}

function MagneticBtn({
  children, href, className, target, style
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
  target?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el   = ref.current!;
    const rect = el.getBoundingClientRect();
    const x    = e.clientX - rect.left - rect.width  / 2;
    const y    = e.clientY - rect.top  - rect.height / 2;
    el.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
  };
  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      className={`magnetic ${className ?? ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1)",
        ...style,
      }}
    >
      {children}
    </a>
  );
}
function StatItem({
  value, suffix, label, trigger, delay = 0
}: {
  value: number; suffix?: string; label: string; trigger: boolean; delay?: number;
}) {
  const [start, setStart] = useState(false);
  useEffect(() => {
    if (!trigger) return;
    const t = setTimeout(() => setStart(true), delay);
    return () => clearTimeout(t);
  }, [trigger, delay]);
  const count = useCountUp(value, start);

  return (
    <div className="flex flex-col gap-0.5">
      <span
        style={{
          fontFamily:    "var(--font-syne)",
          fontWeight:    800,
          fontSize:      "clamp(1.6rem, 3.5vw, 2.2rem)",
          letterSpacing: "-0.04em",
          color:         "var(--fg)",
          lineHeight:    1,
        }}
      >
        {count}{suffix}
      </span>
      <span
        style={{
          fontFamily:    "var(--font-dm-mono)",
          fontSize:      "0.58rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color:         "var(--fg-3)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function Hero() {
  const role          = useTypewriter(ROLES);
  const [inView, setInView] = useState(false);
  const sectionRef    = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const fade = {
    hidden:  { opacity: 0, y: 28 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: i * 0.12 },
    }),
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{ position: "relative", minHeight: "100svh", overflow: "hidden" }}
      className="flex items-center px-6 pt-24 pb-16"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 xl:gap-24 items-center">
        <div>
          <motion.div
            custom={0} variants={fade} initial="hidden" animate="visible"
            style={{
              display:       "flex",
              alignItems:    "center",
              gap:           "0.75rem",
              marginBottom:  "1.75rem",
            }}
          >
            <span style={{
              display:    "block",
              width:      24,
              height:     1,
              background: "var(--accent)",
              flexShrink: 0,
            }} />
            <span style={{
              fontFamily:    "var(--font-dm-mono)",
              fontSize:      "0.7rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color:         "var(--accent)",
            }}>
              {role}
              <span style={{
                display:         "inline-block",
                width:           2,
                height:          "0.9em",
                background:      "var(--accent)",
                marginLeft:      2,
                verticalAlign:   "middle",
                animation:       "blink 1s step-end infinite",
              }} />
            </span>
          </motion.div>

          <motion.h1
            custom={1} variants={fade} initial="hidden" animate="visible"
            style={{
              fontFamily:    "var(--font-syne)",
              fontWeight:    800,
              fontSize:      "clamp(3.8rem, 9.5vw, 8.5rem)",
              letterSpacing: "-0.04em",
              lineHeight:    0.88,
              color:         "var(--fg)",
              marginBottom:  "2rem",
            }}
          >
            REY<br />
            <span style={{
              WebkitTextStroke: "1px rgba(241,245,249,0.2)",
              color:            "transparent",
            }}>
              CANNA
            </span>
            <span style={{ color: "var(--fg)" }}>VARO</span>
          </motion.h1>

          <motion.p
            custom={2} variants={fade} initial="hidden" animate="visible"
            style={{
              fontFamily:   "var(--font-syne)",
              fontSize:     "clamp(0.95rem, 1.6vw, 1.05rem)",
              color:        "var(--fg-2)",
              lineHeight:   1.75,
              maxWidth:     480,
              marginBottom: "2.5rem",
              fontWeight:   400,
            }}
          >
            Building scalable digital products and innovating with modern tech stacks.
            Based in <span style={{ color: "var(--fg)" }}>Sidoarjo, Indonesia</span> — working globally.
          </motion.p>

          <motion.div
            custom={3} variants={fade} initial="hidden" animate="visible"
            style={{ display: "flex", flexWrap: "wrap", gap: "0.85rem", marginBottom: "2.5rem" }}
          >
            <MagneticBtn
              href="#projects"
              style={{
                display:       "inline-flex",
                alignItems:    "center",
                gap:           "0.5rem",
                padding:       "0.85rem 1.75rem",
                borderRadius:  10,
                fontFamily:    "var(--font-syne)",
                fontWeight:    700,
                fontSize:      "0.85rem",
                letterSpacing: "-0.01em",
                color:         "#fff",
                background:    "var(--accent)",
                border:        "none",
              }}
            >
              View Projects <FiArrowUpRight size={15} />
            </MagneticBtn>

            <MagneticBtn
              href="https://drive.google.com/file/d/1bfAzSDLQY4yjgPsLs8cbjDqhV859WUkP/view?usp=sharing"
              target="_blank"
              style={{
                display:       "inline-flex",
                alignItems:    "center",
                gap:           "0.5rem",
                padding:       "0.85rem 1.75rem",
                borderRadius:  10,
                fontFamily:    "var(--font-syne)",
                fontWeight:    700,
                fontSize:      "0.85rem",
                letterSpacing: "-0.01em",
                color:         "var(--fg)",
                background:    "transparent",
                border:        "1px solid var(--border-2)",
              }}
            >
              Download CV
            </MagneticBtn>
          </motion.div>

          <motion.div
            custom={4} variants={fade} initial="hidden" animate="visible"
            style={{
              display:      "flex",
              gap:          "clamp(1.5rem, 5vw, 3.5rem)",
              paddingTop:   "2rem",
              borderTop:    "1px solid var(--border)",
              marginBottom: "2rem",
            }}
          >
            <StatItem value={6}  suffix=""  label="Projects Built"  trigger={inView} delay={0}   />
            <StatItem value={12} suffix=""  label="Achievements"    trigger={inView} delay={150}  />
            <StatItem value={3}  suffix="+" label="Years Building"  trigger={inView} delay={300}  />
          </motion.div>

          <motion.div
            custom={5} variants={fade} initial="hidden" animate="visible"
            style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}
          >
            {[
              { href: "https://github.com/ReyCannavaro",       icon: <FiGithub size={18} />,    label: "GitHub"    },
              { href: "https://www.linkedin.com/in/reycannavaro/", icon: <FiLinkedin size={18} />, label: "LinkedIn"  },
              { href: "https://www.instagram.com/reycannavaro/",   icon: <FiInstagram size={18} />, label: "Instagram" },
              { href: "mailto:reyjunoalcannavaro@gmail.com",    icon: <FiMail size={18} />,      label: "Email"     },
            ].map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                aria-label={label}
                style={{
                  color:      "var(--fg-3)",
                  transition: "color 0.2s ease, transform 0.2s ease",
                  display:    "inline-flex",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color     = "var(--fg)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color     = "var(--fg-3)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                {icon}
              </a>
            ))}

            <span style={{ width: 1, height: 16, background: "var(--border-2)", display: "block", margin: "0 0.25rem" }} />

            <a
              href="https://linktr.ee/reycannavaro"
              target="_blank"
              style={{
                fontFamily:    "var(--font-dm-mono)",
                fontSize:      "0.62rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color:         "var(--fg-3)",
                textDecoration:"none",
                transition:    "color 0.2s ease",
                display:       "flex",
                alignItems:    "center",
                gap:           "0.4rem",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--accent)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--fg-3)"}
            >
              <FiArrowUpRight size={12} /> linktr.ee/reycannavaro
            </a>
          </motion.div>
        </div>

        {/* ── RIGHT — photo ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
          style={{ position: "relative" }}
          className="hidden lg:block"
        >
          {/* Decorative ring behind image */}
          <div style={{
            position:     "absolute",
            inset:        "-20px",
            borderRadius: 28,
            border:       "1px solid var(--border)",
            zIndex:       0,
          }} />

          {/* Accent corner lines */}
          <div style={{
            position:    "absolute",
            top:         -20,
            right:       -20,
            width:       40,
            height:      40,
            borderTop:   "2px solid var(--accent)",
            borderRight: "2px solid var(--accent)",
            borderRadius:"0 8px 0 0",
            zIndex:      2,
          }} />
          <div style={{
            position:     "absolute",
            bottom:       -20,
            left:         -20,
            width:        40,
            height:       40,
            borderBottom: "2px solid var(--cyan)",
            borderLeft:   "2px solid var(--cyan)",
            borderRadius: "0 0 0 8px",
            zIndex:       2,
          }} />

          {/* Photo container */}
          <div
            style={{
              position:     "relative",
              aspectRatio:  "4/5",
              borderRadius: 20,
              overflow:     "hidden",
              border:       "1px solid var(--border-2)",
              zIndex:       1,
            }}
          >
            <Image
              src="/profile-picture.png"
              alt="Rey Cannavaro"
              fill
              priority
              className="object-cover object-top"
              style={{ transition: "transform 0.7s ease" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
            />
            {/* overlay gradient */}
            <div style={{
              position:   "absolute",
              inset:      0,
              background: "linear-gradient(to top, #07090f 0%, transparent 55%)",
              pointerEvents: "none",
            }} />
            <div style={{
              position:   "absolute",
              inset:      0,
              background: "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, transparent 60%)",
              pointerEvents: "none",
            }} />
          </div>

          {/* Availability badge */}
          <div style={{
            position:       "absolute",
            bottom:         "1.25rem",
            left:           "50%",
            transform:      "translateX(-50%)",
            background:     "rgba(12,16,24,0.92)",
            border:         "1px solid var(--border-2)",
            borderRadius:   999,
            backdropFilter: "blur(12px)",
            padding:        "0.5rem 1.1rem",
            display:        "flex",
            alignItems:     "center",
            gap:            "0.55rem",
            whiteSpace:     "nowrap",
            zIndex:         3,
          }}>
            <span style={{
              width:        7,
              height:       7,
              borderRadius: "50%",
              background:   "#4ade80",
              boxShadow:    "0 0 8px #4ade80",
              flexShrink:   0,
              animation:    "pulse-dot 2s ease infinite",
            }} />
            <span style={{
              fontFamily:    "var(--font-dm-mono)",
              fontSize:      "0.65rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color:         "var(--fg-2)",
            }}>
              Available for Freelance
            </span>
          </div>

          {/* Index number */}
          <div style={{
            position:      "absolute",
            top:           "1rem",
            right:         "1rem",
            fontFamily:    "var(--font-dm-mono)",
            fontSize:      "0.6rem",
            letterSpacing: "0.2em",
            color:         "var(--fg-3)",
            zIndex:        3,
          }}>
            01 / PROFILE
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse-dot {
          0%,100% { box-shadow: 0 0 4px #4ade80; }
          50%      { box-shadow: 0 0 12px #4ade80; }
        }
      `}</style>
    </section>
  );
}