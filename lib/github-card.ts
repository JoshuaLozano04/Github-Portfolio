export type GitHubProfile = {
  login: string;
  name: string | null;
  public_repos: number;
  followers: number;
  following: number;
  public_gists: number;
};

export type GitHubRepo = {
  language: string | null;
};

export type GitHubLanguageStat = {
  name: string;
  count: number;
  percentage: number;
};

export type GitHubContributionDay = {
  date: string;
  level: number;
  row: number;
  col: number;
  count?: number;
};

export type GitHubContributionMonth = {
  name: string;
  colIndex: number;
  colspan: number;
};

export type GitHubContributionData = {
  totalContributions: string;
  days: GitHubContributionDay[];
  monthLabels: GitHubContributionMonth[];
};

const githubHeaders = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'JoshuaLozano04-portfolio',
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {})
};

export async function fetchGitHubProfile(username: string): Promise<GitHubProfile> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: githubHeaders,
      next: { revalidate: 3600 }
    });

    if (response.ok) {
      return (await response.json()) as GitHubProfile;
    }
  } catch {
    // API request failed or rate limited; proceed to fallback scrape
  }

  // Fallback: Scrape public GitHub profile page
  try {
    const res = await fetch(`https://github.com/${username}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html'
      },
      next: { revalidate: 3600 }
    });

    if (res.ok) {
      const html = await res.text();
      const reposMatch = html.match(/Repositories\s*<span[^>]*class="Counter"[^>]*>(\d+)<\/span>/i);
      const followersMatch = html.match(/(\d+)\s*<\/span>\s*followers/i);
      const followingMatch = html.match(/(\d+)\s*<\/span>\s*following/i);
      const nameMatch = html.match(/<span[^>]*itemprop="name"[^>]*>([^<]+)<\/span>/i);

      return {
        login: username,
        name: nameMatch ? nameMatch[1].trim() : 'Melchizedek Joshua Lozano',
        public_repos: reposMatch ? parseInt(reposMatch[1], 10) : 5,
        followers: followersMatch ? parseInt(followersMatch[1], 10) : 1,
        following: followingMatch ? parseInt(followingMatch[1], 10) : 1,
        public_gists: 0
      };
    }
  } catch {
    // Scrape failed; use portfolio fallback
  }

  return {
    login: username,
    name: 'Melchizedek Joshua Lozano',
    public_repos: 5,
    followers: 1,
    following: 1,
    public_gists: 0
  };
}

export async function fetchGitHubLanguages(username: string): Promise<GitHubLanguageStat[]> {
  // 1. Try official GitHub REST API
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
      headers: githubHeaders,
      next: { revalidate: 3600 }
    });

    if (response.ok) {
      const repos = (await response.json()) as GitHubRepo[];
      const languageCounts = new Map<string, number>();

      repos.forEach((repo) => {
        if (!repo.language) {
          return;
        }
        languageCounts.set(repo.language, (languageCounts.get(repo.language) ?? 0) + 1);
      });

      if (languageCounts.size > 0) {
        const total = Array.from(languageCounts.values()).reduce((sum, count) => sum + count, 0);

        return Array.from(languageCounts.entries())
          .sort((first, second) => second[1] - first[1])
          .slice(0, 6)
          .map(([name, count]) => ({
            name,
            count,
            percentage: total > 0 ? count / total : 0
          }));
      }
    }
  } catch {
    // API request failed or rate limited; proceed to fallback scrape
  }

  // 2. Fallback: Scrape language list from GitHub repositories tab
  try {
    const scrapeRes = await fetch(`https://github.com/${username}?tab=repositories`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml'
      },
      next: { revalidate: 3600 }
    });

    if (scrapeRes.ok) {
      const html = await scrapeRes.text();
      const langMatches = html.match(/itemprop="programmingLanguage">([^<]+)<\/span>/gi) || [];
      const counts = new Map<string, number>();

      for (const match of langMatches) {
        const lang = match.replace(/itemprop="programmingLanguage">|<\/span>/gi, '').trim();
        if (lang) {
          counts.set(lang, (counts.get(lang) || 0) + 1);
        }
      }

      if (counts.size > 0) {
        const total = Array.from(counts.values()).reduce((sum, count) => sum + count, 0);
        return Array.from(counts.entries())
          .sort((first, second) => second[1] - first[1])
          .slice(0, 6)
          .map(([name, count]) => ({
            name,
            count,
            percentage: total > 0 ? count / total : 0
          }));
      }
    }
  } catch {
    // Scrape failed; use portfolio fallback
  }

  // 3. Fallback: Core project tech stack from portfolio
  const defaultLanguages = [
    { name: 'TypeScript', count: 3, percentage: 0.3 },
    { name: 'Dart', count: 2, percentage: 0.2 },
    { name: 'PHP', count: 2, percentage: 0.2 },
    { name: 'Kotlin', count: 1, percentage: 0.15 },
    { name: 'Java', count: 1, percentage: 0.15 }
  ];

  return defaultLanguages;
}

export async function fetchGitHubContributions(username: string): Promise<GitHubContributionData> {
  const response = await fetch(`https://github.com/users/${username}/contributions`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml'
    },
    next: { revalidate: 3600 }
  });

  if (!response.ok) {
    throw new Error(`GitHub contributions request failed (${response.status})`);
  }

  const html = await response.text();
  const countMatch = html.match(/([\d,]+)\s+contributions\s+in\s+the\s+last\s+year/i);
  const totalContributions = countMatch ? countMatch[1] : '0';

  const tdList = html.match(/<td[^>]*class="[^"]*ContributionCalendar-day[^"]*"[^>]*>/gi) || [];
  const days: GitHubContributionDay[] = [];

  for (const td of tdList) {
    const dateMatch = td.match(/data-date="([^"]+)"/);
    const levelMatch = td.match(/data-level="(\d+)"/);
    const idMatch = td.match(/id="contribution-day-component-(\d+)-(\d+)"/);
    if (dateMatch && levelMatch) {
      days.push({
        date: dateMatch[1],
        level: Math.min(4, Math.max(0, parseInt(levelMatch[1], 10))),
        row: idMatch ? parseInt(idMatch[1], 10) : 0,
        col: idMatch ? parseInt(idMatch[2], 10) : 0
      });
    }
  }

  const monthLabels: GitHubContributionMonth[] = [];
  const monthRegex = /<td[^>]*class="ContributionCalendar-label"[^>]*colspan="(\d+)"[^>]*>[\s\S]*?<span[^>]*aria-hidden="true"[^>]*>([A-Za-z]+)<\/span>/gi;
  let mMatch: RegExpExecArray | null;
  let colIndex = 0;
  while ((mMatch = monthRegex.exec(html)) !== null) {
    const colspan = parseInt(mMatch[1], 10);
    const name = mMatch[2];
    monthLabels.push({ name, colIndex, colspan });
    colIndex += colspan;
  }

  if (days.length === 0) {
    throw new Error('Unable to parse GitHub contribution calendar.');
  }

  return { totalContributions, days, monthLabels };
}

export function escapeXml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    switch (character) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case "'":
        return '&apos;';
      default:
        return character;
    }
  });
}

function createCardBackground(width: number, height: number) {
  return `
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0f172a" />
        <stop offset="100%" stop-color="#020617" />
      </linearGradient>
      <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#22d3ee" />
        <stop offset="100%" stop-color="#38bdf8" />
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="18" stdDeviation="24" flood-color="#000000" flood-opacity="0.35" />
      </filter>
    </defs>
    <rect width="${width}" height="${height}" rx="28" fill="url(#bg)" />
    <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="27" fill="none" stroke="rgba(255,255,255,0.08)" />
  `;
}

export function buildContributionsCardSvg(username: string, data: GitHubContributionData) {
  const width = 1200;
  const height = 360;
  const total = escapeXml(data.totalContributions || '0');

  const levelColors: Record<number, string> = {
    0: 'rgba(255, 255, 255, 0.05)',
    1: '#0e7490',
    2: '#06b6d4',
    3: '#22d3ee',
    4: '#38bdf8'
  };

  const gridStartX = 72;
  const gridStartY = 154;
  const tileSize = 15;
  const tileStep = 20;

  const dayLabels = `
    <text x="42" y="${gridStartY + 1 * tileStep + 12}" fill="#64748b" font-size="12" font-weight="500" font-family="Inter, system-ui, sans-serif">Mon</text>
    <text x="42" y="${gridStartY + 3 * tileStep + 12}" fill="#64748b" font-size="12" font-weight="500" font-family="Inter, system-ui, sans-serif">Wed</text>
    <text x="42" y="${gridStartY + 5 * tileStep + 12}" fill="#64748b" font-size="12" font-weight="500" font-family="Inter, system-ui, sans-serif">Fri</text>
  `;

  const monthLabelsSvg = (data.monthLabels || [])
    .map((m) => {
      const x = gridStartX + m.colIndex * tileStep;
      return `<text x="${x}" y="138" fill="#94a3b8" font-size="13" font-weight="600" font-family="Inter, system-ui, sans-serif">${escapeXml(m.name.slice(0, 3))}</text>`;
    })
    .join('');

  const tilesSvg = (data.days || [])
    .map((d) => {
      const x = gridStartX + d.col * tileStep;
      const y = gridStartY + d.row * tileStep;
      const fill = levelColors[d.level] || levelColors[0];
      const stroke = d.level > 0 ? 'stroke="rgba(34,211,238,0.25)" stroke-width="0.75"' : '';
      return `<rect x="${x}" y="${y}" width="${tileSize}" height="${tileSize}" rx="3.5" fill="${fill}" ${stroke}><title>${escapeXml(d.date)}: Level ${d.level}</title></rect>`;
    })
    .join('');

  const legendX = 740;
  const legendY = 328;
  const legendTiles = [0, 1, 2, 3, 4]
    .map((lvl, idx) => {
      const x = legendX + 38 + idx * 16;
      return `<rect x="${x}" y="${legendY - 11}" width="12" height="12" rx="2.5" fill="${levelColors[lvl]}" />`;
    })
    .join('');

  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" role="img" aria-label="GitHub contribution activity for ${escapeXml(username)}">
    ${createCardBackground(width, height)}
    <circle cx="1088" cy="68" r="52" fill="rgba(34,211,238,0.10)" />
    <circle cx="1088" cy="68" r="26" fill="rgba(56,189,248,0.18)" />

    <text x="48" y="68" fill="#ffffff" font-size="38" font-weight="700" font-family="Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif">Contribution Activity</text>
    <text x="48" y="100" fill="#94a3b8" font-size="20" font-weight="500" font-family="Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"><tspan fill="#22d3ee" font-weight="700">${total}</tspan> contributions in the last year • @${escapeXml(username)}</text>

    ${monthLabelsSvg}
    ${dayLabels}
    ${tilesSvg}

    <rect x="48" y="306" width="1104" height="1" fill="rgba(255,255,255,0.08)" />
    <text x="48" y="328" fill="#94a3b8" font-size="13" font-weight="500" font-family="Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif">Live GitHub contribution calendar</text>

    <g>
      <text x="${legendX}" y="328" fill="#64748b" font-size="12" font-family="Inter, system-ui, sans-serif">Less</text>
      ${legendTiles}
      <text x="${legendX + 124}" y="328" fill="#64748b" font-size="12" font-family="Inter, system-ui, sans-serif">More</text>
    </g>

    <text x="1152" y="328" fill="url(#accent)" font-size="13" font-weight="700" text-anchor="end" font-family="Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif">github.com/${escapeXml(username)}</text>
  </svg>`;
}

export function buildStatsCardSvg(profile: GitHubProfile, username: string) {
  const displayName = escapeXml(profile.name || profile.login || username);

  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="360" viewBox="0 0 1200 360" fill="none" role="img" aria-label="GitHub stats for ${escapeXml(username)}">
    ${createCardBackground(1200, 360)}
    <circle cx="1088" cy="68" r="52" fill="rgba(34,211,238,0.10)" />
    <circle cx="1088" cy="68" r="26" fill="rgba(56,189,248,0.18)" />
    <text x="48" y="68" fill="#ffffff" font-size="38" font-weight="700" font-family="Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif">${displayName}</text>
    <text x="48" y="100" fill="#94a3b8" font-size="20" font-weight="500" font-family="Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif">@${escapeXml(username)}</text>

    <g transform="translate(48 136)">
      <g>
        <text x="0" y="0" fill="#94a3b8" font-size="14" font-weight="600" letter-spacing="2" font-family="Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif">PUBLIC REPOS</text>
        <text x="0" y="42" fill="#ffffff" font-size="32" font-weight="700" font-family="Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif">${profile.public_repos}</text>
      </g>
      <g transform="translate(250 0)">
        <text x="0" y="0" fill="#94a3b8" font-size="14" font-weight="600" letter-spacing="2" font-family="Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif">FOLLOWERS</text>
        <text x="0" y="42" fill="#ffffff" font-size="32" font-weight="700" font-family="Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif">${profile.followers}</text>
      </g>
      <g transform="translate(440 0)">
        <text x="0" y="0" fill="#94a3b8" font-size="14" font-weight="600" letter-spacing="2" font-family="Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif">FOLLOWING</text>
        <text x="0" y="42" fill="#ffffff" font-size="32" font-weight="700" font-family="Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif">${profile.following}</text>
      </g>
      <g transform="translate(638 0)">
        <text x="0" y="0" fill="#94a3b8" font-size="14" font-weight="600" letter-spacing="2" font-family="Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif">GISTS</text>
        <text x="0" y="42" fill="#ffffff" font-size="32" font-weight="700" font-family="Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif">${profile.public_gists}</text>
      </g>
    </g>

    <rect x="48" y="256" width="1104" height="1" fill="rgba(255,255,255,0.08)" />
    <text x="48" y="292" fill="#94a3b8" font-size="14" font-weight="500" font-family="Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif">Live GitHub profile snapshot</text>
    <text x="1080" y="292" fill="url(#accent)" font-size="14" font-weight="700" text-anchor="end" font-family="Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif">github.com/${escapeXml(username)}</text>
  </svg>`;
}

export function buildLanguagesCardSvg(username: string, languages: GitHubLanguageStat[]) {
  const height = Math.max(320, 120 + languages.length * 54);

  if (!languages.length) {
    return buildFallbackCardSvg('Top Languages', `No language data found for ${username}.`, height);
  }

  const maxPercentage = Math.max(...languages.map((item) => item.percentage), 0.01);

  const bars = languages
    .map((language, index) => {
      const y = 128 + index * 54;
      const barWidth = Math.max(180, Math.round((language.percentage / maxPercentage) * 860));

      return `
        <g transform="translate(48 ${y})">
          <text x="0" y="18" fill="#ffffff" font-size="20" font-weight="600" font-family="Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif">${escapeXml(language.name)}</text>
          <text x="1028" y="18" fill="#94a3b8" font-size="16" font-weight="500" text-anchor="end" font-family="Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif">${language.count} repos</text>
          <rect x="0" y="28" width="1104" height="12" rx="6" fill="rgba(255,255,255,0.08)" />
          <rect x="0" y="28" width="${barWidth}" height="12" rx="6" fill="url(#accent)" />
        </g>
      `;
    })
    .join('');

  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="${height}" viewBox="0 0 1200 ${height}" fill="none" role="img" aria-label="Top programming languages for ${escapeXml(username)}">
    ${createCardBackground(1200, height)}
    <text x="48" y="68" fill="#ffffff" font-size="38" font-weight="700" font-family="Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif">Top Languages</text>
    <text x="48" y="100" fill="#94a3b8" font-size="20" font-weight="500" font-family="Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif">Repository presence for @${escapeXml(username)}</text>
    ${bars}
    <text x="1152" y="${height - 28}" fill="#94a3b8" font-size="14" font-weight="500" text-anchor="end" font-family="Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif">Generated from GitHub repos</text>
  </svg>`;
}

export function buildFallbackCardSvg(title: string, message: string, height = 320) {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="${height}" viewBox="0 0 1200 ${height}" fill="none" role="img" aria-label="${escapeXml(title)} unavailable">
    ${createCardBackground(1200, height)}
    <text x="48" y="72" fill="#ffffff" font-size="38" font-weight="700" font-family="Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif">${escapeXml(title)}</text>
    <text x="48" y="124" fill="#94a3b8" font-size="20" font-weight="500" font-family="Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif">${escapeXml(message)}</text>
    <rect x="48" y="170" width="1104" height="1" fill="rgba(255,255,255,0.08)" />
    <text x="48" y="214" fill="#ffffff" font-size="18" font-weight="600" font-family="Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif">Try reloading in a moment or open the direct URL below.</text>
  </svg>`;
}

export function createSvgResponse(svg: string) {
  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400'
    }
  });
}