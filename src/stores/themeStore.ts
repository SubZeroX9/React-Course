import { create } from 'zustand';

interface ThemeStore {
  currentTheme: string;
  setTheme: (theme: string) => void;
}

const STORAGE_KEY = 'app-theme';
const DEFAULT_THEME = 'light';

// Get initial theme from localStorage or use default
const getInitialTheme = (): string => {
  if (globalThis.window === undefined) return DEFAULT_THEME;
  return localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  currentTheme: getInitialTheme(),
  setTheme: (theme: string) => {
    // Update localStorage
    localStorage.setItem(STORAGE_KEY, theme);

    // Theme switching is handled by loadTheme in App.tsx
    set({ currentTheme: theme });
  },
}));
