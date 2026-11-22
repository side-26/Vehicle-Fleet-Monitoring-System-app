# Landing shell

Composes the public landing layout with FleetOS branding, the common ThemeDropdown and the common MobileNavigation. Keep the shell as a Server Component; interactive logic belongs to those common components. Reserve content space below the desktop breakpoint so the navigation never covers the last content. Section anchors are contracts for future landing content; this shell does not create that content. Shell/header styles live in styles.module.css; dropdown and navigation styles live beside their respective common components.
