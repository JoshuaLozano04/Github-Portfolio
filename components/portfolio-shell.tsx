"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { HiOutlineHome, HiOutlineInformationCircle, HiOutlineMoon, HiOutlineSquares2X2, HiOutlineSun } from "react-icons/hi2";
import { ChevronUp, Menu, X } from 'lucide-react';
import type { LocaleCopy } from "@/data/portfolio";
import { useTheme } from '@/components/theme-provider';
import { navUnderline, pageFadeUp, shellHeaderReveal } from '@/lib/motion';

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
  const { theme, toggleTheme, mounted } = useTheme();
  const pathname = usePathname();
  const [scrollSections, setScrollSections] = useState<HTMLElement[]>([]);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    document.documentElement.lang = "en";
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-scroll-section="true"]'));
    setScrollSections(sections);

    const updateActiveSection = () => {
      setIsScrolled(window.scrollY > 8);
      const bottomThreshold = 280;
      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - bottomThreshold;
      setIsNearBottom(nearBottom);

      if (!sections.length) {
        setActiveSectionIndex(0);
        return;
      }

      const offset = 160;
      let currentIndex = 0;

      sections.forEach((section, index) => {
        if (section.getBoundingClientRect().top <= offset) {
          currentIndex = index;
        }
      });

      setActiveSectionIndex(currentIndex);
    };

    let frameId = 0;

    const handleScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [pathname]);

  const value = useMemo<PortfolioContextValue>(() => ({ theme, toggleTheme, copy }), [copy, theme, toggleTheme]);

  const showUpArrow = isNearBottom && activeSectionIndex > 0;

  const scrollToSection = (targetIndex: number) => {
    const target = scrollSections[targetIndex];
    if (!target) {
      return;
    }

    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <MotionConfig reducedMotion="user">
      <PortfolioContext.Provider value={value}>
        <div className="relative min-h-screen overflow-x-hidden">
          <AmbientBackdrop />
          <motion.div className="relative z-10" initial="hidden" animate="visible" variants={pageFadeUp}>
            <PortfolioHeader pathname={pathname} isScrolled={isScrolled} />
            <motion.div key={pathname} initial="hidden" animate="visible" variants={pageFadeUp}>
              {children}
            </motion.div>
          </motion.div>
          <AnimatePresence initial={false}>
            {showUpArrow && (
              <motion.aside
                key="scroll-navigation"
                className="fixed right-3 bottom-4 z-40 flex flex-col gap-2 sm:right-5 sm:bottom-5"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <ScrollArrowButton
                  label="Scroll to top of page"
                  icon={<ChevronUp aria-hidden="true" className="h-4 w-4" />}
                  onClick={() => {
                    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
                  }}
                />
              </motion.aside>
            )}
          </AnimatePresence>
        </div>
      </PortfolioContext.Provider>
    </MotionConfig>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within PortfolioShell');
  }
  return context;
}

function PortfolioHeader({ pathname, isScrolled }: { pathname: string; isScrolled: boolean }) {
  const { theme, toggleTheme, copy } = usePortfolio();
  const { mounted } = useTheme();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileNavOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileNavOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileNavOpen]);

  return (
    <header
      className={`sticky top-0 z-30 border-b backdrop-blur-xl ${isScrolled ? 'border-white/15 bg-black/88 shadow-[0_18px_50px_rgba(0,0,0,0.24)]' : 'border-white/10 bg-black/80'}`}
      style={{ transform: isScrolled ? 'translate3d(0, 8px, 0) scale(0.992)' : 'translate3d(0, 0, 0) scale(1)' }}
    >
      <div className={`mx-auto grid w-[min(1200px,calc(100%-32px))] grid-cols-[1fr_auto_1fr] items-center gap-4 py-5 transition-[padding] duration-300 ${isScrolled ? 'py-4' : 'py-5'}`}>
        <a href="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-black text-[0.65rem] font-bold tracking-widest text-white shadow-soft">MJL</div>
          <div>
            <div className="max-w-[170px] text-xs font-semibold leading-tight tracking-[0.015em] sm:max-w-none sm:text-sm">Melchizedek Joshua Lozano</div>
          </div>
        </a>

        <div className="hidden justify-center lg:flex">
          <nav className="flex flex-wrap items-center justify-center gap-2 text-sm text-neutral-400">
            <NavLink href="/" active={pathname === '/'} icon={<HiOutlineHome />} label={copy.nav.home} />
            <NavLink href="/projects" active={pathname.startsWith('/projects')} icon={<HiOutlineSquares2X2 />} label={copy.nav.projects} />
            <NavLink href="/about" active={pathname.startsWith('/about')} icon={<HiOutlineInformationCircle />} label={copy.nav.about} />
          </nav>
        </div>

        <div className="relative col-start-3 justify-self-end lg:hidden">
          <motion.button
            type="button"
            aria-label={isMobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileNavOpen}
            aria-controls="mobile-navigation-menu"
            onClick={() => setIsMobileNavOpen((current) => !current)}
            className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-neutral-900/80 text-white transition hover:border-white/20"
            whileHover={{ y: -1, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {isMobileNavOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </motion.button>

          <AnimatePresence initial={false}>
            {isMobileNavOpen && (
              <motion.div
                id="mobile-navigation-menu"
                className="absolute right-0 top-[calc(100%+0.75rem)] z-50 min-w-56 overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/95 p-2 shadow-[0_24px_60px_rgba(0,0,0,0.36)] backdrop-blur-xl"
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex flex-col gap-1">
                  <NavLink href="/" active={pathname === '/'} icon={<HiOutlineHome />} label={copy.nav.home} />
                  <NavLink href="/projects" active={pathname.startsWith('/projects')} icon={<HiOutlineSquares2X2 />} label={copy.nav.projects} />
                  <NavLink href="/about" active={pathname.startsWith('/about')} icon={<HiOutlineInformationCircle />} label={copy.nav.about} />
                  {/* Dark mode toggle — shown only inside mobile menu */}
                  <div className="mt-1 border-t border-white/10 pt-1">
                    <motion.button
                      type="button"
                      onClick={() => { toggleTheme(); setIsMobileNavOpen(false); }}
                      aria-label={theme === 'midnight' ? copy.theme.night : copy.theme.dark}
                      title="Toggle theme"
                      className="group relative inline-flex w-full items-center gap-2 rounded-full px-5 py-2.5 text-sm text-neutral-400 transition hover:text-white"
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.99 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span className="text-neutral-400 group-hover:text-white">
                        {!mounted ? <HiOutlineMoon /> : theme === 'midnight' ? <HiOutlineMoon /> : <HiOutlineSun />}
                      </span>
                      <span>{theme === 'midnight' ? 'Dark Mode' : 'Light Mode'}</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dark mode button — visible only on desktop (lg+); on mobile it lives inside the burger menu */}
        <div className="col-start-3 hidden items-center justify-self-end gap-3 lg:flex">
          <motion.button type="button" onClick={toggleTheme} aria-label={theme === 'midnight' ? copy.theme.night : copy.theme.dark} title="Toggle theme" className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-neutral-900/80 text-white transition hover:border-white/20" whileHover={{ y: -1, scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}>
            {!mounted ? <HiOutlineMoon /> : theme === 'midnight' ? <HiOutlineMoon /> : <HiOutlineSun />}
          </motion.button>
        </div>
      </div>
    </header>
  );
}

function AmbientBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -left-24 top-[-8rem] h-[30rem] w-[30rem] rounded-full bg-cyan-400/10 blur-3xl"
        animate={{ x: [0, 18, 0], y: [0, -10, 0], opacity: [0.16, 0.22, 0.16] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-12rem] right-[-8rem] h-[34rem] w-[34rem] rounded-full bg-sky-500/8 blur-3xl"
        animate={{ x: [0, -16, 0], y: [0, 14, 0], opacity: [0.12, 0.18, 0.12] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

function NavLink({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <motion.a href={href} className={`group relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 transition ${active ? 'text-white' : 'hover:text-white'}`} whileHover={{ y: -1 }} whileTap={{ scale: 0.99 }} transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}>
      <span className={active ? 'text-white' : 'text-neutral-400 group-hover:text-white'}>{icon}</span>
      <span>{label}</span>
      <motion.span className="absolute inset-x-4 bottom-1 h-px origin-left bg-white/70" variants={navUnderline} initial="rest" animate={active ? 'hover' : 'rest'} whileHover="hover" />
    </motion.a>
  );
}

function ScrollArrowButton({ label, icon, onClick }: { label: string; icon: React.ReactNode; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white shadow-[0_8px_24px_rgba(0,0,0,0.24)] backdrop-blur-md transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_12px_30px_rgba(0,0,0,0.3)] sm:h-11 sm:w-11"
      whileHover={{ y: -2, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }}
      whileTap={{ scale: 0.96 }}
    >
      {icon}
    </motion.button>
  );
}
// Language icon removed — translation feature deprecated