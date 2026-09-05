import { NextRequest } from 'next/server';
import {
  buildContributionsCardSvg,
  buildFallbackCardSvg,
  buildStatsCardSvg,
  createSvgResponse,
  fetchGitHubContributions,
  fetchGitHubProfile
} from '@/lib/github-card';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get('username')?.trim() || 'JoshuaLozano04';

  try {
    const data = await fetchGitHubContributions(username);
    return createSvgResponse(buildContributionsCardSvg(username, data));
  } catch {
    try {
      const profile = await fetchGitHubProfile(username);
      return createSvgResponse(buildStatsCardSvg(profile, username));
    } catch (fallbackError) {
      const message = fallbackError instanceof Error ? fallbackError.message : 'Unable to load GitHub contributions.';
      return createSvgResponse(buildFallbackCardSvg('Contribution Graph', message, 360));
    }
  }
}
