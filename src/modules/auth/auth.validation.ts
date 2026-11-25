import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const loginSchema = z.object({
  identifier: z
    .string({ error: "Enter your email or username." })
    .refine((value) => value.trim().length > 0, "Enter your email or username."),
  password: z.string({ error: "Enter your password." }).min(1, "Enter your password."),
});

export type LoginFormValues = Readonly<z.infer<typeof loginSchema>>;

export const loginValidation = zodResolver(loginSchema);
