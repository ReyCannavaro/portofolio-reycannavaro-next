import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projectCaseStudies, getProjectCaseStudy } from "../../data/project-studies";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

export function generateStaticParams() {
  return projectCaseStudies.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getProjectCaseStudy(slug);
  if (!study) {
    return { title: "Project Case Study Not Found" };
  }

  return {
    title: `${study.title} — System Architecture & Case Study | Rey Cannavaro`,
    description: study.tagline,
    openGraph: {
      title: `${study.title} — Engineering Case Study`,
      description: study.tagline,
      images: [{ url: `https://reycannavaro.dev${study.heroImage}`, alt: study.title }],
    },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getProjectCaseStudy(slug);

  if (!study) {
    notFound();
  }

  return (
    <div style={{ background: "var(--canvas)", minHeight: "100svh" }}>
      <Sidebar />
      <main className="main-content">
        {/* Top Navigation */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            padding: "var(--space-lg) var(--space-xl)",
            zIndex: 20,
          }}
        >
          <Link href="/#projects" className="text-link">
            ← BACK TO PORTFOLIO
          </Link>
        </div>

        {/* Hero Band */}
        <section
          className="stretch-under-sidebar"
          style={{
            position: "relative",
            minHeight: "65vh",
            display: "flex",
            alignItems: "flex-end",
            paddingBottom: "var(--space-xxl)",
            background: "var(--surface-soft)",
            overflow: "hidden",
          }}
        >
          {/* Background Grid Pattern */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, var(--canvas) 0%, rgba(8,8,8,0.7) 60%, transparent 100%)",
              zIndex: 1,
            }}
          />

          <div className="container" style={{ position: "relative", zIndex: 2, width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span className="label-upper" style={{ color: "var(--m-blue-text)", letterSpacing: "2px" }}>
                {study.category}
              </span>
              <span style={{ color: "var(--muted)" }}>&middot;</span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "1px",
                  padding: "2px 8px",
                  border: "1px solid var(--m-red)",
                  color: "var(--m-red)",
                  background: "rgba(224, 0, 0, 0.12)",
                  textTransform: "uppercase",
                }}
              >
                {study.award}
              </span>
            </div>

            <h1 className="display-xl" style={{ marginBottom: "var(--space-md)", maxWidth: 900 }}>
              {study.title}
            </h1>

            <p className="body-md" style={{ maxWidth: 760, color: "var(--body-strong)", marginBottom: "var(--space-lg)" }}>
              {study.tagline}
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
              {study.links.live && (
                <a
                  href={study.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  aria-label={`Visit live site of ${study.title}`}
                >
                  LIVE PORTAL →
                </a>
              )}
              {study.links.github && (
                <a
                  href={study.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  aria-label={`View GitHub repository of ${study.title}`}
                >
                  GITHUB REPOSITORY ↗
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Spec Table Grid */}
        <section style={{ padding: "0 0 var(--space-section) 0" }}>
          <div className="container">
            <div className="m-stripe" style={{ width: "100%", height: 4, marginBottom: "var(--space-xxl)" }} />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 1, background: "var(--hairline)" }}>
              <div className="spec-cell" style={{ background: "var(--surface-card)" }}>
                <div className="spec-value" style={{ fontSize: 16, fontWeight: 700 }}>{study.role}</div>
                <div className="spec-label">MY ROLE</div>
              </div>
              <div className="spec-cell" style={{ background: "var(--surface-card)" }}>
                <div className="spec-value" style={{ fontSize: 16, fontWeight: 700 }}>{study.duration}</div>
                <div className="spec-label">TIMELINE</div>
              </div>
              <div className="spec-cell" style={{ background: "var(--surface-card)" }}>
                <div className="spec-value" style={{ fontSize: 16, fontWeight: 700 }}>{study.category}</div>
                <div className="spec-label">DOMAIN FOCUS</div>
              </div>
              <div className="spec-cell" style={{ background: "var(--surface-card)" }}>
                <div className="spec-value" style={{ fontSize: 16, fontWeight: 700, color: "var(--m-red)" }}>{study.award}</div>
                <div className="spec-label">OFFICIAL RECOGNITION</div>
              </div>
            </div>
          </div>
        </section>

        {/* The Challenge & Overview */}
        <section style={{ padding: "0 0 var(--space-section) 0" }}>
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-xxl)", alignItems: "start" }} className="challenge-grid">
              <div>
                <span className="label-upper" style={{ color: "var(--m-blue-text)", letterSpacing: "2px", display: "block", marginBottom: 12 }}>
                  01 — CONTEXT &amp; OVERVIEW
                </span>
                <h2 className="display-md" style={{ marginBottom: 16 }}>
                  THE PROBLEM STATEMENT
                </h2>
                <p className="body-md" style={{ color: "var(--body-strong)", lineHeight: 1.6, textAlign: "justify" }}>
                  {study.overview}
                </p>
              </div>

              <div
                style={{
                  background: "var(--surface-card)",
                  border: "1px solid var(--hairline)",
                  padding: "var(--space-xl)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 4,
                    height: "100%",
                    background: "var(--m-red)",
                  }}
                />
                <span className="label-upper" style={{ color: "var(--m-red)", fontSize: 11, letterSpacing: "1.5px", display: "block", marginBottom: 12 }}>
                  ENGINEERING OBSTACLE
                </span>
                <p className="body-sm" style={{ color: "var(--body)", lineHeight: 1.7, textAlign: "justify" }}>
                  {study.challenge}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* System Architecture & Data Flow */}
        <section style={{ padding: "0 0 var(--space-section) 0" }}>
          <div className="container">
            <div style={{ marginBottom: "var(--space-xl)" }}>
              <span className="label-upper" style={{ color: "var(--m-blue-text)", letterSpacing: "2px", display: "block", marginBottom: 12 }}>
                02 — ARCHITECTURE BLUEPRINT
              </span>
              <h2 className="display-md" style={{ marginBottom: 16 }}>
                DATA FLOW &amp; PIPELINE
              </h2>
              <p className="body-md" style={{ maxWidth: 760, color: "var(--muted)" }}>
                {study.architecture.overview}
              </p>
            </div>

            {/* Pipeline Step Sequence */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${study.architecture.diagramSteps.length}, minmax(0, 1fr))`,
                gap: 1,
                background: "var(--hairline)",
                marginBottom: "var(--space-xxl)",
              }}
              className="pipeline-grid"
            >
              {study.architecture.diagramSteps.map((step) => (
                <div
                  key={step.step}
                  style={{
                    background: "var(--surface-card)",
                    padding: "var(--space-lg)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 24,
                        fontWeight: 800,
                        color: "var(--m-blue-text)",
                        display: "block",
                        marginBottom: 12,
                      }}
                    >
                      {step.step}
                    </span>
                    <h4 style={{ fontSize: 16, fontWeight: 700, color: "var(--on-dark)", marginBottom: 8, textTransform: "uppercase" }}>
                      {step.title}
                    </h4>
                    <p className="body-sm" style={{ fontSize: 13, color: "var(--body)", lineHeight: 1.5, marginBottom: 16 }}>
                      {step.desc}
                    </p>
                  </div>
                  <div
                    style={{
                      padding: "4px 8px",
                      background: "rgba(0, 102, 177, 0.12)",
                      border: "1px solid var(--m-blue-text)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "#38bdf8",
                      width: "fit-content",
                    }}
                  >
                    {step.tech}
                  </div>
                </div>
              ))}
            </div>

            {/* Full Stack Breakdown Table */}
            <div style={{ background: "var(--surface-card)", border: "1px solid var(--hairline)" }}>
              <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--hairline)" }}>
                <span className="label-upper" style={{ color: "var(--muted)", letterSpacing: "1.5px" }}>
                  TECHNICAL STACK SPECIFICATIONS
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {study.architecture.stack.map((item, idx) => (
                  <div
                    key={item.layer}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "180px 220px 1fr",
                      padding: "16px 24px",
                      borderBottom: idx === study.architecture.stack.length - 1 ? "none" : "1px solid var(--hairline)",
                      alignItems: "center",
                      gap: 16,
                    }}
                    className="stack-row"
                  >
                    <span className="label-upper" style={{ color: "var(--m-blue-text)", fontSize: 11 }}>
                      {item.layer}
                    </span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "#fff", fontWeight: 700 }}>
                      {item.tech}
                    </span>
                    <span className="body-sm" style={{ color: "var(--body)" }}>
                      {item.reason}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Key Architectural Decisions */}
        <section style={{ padding: "0 0 var(--space-section) 0" }}>
          <div className="container">
            <div style={{ marginBottom: "var(--space-xl)" }}>
              <span className="label-upper" style={{ color: "var(--m-blue-text)", letterSpacing: "2px", display: "block", marginBottom: 12 }}>
                03 — ENGINEERING TRADE-OFFS
              </span>
              <h2 className="display-md">
                ARCHITECTURAL DECISIONS
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {study.decisions.map((d, index) => (
                <div
                  key={d.decision}
                  style={{
                    background: "var(--surface-card)",
                    border: "1px solid var(--hairline)",
                    padding: "var(--space-xl)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap", marginBottom: 12 }}>
                    <div>
                      <span className="label-upper" style={{ color: "var(--muted)", fontSize: 10, display: "block", marginBottom: 4 }}>
                        DECISION MATRIX 0{index + 1}
                      </span>
                      <h4 style={{ fontSize: 18, fontWeight: 700, color: "var(--on-dark)" }}>
                        {d.decision}
                      </h4>
                    </div>
                    <span
                      style={{
                        padding: "4px 12px",
                        background: "var(--canvas)",
                        border: "1px solid var(--m-blue-text)",
                        color: "#fff",
                        fontFamily: "var(--font-mono)",
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      {d.choice}
                    </span>
                  </div>
                  <p className="body-sm" style={{ color: "var(--body-strong)", lineHeight: 1.6 }}>
                    {d.why}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quantitative Results & Impact */}
        <section style={{ padding: "0 0 var(--space-section) 0" }}>
          <div className="container">
            <div style={{ marginBottom: "var(--space-xl)" }}>
              <span className="label-upper" style={{ color: "var(--m-blue-text)", letterSpacing: "2px", display: "block", marginBottom: 12 }}>
                04 — METRICS &amp; IMPACT
              </span>
              <h2 className="display-md">
                MEASURABLE OUTCOMES
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 1, background: "var(--hairline)" }}>
              {study.results.map((res) => (
                <div key={res.label} style={{ background: "var(--surface-card)", padding: "var(--space-xl)" }}>
                  <div style={{ fontSize: 40, fontWeight: 800, color: "var(--on-dark)", lineHeight: 1, marginBottom: 8, fontFamily: "var(--font-mono)" }}>
                    {res.metric}
                  </div>
                  <div className="label-upper" style={{ color: "var(--m-blue-text)", fontSize: 11, marginBottom: 8 }}>
                    {res.label}
                  </div>
                  <p className="body-sm" style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.5 }}>
                    {res.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Visual Showcase Gallery */}
        <section style={{ padding: "0 0 var(--space-section) 0" }}>
          <div className="container">
            <div style={{ marginBottom: "var(--space-xl)" }}>
              <span className="label-upper" style={{ color: "var(--m-blue-text)", letterSpacing: "2px", display: "block", marginBottom: 12 }}>
                05 — INTERFACE SHOWCASE
              </span>
              <h2 className="display-md">
                PRODUCTION VISUALS
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xl)" }}>
              {study.gallery.map((imgSrc, i) => (
                <div
                  key={imgSrc}
                  style={{
                    position: "relative",
                    background: "var(--surface-card)",
                    border: "1px solid var(--hairline)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      padding: "12px 20px",
                      borderBottom: "1px solid var(--hairline)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--muted)",
                    }}
                  >
                    <span>FRAME 0{i + 1} &middot; PRODUCTION SNAPSHOT</span>
                    <span>1440 x 900 TELEMETRY VIEW</span>
                  </div>
                  <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9" }}>
                    <Image
                      src={imgSrc}
                      alt={`${study.title} Interface Snapshot ${i + 1}`}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 1200px) 100vw, 1200px"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div style={{ marginTop: "var(--space-xxl)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
              <Link href="/#projects" className="text-link">
                ← BACK TO ALL PROJECTS
              </Link>
              <div style={{ display: "flex", gap: 12 }}>
                {study.links.live && (
                  <a href={study.links.live} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    LAUNCH LIVE SITE →
                  </a>
                )}
                {study.links.github && (
                  <a href={study.links.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                    INSPECT SOURCE CODE ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>

      <style>{`
        @media (max-width: 900px) {
          .challenge-grid {
            grid-template-columns: 1fr !important;
          }
          .pipeline-grid {
            grid-template-columns: 1fr !important;
          }
          .stack-row {
            grid-template-columns: 1fr !important;
            gap: 6px !important;
          }
        }
      `}</style>
    </div>
  );
}
