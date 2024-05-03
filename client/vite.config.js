import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    open: true 
  },
  build: {
    outDir: 'build',
  },
  resolve: {
    alias: {
      '@components': '/src/components',
      '@styles': '/src/styles'
    }
  }
});