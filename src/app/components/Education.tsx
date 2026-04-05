"use client";
import { useEffect, useRef, useState } from "react";
import { educationHistory } from "@/app/data/index";
import { FiCheckCircle } from "react-icons/fi";

export default function Education() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

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
        .edu-section {
          padding: 7rem 2.5rem;
          border-top: 1px solid var(--border);
          position: relative;
        }
        .edu-inner { max-width: 1200px; margin: 0 auto; }

        /* header */
        .edu-header {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-bottom: 4rem;
          padding-bottom: 2.5rem;
          border-bottom: 1px solid var(--border);
        }
        @media (min-width: 768px) {
          .edu-header { grid-template-columns: 1fr 1fr; align-items: end; }
        }
        .edu-heading {
          font-family: var(--font-syne);
          font-weight: 800;
          font-size: clamp(2.2rem, 5vw, 4rem);
          letter-spacing: -0.04em;
          line-height: 0.9;
          color: var(--fg);
          margin: 0;
        }
        .edu-heading-ghost {
          -webkit-text-stroke: 1px rgba(241,245,249,0.14);
          color: transparent;
        }

        /* cards */
        .edu-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        @media (min-width: 768px) { .edu-grid { grid-template-columns: 1fr 1fr; } }

        .edu-card {
          position: relative;
          padding: 2rem;
          border-radius: 18px;
          background: var(--bg-2);
          border: 1px solid var(--border);
          overflow: hidden;
          transition: border-color 0.25s, transform 0.25s;
        }
        .edu-card:hover {
          border-color: rgba(99,102,241,0.35);
          transform: translateY(-4px);
        }
        .edu-card-accent {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--accent), var(--cyan));
          opacity: 0;
          transition: opacity 0.25s;
        }
        .edu-card:hover .edu-card-accent { opacity: 1; }

        .edu-year {
          font-family: var(--font-dm-mono);
          font-size: 0.58rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .edu-year::before {
          content: '';
          display: block;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--accent);
          flex-shrink: 0;
        }

        .edu-institution {
          font-family: var(--font-syne);
          font-weight: 800;
          font-size: clamp(1.3rem, 2.5vw, 1.75rem);
          letter-spacing: -0.03em;
          line-height: 1.05;
          color: var(--fg);
          margin: 0 0 0.5rem;
        }
        .edu-degree {
          font-family: var(--font-dm-mono);
          font-size: 0.65rem;
          letter-spacing: 0.08em;
          color: var(--fg-3);
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }
        .edu-divider {
          height: 1px;
          background: var(--border);
          margin-bottom: 1.25rem;
        }
        .edu-details {
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }
        .edu-detail-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-syne);
          font-size: 0.82rem;
          color: var(--fg-2);
        }
        .edu-detail-icon {
          color: var(--accent);
          flex-shrink: 0;
          opacity: 0.7;
        }

        /* big number bg */
        .edu-card-number {
          position: absolute;
          bottom: -0.5rem;
          right: 1rem;
          font-family: var(--font-syne);
          font-weight: 800;
          font-size: 7rem;
          line-height: 1;
          color: rgba(99,102,241,0.04);
          letter-spacing: -0.05em;
          pointer-events: none;
          user-select: none;
          transition: color 0.25s;
        }
        .edu-card:hover .edu-card-number {
          color: rgba(99,102,241,0.07);
        }

        /* reveal */
        .edu-reveal {
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .edu-reveal.shown { opacity: 1; transform: translateY(0); }
      `}</style>

      <section ref={ref} id="education" className="edu-section">
        <div className="edu-inner">

          <div className={`edu-header edu-reveal ${inView ? "shown" : ""}`}>
            <div>
              <p style={{
                fontFamily:"var(--font-dm-mono)", fontSize:"0.6rem",
                letterSpacing:"0.2em", textTransform:"uppercase",
                color:"var(--accent)", marginBottom:"0.75rem",
                display:"flex", alignItems:"center", gap:"0.5rem",
              }}>
                <span style={{ width:16, height:1, background:"var(--accent)", display:"block" }} />
                Academic Path
              </p>
              <h2 className="edu-heading">
                Where I<br />
                <span className="edu-heading-ghost">Learned.</span>
              </h2>
            </div>
            <div style={{ display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
              <p style={{
                fontFamily:"var(--font-syne)", fontSize:"0.9rem",
                color:"var(--fg-2)", lineHeight:1.75, maxWidth:340,
              }}>
                Formal education combined with continuous self-learning — building a solid foundation for modern software development.
              </p>
            </div>
          </div>

          <div className="edu-grid">
            {educationHistory.map((edu, i) => (
              <div
                key={edu.id}
                className={`edu-card edu-reveal ${inView ? "shown" : ""}`}
                style={{ transitionDelay: inView ? `${0.1 + i * 0.12}s` : "0s" }}
              >
                <div className="edu-card-accent" />
                <div className="edu-card-number">0{i + 1}</div>

                <div className="edu-year">
                  Class of {edu.graduationYear}
                </div>

                <h3 className="edu-institution">{edu.institution}</h3>
                <p className="edu-degree">{edu.degree}</p>

                <div className="edu-divider" />

                <div className="edu-details">
                  {edu.details.map((d, j) => (
                    <div key={j} className="edu-detail-item">
                      <FiCheckCircle size={13} className="edu-detail-icon" />
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}