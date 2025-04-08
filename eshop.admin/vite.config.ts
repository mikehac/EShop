import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env": env,
    },
    plugins: [react()],
    build: {
      outDir: "dist", // Output directory for the build
      assetsDir: "assets", // Directory for static assets within the output folder
      rollupOptions: {
        input: "./index.html", // Entry point for the application
      },
    },
  };
});
