import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import { VitePWA } from 'vite-plugin-pwa';
import manifest from './webmanifest.js';

export default defineConfig({
  server: {
    port: 80,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        secure: false,
        changeOrigin: true,
      },
      '/images': {
        target: 'http://127.0.0.1:3000/',
        secure: false,
        changeOrigin: true,
      },
    },
  },
  plugins: [
    VitePWA({
      manifest,
      includeAssets: [
        '**/*.{js,css,html,jpg,ico,png,ttf,woff2,svg,avif}',
        'assets/*.{js,css,html,jpg,ico,png,ttf,woff2,svg,avif}',
      ],
      workbox: {
        mode: 'development',
        globPatterns: [
          '**/*.{js,css,html,jpg,ico,xml,svg,png,ttf,woff2,woff}',
          'assets/*.{js,css,html,jpg,ico,png,ttf,woff2,svg,avif}',
        ],
      },
      includeManifestIcons: true,
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'custom-sw.js',
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
