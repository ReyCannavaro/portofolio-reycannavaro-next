"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "About",     href: "#about"     },
  { label: "Skills",    href: "#skills"    },
  { label: "Projects",  href: "#projects"  },
  { label: "Education", href: "#education" },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [active,    setActive]    = useState("");
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [progress,  setProgress]  = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      
      const total = document.body.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);

      const sections = NAV_LINKS.map(l => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(id); return;
        }
      }
      setActive("");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <div
        style={{
          position:    "fixed",
          top:         0,
          left:        0,
          height:      2,
          width:       `${progress}%`,
          background:  "linear-gradient(90deg, var(--accent), var(--cyan))",
          zIndex:      99997,
          transition:  "width 0.1s linear",
          transformOrigin: "left",
        }}
      />

      <nav
        style={{
          position:       "fixed",
          top:            0,
          width:          "100%",
          zIndex:         9000,
          transition:     "padding 0.3s ease, background 0.3s ease",
          padding:        scrolled ? "0.85rem 0" : "1.4rem 0",
          background:     scrolled ? "rgba(7,9,15,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom:   scrolled ? "1px solid var(--border)" : "1px solid transparent",
        }}
      >
        <div
          className="max-w-7xl mx-auto px-6"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
        >
          <a
            href="#about"
            style={{
              fontFamily:    "var(--font-syne)",
              fontWeight:    800,
              fontSize:      "1.15rem",
              letterSpacing: "-0.04em",
              color:         "var(--fg)",
              textDecoration:"none",
              display:       "flex",
              alignItems:    "center",
              gap:           "0.15rem",
            }}
          >
            REY
            <span style={{
              display:    "inline-block",
              width:      6,
              height:     6,
              borderRadius:"50%",
              background: "linear-gradient(135deg, var(--accent), var(--cyan))",
              margin:     "0 1px",
              flexShrink: 0,
            }} />
          </a>

          <div className="hidden md:flex" style={{ alignItems: "center", gap: "0.25rem" }}>
            {NAV_LINKS.map(({ label, href }) => {
              const id        = href.slice(1);
              const isActive  = active === id;
              return (
                <a
                  key={id}
                  href={href}
                  style={{
                    position:      "relative",
                    padding:       "0.4rem 0.85rem",
                    fontFamily:    "var(--font-syne)",
                    fontWeight:    isActive ? 700 : 500,
                    fontSize:      "0.82rem",
                    letterSpacing: "-0.01em",
                    color:         isActive ? "var(--fg)" : "var(--fg-2)",
                    textDecoration:"none",
                    borderRadius:  8,
                    transition:    "color 0.2s ease",
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--fg)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = isActive ? "var(--fg)" : "var(--fg-2)"}
                >
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      style={{
                        position:   "absolute",
                        bottom:     2,
                        left:       "0.85rem",
                        right:      "0.85rem",
                        height:     1.5,
                        background: "linear-gradient(90deg, var(--accent), var(--cyan))",
                        borderRadius: 2,
                      }}
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                </a>
              );
            })}

            <a
              href="mailto:reyjunoalcannavaro@gmail.com"
              style={{
                marginLeft:    "0.75rem",
                padding:       "0.5rem 1.1rem",
                borderRadius:  8,
                fontFamily:    "var(--font-syne)",
                fontWeight:    700,
                fontSize:      "0.82rem",
                color:         "#fff",
                background:    "var(--accent)",
                textDecoration:"none",
                transition:    "opacity 0.2s ease",
                letterSpacing: "-0.01em",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.85"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
            >
              Hire Me
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(o => !o)}
            className="md:hidden"
            aria-label="Toggle menu"
            style={{
              background: "none",
              border:     "none",
              padding:    "0.4rem",
              cursor:     "none",
              display:    "flex",
              flexDirection: "column",
              gap:        "5px",
            }}
          >
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                animate={{
                  rotate:      menuOpen && i === 0 ? 45 : menuOpen && i === 2 ? -45 : 0,
                  y:           menuOpen && i === 0 ?  7 : menuOpen && i === 2 ? -7 : 0,
                  opacity:     menuOpen && i === 1 ? 0 : 1,
                  translateY:  0,
                }}
                style={{
                  display:    "block",
                  width:      22,
                  height:     1.5,
                  background: "var(--fg)",
                  borderRadius: 2,
                  transformOrigin: "center",
                }}
                transition={{ duration: 0.25 }}
              />
            ))}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            style={{
              position:       "fixed",
              top:            0,
              left:           0,
              right:          0,
              zIndex:         8999,
              background:     "rgba(7,9,15,0.97)",
              backdropFilter: "blur(24px)",
              paddingTop:     "5rem",
              paddingBottom:  "2rem",
              borderBottom:   "1px solid var(--border)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", padding: "0 1.5rem" }}>
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily:    "var(--font-syne)",
                    fontWeight:    700,
                    fontSize:      "1.4rem",
                    letterSpacing: "-0.03em",
                    color:         "var(--fg)",
                    textDecoration:"none",
                    padding:       "0.6rem 0",
                    borderBottom:  "1px solid var(--border)",
                  }}
                >
                  {label}
                </a>
              ))}
              <a
                href="mailto:reyjunoalcannavaro@gmail.com"
                style={{
                  marginTop:     "1.25rem",
                  display:       "inline-flex",
                  padding:       "0.75rem 1.5rem",
                  borderRadius:  10,
                  fontFamily:    "var(--font-syne)",
                  fontWeight:    700,
                  fontSize:      "0.9rem",
                  color:         "#fff",
                  background:    "var(--accent)",
                  textDecoration:"none",
                  alignSelf:     "flex-start",
                }}
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}