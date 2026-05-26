"use client";
import { useEffect, useRef, useState } from "react";

const LANG_COLORS: Record<string, string> = {
  TypeScript:   "#3178c6",
  JavaScript:   "#f1e05a",
  PHP:          "#4f5d95",
  Python:       "#3572A5",
  Vue:          "#41b883",
  HTML:         "#e34c26",
  CSS:          "#563d7c",
  SCSS:         "#c6538c",
  Blade:        "#f7523f",
  Shell:        "#89e051",
  Rust:         "#dea584",
  Go:           "#00ADD8",
  Java:         "#b07219",
  Kotlin:       "#A97BFF",
  Swift:        "#F05138",
  Dart:         "#00B4AB",
  "C++":        "#f34b7d",
  C:            "#555555",
  Ruby:         "#701516",
  MDX:          "#fcb32c",
};

type LangData = { name: string; percentage: number; bytes: number };
type ContribDay = { date: string; count: number; level: number };

type GitHubData = {
  user: {
    login: string;
    name: string;
    public_repos: number;
    followers: number;
  };
  stats: {
    totalRepos: number;
    totalStars: number;
    totalForks: number;
    followers: number;
  };
  languages: LangData[];
  contributions: ContribDay[];
  hasToken: boolean;
};

const LEVEL_STYLE = [
  { bg: "#1a1a1a", border: "rgba(60,60,60,0.4)" },
  { bg: "#0a3d6b", border: "rgba(28,105,212,0.4)" },
  { bg: "#0d5aa7", border: "rgba(28,105,212,0.6)" },
  { bg: "#1c69d4", border: "rgba(28,105,212,0.8)" },
  { bg: "#4d9cf5", border: "rgba(77,156,245,1)" },
];

function ContributionGraph({ days }: { days: ContribDay[] }) {
  const today = new Date();
  const grid: (ContribDay | null)[][] = [];
  if (!days || days.length === 0) {
    for (let w = 0; w < 53; w++) {
      const week: (ContribDay | null)[] = [];
      for (let d = 0; d < 7; d++) {
        week.push(null);
      }
      grid.push(week);
    }
    return (
      <div style={{ position: "relative" }}>
        <div
          style={{
            display: "flex",
            gap: 3,
            overflowX: "auto",
            paddingBottom: 8,
          }}
        >
          {grid.map((week, wi) => (
            <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {week.map((_, di) => (
                <div
                  key={di}
                  style={{
                    width: 11,
                    height: 11,
                    background: "#1a1a1a",
                    border: "1px solid rgba(60,60,60,0.4)",
                    borderRadius: 2,
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
        <div style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--muted)" }}>
            Add GITHUB_TOKEN to .env.local for live data
          </p>
        </div>
      </div>
    );
  }

  const dayMap: Record<string, ContribDay> = {};
  days.forEach((d) => { dayMap[d.date] = d; });

  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 363);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const weeks: { date: string; count: number; level: number }[][] = [];
  const cur = new Date(startDate);
  while (cur <= today) {
    const week: { date: string; count: number; level: number }[] = [];
    for (let d = 0; d < 7; d++) {
      const iso = cur.toISOString().split("T")[0];
      const data = dayMap[iso];
      week.push({ date: iso, count: data?.count || 0, level: data?.level || 0 });
      cur.setDate(cur.getDate() + 1);
    }
    weeks.push(week);
  }

  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const DAYS   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const monthLabels: { label: string; col: number }[] = [];
  weeks.forEach((week, wi) => {
    const firstDay = new Date(week[0].date);
    if (firstDay.getDate() <= 7) {
      monthLabels.push({ label: MONTHS[firstDay.getMonth()], col: wi });
    }
  });

  const totalThisYear = days.reduce((s, d) => s + d.count, 0);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <span className="label-upper" style={{ color: "var(--muted)", fontSize: 10 }}>
          {totalThisYear.toLocaleString()} contributions in the last year
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 10, color: "var(--muted)", fontWeight: 300 }}>Less</span>
          {[0,1,2,3,4].map(l => (
            <div key={l} style={{
              width: 11, height: 11, borderRadius: 2,
              background: LEVEL_STYLE[l].bg,
              border: `1px solid ${LEVEL_STYLE[l].border}`,
            }}/>
          ))}
          <span style={{ fontSize: 10, color: "var(--muted)", fontWeight: 300 }}>More</span>
        </div>
      </div>

      <div style={{ overflowX: "auto", paddingBottom: 4 }}>
        {/* Month labels */}
        <div style={{ display: "flex", gap: 3, marginBottom: 4, marginLeft: 28 }}>
          {weeks.map((_, wi) => {
            const ml = monthLabels.find(m => m.col === wi);
            return (
              <div key={wi} style={{ width: 11, flexShrink: 0 }}>
                {ml && <span style={{ fontSize: 9, color: "var(--muted)", whiteSpace: "nowrap" }}>{ml.label}</span>}
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 0 }}>
          {/* Day labels */}
          <div style={{ display: "flex", flexDirection: "column", gap: 3, marginRight: 4, paddingTop: 1 }}>
            {DAYS.map((d, i) => (
              <div key={d} style={{
                height: 11, fontSize: 9, color: i % 2 === 1 ? "var(--muted)" : "transparent",
                lineHeight: "11px", whiteSpace: "nowrap",
              }}>
                {d}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div style={{ display: "flex", gap: 3 }}>
            {weeks.map((week, wi) => (
              <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {week.map((day) => (
                  <div
                    key={day.date}
                    title={`${day.date}: ${day.count} contribution${day.count !== 1 ? "s" : ""}`}
                    style={{
                      width: 11,
                      height: 11,
                      borderRadius: 2,
                      background: LEVEL_STYLE[day.level]?.bg || LEVEL_STYLE[0].bg,
                      border: `1px solid ${LEVEL_STYLE[day.level]?.border || LEVEL_STYLE[0].border}`,
                      flexShrink: 0,
                      cursor: "default",
                      transition: "transform 0.1s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.4)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LanguageBar({ languages }: { languages: LangData[] }) {
  return (
    <div>
      {/* Segmented bar */}
      <div style={{
        display: "flex", height: 6, borderRadius: 0, overflow: "hidden",
        marginBottom: "var(--space-lg)", gap: 1,
      }}>
        {languages.map((l) => (
          <div
            key={l.name}
            style={{
              width: `${l.percentage}%`,
              background: LANG_COLORS[l.name] || "#888",
              transition: "width 1s ease",
              flexShrink: 0,
            }}
            title={`${l.name} ${l.percentage}%`}
          />
        ))}
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "var(--space-sm)",
      }}>
        {languages.map((l) => (
          <div key={l.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{
              width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
              background: LANG_COLORS[l.name] || "#888",
            }} />
            <span style={{ fontSize: 12, color: "var(--body)", fontWeight: 300, flex: 1, minWidth: 0 }}>
              {l.name}
            </span>
            <span style={{ fontSize: 11, color: "var(--muted)", fontWeight: 700 }}>
              {l.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GitHubStats() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  const STAT_ITEMS = data
    ? [
        { value: String(data.stats.totalRepos), label: "Repositories" },
        { value: String(data.stats.totalStars), label: "Stars Earned" },
        { value: String(data.stats.totalForks), label: "Total Forks" },
        { value: String(data.stats.followers), label: "Followers" },
      ]
    : [
        { value: "—", label: "Repositories" },
        { value: "—", label: "Stars Earned" },
        { value: "—", label: "Total Forks" },
        { value: "—", label: "Followers" },
      ];

  return (
    <section
      id="github"
      ref={ref}
      style={{ background: "var(--surface-soft)", padding: "var(--space-section) 0" }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: "var(--space-xxl)" }}>
          <span
            className="label-upper"
            style={{
              color: "var(--m-blue-dark)",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.5s",
            }}
          >
            06 — Open Source
          </span>
          <div className="m-stripe" style={{ width: 48, marginTop: 12, marginBottom: 16 }} />
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <h2
              className="display-lg"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease 0.1s",
              }}
            >
              GITHUB<br />STATS
            </h2>
            <a
              href="https://github.com/ReyCannavaro"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              style={{
                opacity: visible ? 1 : 0,
                transition: "opacity 0.6s ease 0.3s",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              @ReyCannavaro
            </a>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 1,
            background: "var(--hairline)",
            marginBottom: "var(--space-xxl)",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.2s",
          }}
          className="github-stat-grid"
        >
          {STAT_ITEMS.map((s) => (
            <div key={s.label} className="spec-cell">
              <div className="spec-value">
                {loading ? (
                  <span style={{ display: "inline-block", width: 48, height: 24, background: "var(--surface-elevated)", borderRadius: 2, animation: "shimmer 1.5s infinite" }} />
                ) : s.value}
              </div>
              <div className="spec-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: 1,
            background: "var(--hairline)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s ease 0.3s",
          }}
          className="github-main-grid"
        >
          <div style={{ background: "var(--surface-card)", padding: "var(--space-xl)" }}>
            <div style={{ marginBottom: "var(--space-lg)" }}>
              <span className="label-upper" style={{ color: "var(--muted)", fontSize: 10 }}>
                Contribution Activity
              </span>
              <div className="hairline" style={{ marginTop: 12 }} />
            </div>

            {loading ? (
              <div style={{ height: 120, background: "var(--surface-elevated)", animation: "shimmer 1.5s infinite" }} />
            ) : error ? (
              <div style={{ padding: "var(--space-xl)", textAlign: "center" }}>
                <p className="label-upper" style={{ color: "var(--muted)", fontSize: 10 }}>Failed to load contribution data</p>
              </div>
            ) : (
              <ContributionGraph days={data?.contributions || []} />
            )}

            {data && !loading && (
              <div
                style={{
                  display: "flex",
                  gap: "var(--space-xl)",
                  marginTop: "var(--space-xl)",
                  paddingTop: "var(--space-lg)",
                  borderTop: "1px solid var(--hairline)",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "var(--on-dark)" }}>
                    {data.stats.totalRepos}
                  </div>
                  <div className="label-upper" style={{ fontSize: 9, color: "var(--muted)", marginTop: 2 }}>
                    Public Repos
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "var(--on-dark)" }}>
                    {data.user.followers}
                  </div>
                  <div className="label-upper" style={{ fontSize: 9, color: "var(--muted)", marginTop: 2 }}>
                    Followers
                  </div>
                </div>
                {!data.hasToken && (
                  <div style={{
                    marginLeft: "auto", padding: "6px 12px",
                    border: "1px solid var(--hairline)",
                    display: "flex", alignItems: "center", gap: 8,
                  }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--muted)" }}>
                      Add token for live graph
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div style={{ background: "var(--carbon-gray)", padding: "var(--space-xl)" }}>
            <div style={{ marginBottom: "var(--space-lg)" }}>
              <span className="label-upper" style={{ color: "var(--muted)", fontSize: 10 }}>
                Most Used Languages
              </span>
              <div className="hairline" style={{ marginTop: 12 }} />
            </div>

            {loading ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} style={{ height: 20, background: "var(--surface-elevated)", borderRadius: 2, animation: "shimmer 1.5s infinite", animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            ) : error ? (
              <p className="label-upper" style={{ color: "var(--muted)", fontSize: 10 }}>Failed to load</p>
            ) : (
              <LanguageBar languages={data?.languages || []} />
            )}

            <div className="hairline" style={{ margin: "var(--space-xl) 0 var(--space-md)" }} />
            <p style={{ fontSize: 11, fontWeight: 300, color: "var(--muted)", lineHeight: 1.5 }}>
              Based on repository sizes across {data?.stats.totalRepos || "—"} public repositories.
            </p>
          </div>
        </div>

        <div
          style={{
            marginTop: 1,
            padding: "var(--space-xl)",
            background: "var(--surface-card)",
            border: "1px solid var(--hairline)",
            borderTop: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "var(--space-md)",
            flexWrap: "wrap",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.5s",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
            <div className="m-stripe" style={{ width: 32 }} />
            <span className="label-upper" style={{ color: "var(--muted)", fontSize: 10 }}>
              View full activity & pinned repositories on GitHub
            </span>
          </div>
          <a
            href="https://github.com/ReyCannavaro"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ fontSize: 11 }}
          >
            Open GitHub Profile →
          </a>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { opacity: 0.4; }
          50%  { opacity: 0.7; }
          100% { opacity: 0.4; }
        }
        @media (max-width: 768px) {
          .github-stat-grid  { grid-template-columns: repeat(2, 1fr) !important; }
          .github-main-grid  { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}