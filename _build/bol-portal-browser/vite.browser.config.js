import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
const here = (p) => fileURLToPath(new URL(p, import.meta.url));
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: { alias: {
    'node:crypto': here('./browser/node-crypto.js'),
    'node:fs': here('./browser/node-fs.js'),
    'node:path': here('./browser/node-path.js'),
    'node:sqlite': here('./browser/node-sqlite.js'),
  } },
  build: { outDir: 'dist-browser', target: 'es2022', chunkSizeWarningLimit: 2000, rollupOptions: { input: here('./demo.html') } },
  optimizeDeps: { esbuildOptions: { target: 'es2022' } },
});
