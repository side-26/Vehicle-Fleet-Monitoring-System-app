# Slider

Composes Base UI Root, Control, Track, Indicator, and indexed Thumbs into one Slider export. Supports primary (default) and neutral colors, horizontal (default) and vertical layouts, scalar values and arrays for ranges, controlled/uncontrolled state, min/max/step, disabled state, callbacks, root refs, form names, and native Base UI root props.

Require aria-label and forward descriptions, labelled-by and optional getAriaLabel/getAriaValueText to each thumb's native range input. Range labels default to the control label plus a 1-based index. Thumb alignment defaults to Base UI’s center alignment so the initial render is accessible without client measurements. One thumb is rendered by default; scalar and array values determine the thumb count. Base UI owns keyboard, pointer, collision, RTL and form input behavior. Keep root className state callbacks working.

Styles live in a named CSS Module layer, use canonical Tailwind @apply and semantic tokens, and use em for component dimensions and spacing. Neutral uses foreground to maintain contrast. Storybook demonstrates both colors, ranges, disabled combinations, vertical, controlled, custom bounds and keyboard/pointer interaction with failing accessibility audits. Unit tests cover public state, accessibility, refs and value changes.
