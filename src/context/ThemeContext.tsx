import { createContext } from "react";
import type { ThemeContextType } from "../interfaces/theme";
import { DEFAULT_THEME_CONTEXT } from "../constants";

export const ThemeCtx = createContext<ThemeContextType>(DEFAULT_THEME_CONTEXT);
