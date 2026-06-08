import { NextRequest } from 'next/server';
import { buildFallbackCardSvg, buildStatsCardSvg, createSvgResponse, fetchGitHubProfile } from '@/lib/github-card';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get('username')?.trim() || 'JoshuaLozano04';

  try {
    const profile = await fetchGitHubProfile(username);
    return createSvgResponse(buildStatsCardSvg(profile, username));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to load GitHub stats.';
    return createSvgResponse(buildFallbackCardSvg('GitHub Stats', message, 360));
  }
}