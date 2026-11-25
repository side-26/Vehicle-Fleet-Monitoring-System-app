# Password form field

Provides PasswordFormField by composing TextFormField. Reuses its typed React Hook Form binding, validation, label, description, sizes, colors, and variants. Owns the password/text input type, a decorative lock prefix, and an accessible visibility button at inline-end. Both addons and the button inherit the input group's current color, including fill and validation states. Does not expose type or children props for custom addons.

Storybook uses a padded canvas and a full-width form capped at the 2xl container token. Stories verify all exposed states, size progression, every color/variant pair, addon color inheritance, gallery widths, and validation error recovery. Keep story layout in the CSS Module using Tailwind @apply.
