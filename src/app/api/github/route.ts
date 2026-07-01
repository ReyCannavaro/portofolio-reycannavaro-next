import { NextResponse } from "next/server";

const USERNAME = process.env.GITHUB_USERNAME || "ReyCannavaro";
const TOKEN    = process.env.GITHUB_TOKEN;

const headers: Record<string, string> = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};
if (TOKEN) headers["Authorization"] = `Bearer ${TOKEN}`;

function buildFallbackData(year: number) {
  return {
    user: {
      login: USERNAME,
      name: "Rey Cannavaro",
      public_repos: 0,
      followers: 0,
    },
    stats: {
      totalRepos: 0,
      totalStars: 0,
      totalForks: 0,
      followers: 0,
    },
    languages: [],
    contributions: [],
    selectedYear: year,
    availableYears: [year],
    hasToken: !!TOKEN,
  };
}

async function fetchUser() {
  const res = await fetch(`https://api.github.com/users/${USERNAME}`, {
    headers,
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`GitHub user fetch failed: ${res.status}`);
  return res.json();
}

async function fetchAllRepos() {
  const repos: Record<string, unknown>[] = [];
  let page = 1;
  while (true) {
    const res = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&page=${page}&type=owner`,
      { headers, next: { revalidate: 3600 } }
    );
    if (!res.ok) break;
    const batch: Record<string, unknown>[] = await res.json();
    if (!batch.length) break;
    repos.push(...batch);
    if (batch.length < 100) break;
    page++;
  }
  return repos;
}

async function fetchContributionsForYear(year: number) {
  if (!TOKEN) return [];

  const from = `${year}-01-01T00:00:00Z`;
  const to   = `${year}-12-31T23:59:59Z`;

  const query = `
    query($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { login: USERNAME, from, to } }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) return [];

  const json = await res.json();
  const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
  if (!cal) return [];

  const LEVEL_MAP: Record<string, number> = {
    NONE:            0,
    FIRST_QUARTILE:  1,
    SECOND_QUARTILE: 2,
    THIRD_QUARTILE:  3,
    FOURTH_QUARTILE: 4,
  };

  return cal.weeks.flatMap(
    (w: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }) =>
      w.contributionDays.map((d) => ({
        date:  d.date,
        count: d.contributionCount,
        level: LEVEL_MAP[d.contributionLevel] ?? 0,
      }))
  );
}

async function fetchLanguages(repos: Record<string, unknown>[]) {
  const langBytes: Record<string, number> = {};

  await Promise.all(
    repos.slice(0, 30).map(async (repo) => {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${USERNAME}/${repo.name}/languages`,
          { headers, next: { revalidate: 3600 } }
        );
        if (!res.ok) return;
        const data: Record<string, number> = await res.json();
        for (const [lang, bytes] of Object.entries(data)) {
          langBytes[lang] = (langBytes[lang] || 0) + bytes;
        }
      } catch {
      }
    })
  );

  const total = Object.values(langBytes).reduce((a, b) => a + b, 0);
  if (total === 0) return [];

  return Object.entries(langBytes)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: Math.round((bytes / total) * 100),
    }))
    .filter((l) => l.percentage > 0);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const yearParam = searchParams.get("year");
  const currentYear = new Date().getFullYear();
  const year = yearParam ? parseInt(yearParam) : currentYear;

  try {
    const [user, repos] = await Promise.all([fetchUser(), fetchAllRepos()]);

    const createdYear = new Date(user.created_at).getFullYear();
    const availableYears: number[] = [];
    for (let y = currentYear; y >= createdYear; y--) {
      availableYears.push(y);
    }

    const [languages, contributions] = await Promise.all([
      fetchLanguages(repos),
      fetchContributionsForYear(year),
    ]);

    const totalStars = repos.reduce((s: number, r) => s + ((r.stargazers_count as number) || 0), 0);
    const totalForks = repos.reduce((s: number, r) => s + ((r.forks_count as number) || 0), 0);

    return NextResponse.json({
      user: {
        login:        user.login,
        name:         user.name,
        public_repos: user.public_repos,
        followers:    user.followers,
      },
      stats: {
        totalRepos: repos.length,
        totalStars,
        totalForks,
        followers:  user.followers,
      },
      languages,
      contributions,
      selectedYear:   year,
      availableYears,
      hasToken: !!TOKEN,
    });
  } catch (err) {
    console.error("[/api/github]", err);
    return NextResponse.json({
      ...buildFallbackData(year),
      error: "Failed to fetch GitHub data",
    });
  }
}
