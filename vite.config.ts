import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { sentryVitePlugin } from "@sentry/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  process.env = loadEnv(mode, process.cwd(), "");

  return {
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
    define: {
      "process.env": process.env,
    },
    server: {
      port: 3000,
      cors: {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      },
    },
  };
});
