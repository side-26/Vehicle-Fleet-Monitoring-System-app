# General project workflow

Apply this convention to imports in `.ts`, `.tsx`, `.js`, `.jsx`, and other files that support import declarations. Keep each group in the order below, sort imports alphabetically within a group, and leave one blank line between groups:

1. Node.js built-in modules, preferably using the `node:` prefix.
2. React and Next.js modules.
3. Third-party packages.
4. Shared modules imported from the shared alias.
5. Domain modules imported from the domain alias.
6. Relative modules, including type-only imports (keep each type import with its source group).
7. Stylesheet imports.

Example:

```ts
// Node.js built-in modules
import { randomUUID } from "node:crypto";

// React and Next.js
import { useRouter } from "next/navigation";
import { useState } from "react";

// Third-party packages
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

// Shared modules
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

// Domain modules
import { Vehicle } from "@/domains/vehicle";

// Relative modules
import { VehicleCard } from "./vehicle-card";

// Relative type-only imports stay with relative modules
import type { VehicleProps } from "./vehicle.types";

// Styles
import "./vehicle.css";
```

Oxfmt sorts imports for JavaScript and TypeScript files in the categories listed above. It groups type-only imports with the corresponding source group and places styles last.

## TypeScript rules

1. Never use `any`. Use a specific type or `unknown`; when a value is `unknown`, validate or narrow it to an appropriate type before using it.
2. Prefer `satisfies` over type assertions with `as` when checking that a value conforms to a type. Avoid `as` wherever possible; use it only when the type cannot be established through inference, validation, or narrowing.
3. Do not declare union types by hand. Define the allowed values in an `as const` array and derive the union from the array:

   ```ts
   const vehicleStatuses = ["active", "maintenance", "retired"] as const;
   type VehicleStatus = (typeof vehicleStatuses)[number];
   ```

4. Do not use enums. Represent finite sets of values with an `as const` array and derive the union type from it, as shown above.
5. Prefer interfaces over type aliases for fetch responses, server data, and records when practical.
6. Make function arguments and component props readonly. Use readonly properties and `readonly` arrays/tuples, or `Readonly<T>` / `ReadonlyArray<T>` where they fit.

## CSS and styling rules

1. Do not use `px` lengths in component CSS Modules. Reserve pixel lengths for layout-level styles; prefer relative units or design tokens in component styles.
2. Prefer `em` for padding in UI component CSS Modules so spacing scales with the component's font size. Use another unit when a design token or layout constraint calls for it.
3. Prefer `:where()` selectors in CSS Modules for headless components and layout primitives when zero-specificity styling is appropriate.
4. Use logical sizing properties, `inline-size` and `block-size`, instead of physical `width` and `height`. In Tailwind, use the corresponding arbitrary-property utilities when appropriate rather than `w-*` or `h-*` utilities.
5. Avoid physical direction properties and utilities such as `left` and `right`. Use logical directions such as `inset-inline-start`, `inset-inline-end`, `start`, and `end` so layouts support different writing directions.
6. Use configured Tailwind utilities in CSS Modules with `@apply` instead of duplicating equivalent declarations. For UI components, follow the approval requirement in the UI component workflow before using `@apply`. Keep custom selectors and values in CSS when no suitable utility exists or `@apply` would make the style less clear.
7. Keep component CSS Modules beside their components in `components` or route `_components` folders. Put styles for route-level `.tsx` files in that route's `_styles` folder.
8. To reset a CSS property, use `unset` when you want inherited properties to inherit from their parent and non-inherited properties to use their initial value. Use `initial` when you explicitly want the property's spec-defined initial value regardless of inheritance.

## UI component workflow

When creating or updating a UI component, follow the repository's shadcn skill in `.agents/skills/shadcn/SKILL.md` and its relevant component guidance. Prefer the project's existing shadcn/Base UI patterns and APIs.

Each component lives in its own kebab-case folder under `src/components/ui/<component-name>/`. Keep these files in the folder:

- `index.tsx` — component implementation.
- `<component-name>.stories.tsx` — Storybook stories.
- `<component-name>.types.ts` — component-specific props, types, variants, and constants.
- `styles.module.css` — component styles; keep it even when the component currently needs little or no custom styling.
- `AGENTS.md` — the component folder's purpose and responsibilities.
- `<component-name>.unit.test.tsx` — Vitest tests for rendered behavior and public states.

For compound components, keep all related parts in the same folder, document and export their parts through `index.tsx`, and add stories and tests for the compound behavior.

Add Storybook stories that demonstrate the default appearance and every public state or variant, including applicable colors, sizes, disabled states, and compound arrangements. Add Vitest coverage for the component's public props and states, interactions, and accessibility behavior. Keep component-specific types and constants in the component folder rather than scattering them into shared modules.

### Storybook checks

Document each public control with an explicit type and description. Show every color, size, variant, and their relevant combinations in named stories. Add browser story tests that assert accessible roles, heading levels, names, and visible content for each rendered state. Configure the Storybook accessibility addon with `a11y.test: "error"` so its axe audit fails the Storybook test on violations, including color contrast. Include labels that help QA identify each state under inspection.

Do not style UI components with Tailwind classes in JSX. Use CSS Modules and native CSS inside a named component layer, for example `@layer button { .button { ... } }`. If using Tailwind utilities through `@apply` in a component CSS Module is needed, ask the user for approval first; after approval, keep those utilities in the CSS Module. This approval requirement applies to future component work.

For glassmorphism, reuse the existing `glass-interactive` utility from `src/app/styles/glassmorphism-styles.css` through the component's CSS Module instead of duplicating its declarations.

For component size variants, scale `font-size`, padding, and `border-radius` with `em` where appropriate. Do not use `inline-size` or `block-size` just to make a component appear larger or smaller; retain logical sizing properties for genuine layout dimensions.

## Common component workflow

Common components are reusable components used by application layouts or across many areas, such as confirmation dialogs and toast notifications. Give each common component its own kebab-case directory under `src/components/common/<component-name>/`.

Each common component directory must contain:

- `index.tsx` — implementation and exports for the main component or all parts of a compound component.
- `<component-name>.types.ts` — component-specific props, types, and constants.
- `<component-name>.unit.test.tsx` — unit tests for component behavior.
- `styles.module.css` — component styles, even if initially minimal.
- `AGENTS.md` — the component folder's purpose and responsibilities.
- `<component-name>.integration.test.tsx` when the component has a multi-step or cross-component integration flow.

Use the CSS Module and type conventions from the UI component workflow above. Keep the component implementation and its related compound parts in `index.tsx`; keep component-specific types and constants in the component's types file.

Cover every public action and state in unit tests. Add integration tests for flows that cross component or service boundaries. Use `.ts` instead of `.tsx` only for tests that do not render JSX. If a numerical coverage target is needed, set it in the test configuration rather than treating the phrase “full coverage” as an unspecified percentage.

Components must expose the accessibility inputs their use requires. When an accessible name, label, or description cannot be derived from content, require the appropriate typed props (for example, `aria-label`, dialog title, or description); use correct semantic elements, roles, and ARIA attributes. Do not rely on visual text or styling alone to communicate state.

## File naming

Use kebab-case for file names, including source, script, and style files. Separate words with hyphens and use the appropriate extension. Examples:

- `my-custom-component.tsx`
- `my-custom-hook.ts`
- `my-random-script.js`
- `my-css-module.module.css`

Keep framework-required names and conventional role suffixes, such as Next.js `page.tsx` and `layout.tsx`, `*.unit.test.tsx`, and `*.perf.spec.ts`. Use kebab-case for the descriptive part of those filenames.

## Folder documentation

When creating a folder or adding a new responsibility to an existing folder, create or update an `AGENTS.md` in that folder. Explain what the folder contains and what it is responsible for. Keep the description specific to that folder and update it when the folder's purpose changes.
