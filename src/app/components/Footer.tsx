"use client";
import { useEffect, useRef, useState } from "react";
import { FiInstagram, FiGithub, FiLinkedin, FiMail, FiArrowUpRight, FiArrowUp } from "react-icons/fi";

const SOCIALS = [
  { icon: <FiGithub size={17}/>,    href:"https://github.com/ReyCannavaro",           label:"GitHub"    },
  { icon: <FiLinkedin size={17}/>,  href:"https://www.linkedin.com/in/reycannavaro/", label:"LinkedIn"  },
  { icon: <FiInstagram size={17}/>, href:"https://www.instagram.com/reycannavaro/",   label:"Instagram" },
  { icon: <FiMail size={17}/>,      href:"mailto:reyjunoalcannavaro@gmail.com",        label:"Email"     },
];

export default function Footer() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const year = new Date().getFullYear();

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .footer-root {
          border-top: 1px solid var(--border);
          position: relative;
          overflow: hidden;
        }

        /* watermark */
        .footer-watermark {
          position: absolute;
          bottom: -1rem;
          left: 50%;
          transform: translateX(-50%);
          font-family: var(--font-syne);
          font-weight: 800;
          font-size: clamp(4rem, 14vw, 12rem);
          letter-spacing: -0.05em;
          line-height: 1;
          white-space: nowrap;
          color: rgba(99,102,241,0.03);
          pointer-events: none;
          user-select: none;
        }

        /* CTA block */
        .footer-cta {
          padding: 5rem 2.5rem 4rem;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          position: relative;
          z-index: 1;
        }
        @media (min-width: 1024px) {
          .footer-cta { grid-template-columns: 1fr 1fr; align-items: end; }
        }

        .footer-heading {
          font-family: var(--font-syne);
          font-weight: 800;
          font-size: clamp(2.5rem, 6vw, 5rem);
          letter-spacing: -0.04em;
          line-height: 0.9;
          color: var(--fg);
          margin: 0 0 2rem;
        }
        .footer-heading-accent {
          background: linear-gradient(135deg, var(--accent), var(--cyan));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .footer-email-link {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-syne);
          font-weight: 700;
          font-size: clamp(1rem, 2.5vw, 1.5rem);
          letter-spacing: -0.02em;
          color: var(--fg);
          text-decoration: none;
          transition: color 0.2s;
          group: true;
        }
        .footer-email-link:hover { color: var(--accent); }
        .footer-email-btn {
          width: 44px; height: 44px;
          border-radius: 50%;
          border: 1px solid var(--border-2);
          display: flex; align-items: center; justify-content: center;
          color: var(--fg-2); flex-shrink: 0;
          transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s;
        }
        .footer-email-link:hover .footer-email-btn {
          background: var(--accent);
          border-color: var(--accent);
          color: #fff;
          transform: rotate(45deg);
        }

        /* right col */
        .footer-right {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          justify-content: flex-end;
        }
        .footer-location {
          font-family: var(--font-syne);
          font-weight: 600;
          font-size: 1rem;
          color: var(--fg);
          margin: 0 0 0.3rem;
        }
        .footer-location-sub {
          font-family: var(--font-syne);
          font-size: 0.85rem;
          color: var(--fg-2);
          line-height: 1.6;
        }

        /* social icons */
        .footer-socials {
          display: flex;
          gap: 0.6rem;
          flex-wrap: wrap;
        }
        .footer-social-btn {
          width: 40px; height: 40px;
          border-radius: 10px;
          border: 1px solid var(--border);
          background: var(--bg-2);
          display: flex; align-items: center; justify-content: center;
          color: var(--fg-3);
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s;
        }
        .footer-social-btn:hover {
          background: var(--accent);
          border-color: var(--accent);
          color: #fff;
          transform: translateY(-3px);
        }

        /* back to top */
        .footer-top-btn {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: none;
          border: none;
          cursor: none;
          color: var(--fg-3);
          transition: color 0.2s;
          margin-left: auto;
          align-self: flex-end;
        }
        .footer-top-btn:hover { color: var(--fg); }
        .footer-top-btn:hover .footer-top-icon { transform: translateY(-3px); }
        .footer-top-label {
          font-family: var(--font-dm-mono);
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .footer-top-icon {
          width: 34px; height: 34px;
          border-radius: 50%;
          border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.2s, border-color 0.2s;
          flex-shrink: 0;
        }
        .footer-top-btn:hover .footer-top-icon { border-color: var(--border-2); }

        /* bottom bar */
        .footer-bar {
          border-top: 1px solid var(--border);
          padding: 1.25rem 2.5rem;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          align-items: center;
          position: relative; z-index: 1;
        }
        @media (min-width: 640px) {
          .footer-bar { flex-direction: row; justify-content: space-between; }
        }
        .footer-bar-text {
          font-family: var(--font-dm-mono);
          font-size: 0.58rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--fg-3);
        }
        .footer-status {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }
        .footer-status-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #4ade80;
          animation: fpulse 2.5s ease infinite;
        }
        @keyframes fpulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.35); }
          50%      { box-shadow: 0 0 0 4px rgba(74,222,128,0); }
        }

        /* reveal */
        .footer-reveal {
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .footer-reveal.shown { opacity: 1; transform: translateY(0); }
      `}</style>

      <footer ref={ref} className="footer-root" id="contact">
        <div className="footer-watermark">REY CANNAVARO</div>

        <div className="footer-cta">

          <div className={`footer-reveal ${inView ? "shown" : ""}`}>
            <p style={{
              fontFamily:"var(--font-dm-mono)", fontSize:"0.6rem",
              letterSpacing:"0.2em", textTransform:"uppercase",
              color:"var(--accent)", marginBottom:"0.75rem",
              display:"flex", alignItems:"center", gap:"0.5rem",
            }}>
              <span style={{ width:16, height:1, background:"var(--accent)", display:"block" }} />
              Get in touch
            </p>
            <h2 className="footer-heading">
              Have a<br />
              <span className="footer-heading-accent">Project?</span>
            </h2>
            <a href="mailto:reyjunoalcannavaro@gmail.com" className="footer-email-link">
              Let&apos;s talk together
              <span className="footer-email-btn">
                <FiArrowUpRight size={16}/>
              </span>
            </a>
          </div>

          <div className={`footer-right footer-reveal ${inView ? "shown" : ""}`}
            style={{ transitionDelay: inView ? "0.15s" : "0s" }}>

            <div>
              <p className="footer-location">Sidoarjo, East Java</p>
              <p className="footer-location-sub">
                Indonesia — GMT+7<br />
                Available for remote work worldwide.
              </p>
            </div>

            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"1rem" }}>
              <div className="footer-socials">
                {SOCIALS.map(({ icon, href, label }) => (
                  <a key={label} href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    className="footer-social-btn"
                  >
                    {icon}
                  </a>
                ))}
              </div>

              <button
                onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
                className="footer-top-btn"
              >
                <span className="footer-top-label">Top</span>
                <span className="footer-top-icon">
                  <FiArrowUp size={14}/>
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bar">
          <span className="footer-bar-text">© {year} Rey Cannavaro — All rights reserved</span>
          <div className="footer-status">
            <span className="footer-status-dot" />
            <span className="footer-bar-text">Based in Indonesia</span>
          </div>
        </div>
      </footer>
    </>
  );
}