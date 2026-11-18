import type { ComponentProps } from "react";

import type { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";

export type AvatarProps = AvatarPrimitive.Root.Props;
export type AvatarImageProps = AvatarPrimitive.Image.Props;
export type AvatarFallbackProps = AvatarPrimitive.Fallback.Props;
export type AvatarBadgeProps = ComponentProps<"span">;
export type AvatarGroupProps = ComponentProps<"div">;
export type AvatarGroupCountProps = ComponentProps<"div">;
