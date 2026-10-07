"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { personalInfo, currentStatus, socialLinks } from "../data/index";

const ROLES = ["FULLSTACK DEVELOPER", "SOFTWARE ENGINEER", "AI ENTHUSIAST", "UI/UX DESIGNER"];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
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
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <Image
            src="/images/profile.png"
            alt="Foto profil Reyjuno Al Cannavaro (Rey Cannavaro) - Fullstack Developer"
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
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
            marginBottom: "var(--space-md)",
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#e22718",
              display: "inline-block",
              animation: "pulse-dot 2s infinite ease-in-out",
            }}
          />
          <span className="label-upper" style={{ color: "var(--body-strong)" }}>
            {currentStatus.availableForWork}
          </span>
        </div>

        <div style={{ marginBottom: "var(--space-xs)" }}>
          <span
            className="label-upper"
            style={{
              color: "var(--m-blue-text)",
              fontSize: 12,
              letterSpacing: "3px",
              display: "block",
            }}
          >
            REYJUNO AL CANNAVARO
          </span>
        </div>

        <div>
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
          }}
        >
          <p
            key={roleIdx}
            className="label-upper"
            style={{
              color: "var(--m-blue-text)",
              letterSpacing: "3px",
              fontSize: 13,
              animation: "slideUp 0.4s ease",
            }}
          >
            - {ROLES[roleIdx]}
          </p>
        </div>

        <p
          className="body-md"
          style={{
            maxWidth: 460,
            marginTop: "var(--space-lg)",
          }}
        >
          {personalInfo.bio}
        </p>

        <div
          style={{
            marginTop: "var(--space-xl)",
            width: 120,
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
          }}
        >
          <a href="#projects" className="btn-primary" aria-label="Lihat pilihan proyek Rey Cannavaro">
            View Projects →
          </a>
          <a href={`mailto:${personalInfo.email}`} className="btn-ghost" aria-label={`Kirim email kerja sama ke ${personalInfo.email}`}>
            Get in Touch
          </a>
        </div>

        <div
          style={{
            display: "flex",
            gap: "var(--space-md)",
            marginTop: "var(--space-xl)",
          }}
        >
          {[
            { label: "GH", name: "GitHub", url: socialLinks.github.url },
            { label: "LI", name: "LinkedIn", url: socialLinks.linkedin.url },
            { label: "IG", name: "Instagram", url: socialLinks.instagram.url },
          ].map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Kunjungi profil ${s.name} Rey Cannavaro`}
              style={{
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid var(--hairline)",
                color: "var(--body)",
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
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--body)";
              }}
            >
              {s.label}
            </a>
          ))}

          <a
            href="https://drive.google.com/drive/folders/16sA6h1yZdfB2qE-7dmLmIM2rzQgkpMm-?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Lihat folder sertifikat prestasi dan sertifikasi Rey Cannavaro di Google Drive"
            style={{
              height: 36,
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "0 12px",
              border: "1px solid var(--hairline)",
              color: "var(--body)",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "1px",
              textDecoration: "none",
              transition: "border-color 0.2s, color 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "#fff";
              (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--hairline)";
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--body)";
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
            CERTIFICATES
          </a>
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
          opacity: 0.75,
        }}
        className="hidden md:flex"
        aria-hidden="true"
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
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.35; transform: scale(0.85); }
        }
        @keyframes scrollLine {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
      `}</style>
    </section>
  );
}