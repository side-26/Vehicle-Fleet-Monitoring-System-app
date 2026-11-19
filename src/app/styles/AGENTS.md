# Application styles

This folder contains global styles, design tokens, theme definitions, and CSS layers used throughout the application.

animations.css defines reusable motion, including slide-y. Import it from component CSS Modules when needed; do not import it into globals.css. Animations must respect prefers-reduced-motion and use relative motion distances.
