'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_THEME, isTheme, THEME_STORAGE_KEY, type Theme } from '@/lib/theme';

type ThemeContextValue = {
  theme: Theme;
  mounted: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyThemeToDocument(theme: Theme) {
  const root = document.documentElement;
  const body = document.body;

  root.dataset.theme = theme;
  root.classList.toggle('dark', theme === 'midnight');
  root.style.colorScheme = theme === 'midnight' ? 'dark' : 'light';

  if (body) {
    body.dataset.theme = theme;
    body.classList.toggle('dark', theme === 'midnight');
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    const domTheme = document.documentElement.dataset.theme;
    const resolved = isTheme(saved) ? saved : isTheme(domTheme) ? domTheme : DEFAULT_THEME;

    setThemeState(resolved);
    applyThemeToDocument(resolved);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    applyThemeToDocument(theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [mounted, theme]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY || !isTheme(event.newValue)) {
        return;
      }

      const incomingTheme = event.newValue;

      setThemeState((current) => (current === incomingTheme ? current : incomingTheme));
      applyThemeToDocument(incomingTheme);
    };

    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((current) => (current === 'midnight' ? 'ink' : 'midnight'));
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, mounted, setTheme, toggleTheme }),
    [mounted, setTheme, theme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}