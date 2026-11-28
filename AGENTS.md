<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Repository structure

This repository is a Next.js application for vehicle fleet monitoring. Application code is under `src`, browser tests are under `playwright`, shared automated test setup is under `tests`, Storybook configuration is under `.storybook`, and directly served static assets are under `public`.

`src/shared` is the independently managed `next-shared-modules` Git submodule. Root formatting and lint checks exclude it, and the app TypeScript configuration excludes it from standalone file discovery. Modules imported by the app remain subject to TypeScript checking. Maintain the submodule's source and dependencies in its own repository.

Follow `.agents/workflows/general.md` for import ordering, kebab-case filenames, and folder-level `AGENTS.md` documentation. Keep Next.js-required route filenames such as `page.tsx` and `layout.tsx` unchanged.
