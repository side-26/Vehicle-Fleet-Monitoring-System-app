import type { FieldPathByValue, FieldValues, UseControllerProps } from "react-hook-form";

import type { SwitchFieldProps } from "@/components/ui/switch-field/switch-field.types";
// Distribute over the state-color union so distinct color pairs remain enforced.
type BoundProps<Props> = Props extends unknown
  ? Omit<
      Props,
      | "name"
      | "value"
      | "defaultValue"
      | "checked"
      | "defaultChecked"
      | "ref"
      | "inputRef"
      | "onCheckedChange"
      | "onBlur"
    >
  : never;
export type SwitchFormFieldProps<TFields extends FieldValues> = Readonly<
  BoundProps<SwitchFieldProps> & {
    readonly name: FieldPathByValue<TFields, boolean>;
    readonly rules?: UseControllerProps<TFields>["rules"];
    readonly shouldUnregister?: boolean;
  }
>;
