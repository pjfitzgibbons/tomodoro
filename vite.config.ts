import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  clearScreen: false,
  plugins: [vue()],
  resolve: {
    alias: {
      "components": fileURLToPath(new URL("./src/components", import.meta.url)),
      "buttons": fileURLToPath(new URL("./src/buttons", import.meta.url)),
      "stores": fileURLToPath(new URL("./src/stores", import.meta.url)),
      "utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
      "views": fileURLToPath(new URL("./src/views", import.meta.url)),
    },
  },
});
