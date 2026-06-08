import { NextRequest } from 'next/server';
import { buildFallbackCardSvg, buildLanguagesCardSvg, createSvgResponse, fetchGitHubLanguages } from '@/lib/github-card';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get('username')?.trim() || 'JoshuaLozano04';

  try {
    const languages = await fetchGitHubLanguages(username);
    return createSvgResponse(buildLanguagesCardSvg(username, languages));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to load top languages.';
    return createSvgResponse(buildFallbackCardSvg('Top Languages', message, 360));
  }
}