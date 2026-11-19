# Textarea field

Owns the provider-independent multiline field composing Field and InputGroupTextarea. Mirrors TextField sizes, semantic colors, variants, labels, message reservation through haveMessage, addons, and accessibility. Forwards native textarea props and ref. Field owns font sizing. Local CSS Module owns its styles; keep them independent from TextField. AutoResize defaults to true via CSS field-sizing; rows defaults to 2 and applies when autoResize is false. Stories and tests cover field states and interaction. React Hook Form bindings belong in a separate adapter.
