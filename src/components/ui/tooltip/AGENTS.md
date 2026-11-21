# Tooltip

Base UI compound tooltip: TooltipProvider shares hover delays (default 0ms), Tooltip manages controlled/uncontrolled open state and disabling, TooltipTrigger supports native props, refs and render composition, and TooltipContent portals and positions the hint.

Content owns primary, secondary, success, neutral (default), and error colors, xs through xl font sizes (md default), and optional glassy material (false default). Size uses the shared typography tokens; padding, radius, and content wrapping constraints use em. Positioning props retain Base UI's numeric pixel offset API (sideOffset defaults to 4). Use the shared glass-interactive utility and override its button-only pointer/scale effects for passive tooltip text. All styles stay in the named CSS Module layer using canonical Tailwind @apply utilities.

Keep hints noninteractive and give triggers their own accessible names; tooltip text is supplementary. Preserve Base UI keyboard, hover, Escape, delay, disabled, and ARIA behavior. Stories cover all color/size/material combinations, placement, disabled and controlled states, with failing axe audits. Pin gallery samples with controlled open state so opening a sibling cannot close them. Browser assertions must wait for positioning and visibility transitions. Tests cover public defaults, variants, refs, state class callbacks and interaction.
