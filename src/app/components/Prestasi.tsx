"use client";
import { useEffect, useRef, useState } from "react";
import { prestasiData } from "@/app/data/index";
import Image from "next/image";
import { FiAward, FiUsers } from "react-icons/fi";

export default function Prestasi() {
  const [mounted, setMounted] = useState(false);
  const [inView, setInView]   = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  if (!mounted) return <section style={{ padding:"7rem 0", borderTop:"1px solid var(--border)" }} />;

  const featured = prestasiData.slice(0, 2);
  const normal   = prestasiData.slice(2);

  return (
    <>
      <style>{`
        .pres-section {
          padding: 7rem 2.5rem;
          border-top: 1px solid var(--border);
          position: relative;
        }
        .pres-inner { max-width: 1200px; margin: 0 auto; }

        /* header */
        .pres-heading {
          font-family: var(--font-syne);
          font-weight: 800;
          font-size: clamp(2.2rem, 5vw, 4rem);
          letter-spacing: -0.04em;
          line-height: 0.9;
          color: var(--fg);
          margin: 0;
        }
        .pres-heading-ghost {
          -webkit-text-stroke: 1px rgba(241,245,249,0.14);
          color: transparent;
        }

        /* featured row */
        .pres-featured {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        @media (min-width: 768px) { .pres-featured { grid-template-columns: 1fr 1fr; } }

        /* normal grid */
        .pres-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 640px)  { .pres-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .pres-grid { grid-template-columns: repeat(4, 1fr); } }

        /* card base */
        .pres-card {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid var(--border);
          background: var(--bg-2);
          cursor: default;
          transition: border-color 0.25s, transform 0.3s cubic-bezier(0.23,1,0.32,1);
        }
        .pres-card:hover {
          border-color: rgba(99,102,241,0.35);
          transform: translateY(-5px);
        }
        .pres-card-featured { min-height: 340px; }
        .pres-card-normal   { min-height: 220px; }

        /* image */
        .pres-img-wrap {
          position: absolute; inset: 0;
        }
        .pres-img-wrap img {
          object-fit: cover;
          object-position: center;
          filter: grayscale(0.6) brightness(0.45);
          transition: filter 0.5s ease, transform 0.5s ease;
        }
        .pres-card:hover .pres-img-wrap img {
          filter: grayscale(0) brightness(0.55);
          transform: scale(1.05);
        }
        .pres-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, #07090f 15%, rgba(7,9,15,0.5) 60%, transparent 100%);
        }

        /* content */
        .pres-content {
          position: relative; z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1.25rem;
        }
        .pres-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.5rem;
        }
        .pres-year-pill {
          font-family: var(--font-dm-mono);
          font-size: 0.55rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 999px;
          background: rgba(99,102,241,0.15);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(99,102,241,0.25);
          color: #a5b4fc;
        }
        .pres-icon-box {
          width: 32px; height: 32px;
          border-radius: 8px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.4);
          flex-shrink: 0;
          transition: background 0.2s, color 0.2s;
        }
        .pres-card:hover .pres-icon-box {
          background: rgba(99,102,241,0.15);
          color: #a5b4fc;
        }
        .pres-bottom { display: flex; flex-direction: column; gap: 0.4rem; }
        .pres-title-featured {
          font-family: var(--font-syne);
          font-weight: 800;
          font-size: clamp(1rem, 2vw, 1.3rem);
          letter-spacing: -0.02em;
          line-height: 1.2;
          color: #f1f5f9;
        }
        .pres-title-normal {
          font-family: var(--font-syne);
          font-weight: 700;
          font-size: 0.85rem;
          letter-spacing: -0.01em;
          line-height: 1.3;
          color: #f1f5f9;
        }
        .pres-org {
          font-family: var(--font-dm-mono);
          font-size: 0.55rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(148,163,184,0.7);
        }
        .pres-divider {
          height: 1px;
          background: rgba(255,255,255,0.07);
          margin: 0.6rem 0;
        }

        /* next milestone bar */
        .pres-next {
          margin-top: 3rem;
          padding: 1.25rem 1.5rem;
          border-radius: 14px;
          background: var(--bg-2);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .pres-next-dots { display: flex; gap: 5px; }
        .pres-next-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--accent);
          animation: pres-bounce 1.2s ease infinite;
        }
        @keyframes pres-bounce {
          0%,100% { transform: translateY(0); opacity:0.4; }
          50%      { transform: translateY(-5px); opacity:1; }
        }
        .pres-next-text {
          font-family: var(--font-dm-mono);
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--fg-3);
        }
        .pres-next-num {
          margin-left: auto;
          font-family: var(--font-syne);
          font-weight: 800;
          font-size: 1.4rem;
          letter-spacing: -0.04em;
          color: var(--accent);
        }

        /* reveal */
        .pres-reveal {
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .pres-reveal.shown { opacity: 1; transform: translateY(0); }
      `}</style>

      <section ref={ref} id="achievements" className="pres-section">
        <div className="pres-inner">

          <div className={`pres-reveal ${inView ? "shown" : ""}`} style={{
            display:"grid", gridTemplateColumns:"1fr",
            gap:"2rem", marginBottom:"3rem",
            paddingBottom:"2.5rem", borderBottom:"1px solid var(--border)",
          }}>
            <div>
              <p style={{
                fontFamily:"var(--font-dm-mono)", fontSize:"0.6rem",
                letterSpacing:"0.2em", textTransform:"uppercase",
                color:"var(--accent)", marginBottom:"0.75rem",
                display:"flex", alignItems:"center", gap:"0.5rem",
              }}>
                <span style={{ width:16, height:1, background:"var(--accent)", display:"block" }} />
                Honors &amp; Leadership
              </p>
              <h2 className="pres-heading">
                Milestones<br />
                <span className="pres-heading-ghost">&amp; Impact.</span>
              </h2>
            </div>
          </div>

          <div className="pres-featured">
            {featured.map((item, i) => (
              <div
                key={item.id}
                className={`pres-card pres-card-featured pres-reveal ${inView ? "shown" : ""}`}
                style={{ transitionDelay: inView ? `${i * 0.1}s` : "0s" }}
              >
                <div className="pres-img-wrap">
                  <Image src={item.images} alt={item.title} fill sizes="(max-width:768px) 100vw, 600px" />
                  <div className="pres-img-overlay" />
                </div>
                <div className="pres-content">
                  <div className="pres-top">
                    <span className="pres-year-pill">{item.year}</span>
                    <div className="pres-icon-box">
                      {i === 0 ? <FiAward size={15}/> : <FiUsers size={15}/>}
                    </div>
                  </div>
                  <div className="pres-bottom">
                    <div className="pres-divider" />
                    <p className="pres-title-featured">{item.title}</p>
                    <span className="pres-org">{item.organizer}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pres-grid">
            {normal.map((item, i) => (
              <div
                key={item.id}
                className={`pres-card pres-card-normal pres-reveal ${inView ? "shown" : ""}`}
                style={{ transitionDelay: inView ? `${0.2 + i * 0.07}s` : "0s" }}
              >
                <div className="pres-img-wrap">
                  <Image src={item.images} alt={item.title} fill sizes="(max-width:640px) 100vw, 300px" />
                  <div className="pres-img-overlay" />
                </div>
                <div className="pres-content">
                  <div className="pres-top">
                    <span className="pres-year-pill">{item.year}</span>
                    <div className="pres-icon-box">
                      {i % 2 === 0 ? <FiAward size={13}/> : <FiUsers size={13}/>}
                    </div>
                  </div>
                  <div className="pres-bottom">
                    <div className="pres-divider" />
                    <p className="pres-title-normal">{item.title}</p>
                    <span className="pres-org">{item.organizer}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`pres-next pres-reveal ${inView ? "shown" : ""}`}
            style={{ transitionDelay: inView ? "0.6s" : "0s" }}>
            <div className="pres-next-dots">
              {[0,1,2].map(i => (
                <span key={i} className="pres-next-dot"
                  style={{ animationDelay:`${i * 0.2}s` }} />
              ))}
            </div>
            <span className="pres-next-text">Next milestone loading…</span>
            <span className="pres-next-num">{prestasiData.length}</span>
            <span style={{
              fontFamily:"var(--font-dm-mono)", fontSize:"0.55rem",
              letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--fg-3)",
            }}>
              Achievements so far
            </span>
          </div>

        </div>
      </section>
    </>
  );
}