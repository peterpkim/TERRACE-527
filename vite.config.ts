import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { existsSync, cpSync } from 'fs';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      preview: {
        port: 4173,
        host: '0.0.0.0',
        strictPort: false,
      },
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.NAVER_MAP_CLIENT_ID': JSON.stringify(env.VITE_NAVER_MAP_CLIENT_ID || env.NAVER_MAP_CLIENT_ID || '')
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        minify: 'esbuild',
        rollupOptions: {
          output: {
            manualChunks: {
              'react-vendor': ['react', 'react-dom'],
              'router-vendor': ['react-router-dom', 'react-router'],
            }
          }
        },
        copyPublicDir: false
      },
      publicDir: false,
      plugins: [
        react(),
        {
          name: 'copy-image-folder',
          closeBundle() {
            const srcDir = path.resolve(__dirname, 'IMAGE');
            const destDir = path.resolve(__dirname, 'dist', 'IMAGE');
            if (existsSync(srcDir)) {
              try {
                cpSync(srcDir, destDir, { recursive: true });
              } catch (e) {
                console.error('Failed to copy IMAGE folder:', e);
              }
            }
          }
        }
      ],
      base: process.env.GITHUB_PAGES === 'true' ? '/terrace-527-homepage-test3/' : './',
    };
});
