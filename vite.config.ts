import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
// Sviluppato da Eduard Costin Udila @ studiojem.it - Web Development & Digital Solutions
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // Gzip compression
    viteCompression({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 1024,
      deleteOriginFile: false,
    }),
    // Brotli compression (better compression ratio)
    viteCompression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 1024,
      deleteOriginFile: false,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    modulePreload: {
      polyfill: true, // Ensures modulepreload works in older browsers
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Isolate recharts completely - only load when demo uses it
          if (id.includes('recharts')) {
            return 'charts';
          }
          // Core vendor bundle
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react';
          }
          // Router separate
          if (id.includes('react-router')) {
            return 'vendor-router';
          }
          // UI libraries
          if (id.includes('framer-motion') || id.includes('lucide-react')) {
            return 'ui';
          }
          // Radix UI components
          if (id.includes('@radix-ui')) {
            return 'ui-radix';
          }
        },
      },
    },
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Enable source maps for production debugging
    sourcemap: false,
    // Minification - aggressive settings
    minify: "esbuild",
    esbuild: {
      drop: ["console", "debugger"],
      legalComments: "none",
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true,
    },
    // Target modern browsers for smaller bundles
    target: "esnext",
  },
}));
