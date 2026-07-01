"use client";
import { useState, useEffect } from "react";

const NAV_ITEMS = [
  {
    id: "hero",
    label: "Home",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    id: "skills",
    label: "Skills",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    id: "experience",
    label: "Experience",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="0"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        <path d="M2 13h20"/>
        <path d="M12 12v3"/>
      </svg>
    ),
  },
  {
    id: "projects",
    label: "Projects",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="0"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
  {
    id: "achievements",
    label: "Achievements",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/>
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
  },
  {
    id: "education",
    label: "Education",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
  },
  {
    id: "contact",
    label: "Contact",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
];

export default function Sidebar() {
  const [active, setActive] = useState("hero");
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <aside className="sidebar-desktop"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          width: "var(--sidebar-w)",
          zIndex: 9000,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
          padding: "24px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            background: "rgba(13, 13, 13, 0.72)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(60, 60, 60, 0.5)",
            borderRadius: 999,
            padding: "12px 8px",
          }}
        >
          <div
            style={{
              width: 3,
              height: 24,
              borderRadius: 999,
              background: "linear-gradient(to bottom, #0066b1 0%, #1c69d4 50%, #e22718 100%)",
              marginBottom: 8,
              flexShrink: 0,
            }}
          />

          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            const isHov = hovered === item.id;
            return (
              <div key={item.id} style={{ position: "relative" }}>
                <button
                  onClick={() => scrollTo(item.id)}
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                  aria-label={`Navigasi ke ${item.label}`}
                  title={item.label}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: "none",
                    background: isActive
                      ? "rgba(255,255,255,0.12)"
                      : isHov
                      ? "rgba(255,255,255,0.06)"
                      : "transparent",
                    color: isActive ? "#fff" : "#7e7e7e",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s ease",
                    position: "relative",
                  }}
                >
                  {item.icon}

                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        right: -2,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 3,
                        height: 16,
                        borderRadius: 999,
                        background: "#fff",
                      }}
                    />
                  )}
                </button>

                {isHov && (
                  <div
                    style={{
                      position: "absolute",
                      left: "calc(100% + 12px)",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "rgba(26, 26, 26, 0.95)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(60, 60, 60, 0.8)",
                      padding: "5px 12px",
                      whiteSpace: "nowrap",
                      pointerEvents: "none",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        color: "#fff",
                        fontFamily: "var(--font-inter)",
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                )}
              </div>
            );
          })}

          <div
            style={{
              width: 3,
              height: 24,
              borderRadius: 999,
              background: "linear-gradient(to bottom, #0066b1 0%, #1c69d4 50%, #e22718 100%)",
              marginTop: 8,
              flexShrink: 0,
            }}
          />
        </div>
      </aside>

      <nav
        className="navbar-mobile"
        style={{
          position: "fixed",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9000,
          alignItems: "center",
          gap: 4,
          background: "rgba(13, 13, 13, 0.82)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(60, 60, 60, 0.5)",
          borderRadius: 999,
          padding: "8px 12px",
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              aria-label={`Navigasi ke ${item.label}`}
              title={item.label}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "none",
                background: isActive ? "rgba(255,255,255,0.12)" : "transparent",
                color: isActive ? "#fff" : "#7e7e7e",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
              }}
            >
              {item.icon}
            </button>
          );
        })}
      </nav>

      <style>{`
        .sidebar-desktop {
          display: none;
        }
        @media (min-width: 768px) {
          .sidebar-desktop {
            display: flex;
          }
        }

        .navbar-mobile {
          display: flex;
        }
        @media (min-width: 768px) {
          .navbar-mobile {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
