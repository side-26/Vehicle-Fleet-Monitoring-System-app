# Checkbox field

Provider-independent horizontal Field composition using the Base UI Checkbox primitive, FieldContent, optional FieldLabel, and reserved FieldDescription. Owns primary/secondary/error/success colors and inherits five Field sizes. Message reservation and animation follow TextField through haveMessage. Preserve native form binding, controlled/uncontrolled checked state, indeterminate state, requiredness, accessibility props, and the primitive ref. CSS owns validation presentation through aria-invalid and data-validated. Callers must provide an accessible name when label is empty.

Semantic colors apply only to the checkbox control. Label and description use foreground normally and error color when the control is invalid.
