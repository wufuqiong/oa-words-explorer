import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/oa-words-explorer/', // 重要：设置为你的仓库名
  build: {
    outDir: 'dist',
    sourcemap: false
  },
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});