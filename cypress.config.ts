import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    execTimeout: 10000,
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
  },
});
