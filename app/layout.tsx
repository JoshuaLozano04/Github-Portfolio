import type { Metadata } from 'next';
import './globals.css';
import { portfolioCopy } from '@/data/portfolio';
import { PortfolioShell } from '@/components/portfolio-shell';
import { ThemeProvider } from '@/components/theme-provider';
import { THEME_INIT_SCRIPT } from '@/lib/theme';

export const metadata: Metadata = {
  title: 'Melchizedek Joshua Lozano | Portfolio',
  description: 'Professional portfolio for Melchizedek Joshua Lozano built with Next.js and Tailwind CSS.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <ThemeProvider>
          <PortfolioShell copy={portfolioCopy}>{children}</PortfolioShell>
        </ThemeProvider>
      </body>
    </html>
  );
}