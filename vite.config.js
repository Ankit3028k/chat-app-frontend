import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
      proxy: {
          '/api': {
              target: 'https://chat-app-backend-stzg.onrender.com',
              changeOrigin: true,
              secure: false,
          },
      },
  },
});
