"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "About",        href: "#about"        },
  { label: "Skills",       href: "#skills"       },
  { label: "Projects",     href: "#projects"     },
  { label: "Achievements", href: "#achievements" },
  { label: "Education",    href: "#education"    },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [active,    setActive]    = useState("");
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [progress,  setProgress]  = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const total = document.body.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);

      const sections = NAV_LINKS.map(l => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(id);
          return;
        }
      }
      setActive("");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <div
        style={{
          position:        "fixed",
          top:             0,
          left:            0,
          height:          3,
          width:           `${progress}%`,
          background:      "linear-gradient(90deg, #4169E4, #9B59B6)",
          zIndex:          99999,
          transition:      "width 0.1s linear",
          borderRadius:    "0 2px 2px 0",
          transformOrigin: "left",
        }}
      />

      <nav
        style={{
          position:        "fixed",
          top:             0,
          left:            0,
          right:           0,
          zIndex:          9000,
          transition:      "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          padding:         scrolled ? "0.6rem 0" : "1.1rem 0",
          background:      scrolled
            ? "rgba(248, 249, 250, 0.88)"
            : "transparent",
          backdropFilter:  scrolled ? "blur(16px) saturate(1.6)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px) saturate(1.6)" : "none",
          borderBottom:    scrolled
            ? "1px solid rgba(209, 213, 219, 0.7)"
            : "1px solid transparent",
          boxShadow:       scrolled
            ? "0 2px 20px rgba(0, 0, 0, 0.06)"
            : "none",
        }}
      >
        <div
          style={{
            maxWidth:      "1100px",
            margin:        "0 auto",
            padding:       "0 24px",
            display:       "flex",
            alignItems:    "center",
            justifyContent:"space-between",
          }}
        >
          <a
            href="#about"
            style={{
              fontFamily:    "'Satoshi', sans-serif",
              fontWeight:    900,
              fontSize:      "1.05rem",
              letterSpacing: "-0.04em",
              color:         "#1A1D23",
              textDecoration:"none",
              display:       "flex",
              alignItems:    "center",
              gap:           "6px",
              lineHeight:    1,
            }}
          >
            Rey Cannavaro
            <span
              style={{
                width:       2,
                height:      14,
                background:  "linear-gradient(180deg, #4169E4, #9B59B6)",
                borderRadius:2,
                marginLeft:  4,
              }}
            />
            <span
              style={{
                fontFamily:    "'Satoshi', sans-serif",
                fontWeight:    500,
                fontSize:      "0.72rem",
                letterSpacing: "0.08em",
                color:         "#6B7280",
                textTransform: "uppercase",
              }}
            >
              Dev
            </span>
          </a>

          <div
            className="hidden md:flex"
            style={{
              alignItems:     "center",
              gap:            "2px",
              background:     "rgba(240, 242, 245, 0.8)",
              borderRadius:   "14px",
              border:         "1.5px solid rgba(209, 213, 219, 0.6)",
              padding:        "4px",
            }}
          >
            {NAV_LINKS.map(({ label, href }) => {
              const id       = href.slice(1);
              const isActive = active === id;
              return (
                <a
                  key={id}
                  href={href}
                  style={{
                    position:      "relative",
                    padding:       "6px 14px",
                    fontFamily:    "'Satoshi', sans-serif",
                    fontWeight:    isActive ? 700 : 500,
                    fontSize:      "0.8rem",
                    letterSpacing: "-0.01em",
                    color:         isActive ? "#1A1D23" : "#6B7280",
                    textDecoration:"none",
                    borderRadius:  "10px",
                    background:    isActive ? "#FFFFFF" : "transparent",
                    boxShadow:     isActive
                      ? "0 1px 8px rgba(0,0,0,0.08), 0 0 0 1px rgba(209,213,219,0.5)"
                      : "none",
                    transition:    "all 0.2s ease",
                    whiteSpace:    "nowrap",
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color      = "#1A1D23";
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.6)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color      = "#6B7280";
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                    }
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="pill-active"
                      style={{
                        position:     "absolute",
                        inset:        0,
                        borderRadius: "10px",
                        background:   "#FFFFFF",
                        boxShadow:    "0 1px 8px rgba(0,0,0,0.08), 0 0 0 1px rgba(209,213,219,0.5)",
                        zIndex:       0,
                      }}
                      transition={{ type: "spring", stiffness: 460, damping: 38 }}
                    />
                  )}
                  <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
                </a>
              );
            })}
          </div>

          <a
            href="mailto:reyjunoalcannavaro@gmail.com"
            className="hidden md:inline-flex"
            style={{
              padding:       "8px 20px",
              borderRadius:  "12px",
              fontFamily:    "'Satoshi', sans-serif",
              fontWeight:    700,
              fontSize:      "0.8rem",
              letterSpacing: "-0.01em",
              color:         "#FFFFFF",
              background:    "linear-gradient(135deg, #4169E4 0%, #5A7AF0 100%)",
              textDecoration:"none",
              boxShadow:     "0 2px 12px rgba(65, 105, 228, 0.32)",
              transition:    "all 0.2s ease",
              whiteSpace:    "nowrap",
              border:        "none",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform  = "translateY(-1px)";
              (e.currentTarget as HTMLElement).style.boxShadow  = "0 4px 20px rgba(65, 105, 228, 0.44)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform  = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow  = "0 2px 12px rgba(65, 105, 228, 0.32)";
            }}
          >
            Hire Me
          </a>

          <button
            onClick={() => setMenuOpen(o => !o)}
            className="md:hidden"
            aria-label="Toggle menu"
            style={{
              background:    "rgba(240, 242, 245, 0.9)",
              border:        "1.5px solid rgba(209, 213, 219, 0.7)",
              borderRadius:  "10px",
              padding:       "8px 10px",
              cursor:        "pointer",
              display:       "flex",
              flexDirection: "column",
              gap:           "4.5px",
              alignItems:    "center",
              justifyContent:"center",
            }}
          >
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                animate={{
                  rotate:  menuOpen && i === 0 ? 45 : menuOpen && i === 2 ? -45 : 0,
                  y:       menuOpen && i === 0 ?  6.5 : menuOpen && i === 2 ? -6.5 : 0,
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
                style={{
                  display:      "block",
                  width:        18,
                  height:       1.5,
                  background:   "#1A1D23",
                  borderRadius: 2,
                  transformOrigin: "center",
                }}
                transition={{ duration: 0.22 }}
              />
            ))}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1,  y: 0   }}
            exit={{    opacity: 0,  y: -12  }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position:        "fixed",
              top:             0,
              left:            0,
              right:           0,
              bottom:          0,
              zIndex:          8999,
              background:      "rgba(248, 249, 250, 0.97)",
              backdropFilter:  "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              display:         "flex",
              flexDirection:   "column",
              padding:         "0 24px 40px",
              paddingTop:      "5.5rem",
            }}
          >
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
              {NAV_LINKS.map(({ label, href }, i) => {
                const id       = href.slice(1);
                const isActive = active === id;
                return (
                  <motion.a
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1,  x: 0   }}
                    transition={{ delay: i * 0.06, duration: 0.22 }}
                    style={{
                      fontFamily:    "'Satoshi', sans-serif",
                      fontWeight:    isActive ? 800 : 600,
                      fontSize:      "1.35rem",
                      letterSpacing: "-0.03em",
                      color:         isActive ? "#4169E4" : "#1A1D23",
                      textDecoration:"none",
                      padding:       "14px 18px",
                      borderRadius:  "14px",
                      background:    isActive ? "rgba(65, 105, 228, 0.07)" : "transparent",
                      border:        isActive
                        ? "1.5px solid rgba(65, 105, 228, 0.2)"
                        : "1.5px solid transparent",
                      display:       "flex",
                      alignItems:    "center",
                      justifyContent:"space-between",
                      transition:    "all 0.18s ease",
                    }}
                  >
                    {label}
                    <svg
                      width="16" height="16" viewBox="0 0 16 16" fill="none"
                      style={{ opacity: isActive ? 1 : 0.3 }}
                    >
                      <path
                        d="M6 3L11 8L6 13"
                        stroke={isActive ? "#4169E4" : "#1A1D23"}
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.a>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1,  y: 0  }}
              transition={{ delay: 0.32, duration: 0.24 }}
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <div
                style={{
                  height:     1,
                  background: "rgba(209, 213, 219, 0.7)",
                  marginBottom: 6,
                }}
              />
              <a
                href="mailto:reyjunoalcannavaro@gmail.com"
                onClick={() => setMenuOpen(false)}
                style={{
                  display:       "flex",
                  alignItems:    "center",
                  justifyContent:"center",
                  padding:       "14px 24px",
                  borderRadius:  "14px",
                  fontFamily:    "'Satoshi', sans-serif",
                  fontWeight:    700,
                  fontSize:      "0.95rem",
                  letterSpacing: "-0.01em",
                  color:         "#FFFFFF",
                  background:    "linear-gradient(135deg, #4169E4 0%, #5A7AF0 100%)",
                  textDecoration:"none",
                  boxShadow:     "0 4px 20px rgba(65, 105, 228, 0.35)",
                }}
              >
                Hire Me
              </a>
              <a
                href="https://github.com/ReyCannavaro"
                target="_blank"
                rel="noreferrer"
                onClick={() => setMenuOpen(false)}
                style={{
                  display:       "flex",
                  alignItems:    "center",
                  justifyContent:"center",
                  padding:       "13px 24px",
                  borderRadius:  "14px",
                  fontFamily:    "'Satoshi', sans-serif",
                  fontWeight:    600,
                  fontSize:      "0.9rem",
                  color:         "#1A1D23",
                  background:    "rgba(240, 242, 245, 0.9)",
                  border:        "1.5px solid rgba(209, 213, 219, 0.7)",
                  textDecoration:"none",
                }}
              >
                GitHub
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}