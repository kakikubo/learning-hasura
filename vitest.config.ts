import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['__tests__/**/*.test.{ts,tsx}'],
    exclude: ['node_modules', '.next'],
    css: false,
    environmentOptions: {
      jsdom: {
        customExportConditions: ['node', 'node-addons'],
      },
    },
  },
  resolve: {
    alias: {
      '@/components': path.resolve(import.meta.dirname, './components'),
    },
  },
});
