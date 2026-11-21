"use client";
import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

import type { Icon, DivIcon } from "leaflet";
/** Internal registration boundary for React-rendered pointer icons. */
export const PointerIconContext = createContext<Dispatch<
  SetStateAction<Icon | DivIcon | undefined>
> | null>(null);
