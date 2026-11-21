# Shared hooks

Contains reusable client hooks. useFormField centralizes React Hook Form provider/controller binding, required-rule derivation, and validation metadata for field adapters. Keep control-specific value conversions and visual rendering in each adapter; form default values belong in the Form provider.

useFormField unit tests run in jsdom with real React Hook Form providers and controllers. Cover required-rule precedence, pristine/touched/dirty/submitted validation metadata, field bindings, disabled submission, and unregister behavior without mocking the form library.

useIsMobile uses useSyncExternalStore to read whether the viewport is below a configurable breakpoint (768 by default), resubscribes when that breakpoint changes, and removes media-query listeners on cleanup. It returns false during server rendering and initial hydration before synchronizing with the client viewport. Its unit tests use a jsdom environment with real EventTarget subscriptions to verify boundaries, updates, cleanup, and hydration without mismatches.
