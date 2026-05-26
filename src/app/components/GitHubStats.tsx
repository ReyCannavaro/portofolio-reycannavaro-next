"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const LANG_COLORS: Record<string, string> = {
  TypeScript:      "#3178c6",
  JavaScript:      "#f1e05a",
  PHP:             "#4f5d95",
  Python:          "#3572A5",
  Vue:             "#41b883",
  HTML:            "#e34c26",
  CSS:             "#563d7c",
  SCSS:            "#c6538c",
  Blade:           "#f7523f",
  Shell:           "#89e051",
  Rust:            "#dea584",
  Go:              "#00ADD8",
  Java:            "#b07219",
  Kotlin:          "#A97BFF",
  Swift:           "#F05138",
  Dart:            "#00B4AB",
  "C++":           "#f34b7d",
  C:               "#555555",
  Ruby:            "#701516",
  MDX:             "#fcb32c",
  Others:          "#444444",
};

type LangData    = { name: string; percentage: number; bytes: number };
type ContribDay  = { date: string; count: number; level: number };

type GitHubData = {
  user:           { login: string; name: string; public_repos: number; followers: number };
  stats:          { totalRepos: number; totalStars: number; totalForks: number; followers: number };
  languages:      LangData[];
  contributions:  ContribDay[];
  selectedYear:   number;
  availableYears: number[];
  hasToken:       boolean;
};

const LEVEL_STYLE = [
  { bg: "#161b22", border: "rgba(255,255,255,0.05)" },
  { bg: "#0e4429", border: "rgba(57,211,83,0.2)"   },
  { bg: "#006d32", border: "rgba(57,211,83,0.4)"   },
  { bg: "#26a641", border: "rgba(57,211,83,0.6)"   },
  { bg: "#39d353", border: "rgba(57,211,83,0.9)"   },
];

function collapseLanguages(langs: LangData[]): LangData[] {
  if (langs.length <= 5) return langs;
  const top = langs.slice(0, 5);
  const othersBytes = langs.slice(5).reduce((s, l) => s + l.bytes, 0);
  const totalBytes  = langs.reduce((s, l) => s + l.bytes, 0);
  const othersPerc  = Math.round((othersBytes / totalBytes) * 100);
  const topSum = top.reduce((s, l) => s + l.percentage, 0);
  const diff   = 100 - topSum - othersPerc;
  if (top.length > 0) top[0] = { ...top[0], percentage: top[0].percentage + diff };
  return [...top, { name: "Others", percentage: othersPerc, bytes: othersBytes }];
}

function ContributionGraph({ days, year }: { days: ContribDay[]; year: number }) {
  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const DAYS   = ["","Mon","","Wed","","Fri",""];

  if (!days || days.length === 0) {
    return (
      <div style={{ position: "relative", minHeight: 100 }}>
        <div style={{ display: "flex", gap: 3 }}>
          {Array.from({ length: 53 }).map((_, wi) => (
            <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {Array.from({ length: 7 }).map((_, di) => (
                <div key={di} style={{ width: 10, height: 10, background: LEVEL_STYLE[0].bg, border: `1px solid ${LEVEL_STYLE[0].border}`, borderRadius: 2 }} />
              ))}
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--muted)" }}>
            Add GITHUB_TOKEN to .env.local for live data
          </p>
        </div>
      </div>
    );
  }

  const dayMap: Record<string, ContribDay> = {};
  days.forEach((d) => { dayMap[d.date] = d; });

  const startDate = new Date(`${year}-01-01`);
  startDate.setDate(startDate.getDate() - startDate.getDay());
  const endDate = new Date(`${year}-12-31`);
  const weeks: { date: string; count: number; level: number; inYear: boolean }[][] = [];
  const cur = new Date(startDate);

  while (cur <= endDate || cur.getDay() !== 0) {
    const week: { date: string; count: number; level: number; inYear: boolean }[] = [];
    for (let d = 0; d < 7; d++) {
      const iso = cur.toISOString().split("T")[0];
      const data = dayMap[iso];
      const inYear = cur.getFullYear() === year;
      week.push({ date: iso, count: data?.count || 0, level: inYear ? (data?.level || 0) : -1, inYear });
      cur.setDate(cur.getDate() + 1);
    }
    weeks.push(week);
    if (cur > endDate && cur.getDay() === 0) break;
  }

  const monthLabels: { label: string; col: number }[] = [];
  weeks.forEach((week, wi) => {
    const firstDay = new Date(week.find(d => d.inYear)?.date || week[0].date);
    if (firstDay.getDate() <= 7) monthLabels.push({ label: MONTHS[firstDay.getMonth()], col: wi });
  });

  const totalContribs = days.reduce((s, d) => s + d.count, 0);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
        <span style={{ fontSize: 11, color: "var(--muted)", fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase" }}>
          {totalContribs.toLocaleString()} contributions in {year}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontSize: 10, color: "var(--muted)", fontWeight: 300 }}>Less</span>
          {[0,1,2,3,4].map(l => (
            <div key={l} style={{ width: 10, height: 10, borderRadius: 2, background: LEVEL_STYLE[l].bg, border: `1px solid ${LEVEL_STYLE[l].border}` }} />
          ))}
          <span style={{ fontSize: 10, color: "var(--muted)", fontWeight: 300 }}>More</span>
        </div>
      </div>

      <div style={{ width: "100%", overflowX: "auto", overflowY: "hidden", paddingBottom: 6 }}>
        <div style={{ display: "inline-flex", flexDirection: "column", minWidth: 0 }}>
          <div style={{ display: "flex", gap: 3, marginBottom: 4, marginLeft: 24 }}>
            {weeks.map((week, wi) => {
              const ml = monthLabels.find(m => m.col === wi);
              return (
                <div key={wi} style={{ width: 10, flexShrink: 0 }}>
                  {ml && <span style={{ fontSize: 9, color: "var(--muted)", whiteSpace: "nowrap", display: "block" }}>{ml.label}</span>}
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 3, marginRight: 4 }}>
              {DAYS.map((d, i) => (
                <div key={i} style={{ height: 10, fontSize: 9, color: "var(--muted)", lineHeight: "10px", whiteSpace: "nowrap", width: 20, textAlign: "right" }}>{d}</div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 3 }}>
              {weeks.map((week, wi) => (
                <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {week.map((day) => {
                    const style = day.level === -1
                      ? { background: "transparent", border: "1px solid transparent" }
                      : { background: LEVEL_STYLE[day.level]?.bg, border: `1px solid ${LEVEL_STYLE[day.level]?.border}` };
                    return (
                      <div
                        key={day.date}
                        title={day.inYear ? `${day.date}: ${day.count} contribution${day.count !== 1 ? "s" : ""}` : ""}
                        style={{ width: 10, height: 10, borderRadius: 2, flexShrink: 0, transition: "transform 0.1s", ...style }}
                        onMouseEnter={e => { if (day.inYear) (e.currentTarget as HTMLDivElement).style.transform = "scale(1.5)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1)"; }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LanguageBar({ languages }: { languages: LangData[] }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const collapsed = collapseLanguages(languages);
  if (!collapsed.length) return null;

  return (
    <div>
      <div style={{ display: "flex", height: 8, borderRadius: 2, overflow: "hidden", marginBottom: "var(--space-xl)", gap: 1 }}>
        {collapsed.map((l) => (
          <div
            key={l.name}
            style={{
              width: `${l.percentage}%`,
              background: LANG_COLORS[l.name] || "#666",
              flexShrink: 0,
              transition: "opacity 0.2s",
              opacity: hovered === null || hovered === l.name ? 1 : 0.25,
              cursor: "default",
            }}
            title={`${l.name} ${l.percentage}%`}
            onMouseEnter={() => setHovered(l.name)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {collapsed.map((l, i) => {
          const color = LANG_COLORS[l.name] || "#666";
          const isHov = hovered === l.name;
          const isOthers = l.name === "Others";
          return (
            <div
              key={l.name}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "8px 10px",
                background: isHov ? "rgba(255,255,255,0.04)" : "transparent",
                border: `1px solid ${isHov ? "rgba(255,255,255,0.1)" : "transparent"}`,
                borderRadius: 2,
                transition: "all 0.15s",
                cursor: "default",
                opacity: isOthers ? 0.6 : 1,
              }}
              onMouseEnter={() => setHovered(l.name)}
              onMouseLeave={() => setHovered(null)}
            >
              <span style={{ fontSize: 10, color: "var(--muted)", fontWeight: 700, width: 14, textAlign: "right", flexShrink: 0 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div style={{
                width: 8, height: 8, borderRadius: isOthers ? 2 : "50%", flexShrink: 0,
                background: color,
                boxShadow: isHov ? `0 0 8px ${color}` : "none",
                transition: "box-shadow 0.2s",
              }} />
              <span style={{ fontSize: 12, color: isHov ? "var(--on-dark)" : "var(--body)", fontWeight: isHov ? 700 : 300, flex: 1, transition: "color 0.15s" }}>
                {l.name}
              </span>
              <div style={{ width: 48, height: 3, background: "rgba(255,255,255,0.07)", borderRadius: 2, overflow: "hidden", flexShrink: 0 }}>
                <div style={{ height: "100%", width: `${l.percentage}%`, background: color, borderRadius: 2, opacity: isHov ? 1 : 0.7, transition: "opacity 0.2s" }} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.5px", color: isHov ? color : "var(--muted)", width: 36, textAlign: "right", flexShrink: 0, transition: "color 0.15s" }}>
                {l.percentage}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function GitHubStats() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible]         = useState(false);
  const [data, setData]               = useState<GitHubData | null>(null);
  const [loading, setLoading]         = useState(true);
  const [yearLoading, setYearLoading] = useState(false);
  const [error, setError]             = useState(false);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const fetchData = useCallback(async (year: number, initial = false) => {
    if (initial) setLoading(true); else setYearLoading(true);
    try {
      const res = await fetch(`/api/github?year=${year}`);
      const d   = await res.json();
      setData(d);
      setSelectedYear(year);
    } catch {
      setError(true);
    } finally {
      if (initial) setLoading(false); else setYearLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(selectedYear, true); }, [fetchData, selectedYear]);

  const STAT_ITEMS = data
    ? [
        { value: String(data.stats.totalRepos), label: "Repositories" },
        { value: String(data.stats.totalStars), label: "Stars Earned"  },
        { value: String(data.stats.totalForks), label: "Total Forks"  },
        { value: String(data.stats.followers),  label: "Followers"     },
      ]
    : Array(4).fill({ value: "—", label: "" });

  const currentYear = new Date().getFullYear();

  return (
    <section id="github" ref={ref} style={{ background: "var(--surface-soft)", padding: "var(--space-section) 0" }}>
      <div className="container">
        <div style={{ marginBottom: "var(--space-xxl)" }}>
          <span className="label-upper" style={{ color: "var(--m-blue-dark)", opacity: visible ? 1 : 0, transition: "opacity 0.5s" }}>
            06 — Open Source
          </span>
          <div className="m-stripe" style={{ width: 48, marginTop: 12, marginBottom: 16 }} />
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <h2 className="display-lg" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease 0.1s" }}>
              GITHUB<br />STATS
            </h2>
            <a href="https://github.com/ReyCannavaro" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.3s" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              @ReyCannavaro
            </a>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "var(--hairline)", marginBottom: "var(--space-xxl)", opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.2s" }} className="github-stat-grid">
          {STAT_ITEMS.map((s, i) => (
            <div key={i} className="spec-cell">
              <div className="spec-value">
                {loading ? <span style={{ display: "inline-block", width: 48, height: 24, background: "var(--surface-elevated)", borderRadius: 2, animation: "shimmer 1.5s infinite" }} /> : s.value}
              </div>
              <div className="spec-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 1, background: "var(--hairline)", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease 0.3s" }} className="github-main-grid">
          <div style={{ background: "var(--surface-card)", padding: "var(--space-xl)", minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-lg)", flexWrap: "wrap", gap: 12 }}>
              <span className="label-upper" style={{ color: "var(--muted)", fontSize: 10 }}>Contribution Activity</span>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1px", color: "var(--muted)" }}>{currentYear}</span>
            </div>
            <div className="hairline" style={{ marginBottom: "var(--space-lg)" }} />
            <div style={{ position: "relative" }}>
              {loading ? (
                <div style={{ height: 120, background: "var(--surface-elevated)", animation: "shimmer 1.5s infinite", borderRadius: 2 }} />
              ) : error ? (
                <div style={{ padding: "var(--space-xl)", textAlign: "center" }}>
                  <p className="label-upper" style={{ color: "var(--muted)", fontSize: 10 }}>Failed to load contribution data</p>
                </div>
              ) : (
                <ContributionGraph days={data?.contributions || []} year={currentYear} />
              )}
            </div>
            {data && !loading && (
              <div style={{ display: "flex", gap: "var(--space-xl)", marginTop: "var(--space-xl)", paddingTop: "var(--space-lg)", borderTop: "1px solid var(--hairline)", flexWrap: "wrap", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "var(--on-dark)" }}>{data.stats.totalRepos}</div>
                  <div className="label-upper" style={{ fontSize: 9, color: "var(--muted)", marginTop: 2 }}>Public Repos</div>
                </div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "var(--on-dark)" }}>{data.user.followers}</div>
                  <div className="label-upper" style={{ fontSize: 9, color: "var(--muted)", marginTop: 2 }}>Followers</div>
                </div>
              </div>
            )}
          </div>

          <div style={{ background: "var(--carbon-gray)", padding: "var(--space-xl)", minWidth: 0 }}>
            <span className="label-upper" style={{ color: "var(--muted)", fontSize: 10 }}>Most Used Languages</span>
            <div className="hairline" style={{ marginTop: 12, marginBottom: "var(--space-lg)" }} />
            {loading ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} style={{ height: 36, background: "var(--surface-elevated)", borderRadius: 2, animation: "shimmer 1.5s infinite", animationDelay: `${i * 0.1}s` }} />
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

        <div style={{ marginTop: 1, padding: "var(--space-xl)", background: "var(--surface-card)", border: "1px solid var(--hairline)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-md)", flexWrap: "wrap", opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.5s" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
            <div className="m-stripe" style={{ width: 32 }} />
            <span className="label-upper" style={{ color: "var(--muted)", fontSize: 10 }}>View full activity &amp; pinned repositories on GitHub</span>
          </div>
          <a href="https://github.com/ReyCannavaro" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: 11 }}>
            Open GitHub Profile →
          </a>
        </div>
      </div>

      <style>{`
        @keyframes shimmer { 0%,100% { opacity: 0.4; } 50% { opacity: 0.7; } }
        @media (max-width: 768px) {
          .github-stat-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .github-main-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}