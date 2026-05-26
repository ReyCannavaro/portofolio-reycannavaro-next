import { NextResponse } from "next/server";

const USERNAME = process.env.GITHUB_USERNAME || "ReyCannavaro";
const TOKEN    = process.env.GITHUB_TOKEN;

const headers: Record<string, string> = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};
if (TOKEN) headers["Authorization"] = `Bearer ${TOKEN}`;

async function fetchUser() {
  const res = await fetch(`https://api.github.com/users/${USERNAME}`, { headers, next: { revalidate: 3600 } });
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

async function fetchContributions() {
  if (!TOKEN) return [];

  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
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
    body: JSON.stringify({ query, variables: { login: USERNAME } }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) return [];

  const json = await res.json();
  const weeks = json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];

  const LEVEL_MAP: Record<string, number> = {
    NONE:         0,
    FIRST_QUARTILE:  1,
    SECOND_QUARTILE: 2,
    THIRD_QUARTILE:  3,
    FOURTH_QUARTILE: 4,
  };

  return weeks.flatMap((w: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }) =>
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

export async function GET() {
  try {
    const [user, repos] = await Promise.all([fetchUser(), fetchAllRepos()]);
    const [languages, contributions] = await Promise.all([
      fetchLanguages(repos),
      fetchContributions(),
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
        totalRepos:  repos.length,
        totalStars,
        totalForks,
        followers:   user.followers,
      },
      languages,
      contributions,
      hasToken: !!TOKEN,
    });
  } catch (err) {
    console.error("[/api/github]", err);
    return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 });
  }
}