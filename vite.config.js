import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api-page': {
        target: 'https://cms-i47k.onrender.com',
        changeOrigin: true,
        secure: false,
      },
      '/about-us': {  
        target: 'https://cms-i47k.onrender.com',
        changeOrigin: true,
        secure: false,
      },
      '/terms-of-use': {  
        target: 'https://cms-i47k.onrender.com',
        changeOrigin: true,
        secure: false,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      },
    },
  },
});
