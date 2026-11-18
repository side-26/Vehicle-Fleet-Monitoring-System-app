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

## File naming

Use kebab-case for file names, including source, script, and style files. Separate words with hyphens and use the appropriate extension. Examples:

- `my-custom-component.tsx`
- `my-custom-hook.ts`
- `my-random-script.js`
- `my-css-module.module.css`

Keep framework-required names and conventional role suffixes, such as Next.js `page.tsx` and `layout.tsx`, `*.unit.test.tsx`, and `*.perf.spec.ts`. Use kebab-case for the descriptive part of those filenames.

## Folder documentation

When creating a folder or adding a new responsibility to an existing folder, create or update an `AGENTS.md` in that folder. Explain what the folder contains and what it is responsible for. Keep the description specific to that folder and update it when the folder's purpose changes.
