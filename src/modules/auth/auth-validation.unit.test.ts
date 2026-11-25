import { describe, expect, it } from "vitest";

import { loginSchema } from "./auth.validation";

describe("loginSchema", () => {
  it.each(["fleet-driver", "driver@example.com"])("accepts identifier %s", (identifier) => {
    expect(loginSchema.safeParse({ identifier, password: "secret" }).success).toBe(true);
  });

  it.each(["", " ", "\t\n"])("rejects a blank identifier %j", (identifier) => {
    const result = loginSchema.safeParse({ identifier, password: "secret" });
    expect(result.success).toBe(false);
    if (result.success) throw new Error("Expected validation failure");
    expect(result.error.issues[0]?.path).toEqual(["identifier"]);
    expect(result.error.issues[0]?.message).toBe("Enter your email or username.");
  });

  it.each([{}, { identifier: "fleet-driver" }, { identifier: "fleet-driver", password: "" }])(
    "rejects missing credentials %j",
    (values) => {
      expect(loginSchema.safeParse(values).success).toBe(false);
    },
  );

  it("preserves credential text and allows existing passwords without sign-up strength rules", () => {
    const values = { identifier: " fleet-driver ", password: " x " };
    expect(loginSchema.parse(values)).toEqual(values);
    expect(loginSchema.safeParse({ identifier: "fleet-driver", password: "x" }).success).toBe(true);
  });
});
