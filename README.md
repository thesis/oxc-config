# oxc-config

Shared [oxlint](https://oxc.rs/docs/guide/usage/linter.html) and [oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) configuration for Thesis projects. The rules carry over the decisions from [`@thesis-co/eslint-config`](https://github.com/thesis/eslint-config) and [`@thesis/prettier-config`](https://github.com/thesis/prettier-config).

## Getting started

Install the config together with the tools it configures:

```sh
pnpm add -D github:thesis/oxc-config oxlint oxfmt oxlint-tsgolint
```

Both tools read their config from a TypeScript file at the repository root. A JSON config cannot import a package, so `.oxlintrc.json` and `.oxfmtrc.json` do not work with this package.

`oxlint.config.ts`:

```ts
import { defineConfig } from "oxlint"
import thesis from "@thesis-co/oxc-config/oxlint"
import thesisReact from "@thesis-co/oxc-config/oxlint/react" // React projects only

export default defineConfig({
  extends: [thesis, thesisReact],
  plugins: [],
  ignorePatterns: ["dist"],
})
```

`oxfmt.config.ts`:

```ts
import { defineConfig } from "oxfmt"
import thesis from "@thesis-co/oxc-config/oxfmt"

export default defineConfig({
  ...thesis,
  ignorePatterns: ["dist"],
})
```

Then run `oxlint --type-aware` and `oxfmt --check` from the repository root.

## What the exports contain

- `@thesis-co/oxc-config/oxlint`: the `typescript`, `import`, `jest`, `vitest`, `unicorn` and `promise` plugins, the `correctness` category as errors, the `suspicious` category as warnings, and the rule decisions shared by every Thesis TypeScript project.
- `@thesis-co/oxc-config/oxlint/react`: adds the `react` and `jsx-a11y` plugins and their rules. Extend it after the base.
- `@thesis-co/oxc-config/oxfmt`: no semicolons, 80 columns. Everything else is the oxfmt default.

## What stays in your repository

oxlint merges `rules`, `plugins`, `categories` and `overrides` from extended configs. It does not merge `ignorePatterns`, `env`, `globals` or `settings`, so those belong in your `oxlint.config.ts`. oxfmt has no `extends`, which is why the snippet spreads the object. Its `ignorePatterns` resolve relative to your config file.

Two details are easy to miss:

- `plugins: []` is required. When a config omits `plugins`, oxlint adds its default plugins on top of the extended list. The empty array inherits exactly the plugins of the shared config.
- Type-aware linting is a root-config decision. Pass `--type-aware` on the command line or set `options.typeAware` in your root config. The shared config never sets it, because oxlint rejects it in a non-root config.

## Requirements

- Node.js 22.18 or newer, because oxlint and oxfmt load `*.config.ts` through Node's own TypeScript support.
- The npm packages `oxlint` (1.81.0 or newer) and `oxfmt` (0.66.0 or newer). The standalone binaries do not load TypeScript configs.
- `oxlint-tsgolint` for `--type-aware`.

## Development

`pnpm typecheck` checks the config objects against the types that oxlint and oxfmt ship. `pnpm check` lints and format-checks this repository through its own exports. `pnpm test` runs both tools on the files in `test/fixtures` and asserts which rules fire and how the output is formatted. oxfmt accepts unknown option names, in its types and at run time, so the fixture test is what guards the formatting options.
