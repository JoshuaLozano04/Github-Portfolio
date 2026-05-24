"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { LocaleCopy } from "@/data/portfolio";

type PortfolioShellProps = {
  copy: LocaleCopy;
  children: React.ReactNode;
};

type PortfolioContextValue = {
  theme: "midnight" | "ink";
  toggleTheme: () => void;
  copy: LocaleCopy;
};

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioShell({ copy, children }: PortfolioShellProps) {
  const [theme, setTheme] = useState<"midnight" | "ink">("midnight");

  useEffect(() => {
    document.documentElement.lang = "en";
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const value = useMemo<PortfolioContextValue>(() => ({ theme, toggleTheme: () => setTheme((c) => (c === "midnight" ? "ink" : "midnight")), copy }), [copy, theme]);

  return (
    <PortfolioContext.Provider value={value}>
      <div className="relative z-10 min-h-screen">
        <PortfolioHeader />
        {children}
      </div>
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within PortfolioShell');
  }
  return context;
}

function PortfolioHeader() {
  const { theme, toggleTheme, copy } = usePortfolio();

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex w-[min(1200px,calc(100%-32px))] flex-wrap items-center justify-between gap-5 py-5">
        <a href="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-black text-white shadow-soft">JS</div>
          <div>
            <div className="text-sm font-semibold tracking-[0.02em]">Joshua S. Lozano</div>
            <div className="text-sm text-neutral-400">Full Stack Developer</div>
          </div>
        </a>

        <nav className="flex flex-wrap items-center justify-center gap-2 text-sm text-neutral-400">
          <NavLink href="/" icon={<HomeIcon />} label={copy.nav.home} />
          <NavLink href="/projects" icon={<GridIcon />} label={copy.nav.projects} />
          <NavLink href="/about" icon={<InfoIcon />} label={copy.nav.about} />
          <NavLink href="/contacts" icon={<MailIcon />} label={copy.nav.contacts} />
        </nav>

        <div className="flex items-center gap-3">
          <button type="button" onClick={toggleTheme} aria-label={theme === 'midnight' ? copy.theme.night : copy.theme.dark} title="Toggle theme" className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-neutral-900/80 text-white transition hover:border-white/20">
            {theme === 'midnight' ? <MoonIcon /> : <SunIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a href={href} className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 transition hover:bg-white/10 hover:text-white">
      <span className="text-white">{icon}</span>
      <span>{label}</span>
    </a>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M4 11.5 12 5l8 6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 10.5V19h11V10.5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M5 5h6v6H5V5Zm8 0h6v6h-6V5ZM5 13h6v6H5v-6Zm8 0h6v6h-6v-6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M12 17v-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 8.2h.01" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M4.5 7.5h15v9h-15v-9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="m5.5 8.5 6.5 5 6.5-5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M17.5 14.6A7.5 7.5 0 0 1 9.4 6.5a7.5 7.5 0 1 0 8.1 8.1Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 2.8v2.4M12 18.8v2.4M4.8 12H2.4M21.6 12h-2.4M6.2 6.2 4.5 4.5M19.5 19.5l-1.7-1.7M17.8 6.2l1.7-1.7M4.5 19.5l1.7-1.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
// Language icon removed — translation feature deprecated