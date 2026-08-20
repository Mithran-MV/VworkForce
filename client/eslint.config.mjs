import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Build output is generated and minified; linting it reports rule violations
  // in bundled dependency code that nobody can act on. `next lint` excludes
  // these by default, eslint on its own does not.
  { ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"] },
  ...compat.extends("next/core-web-vitals"),
];

export default eslintConfig;
