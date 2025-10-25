import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://fantastic-lamp-v66gvgj666vrc6wgp-8080.app.github.dev',
        changeOrigin: true,
        secure: false
      }
    }
  }
});
