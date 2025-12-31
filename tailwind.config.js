/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'prime-surface-0': 'var(--surface-0)',
        'prime-surface-ground': 'var(--surface-ground)',
        'prime-surface-border': 'var(--surface-border)',
        'prime-surface-100': 'var(--surface-100)',
        'prime-text': 'var(--text-color)',
        'prime-text-secondary': 'var(--text-color-secondary)',
        'prime-primary': 'var(--primary-color)',
        'prime-primary-100': 'var(--primary-100)',
        'prime-primary-700': 'var(--primary-700)',
        'prime-green-100': 'var(--green-100)',
        'prime-green-600': 'var(--green-600)',
        'prime-green-700': 'var(--green-700)',
        'prime-red-500': 'var(--red-500)',
      },
      borderColor: {
        'prime-surface': 'var(--surface-border)',
      },
      backgroundColor: {
        'prime-hover': 'var(--surface-100)',
      },
    },
  },
  plugins: [
    require('tailwindcss-rtl'),
  ],
};
