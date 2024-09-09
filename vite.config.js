import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.js",
      name: "CopyButton",
      fileName: (format) => {
        if (format === "umd") return "index.js";
        return `hljs-copy-button.${format}.js`;
      },
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
    cssCodeSplit: false,
  },
});
