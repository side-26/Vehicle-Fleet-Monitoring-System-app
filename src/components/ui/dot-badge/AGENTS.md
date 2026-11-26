# Dot badge

Static SVG status dot with sm/lg sizes and primary, secondary, success, error and neutral semantic colors. Defaults to sm/primary. Decorative unless aria-label or aria-labelledby supplies a name; callers can explicitly set aria-hidden. Forwards SVG attributes and ref, but owns its circle, viewBox and role. Optional position selects top-start, top-end, bottom-start or bottom-end relative to a positioned ancestor. Logical insets respect RTL. Without position the dot remains inline. Callers own the positioned ancestor. Unit tests cover all combinations and accessibility; Storybook names every combination and audits accessibility. Playwright visual tests compare every combination in light and dark themes against locally generated baselines. Screenshot files are intentionally omitted; generate baselines before running visual comparisons.

Run checks from the repository root:

- Unit: `pnpm exec vitest run --project=component src/components/ui/dot-badge/dot-badge.unit.test.tsx`
- Stories and accessibility: `pnpm exec vitest run --config vitest.storybook.config.ts src/components/ui/dot-badge/dot-badge.stories.tsx`
- Visual comparisons (starts Storybook when needed): `pnpm exec playwright test --config src/components/ui/dot-badge/dot-badge.visual.config.ts`
- Refresh reviewed baselines: append `--update-snapshots` to the visual command.
