// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // polyfill para dependências que usam `process` no browser
      process: "process/browser",
    },
  },
  define: {
    // evita erro "process is not defined" no browser durante o dev
    "process.env": {},
  },
});
