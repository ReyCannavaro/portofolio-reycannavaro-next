"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "About",        href: "#about"        },
  { label: "Skills",       href: "#skills"       },
  { label: "Projects",     href: "#projects"     },
  { label: "Achievements", href: "#achievements" },
  { label: "Education",    href: "#education"    },
  { label: "Contact",      href: "#contact"      },
];

export default function Navbar() {
  const [active,   setActive]   = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const ids = NAV_LINKS.map(l => l.href.slice(1));
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) {
          setActive(id); return;
        }
      }
      setActive("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav
        style={{
          position:   "fixed",
          bottom:     28,
          left:       "50%",
          transform:  "translateX(-50%)",
          zIndex:     9000,
          display:    "flex",
          alignItems: "center",
          gap:        0,
          background: "var(--navy)",
          border:     "2px solid #000",
          borderRadius: 999,
          boxShadow:  "4px 4px 0 var(--sky)",
          padding:    "6px 6px",
          backdropFilter: "blur(12px)",
        }}
        className="hidden md:flex"
      >
        <a
          href="#about"
          style={{
            fontFamily:    "var(--font-display)",
            fontSize:      "14px",
            fontWeight:    400,
            letterSpacing: "0.02em",
            color:         "var(--sky)",
            textDecoration:"none",
            padding:       "6px 16px",
            borderRadius:  999,
            marginRight:   4,
            whiteSpace:    "nowrap",
          }}
        >
          REY CANNAVARO.DEV
        </a>

        <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.15)", margin: "0 4px" }} />

        {NAV_LINKS.map(({ label, href }) => {
          const id       = href.slice(1);
          const isActive = active === id;
          return (
            <a
              key={id}
              href={href}
              style={{
                position:      "relative",
                padding:       "7px 14px",
                fontFamily:    "var(--font-accent)",
                fontWeight:    isActive ? 700 : 500,
                fontSize:      "12px",
                letterSpacing: "0.02em",
                color:         isActive ? "var(--navy)" : "rgba(255,255,255,0.65)",
                textDecoration:"none",
                borderRadius:  999,
                background:    isActive ? "var(--sky)" : "transparent",
                transition:    "all 0.18s ease",
                whiteSpace:    "nowrap",
                border:        isActive ? "1.5px solid var(--navy)" : "1.5px solid transparent",
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "#fff";
                  el.style.background = "rgba(255,255,255,0.1)";
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "rgba(255,255,255,0.65)";
                  el.style.background = "transparent";
                }
              }}
            >
              {label}
            </a>
          );
        })}

        <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.15)", margin: "0 4px" }} />

        <a
          href="mailto:reyjunoalcannavaro@gmail.com"
          style={{
            padding:       "7px 16px",
            borderRadius:  999,
            fontFamily:    "var(--font-accent)",
            fontWeight:    700,
            fontSize:      "12px",
            color:         "var(--navy)",
            background:    "var(--orange-light)",
            textDecoration:"none",
            border:        "1.5px solid var(--orange)",
            boxShadow:     "2px 2px 0 var(--orange)",
            transition:    "all 0.15s ease",
            whiteSpace:    "nowrap",
            marginLeft:    2,
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = "translate(-1px,-1px)";
            el.style.boxShadow = "3px 3px 0 var(--orange)";
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = "";
            el.style.boxShadow = "2px 2px 0 var(--orange)";
          }}
        >
          Hire Me ↗
        </a>
      </nav>

      <div
        className="md:hidden"
        style={{
          position:        "fixed",
          top:             0,
          left:            0,
          right:           0,
          zIndex:          9000,
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "space-between",
          padding:         "14px 20px",
          background:      scrolled ? "rgba(250,249,246,0.95)" : "transparent",
          backdropFilter:  scrolled ? "blur(12px)" : "none",
          borderBottom:    scrolled ? "2px solid var(--border)" : "2px solid transparent",
          transition:      "all 0.25s ease",
        }}
      >
        <a
          href="#about"
          style={{
            fontFamily:     "var(--font-display)",
            fontSize:        "18px",
            color:           "var(--navy)",
            textDecoration:  "none",
            letterSpacing:   "0.02em",
          }}
        >
          REY CANNAVARO.DEV
        </a>

        <button
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          style={{
            background:    "var(--navy)",
            border:        "2px solid #000",
            borderRadius:  0,
            padding:       "8px 12px",
            cursor:        "pointer",
            display:       "flex",
            flexDirection: "column",
            gap:           5,
            alignItems:    "center",
            boxShadow:     "2px 2px 0 var(--sky)",
          }}
        >
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              animate={{
                rotate:  menuOpen && i === 0 ? 45 : menuOpen && i === 2 ? -45 : 0,
                y:       menuOpen && i === 0 ? 7  : menuOpen && i === 2 ? -7  : 0,
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
              style={{
                display:      "block",
                width:        18,
                height:       2,
                background:   "var(--sky)",
                borderRadius: 0,
                transformOrigin: "center",
              }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1,  y: 0   }}
            exit={{    opacity: 0,  y: -20  }}
            transition={{ duration: 0.2 }}
            style={{
              position:   "fixed",
              inset:      0,
              zIndex:     8999,
              background: "var(--navy)",
              display:    "flex",
              flexDirection: "column",
              padding:    "80px 24px 40px",
            }}
          >
            <div style={{
              position:   "absolute",
              top:        40,
              right:      40,
              fontFamily: "var(--font-display)",
              fontSize:   "80px",
              color:      "rgba(79,195,247,0.08)",
              lineHeight: 1,
              userSelect: "none",
              pointerEvents: "none",
            }}>
              MENU
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
              {NAV_LINKS.map(({ label, href }, i) => {
                const id       = href.slice(1);
                const isActive = active === id;
                return (
                  <motion.a
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1,  x: 0   }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                    style={{
                      fontFamily:    "var(--font-display)",
                      fontSize:      "clamp(28px, 7vw, 44px)",
                      fontWeight:    400,
                      letterSpacing: "0.01em",
                      color:         isActive ? "var(--sky)" : "rgba(255,255,255,0.7)",
                      textDecoration:"none",
                      padding:       "10px 0",
                      borderBottom:  "1px dashed rgba(255,255,255,0.1)",
                      display:       "flex",
                      alignItems:    "center",
                      justifyContent:"space-between",
                      transition:    "color 0.15s",
                    }}
                  >
                    <span>{label}</span>
                    {isActive && (
                      <span style={{
                        fontFamily: "var(--font-mono)",
                        fontSize:   "11px",
                        color:      "var(--sky)",
                        letterSpacing: "0.12em",
                      }}>● ACTIVE</span>
                    )}
                  </motion.a>
                );
              })}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ height: 2, background: "rgba(255,255,255,0.1)" }} />
              <a
                href="mailto:reyjunoalcannavaro@gmail.com"
                onClick={() => setMenuOpen(false)}
                style={{
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  padding:        "16px 24px",
                  fontFamily:     "var(--font-accent)",
                  fontWeight:     700,
                  fontSize:       "16px",
                  color:          "var(--navy)",
                  background:     "var(--orange-light)",
                  textDecoration: "none",
                  border:         "2px solid var(--orange)",
                  boxShadow:      "4px 4px 0 var(--orange)",
                  letterSpacing:  "0.02em",
                }}
              >
                Hire Me ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}