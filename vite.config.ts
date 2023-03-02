import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  process.env = loadEnv(mode, process.cwd(), "");

  return {
    build: {
      sourcemap: true, // Source map generation must be turned on
      minify: "esbuild",
    },
    plugins: [
      react(),
      viteCommonjs(),
      viteTsconfigPaths(),
      svgrPlugin(),
      nodePolyfills({
        protocolImports: true,
      }),
      // Put the Sentry vite plugin after all other plugins
      // sentryVitePlugin({
      //   org: "example-org",
      //   project: "example-project",

      //   // Specify the directory containing build artifacts
      //   include: "./dist",

      //   // Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
      //   // and needs the `project:releases` and `org:read` scopes
      //   authToken: process.env.SENTRY_AUTH_TOKEN,

      //   // Optionally uncomment the line below to override automatic release name detection
      //   // release: env.RELEASE,
      // }),
    ],
    define: {
      "process.env": process.env,
      global: {},
    },
    server: {
      port: 3000,
      cors: {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      }
    }
    // optimizeDeps: {
    //   esbuildOptions: {
    //     plugins: [esbuildCommonjs(["@civic/solana-gateway-react"])],
    //   },
    // },
  };
});
