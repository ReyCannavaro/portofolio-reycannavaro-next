"use client";
import { personalInfo, socialLinks } from "../data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <section
        id="contact"
        style={{
          background: "var(--surface-card)",
          borderTop: "1px solid var(--hairline)",
          padding: "var(--space-section) 0",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "var(--space-xxl)",
              alignItems: "end",
            }}
            className="contact-grid"
          >
            <div>
              <span className="label-upper" style={{ color: "var(--m-blue-dark)" }}>
                06 — Let&apos;s Work Together
              </span>
              <div className="m-stripe" style={{ width: 48, marginTop: 12, marginBottom: 16 }} />
              <h2 className="display-lg">
                OPEN FOR<br />OPPORTUNITIES
              </h2>
              <p className="body-md" style={{ maxWidth: 400, marginTop: "var(--space-lg)" }}>
                Freelance, internship, atau kolaborasi project — saya selalu terbuka untuk kesempatan baru. Mari diskusi!
              </p>
            </div>

            <div>
              <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {[
                  { label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                  { label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
                  { label: "Location", value: `${personalInfo.location} · ${personalInfo.timezone}`, href: null },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      padding: "var(--space-lg) var(--space-xl)",
                      background: "var(--surface-soft)",
                      border: "1px solid var(--hairline)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "var(--space-md)",
                    }}
                  >
                    <span className="label-upper" style={{ color: "var(--muted)", fontSize: 10 }}>
                      {item.label}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        style={{ color: "var(--on-dark)", fontSize: 13, fontWeight: 300, textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--body)")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--on-dark)")}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span style={{ color: "var(--body)", fontSize: 13, fontWeight: 300 }}>{item.value}</span>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: "var(--space-xs)", marginTop: "var(--space-lg)" }}>
                {Object.values(socialLinks).slice(0, 5).map((s) => (
                  <a
                    key={s.display}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      padding: "10px 0",
                      textAlign: "center",
                      border: "1px solid var(--hairline)",
                      color: "var(--muted)",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      transition: "border-color 0.2s, color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--on-dark)";
                      (e.currentTarget as HTMLAnchorElement).style.color = "var(--on-dark)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--hairline)";
                      (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)";
                    }}
                  >
                    {s.display.slice(0, 2)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer
        style={{
          background: "var(--canvas)",
          borderTop: "1px solid var(--hairline)",
          padding: "var(--space-xl) 0",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "var(--space-md)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
            <div className="m-stripe" style={{ width: 24, display: "inline-block" }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--on-dark)", textTransform: "uppercase", letterSpacing: "1px" }}>
              Rey Cannavaro
            </span>
          </div>

          <span className="body-sm" style={{ fontSize: 11, color: "var(--muted)" }}>
            © {year} Rey Cannavaro. Built with Next.js & a cup of americano.
          </span>

          <span className="label-upper" style={{ fontSize: 10, color: "var(--muted)" }}>
            Sidoarjo, Indonesia
          </span>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}