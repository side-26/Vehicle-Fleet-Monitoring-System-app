# Admin shell

Composes Sidebar, SearchField, Button, Avatar, DropdownMenu and Card UI primitives into the persistent admin layout. Sidebar owns mobile dismissal and desktop collapse. The shell renders route children without dashboard data, charts or widgets. Search is an unbound layout control awaiting a search service.

Delegates menu configuration and behavior to AdminNavigation, AdminNotifications and AdminProfileMenu; their styles live alongside those components.
