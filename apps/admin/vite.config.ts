import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      '@monty-genius/config': path.resolve(import.meta.dirname, '../../packages/config/src'),
      '@monty-genius/shared-types': path.resolve(import.meta.dirname, '../../packages/shared-types/src'),
    },
  },
});
