# Input group

Owns the standalone Input and Base UI Input group, an adapter for the installed Textarea component, four addon alignments, text, and action buttons. Types live in input-group.types.ts. CSS Modules use :where() and @apply with logical dimensions and em spacing. The textarea adapter overrides standalone surface utilities so the group owns borders and focus rings. Addon interactions focus the control without intercepting interactive descendants or canceled clicks. Stories and tests cover composition and public variants.

Owns the standalone Textarea export and native grouped textarea. Textarea props derive from the native element; no standalone textarea module dependency is required. Standalone surface styles stay separate from grouped control styles.
