import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['skateable-unspurious-layne.ngrok-free.dev', 'localhost', '127.0.0.1']
  }
})
