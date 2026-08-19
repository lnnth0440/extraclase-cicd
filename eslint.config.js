export default [
  {
    ignores: [
      "node_modules/**",
      "coverage/**"
    ]
  },

  {
    files: [
      "src/app.js",
      "src/server.js",
      "src/services/**/*.js"
    ],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",

      globals: {
        console: "readonly",
        process: "readonly"
      }
    },

    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "eqeqeq": "error",
      "semi": ["error", "always"]
    }
  },

  {
    files: [
      "src/public/**/*.js"
    ],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",

      globals: {
        document: "readonly",
        window: "readonly",
        fetch: "readonly",
        console: "readonly",
        URLSearchParams: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        Intl: "readonly"
      }
    },

    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "eqeqeq": "error",
      "semi": ["error", "always"]
    }
  }
];