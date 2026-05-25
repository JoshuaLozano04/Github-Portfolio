export type Theme = 'midnight' | 'ink';

export const DEFAULT_THEME: Theme = 'midnight';
export const THEME_STORAGE_KEY = 'portfolio-theme';

export function isTheme(value: string | null | undefined): value is Theme {
  return value === 'midnight' || value === 'ink';
}

export const THEME_INIT_SCRIPT = `(() => {
  try {
    const storageKey = '${THEME_STORAGE_KEY}';
    const root = document.documentElement;
    const body = document.body;
    const saved = localStorage.getItem(storageKey);
    const fromDom = root.getAttribute('data-theme');
    const theme = saved === 'midnight' || saved === 'ink'
      ? saved
      : (fromDom === 'midnight' || fromDom === 'ink' ? fromDom : '${DEFAULT_THEME}');

    root.setAttribute('data-theme', theme);
    root.classList.toggle('dark', theme === 'midnight');
    root.style.colorScheme = theme === 'midnight' ? 'dark' : 'light';

    if (body) {
      body.setAttribute('data-theme', theme);
      body.classList.toggle('dark', theme === 'midnight');
    }
  } catch {
    // Ignore storage access failures.
  }
})();`;