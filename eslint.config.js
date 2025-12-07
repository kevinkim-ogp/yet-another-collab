import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import importPlugin from "eslint-plugin-import";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    plugins: {
      import: importPlugin,
      "simple-import-sort": simpleImportSortPlugin,
    },
    files: ["**/*.{ts,tsx}"],
    ignores: ["dist", "node_modules", ".partykit"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      curly: "error",
      "no-console": [
        "warn",
        {
          allow: ["warn", "error"],
        },
      ],
      "simple-import-sort/exports": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
      // Rules for auto sort of imports
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Side effect imports.
            ["^\\u0000"],
            // Packages.
            // Packages. `react` related packages come first.
            // Things that start with a letter (or digit or underscore), or
            // `@` followed by a letter.
            ["^react", "^@?\\w"],
            // Root imports
            ["^(@)(/.*|$)"],
            // Parent imports. Put `..` last.
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            // Other relative imports. Put same-folder imports and `.` last.
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
          ],
        },
      ],
    },
  },
]);
