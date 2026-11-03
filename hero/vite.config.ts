import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// One script and one stylesheet, images inlined, written straight into the site.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../assets/hero',
    emptyOutDir: true,
    cssCodeSplit: false,
    assetsInlineLimit: 100_000_000,
    modulePreload: false,
    rollupOptions: {
      input: 'main.tsx',
      output: { entryFileNames: 'nudge-hero.js', assetFileNames: 'nudge-hero.[ext]', inlineDynamicImports: true },
    },
  },
})
