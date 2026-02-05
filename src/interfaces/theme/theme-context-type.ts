export type ThemeMode = "light" | "dark";
export type ThemeColor = "blue" | "green" | "purple" | "orange";

export interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  color: ThemeColor;
  setColor: (mode: ThemeColor) => void;
  setThemeAndColor: (mode: ThemeMode, color: ThemeColor) => void;
}
