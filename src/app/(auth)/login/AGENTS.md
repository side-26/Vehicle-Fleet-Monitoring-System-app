# Login route

Renders the sign-in page inside the auth group's AuthLayoutShell. page.tsx remains a Server Component for metadata; the route-local login-form owns interactive credentials and submission states. There is no authentication API yet, so the default form reports sign-in is unavailable after valid submission.
