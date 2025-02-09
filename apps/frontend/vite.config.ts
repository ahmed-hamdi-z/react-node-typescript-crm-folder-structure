
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: true, // Enable source maps for debugging
  },
  server: {
    port: 3000, // Development server port
  },
});