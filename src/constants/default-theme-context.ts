import { ColorOption, ThemeOption } from "../enums";
import type { ThemeContextType } from "../interfaces/theme";

export const DEFAULT_THEME_CONTEXT: ThemeContextType = {
  mode: ThemeOption.Light,
  color: ColorOption.Blue,
  setMode: () => {},
  setColor: () => {},
  setThemeAndColor: () => {},
};
