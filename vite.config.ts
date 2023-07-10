import inject from "@rollup/plugin-inject";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import viteTsconfigPaths from "vite-tsconfig-paths";
import { defineConfig, loadEnv } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { sentryVitePlugin } from "@sentry/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  process.env = loadEnv(mode, process.cwd(), "");
  return {
    resolve: {
      alias: {
        // This forces Vite to always resolve the browser version of packages
        buffer: "buffer",
      },
    },
    esbuild: {
      target: "esnext",
    },
    build: {
      sourcemap: false,
      minify: "esbuild",
      rollupOptions: {
        cache: false,
        plugins: [
          inject({
            Buffer: ["buffer", "Buffer"],
          }),
        ],
      },
    },
    plugins: [
      react(),
      viteTsconfigPaths(),
      svgr(),
      nodePolyfills({
        // To exclude specific polyfills, add them to this list.
        exclude: [
          "fs", // Excludes the polyfill for `fs` and `node:fs`.
        ],
        // Whether to polyfill specific globals.
        globals: {
          Buffer: true, // can also be 'build', 'dev', or false
          global: true,
          process: true,
        },
        // Whether to polyfill `node:` protocol imports.
        protocolImports: true,
      }),
      sentryVitePlugin({
        org: "sosol",
        project: "react-client",
        authToken: process.env.SENTRY_AUTH_TOKEN,
      }),
    ],
    optimizeDeps: {
      include: ["borsh", "buffer"],
    },
    server: {
      port: 3000,
      cors: {
        origin: [process.env.VITE_PUBLIC_URL!],
        // methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        // credentials: true,
        // allowedHeaders: "Content-Type, Authorization, X-Requested-With, Accept",
      },
    },
  };
});
