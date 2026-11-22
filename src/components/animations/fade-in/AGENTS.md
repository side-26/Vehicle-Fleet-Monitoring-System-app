# Fade in

FadeIn is a CSS-only entrance wrapper that animates opacity when mounted without movement. duration (default 400) and delay (default 0) use milliseconds; negative values clamp to zero and nonfinite values fall back to defaults. Forward native div props, children, styles and refs. The animation uses backwards/forwards fill and disables itself under prefers-reduced-motion. Keep implementation in fade-in.tsx, public exports in index.tsx, props in fade-in.types.ts and styles in styles.module.css.

Uses useAnimationRunOnIntersectionObserver at threshold 0.4 to start once when 40% of the wrapper is visible. The component is a client boundary; data-visible gates the CSS animation. Reduced-motion users see content immediately. Native refs remain forwarded.
