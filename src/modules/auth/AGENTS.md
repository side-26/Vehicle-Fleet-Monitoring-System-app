# Authentication module

Owns login validation in auth.validation.ts (the filename is explicitly requested). loginSchema validates an email-or-username identifier and a nonempty password, accepts usernames, and preserves credential text without trimming or transforming it. loginValidation adapts that schema to the shared Form component with the standard Zod resolver. LoginFormValues is inferred from the schema. Unit tests cover empty and whitespace identifiers, missing passwords, and credential preservation. Do not impose sign-up password-strength requirements on sign-in.
