import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Your back-end server
        changeOrigin: true, // To ensure the host header is rewritten
        secure: false, // If you're using HTTP (not HTTPS), set this to false
      },
    },
  },
})
