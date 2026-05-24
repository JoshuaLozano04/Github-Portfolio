import type { Metadata } from 'next';
import './globals.css';
import { portfolioCopy } from '@/data/portfolio';
import { PortfolioShell } from '@/components/portfolio-shell';

export const metadata: Metadata = {
  title: 'Joshua S. Lozano | Portfolio',
  description: 'Professional portfolio for Joshua S. Lozano built with Next.js and Tailwind CSS.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PortfolioShell copy={portfolioCopy}>{children}</PortfolioShell>
      </body>
    </html>
  );
}