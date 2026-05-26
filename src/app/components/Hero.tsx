"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { personalInfo, currentStatus, socialLinks } from "../data/index";

const ROLES = ["FULLSTACK DEVELOPER", "SOFTWARE ENGINEER", "AI ENTHUSIAST", "UI/UX DESIGNER"];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [visible, setVisible] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setVisible(true);
    intervalRef.current = setInterval(() => {
      setRoleIdx((i) => (i + 1) % ROLES.length);
    }, 2800);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100svh",
        background: "var(--canvas)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        position: "relative",
        overflow: "hidden",
        paddingBottom: "var(--space-xxl)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(60,60,60,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(60,60,60,0.15) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "clamp(280px, 40vw, 560px)",
          height: "100%",
          zIndex: 1,
          opacity: visible ? 1 : 0,
          transition: "opacity 1.2s ease",
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <Image
            src="/images/profile.png"
            alt="Rey Cannavaro"
            fill
            style={{ objectFit: "cover", objectPosition: "top center" }}
            priority
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, var(--canvas) 0%, rgba(0,0,0,0.5) 20%, transparent 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, var(--canvas) 0%, rgba(0,0,0,0.2) 30%, transparent 60%)",
            }}
          />
        </div>
      </div>

      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 2,
          paddingTop: "var(--space-xxl)",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginBottom: "var(--space-xl)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.6s ease 0.1s",
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#e22718",
              display: "inline-block",
              boxShadow: "0 0 8px #e22718",
              animation: "pulse-dot 2s infinite",
            }}
          />
          <span className="label-upper" style={{ color: "var(--body-strong)" }}>
            {currentStatus.availableForWork}
          </span>
        </div>

        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease 0.2s",
          }}
        >
          <h1 className="display-xl" style={{ maxWidth: "700px", lineHeight: 0.95 }}>
            REY<br />
            <span style={{ color: "var(--body-strong)", fontWeight: 700 }}>CANNA</span>VARO
          </h1>
        </div>

        <div
          style={{
            marginTop: "var(--space-md)",
            height: 32,
            overflow: "hidden",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.4s",
          }}
        >
          <p
            key={roleIdx}
            className="label-upper"
            style={{
              color: "var(--m-blue-dark)",
              letterSpacing: "3px",
              fontSize: 13,
              animation: "slideUp 0.4s ease",
            }}
          >
            — {ROLES[roleIdx]}
          </p>
        </div>

        <p
          className="body-md"
          style={{
            maxWidth: 460,
            marginTop: "var(--space-lg)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.7s ease 0.5s",
          }}
        >
          {personalInfo.bio}
        </p>

        <div
          style={{
            marginTop: "var(--space-xl)",
            width: 120,
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.6s",
          }}
        >
          <div className="m-stripe" />
        </div>

        <div
          style={{
            display: "flex",
            gap: "var(--space-xl)",
            marginTop: "var(--space-xl)",
            flexWrap: "wrap",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.7s ease 0.7s",
          }}
        >
          {[
            { value: `${personalInfo.yearsExperience}+`, label: "Years Exp" },
            { value: "6+", label: "Projects" },
            { value: "12+", label: "Achievements" },
            { value: personalInfo.age.toString(), label: "Years Old" },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: 28, fontWeight: 700, color: "var(--on-dark)", lineHeight: 1 }}>
                {s.value}
              </div>
              <div className="label-upper" style={{ marginTop: 4, color: "var(--muted)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            gap: "var(--space-md)",
            marginTop: "var(--space-xl)",
            flexWrap: "wrap",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.7s ease 0.85s",
          }}
        >
          <a href="#projects" className="btn-primary">
            View Projects →
          </a>
          <a href={`mailto:${personalInfo.email}`} className="btn-ghost">
            Get in Touch
          </a>
        </div>

        <div
          style={{
            display: "flex",
            gap: "var(--space-md)",
            marginTop: "var(--space-xl)",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 1s",
          }}
        >
          {[
            { label: "GH", url: socialLinks.github.url },
            { label: "LI", url: socialLinks.linkedin.url },
            { label: "IG", url: socialLinks.instagram.url },
          ].map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid var(--hairline)",
                color: "var(--muted)",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "1px",
                textDecoration: "none",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "#fff";
                (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--hairline)";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)";
              }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 32,
          right: 48,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          opacity: visible ? 0.5 : 0,
          transition: "opacity 0.6s ease 1.2s",
        }}
        className="hidden md:flex"
      >
        <span className="label-upper" style={{ fontSize: 9, writingMode: "vertical-rl", color: "var(--muted)" }}>
          SCROLL
        </span>
        <div style={{ width: 1, height: 48, background: "var(--hairline)", position: "relative", overflow: "hidden" }}>
          <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "40%",
            background: "var(--on-dark)",
            animation: "scrollLine 1.8s ease-in-out infinite",
          }} />
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
        @keyframes scrollLine {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
      `}</style>
    </section>
  );
}