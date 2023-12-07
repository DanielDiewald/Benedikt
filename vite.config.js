import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import { VitePWA } from 'vite-plugin-pwa';
import manifest from './webmanifest.js';

export default defineConfig({
  server: {
    port: 80,
  },
  plugins: [
    VitePWA({
      manifest,
      includeAssets: [
        '**/*.{js,css,html,jpg,ico,xml,svg,png,ttf,woff2,woff}',
        'assets/*.{js,css,html,jpg,ico,xml,svg,png,ttf,woff2,woff}',
        'assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.fd84f88b.woff',
        'assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.83be7b2f.woff2',
      ],
      includeManifestIcons: true,
    }),
    vue({
      template: { transformAssetUrls },
    }),

    quasar({
      sassVariables: 'src/quasar-variables.sass',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
