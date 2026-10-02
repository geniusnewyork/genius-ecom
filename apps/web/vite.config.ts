import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      '@monty-genius/shared-types': path.resolve(import.meta.dirname, '../../packages/shared-types/src'),
      '@monty-genius/config': path.resolve(import.meta.dirname, '../../packages/config/src'),
      '@monty-genius/calculator-engine': path.resolve(import.meta.dirname, '../../packages/calculator-engine/src'),
      '@monty-genius/validation': path.resolve(import.meta.dirname, '../../packages/validation/src'),
      '@monty-genius/ui': path.resolve(import.meta.dirname, '../../packages/ui/src'),
    },
  },
})
