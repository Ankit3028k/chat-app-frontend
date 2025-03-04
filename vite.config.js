import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://chat-app-backend-stzg.onrender.com',
        changeOrigin: true,  // Ensures the origin of the request is updated
        secure: false,       // Useful for self-signed certificates
      },
    },
  },
  
});
