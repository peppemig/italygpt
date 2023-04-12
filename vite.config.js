import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: 'auto',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'ItalyGPT',
        short_name: 'ItalyGPT',
        display: 'standalone',
        description: 'ChatGPT for Italians!',
        icons: [
          {
            src: "/icons/italy512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      }
    })
  ],
  server: {
    host: true
  }
})
