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

const githubHeaders = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'JoshuaLozano04-portfolio'
};

export async function fetchGitHubProfile(username: string): Promise<GitHubProfile> {
  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers: githubHeaders,
    next: { revalidate: 3600 }
  });

  if (!response.ok) {
    throw new Error(`GitHub profile request failed (${response.status})`);
  }

  return response.json() as Promise<GitHubProfile>;
}

export async function fetchGitHubLanguages(username: string): Promise<GitHubLanguageStat[]> {
  const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
    headers: githubHeaders,
    next: { revalidate: 3600 }
  });

  if (!response.ok) {
    throw new Error(`GitHub repositories request failed (${response.status})`);
  }

  const repos = (await response.json()) as GitHubRepo[];
  const languageCounts = new Map<string, number>();

  repos.forEach((repo) => {
    if (!repo.language) {
      return;
    }

    languageCounts.set(repo.language, (languageCounts.get(repo.language) ?? 0) + 1);
  });

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