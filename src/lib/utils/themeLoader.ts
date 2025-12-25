/**
 * Dynamically loads a PrimeReact theme by updating the theme link element
 * @param themeName - The name of the theme (e.g., 'lara-light-blue', 'lara-dark-blue')
 */
export function loadTheme(themeName: string): void {
  const themeLink = document.getElementById('theme-link') as HTMLLinkElement;

  if (themeLink) {
    themeLink.href = `/node_modules/primereact/resources/themes/${themeName}/theme.css`;
  } else {
    console.warn('Theme link element not found. Make sure to add #theme-link to index.html');
  }
}

/**
 * Available PrimeReact themes
 */
export const AVAILABLE_THEMES = {
  LIGHT: 'lara-light-blue',
  DARK: 'lara-dark-blue',
} as const;

export type ThemeName = typeof AVAILABLE_THEMES[keyof typeof AVAILABLE_THEMES];
