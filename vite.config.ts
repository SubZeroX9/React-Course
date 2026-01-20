import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tsconfigPaths({
      projects: ['./tsconfig.base.json'],
    }),
  ],
  resolve: {
    alias: {
      '@lib': path.resolve(__dirname, './src/lib'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@context': path.resolve(__dirname, './src/context'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@react-app/types': path.resolve(__dirname, './libs/types/src/index.ts'),
      '@react-app/utils': path.resolve(__dirname, './libs/utils/src/index.ts'),
      '@react-app/api': path.resolve(__dirname, './libs/api/src/index.ts'),
      '@react-app/stores': path.resolve(__dirname, './libs/stores/src/index.ts'),
      '@react-app/hooks': path.resolve(__dirname, './libs/hooks/src/index.ts'),
      '@react-app/context': path.resolve(__dirname, './libs/context/src/index.ts'),
      '@react-app/i18n': path.resolve(__dirname, './libs/i18n/src/index.ts'),
      '@react-app/ui': path.resolve(__dirname, './libs/ui/src/index.ts'),
    },
  },
})
