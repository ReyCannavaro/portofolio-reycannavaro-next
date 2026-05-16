"use client";
import { useEffect, useRef, useState } from "react";
import { FiInstagram, FiGithub, FiLinkedin, FiMail, FiArrowUpRight, FiArrowUp } from "react-icons/fi";
import { personalInfo, socialLinks } from "@/app/data/index";

const SOCIALS = [
  { icon: <FiGithub size={17}/>,    href: socialLinks.github.url,        label: "GitHub"    },
  { icon: <FiLinkedin size={17}/>,  href: socialLinks.linkedin.url,       label: "LinkedIn"  },
  { icon: <FiInstagram size={17}/>, href: socialLinks.instagram.url,      label: "Instagram" },
  { icon: <FiMail size={17}/>,      href: `mailto:${personalInfo.email}`, label: "Email"     },
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
          border-top: 2px solid var(--border);
          position: relative;
          overflow: hidden;
          background: var(--bg);
        }

        .footer-watermark {
          position: absolute;
          bottom: -1rem;
          left: 50%;
          transform: translateX(-50%);
          font-family: var(--font-display);
          font-weight: 400;
          font-size: clamp(4rem, 14vw, 12rem);
          letter-spacing: -0.05em;
          line-height: 1;
          white-space: nowrap;
          color: transparent;
          -webkit-text-stroke: 1px rgba(26,35,126,0.05);
          pointer-events: none;
          user-select: none;
        }

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
          font-family: var(--font-display);
          font-weight: 400;
          font-size: clamp(2.5rem, 6vw, 5rem);
          letter-spacing: -0.04em;
          line-height: 0.9;
          color: var(--fg);
          margin: 0 0 2rem;
        }

        .footer-heading-accent {
          color: var(--navy);
          display: inline-block;
        }

        .footer-email-link {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-display);
          font-weight: 400;
          font-size: clamp(1rem, 2.5vw, 1.4rem);
          letter-spacing: -0.02em;
          color: var(--fg);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-email-link:hover { color: var(--navy); }

        .footer-email-btn {
          width: 44px; height: 44px;
          border: 2px solid #000;
          box-shadow: 3px 3px 0 var(--navy);
          display: flex; align-items: center; justify-content: center;
          color: var(--fg); flex-shrink: 0;
          transition: background 0.15s, color 0.15s, transform 0.15s, box-shadow 0.15s;
          background: var(--bg-3);
        }
        .footer-email-link:hover .footer-email-btn {
          background: var(--navy);
          color: #fff;
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0 var(--sky);
        }

        .footer-right {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          justify-content: flex-end;
        }

        .footer-socials {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .footer-social-btn {
          width: 40px; height: 40px;
          border: 2px solid #000;
          box-shadow: 3px 3px 0 #000;
          background: var(--bg-3);
          display: flex; align-items: center; justify-content: center;
          color: var(--fg-2);
          text-decoration: none;
          transition: background 0.15s, color 0.15s, transform 0.15s, box-shadow 0.15s;
        }
        .footer-social-btn:hover {
          background: var(--navy);
          color: #fff;
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0 var(--sky);
        }

        .footer-top-btn {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--fg-3);
          transition: color 0.2s;
          margin-left: auto;
          align-self: flex-end;
        }
        .footer-top-btn:hover { color: var(--fg); }
        .footer-top-label {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .footer-top-icon {
          width: 34px; height: 34px;
          border: 2px solid #000;
          box-shadow: 2px 2px 0 #000;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.15s, box-shadow 0.15s;
          flex-shrink: 0;
          background: var(--bg-3);
        }
        .footer-top-btn:hover .footer-top-icon {
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0 var(--navy);
        }

        .footer-bar {
          border-top: 2px solid var(--border-light);
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
          font-family: var(--font-mono);
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
          background: var(--green-mid);
          animation: fpulse 2.5s ease infinite;
        }
        @keyframes fpulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(76,175,80,0.35); }
          50%      { box-shadow: 0 0 0 4px rgba(76,175,80,0); }
        }

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
            <div className="section-tag" style={{ marginBottom: "0.75rem" }}>Get in touch</div>
            <h2 className="footer-heading">
              Have a<br />
              <span className="footer-heading-accent">Project?</span>
            </h2>
            <a href={`mailto:${personalInfo.email}`} className="footer-email-link">
              Let&apos;s talk together
              <span className="footer-email-btn">
                <FiArrowUpRight size={16} />
              </span>
            </a>
          </div>
          <div
            className={`footer-right footer-reveal ${inView ? "shown" : ""}`}
            style={{ transitionDelay: inView ? "0.15s" : "0s" }}>
            <div>
              <div style={{
                fontFamily: "var(--font-accent)",
                fontWeight: 700,
                fontSize: "1rem",
                color: "var(--fg)",
                marginBottom: "0.3rem",
              }}>
                Sidoarjo, East Java
              </div>
              <div style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                color: "var(--fg-2)",
                lineHeight: 1.6,
              }}>
                Indonesia — GMT+7<br />
                Available for remote work worldwide.
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
              <div className="footer-socials">
                {SOCIALS.map(({ icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
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
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="footer-top-btn"
              >
                <span className="footer-top-label">Top</span>
                <span className="footer-top-icon">
                  <FiArrowUp size={14} />
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