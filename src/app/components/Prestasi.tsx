"use client";
import { useEffect, useRef, useState } from "react";
import { prestasiData } from "@/app/data/index";
import Image from "next/image";
import { FiAward, FiUsers } from "react-icons/fi";

export default function Prestasi() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const check = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < window.innerHeight * 1.1) setInView(true);
    };
    check();
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .pres-section { padding:7rem 2.5rem; border-top:1px solid var(--border); }
        .pres-inner { max-width:1200px; margin:0 auto; }

        .pres-heading {
          font-family:var(--font-syne); font-weight:800;
          font-size:clamp(2.2rem,5vw,4rem);
          letter-spacing:-0.04em; line-height:0.9; color:var(--fg); margin:0;
        }
        .pres-heading-ghost { -webkit-text-stroke:1px rgba(241,245,249,0.14); color:transparent; }

        /* featured 2-col */
        .pres-featured {
          display:grid; grid-template-columns:1fr;
          gap:1rem; margin-bottom:1rem;
        }
        @media(min-width:640px){ .pres-featured{ grid-template-columns:1fr 1fr; } }

        /* normal 4-col */
        .pres-grid {
          display:grid; grid-template-columns:1fr; gap:1rem;
        }
        @media(min-width:480px)  { .pres-grid{ grid-template-columns:1fr 1fr; } }
        @media(min-width:1024px) { .pres-grid{ grid-template-columns:repeat(4,1fr); } }

        /* card */
        .pres-card {
          position:relative; border-radius:16px; overflow:hidden;
          border:1px solid var(--border); background:var(--bg-2);
          cursor:default;
          transition:border-color 0.25s, transform 0.3s cubic-bezier(0.23,1,0.32,1);
        }
        .pres-card:hover { border-color:rgba(99,102,241,0.35); transform:translateY(-5px); }
        .pres-card-lg { min-height:320px; }
        .pres-card-sm { min-height:200px; }

        .pres-img { position:absolute; inset:0; }
        .pres-img img {
          object-fit:cover; object-position:center;
          filter:grayscale(0.55) brightness(0.4);
          transition:filter 0.5s, transform 0.5s;
        }
        .pres-card:hover .pres-img img { filter:grayscale(0) brightness(0.5); transform:scale(1.05); }
        .pres-overlay {
          position:absolute; inset:0;
          background:linear-gradient(to top, #07090f 15%, rgba(7,9,15,0.45) 60%, transparent 100%);
        }
        .pres-body {
          position:relative; z-index:2; height:100%;
          display:flex; flex-direction:column; justify-content:space-between;
          padding:1.1rem;
        }
        .pres-top { display:flex; align-items:flex-start; justify-content:space-between; gap:0.5rem; }
        .pres-pill {
          font-family:var(--font-dm-mono); font-size:0.52rem;
          letter-spacing:0.15em; text-transform:uppercase;
          padding:3px 9px; border-radius:999px;
          background:rgba(99,102,241,0.15); backdrop-filter:blur(8px);
          border:1px solid rgba(99,102,241,0.25); color:#a5b4fc;
        }
        .pres-icon {
          width:30px; height:30px; border-radius:8px;
          background:rgba(255,255,255,0.05);
          border:1px solid rgba(255,255,255,0.08);
          display:flex; align-items:center; justify-content:center;
          color:rgba(255,255,255,0.35); flex-shrink:0;
          transition:background 0.2s, color 0.2s;
        }
        .pres-card:hover .pres-icon { background:rgba(99,102,241,0.15); color:#a5b4fc; }
        .pres-bottom { display:flex; flex-direction:column; gap:0.35rem; }
        .pres-hr { height:1px; background:rgba(255,255,255,0.07); margin:0.5rem 0; }
        .pres-title-lg {
          font-family:var(--font-syne); font-weight:800;
          font-size:clamp(0.95rem,1.8vw,1.2rem);
          letter-spacing:-0.02em; line-height:1.25; color:#f1f5f9;
        }
        .pres-title-sm {
          font-family:var(--font-syne); font-weight:700;
          font-size:0.82rem; letter-spacing:-0.01em;
          line-height:1.3; color:#f1f5f9;
        }
        .pres-org {
          font-family:var(--font-dm-mono); font-size:0.52rem;
          letter-spacing:0.1em; text-transform:uppercase;
          color:rgba(148,163,184,0.6);
        }

        /* next milestone */
        .pres-next {
          margin-top:2.5rem; padding:1.1rem 1.4rem; border-radius:14px;
          background:var(--bg-2); border:1px solid var(--border);
          display:flex; align-items:center; gap:1rem; flex-wrap:wrap;
        }
        .pres-dot { width:7px; height:7px; border-radius:50%; background:var(--accent); }

        /* reveal */
        .pres-reveal { opacity:0; transform:translateY(20px); transition:opacity .55s ease,transform .55s ease; }
        .pres-reveal.shown { opacity:1; transform:translateY(0); }
      `}</style>

      <section ref={ref} id="achievements" className="pres-section">
        <div className="pres-inner">

          <div className={`pres-reveal ${inView?"shown":""}`} style={{
            paddingBottom:"2.5rem", marginBottom:"2.5rem",
            borderBottom:"1px solid var(--border)",
          }}>
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

          <div className="pres-featured">
            {prestasiData.slice(0,2).map((item,i) => (
              <div key={item.id}
                className={`pres-card pres-card-lg pres-reveal ${inView?"shown":""}`}
                style={{ transitionDelay:`${i*0.1}s` }}
              >
                <div className="pres-img">
                  <Image src={item.images} alt={item.title} fill sizes="(max-width:640px) 100vw, 50vw" />
                  <div className="pres-overlay" />
                </div>
                <div className="pres-body">
                  <div className="pres-top">
                    <span className="pres-pill">{item.year}</span>
                    <div className="pres-icon">{i===0?<FiAward size={14}/>:<FiUsers size={14}/>}</div>
                  </div>
                  <div className="pres-bottom">
                    <div className="pres-hr" />
                    <p className="pres-title-lg">{item.title}</p>
                    <span className="pres-org">{item.organizer}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pres-grid">
            {prestasiData.slice(2).map((item,i) => (
              <div key={item.id}
                className={`pres-card pres-card-sm pres-reveal ${inView?"shown":""}`}
                style={{ transitionDelay:`${0.2+i*0.06}s` }}
              >
                <div className="pres-img">
                  <Image src={item.images} alt={item.title} fill sizes="(max-width:480px) 100vw, 25vw" />
                  <div className="pres-overlay" />
                </div>
                <div className="pres-body">
                  <div className="pres-top">
                    <span className="pres-pill">{item.year}</span>
                    <div className="pres-icon">{i%2===0?<FiAward size={12}/>:<FiUsers size={12}/>}</div>
                  </div>
                  <div className="pres-bottom">
                    <div className="pres-hr" />
                    <p className="pres-title-sm">{item.title}</p>
                    <span className="pres-org">{item.organizer}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`pres-next pres-reveal ${inView?"shown":""}`} style={{ transitionDelay:"0.5s" }}>
            <div style={{ display:"flex", gap:5 }}>
              {[0,1,2].map(i=>(
                <span key={i} className="pres-dot" style={{
                  animation:"presb 1.2s ease infinite",
                  animationDelay:`${i*0.2}s`,
                  display:"block",
                }} />
              ))}
            </div>
            <span style={{ fontFamily:"var(--font-dm-mono)", fontSize:"0.58rem", letterSpacing:"0.18em", textTransform:"uppercase", color:"var(--fg-3)" }}>
              Next milestone loading…
            </span>
            <span style={{ marginLeft:"auto", fontFamily:"var(--font-syne)", fontWeight:800, fontSize:"1.4rem", letterSpacing:"-0.04em", color:"var(--accent)" }}>
              {prestasiData.length}
            </span>
            <span style={{ fontFamily:"var(--font-dm-mono)", fontSize:"0.55rem", letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--fg-3)" }}>
              Achievements
            </span>
          </div>
        </div>
        <style>{`@keyframes presb{0%,100%{transform:translateY(0);opacity:.4}50%{transform:translateY(-5px);opacity:1}}`}</style>
      </section>
    </>
  );
}