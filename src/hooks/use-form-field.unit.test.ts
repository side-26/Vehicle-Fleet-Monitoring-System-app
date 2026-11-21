// @vitest-environment jsdom

import { createElement, type PropsWithChildren } from "react";

import { act, renderHook, waitFor } from "@testing-library/react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import type { UseFormProps } from "react-hook-form";
import { expect, it, vi } from "vitest";

import { useFormField } from "./use-form-field";
import type { UseFormFieldOptions } from "./use-form-field";

interface TestFields {
  vehicle: string;
}

const defaultValues = { vehicle: "" };

function fieldHook(
  initialProps: UseFormFieldOptions<TestFields> = { name: "vehicle" },
  formOptions: UseFormProps<TestFields> = {},
) {
  function Wrapper({ children }: Readonly<PropsWithChildren>) {
    const methods = useForm<TestFields>({ defaultValues, ...formOptions });
    // oxlint-disable-next-line react/no-children-prop -- FormProvider's required children prop must be present for typed createElement in this non-JSX test.
    return createElement(FormProvider<TestFields>, { ...methods, children });
  }
  return renderHook(
    (options: UseFormFieldOptions<TestFields>) => ({
      ...useFormField<TestFields>(options),
      methods: useFormContext<TestFields>(),
    }),
    { wrapper: Wrapper, initialProps },
  );
}

const requiredCases = [
  { description: "no required configuration", options: { name: "vehicle" }, expected: false },
  {
    description: "boolean true rule",
    options: { name: "vehicle", rules: { required: true } },
    expected: true,
  },
  {
    description: "boolean false rule",
    options: { name: "vehicle", rules: { required: false } },
    expected: false,
  },
  {
    description: "message rule",
    options: { name: "vehicle", rules: { required: "Vehicle is required" } },
    expected: true,
  },
  {
    description: "enabled object rule",
    options: { name: "vehicle", rules: { required: { value: true, message: "Enter vehicle" } } },
    expected: true,
  },
  {
    description: "disabled object rule",
    options: { name: "vehicle", rules: { required: { value: false, message: "Optional" } } },
    expected: false,
  },
  { description: "explicit true", options: { name: "vehicle", required: true }, expected: true },
  {
    description: "explicit false overrides the rule metadata",
    options: { name: "vehicle", required: false, rules: { required: true } },
    expected: false,
  },
  {
    description: "explicit true overrides the rule metadata",
    options: { name: "vehicle", required: true, rules: { required: false } },
    expected: true,
  },
] satisfies ReadonlyArray<{
  readonly description: string;
  readonly options: UseFormFieldOptions<TestFields>;
  readonly expected: boolean;
}>;

it.each(requiredCases)("derives isRequired from $description", async ({ options, expected }) => {
  const { result } = fieldHook(options);
  await act(async () => {
    await result.current.methods.trigger();
  });
  expect(result.current.isRequired).toBe(expected);
});

it("binds provider defaults and forwards value, change, blur and name", async () => {
  const { result } = fieldHook(
    { name: "vehicle" },
    { defaultValues: { vehicle: "Truck" }, mode: "onChange" },
  );
  expect(result.current.field.name).toBe("vehicle");
  expect(result.current.field.value).toBe("Truck");
  expect(result.current.validated).toBe(false);
  await act(async () => result.current.field.onChange("Van"));
  expect(result.current.field.value).toBe("Van");
  expect(result.current.fieldState.isDirty).toBe(true);
  await act(async () => result.current.field.onBlur());
  expect(result.current.fieldState.isTouched).toBe(true);
});

it("does not mark a pristine valid field validated", async () => {
  const { result } = fieldHook({ name: "vehicle" }, { defaultValues: { vehicle: "Truck" } });
  await waitFor(() => expect(result.current.formState.isValid).toBe(true));
  expect(result.current.fieldState.isDirty).toBe(false);
  expect(result.current.fieldState.isTouched).toBe(false);
  expect(result.current.validated).toBe(false);
});

it("marks a valid touched field validated even when it is not dirty", async () => {
  const { result } = fieldHook(
    { name: "vehicle", required: true },
    { defaultValues: { vehicle: "Truck" }, mode: "onBlur" },
  );
  await act(async () => result.current.field.onBlur());
  await waitFor(() => expect(result.current.validated).toBe(true));
  expect(result.current.fieldState.isTouched).toBe(true);
  expect(result.current.fieldState.isDirty).toBe(false);
});

it("keeps dirty invalid fields unvalidated until valid or submitted", async () => {
  const { result } = fieldHook(
    { name: "vehicle", rules: { minLength: { value: 3, message: "Use three letters" } } },
    { mode: "onChange" },
  );
  await act(async () => result.current.field.onChange("Va"));
  await waitFor(() => expect(result.current.fieldState.error?.message).toBe("Use three letters"));
  expect(result.current.fieldState.isDirty).toBe(true);
  expect(result.current.validated).toBe(false);
  await act(async () => result.current.field.onChange("Van"));
  await waitFor(() => expect(result.current.validated).toBe(true));
  expect(result.current.fieldState.error).toBeUndefined();
});

it("marks submitted invalid fields validated and supplies the fallback required message", async () => {
  const submit = vi.fn();
  const { result } = fieldHook({ name: "vehicle", required: true });
  await act(async () => {
    await result.current.methods.handleSubmit(submit)();
  });
  expect(submit).not.toHaveBeenCalled();
  expect(result.current.formState.isSubmitted).toBe(true);
  expect(result.current.validated).toBe(true);
  expect(result.current.fieldState.invalid).toBe(true);
  expect(result.current.fieldState.error?.message).toBe("This field is required.");
});

it("preserves custom required messages and other validation rules", async () => {
  const { result } = fieldHook({
    name: "vehicle",
    rules: { required: "Choose a vehicle", validate: (value) => value === "Van" || "Choose Van" },
  });
  await act(async () => {
    await result.current.methods.trigger();
  });
  expect(result.current.fieldState.error?.message).toBe("Choose a vehicle");
  await act(async () => {
    result.current.field.onChange("Truck");
    await result.current.methods.trigger();
  });
  expect(result.current.fieldState.error?.message).toBe("Choose Van");
  await act(async () => {
    result.current.field.onChange("Van");
    await result.current.methods.trigger();
  });
  expect(result.current.fieldState.error).toBeUndefined();
});

it("keeps an explicit required rule when the required metadata is overridden", async () => {
  const { result } = fieldHook({ name: "vehicle", required: true, rules: { required: false } });
  await act(async () => {
    await result.current.methods.trigger();
  });
  expect(result.current.isRequired).toBe(true);
  expect(result.current.fieldState.error).toBeUndefined();
});

it("allows an optional empty field and marks it validated after successful submission", async () => {
  const submit = vi.fn();
  const { result } = fieldHook();
  await act(async () => {
    await result.current.methods.handleSubmit(submit)();
  });
  expect(submit).toHaveBeenCalledWith({ vehicle: "" }, undefined);
  expect(result.current.validated).toBe(true);
  expect(result.current.fieldState.invalid).toBe(false);
});

it("forwards disabled state and omits the disabled value from submission", async () => {
  const submit = vi.fn();
  const { result, rerender } = fieldHook(
    { name: "vehicle", disabled: true },
    { defaultValues: { vehicle: "Truck" } },
  );
  expect(result.current.field.disabled).toBe(true);
  await act(async () => {
    await result.current.methods.handleSubmit(submit)();
  });
  expect(submit).toHaveBeenCalledWith({}, undefined);
  rerender({ name: "vehicle", disabled: false });
  expect(result.current.field.disabled).toBe(false);
  expect(result.current.field.value).toBe("Truck");
});

it.each([true, false])("respects shouldUnregister=%s on unmount", (shouldUnregister) => {
  const { result, unmount } = fieldHook(
    { name: "vehicle", shouldUnregister },
    { defaultValues: { vehicle: "Truck" } },
  );
  const methods = result.current.methods;
  unmount();
  expect(methods.getValues()).toEqual(shouldUnregister ? {} : { vehicle: "Truck" });
});
