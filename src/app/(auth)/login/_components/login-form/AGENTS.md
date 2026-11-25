# Login form

Owns the Welcome Back heading, email-or-username control, password control, recovery link, and sign-in submission states. Composes shared Form, FieldGroup, TextFormField, PasswordFormField, InputGroupAddon, and Button. Accepts usernames as well as email addresses; never impose email-only validation or trim passwords. Forwards valid values to the optional async onSubmit callback. With no callback, reports that sign-in is unavailable; never simulate authentication or persist credentials. Failures use a generic alert without echoing credentials. Pending submissions disable controls and expose the loading button. Styles use Tailwind @apply and md/lg variants. Stories show the form in AuthLayoutShell across viewport widths and cover errors and pending submission.

LoginFields subscribes through useFormState directly, so error messages and submission state update with React Compiler enabled. Disable input controls only after validation reaches the authentication callback; disabling controllers during validation can skip later fields.

Login validation is owned by src/modules/auth/auth.validation.ts. Pass loginValidation to the shared Form validation prop; infer the values type from loginSchema. Field required props provide the UI markers and accessibility state; do not duplicate the schema in field-level rules.

The updated reference includes Google and Microsoft provider buttons, a continuation divider. Provider buttons are type=button and never trigger credential validation. onProviderSignIn receives a typed provider; unconnected providers show unavailable feedback. Provider and credential requests disable all sign-in actions while pending. Brand icons are decorative inline vectors.

Provider presentation is composed from the sibling LoginProviders component; keep its icons, divider, and styles there. LoginForm continues to own provider request handlers and shared pending/error state.
