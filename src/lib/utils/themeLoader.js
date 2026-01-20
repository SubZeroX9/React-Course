/**
 * Available PrimeReact themes
 */
export const AVAILABLE_THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
};
const THEME_PATHS = {
    light: '/themes/light-theme.css',
    dark: '/themes/dark-theme.css',
};
/**
 * Dynamically loads a PrimeReact theme by updating the theme link element
 * @param themeName - The name of the theme ('light' or 'dark')
 */
export function loadTheme(themeName) {
    const themeLink = document.getElementById('theme-link');
    if (themeLink) {
        themeLink.href = THEME_PATHS[themeName];
    }
    else {
        console.warn('Theme link element not found. Make sure to add #theme-link to index.html');
    }
}
