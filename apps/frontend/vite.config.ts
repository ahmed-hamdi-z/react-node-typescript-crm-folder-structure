
import { defineConfig } from 'vite';
import react from "@vitejs/plugin-react";
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
        '@': path.resolve(__dirname, './src'),
    },
},
  build: {
    outDir: "dist",
    sourcemap: true, // Enable source maps for debugging
  },
  server: {
    port: 3000, // Development server port
  },
});