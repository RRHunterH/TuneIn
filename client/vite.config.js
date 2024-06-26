import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3000,
//     open: true 
//   },
//   build: {
//     outDir: 'build',
//   },
//   resolve: {
//     alias: {
//       '@components': '/src/components',
//       '@styles': '/src/styles'
//     }
//   }
// });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    build: {
    outDir: 'build',
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:3001',
        secure: false,
        changeOrigin: true
      }
    }
  }
})