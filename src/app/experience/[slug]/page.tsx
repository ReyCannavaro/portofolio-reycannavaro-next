import Link from "next/link";
import { notFound } from "next/navigation";
import { experienceHistory, type ExperienceSubRole } from "../../data/index";
import { quantumLeapProjects } from "../../data/experience-ql";
import CaseStudyProjects from "../../components/CaseStudyProjects";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

// Optional: for static generation if needed
export function generateStaticParams() {
  return [
    { slug: "quantum-leap" }
  ];
}

export default async function ExperienceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const experience = experienceHistory.find((e) => e.slug === slug);
  if (!experience) {
    notFound();
  }

  const projects = slug === "quantum-leap" ? quantumLeapProjects : [];

  return (
    <div style={{ background: "var(--canvas)", minHeight: "100svh" }}>
      <Sidebar />
      <main className="main-content">
        {/* Top Navigation / Back Link */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            padding: "var(--space-lg) var(--space-xl)",
            zIndex: 10,
          }}
        >
          <Link href="/#experience" className="text-link">
            ← BACK TO PORTFOLIO
          </Link>
        </div>

        {/* Hero Photo Band */}
        <section
          className="stretch-under-sidebar"
          style={{
            position: "relative",
            minHeight: "70vh",
            display: "flex",
            alignItems: "flex-end",
            paddingBottom: "var(--space-xxl)",
            background: "var(--surface-soft)",
            overflow: "hidden",
          }}
        >
          {/* Background Grid Pattern (Fallback abstract image) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(60,60,60,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(60,60,60,0.15) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, var(--canvas) 0%, transparent 80%)",
              zIndex: 1,
            }}
          />

          <div className="container" style={{ position: "relative", zIndex: 2, width: "100%" }}>
            <span
              className="label-upper"
              style={{ color: "var(--m-red)", letterSpacing: "2px", display: "block", marginBottom: 16 }}
            >
              ENGINEERING THE CORE
            </span>
            <h1 className="display-xl" style={{ marginBottom: "var(--space-md)" }}>
              {experience.company}
            </h1>
            <p className="body-md" style={{ maxWidth: 600, color: "var(--body-strong)" }}>
              {experience.summary}
            </p>
          </div>
        </section>

        {/* Spec Table Grid */}
        <section style={{ padding: "0 0 var(--space-section) 0" }}>
          <div className="container">
            <div className="m-stripe" style={{ width: "100%", height: 4, marginBottom: "var(--space-xxl)" }} />
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 1 }}>
              <div className="spec-cell">
                <div className="spec-value">{experience.role}</div>
                <div className="spec-label">ROLE</div>
              </div>
              <div className="spec-cell">
                <div className="spec-value">{experience.startYear} - {experience.endYear ?? "NOW"}</div>
                <div className="spec-label">DURATION</div>
              </div>
              <div className="spec-cell">
                <div className="spec-value">{projects.length}</div>
                <div className="spec-label">ENTERPRISE PROJECTS</div>
              </div>
              <div className="spec-cell">
                <div className="spec-value">{experience.industry}</div>
                <div className="spec-label">INDUSTRY</div>
              </div>
            </div>
          </div>
        </section>

        {/* Role Progression Section */}
        {Boolean(experience.roles && experience.roles.length > 0) && (
          <section style={{ padding: "0 0 var(--space-xl) 0" }}>
            <div className="container">
              <div style={{ marginBottom: "var(--space-lg)" }}>
                <span className="label-upper" style={{ color: "var(--m-blue-text)", letterSpacing: "2px" }}>
                  CAREER &amp; TENURE TIMELINE
                </span>
                <h2 className="display-md" style={{ marginTop: 8 }}>
                  ROLE PROGRESSION
                </h2>
                <p className="body-sm" style={{ color: "var(--muted)", maxWidth: 640, marginTop: 8 }}>
                  Rekam jejak akselerasi tanggung jawab dari program magang reguler hingga resmi dikontrak memimpin tim teknis HRIS klien enterprise.
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 28,
                  position: "relative",
                  paddingLeft: 28,
                  borderLeft: "2px solid var(--hairline)",
                  marginLeft: 8,
                }}
              >
                {experience.roles?.map((r: ExperienceSubRole) => {
                  const isCurrent = r.status === "current";
                  return (
                    <div key={r.id} style={{ position: "relative" }}>
                      <div
                        style={{
                          position: "absolute",
                          left: -35,
                          top: 4,
                          width: 12,
                          height: 12,
                          background: isCurrent ? "var(--m-red)" : "var(--canvas)",
                          border: isCurrent ? "2px solid #fff" : "2px solid var(--m-blue-text)",
                          boxShadow: isCurrent ? "0 0 10px rgba(224, 0, 0, 0.5)" : "none",
                        }}
                      />
                      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: "1px",
                            textTransform: "uppercase",
                            padding: "3px 8px",
                            background: isCurrent ? "rgba(224, 0, 0, 0.15)" : "rgba(0, 102, 177, 0.15)",
                            color: isCurrent ? "var(--m-red)" : "var(--m-blue-text)",
                            border: `1px solid ${isCurrent ? "var(--m-red)" : "var(--m-blue-text)"}`,
                          }}
                        >
                          {r.badge}
                        </span>
                        <span className="label-upper" style={{ color: "var(--muted)", fontSize: 10 }}>
                          {r.period} &middot; {r.type}
                        </span>
                      </div>
                      <h4 style={{ fontSize: 20, fontWeight: 700, textTransform: "uppercase", color: "var(--on-dark)", marginBottom: 6 }}>
                        {r.role}
                      </h4>
                      <p className="body-sm" style={{ color: "var(--body-strong)", maxWidth: 760, marginBottom: 12 }}>
                        {r.summary}
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
                        {r.responsibilities.map((resp: string, idx: number) => (
                          <div key={resp} style={{ display: "grid", gridTemplateColumns: "24px 1fr", gap: 8, alignItems: "start" }}>
                            <span style={{ color: isCurrent ? "var(--m-red)" : "var(--m-blue-text)", fontSize: 10, fontWeight: 700 }}>
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                            <p className="body-sm" style={{ fontSize: 13 }}>{resp}</p>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {r.technologies.map((t: string) => (
                          <span
                            key={t}
                            style={{
                              padding: "2px 8px",
                              fontSize: 10,
                              border: "1px solid var(--hairline)",
                              color: "var(--muted)",
                              background: "var(--canvas)",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Projects 3-Up Grid */}
        <section style={{ padding: "0 0 var(--space-section) 0" }}>
          <div className="container">
            <div style={{ marginBottom: "var(--space-xl)" }}>
              <h2 className="display-lg">THE PROJECTS</h2>
              <p className="body-md" style={{ marginTop: 16, color: "var(--muted)", maxWidth: 600 }}>
                A deep dive into the specific systems and modules engineered during this tenure.
              </p>
            </div>

            <CaseStudyProjects projects={projects} />
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
