import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { experienceHistory } from "../../data/index";
import { quantumLeapProjects } from "../../data/experience-ql";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";

// Optional: for static generation if needed
export function generateStaticParams() {
  return [
    { slug: "quantum-leap" }
  ];
}

export default async function ExperienceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const experience = experienceHistory.find((e) => (e as any).slug === slug);
  if (!experience) {
    notFound();
  }

  const projects = slug === "quantum-leap" ? quantumLeapProjects : [];

  return (
    <div style={{ background: "var(--canvas)", minHeight: "100svh" }}>
      <Loader />
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

        {/* Projects 3-Up Grid */}
        <section style={{ padding: "0 0 var(--space-section) 0" }}>
          <div className="container">
            <div style={{ marginBottom: "var(--space-xl)" }}>
              <h2 className="display-lg">THE PROJECTS</h2>
              <p className="body-md" style={{ marginTop: 16, color: "var(--muted)", maxWidth: 600 }}>
                A deep dive into the specific systems and modules engineered during this tenure.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "var(--space-lg)",
              }}
            >
              {projects.map((project) => (
                <article
                  key={project.id}
                  style={{
                    background: "var(--surface-card)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", background: "var(--surface-soft)" }}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ padding: "var(--space-lg)", flex: 1, display: "flex", flexDirection: "column" }}>
                    <span className="label-upper" style={{ color: "var(--m-blue-light)", marginBottom: 12 }}>
                      {project.role}
                    </span>
                    <h3
                      style={{
                        fontSize: 24,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        lineHeight: 1.2,
                        marginBottom: "var(--space-md)",
                        color: "var(--on-dark)",
                      }}
                    >
                      {project.title}
                    </h3>
                    <p className="body-sm" style={{ marginBottom: "var(--space-lg)", flex: 1 }}>
                      {project.description}
                    </p>
                    
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "auto" }}>
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          style={{
                            padding: "4px 10px",
                            border: "1px solid var(--hairline)",
                            color: "var(--body)",
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: "1px",
                            textTransform: "uppercase",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
