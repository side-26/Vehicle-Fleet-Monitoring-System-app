import type { ComponentProps, ReactNode } from "react";

import type {
  FieldValues,
  Resolver,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";

export interface FormProps<TFields extends FieldValues> extends Omit<
  ComponentProps<"form">,
  "children" | "onSubmit" | "onInvalid"
> {
  /** React Hook Form configuration, including defaultValues and validation mode. */
  readonly formOptions?: UseFormProps<TFields>;
  /** Optional validation resolver. Overrides formOptions.resolver when supplied. */
  readonly validation?: Resolver<TFields>;
  /** Called only with valid field values. */
  readonly onSubmit: SubmitHandler<TFields>;
  /** Called when validation fails. */
  readonly onInvalid?: SubmitErrorHandler<TFields>;
  /** Receives every React Hook Form method, including register, setError, and reset. */
  readonly children: ReactNode | ((methods: UseFormReturn<TFields>) => ReactNode);
}
