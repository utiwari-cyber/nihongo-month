import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// BASE is set by the GitHub Pages workflow (the site lives under /<repo>/). Locally it is '/'.
export default defineConfig(({ mode }) => ({
  base: process.env.BASE ?? '/',
  plugins: [
    react(),
    mode !== 'artifact' && VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        // Everything works offline. Web fonts load at runtime and fall back to system fonts.
        globPatterns: ['**/*.{js,css,html,svg,jpg,m4a}'],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
        runtimeCaching: [
          { urlPattern: /\.woff2$/, handler: 'CacheFirst', options: { cacheName: 'fonts', expiration: { maxEntries: 200 } } },
        ],
      },
      manifest: {
        name: 'Nihongo Month',
        short_name: 'Nihongo',
        description: 'A self-paced Japanese course for work and life in Japan.',
        theme_color: '#1f2a44',
        background_color: '#f4eee1',
        display: 'standalone',
        icons: [{ src: 'icon-192.png', sizes: '192x192', type: 'image/png' }, { src: 'icon-512.png', sizes: '512x512', type: 'image/png' }, { src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }],
      },
    }),
  ],
}))
