import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // relative base: this same build is served both from a GitHub Pages
  // project subpath (karthik8599.github.io/Portfolio-ai-ml/) and from
  // the custom domain root (sivamotamarri.is-a.dev/). Root-absolute
  // asset paths only work for one of those; relative paths work for both.
  base: "./",
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: "dist",
    target: "es2020",
    chunkSizeWarningLimit: 1400,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three"],
          r3f: ["@react-three/fiber", "@react-three/drei"],
          gsap: ["gsap", "@gsap/react"],
        },
      },
    },
  },
});
