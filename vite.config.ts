import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import viteTsconfigPaths from "vite-tsconfig-paths";
import { defineConfig, loadEnv } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { sentryVitePlugin } from "@sentry/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    target: "esnext"
  },
  build: {
    sourcemap: true, // Source map generation must be turned on
    minify: "esbuild",
    outDir: "build",
  },
  plugins: [
    react(),
    viteTsconfigPaths(),
    svgr(),
    nodePolyfills({
      protocolImports: true,
    }),
    sentryVitePlugin({
      include: ".",
      ignore: ["node_modules", "vite.config.ts"],
      org: "sosol",
      project: "react-client",
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
  server: {
    port: 3000,
    cors: {
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    },
  },
});
