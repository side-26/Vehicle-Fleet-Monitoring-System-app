# Login providers

Owns LoginProviders: the continuation divider, Google and Microsoft buttons, decorative inline brand icons. Works without a form provider and never submits a surrounding form. Receives callbacks, disabled state, and pendingProvider from LoginForm; it does not initiate authentication or own errors. Provider names and their derived type live in login-providers.types.ts. Keep all presentation styles in the CSS Module, with spacing matching the login field group.
