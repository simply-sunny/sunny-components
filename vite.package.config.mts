import { defineConfig } from 'vite';

export default defineConfig({
  publicDir: false,
  build: {
    outDir: 'package-dist',
    lib: {
      entry: 'src/library.ts',
      formats: ['es', 'cjs'],
      fileName: format => format === 'es' ? 'index.mjs' : 'index.cjs',
      cssFileName: 'styles',
    },
    rollupOptions: {
      external: id => /^(react|react-dom|lucide-react|@radix-ui\/react-dialog|@radix-ui\/react-tooltip)(\/|$)/.test(id),
      output: { banner: '"use client";' },
    },
  },
});
