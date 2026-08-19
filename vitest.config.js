import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      include: [
        "src/utils/trabajosUtils.js"
      ],
      reporter: [
        "text",
        "html",
        "json"
      ]
    }
  }
});