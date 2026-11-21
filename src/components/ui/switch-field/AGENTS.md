# Switch field

Reusable Base UI switch composed with Field, independent of React Hook Form. Owns four semantic state colors, five Field sizes, four track variants, optional label/message association, required marker and native switch props/ref. Defaults: trueValueColor primary, falseValueColor error, md, fill, empty label/message. Preserve controlled/uncontrolled checked state, inputRef, name, form values and disabled/readOnly behavior. Keep styles in the named CSS Module layer with canonical Tailwind @apply, em spacing and RTL thumb movement. Stories demonstrate all variants; tests cover interaction and accessible naming/description.

State colors accept only primary/error/success/neutral and must differ, including resolved defaults. Types reject duplicates and runtime validation protects JavaScript callers. The current checked state selects the matching color for control, label and description.

Horizontal layout aligns the toggle and label/message section on their first baseline with items-baseline; avoid manual top margin alignment offsets.
