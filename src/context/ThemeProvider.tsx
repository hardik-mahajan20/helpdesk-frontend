import { useState, useEffect, type ReactNode, createContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import type {
  ThemeColor,
  ThemeContextType,
  ThemeMode,
} from "../interfaces/theme";
import { ColorOption, LOCAL_STORAGE_KEYS, ThemeOption } from "../enums";
import { DEFAULT_THEME_CONTEXT } from "../constants";

const ThemeCtx = createContext<ThemeContextType>(DEFAULT_THEME_CONTEXT);

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>(
    (localStorage.getItem(LOCAL_STORAGE_KEYS.THEME_PREFERENCE) as ThemeMode) ??
      ThemeOption.Light
  );

  const [color, setColor] = useState<ThemeColor>(
    (localStorage.getItem(LOCAL_STORAGE_KEYS.COLOR_PREFERENCE) as ThemeColor) ??
      ColorOption.Blue
  );

  // MUI theme
  const paletteColors = {
    blue: { light: "#1976d2", dark: "#90caf9", accent: "#3f51b5" },
    green: { light: "#388e3c", dark: "#81c784", accent: "#009688" },
    purple: { light: "#7b1fa2", dark: "#ce93d8", accent: "#673ab7" },
    orange: { light: "#f57c00", dark: "#ffb74d", accent: "#ff5722" },
  };

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main:
          mode === ThemeOption.Light
            ? paletteColors[color].light
            : paletteColors[color].dark,
      },
      secondary: { main: paletteColors[color].accent },
      error: { main: "#f44336" },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontWeight: 500,
            // textTransform: 'none',
            borderRadius: 6,
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: "50%",
            width: 36,
            height: 36,
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          size: "small",
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            minHeight: 48,
          },
        },
      },
      MuiTablePagination: {
        styleOverrides: {
          root: {
            fontSize: "14px",
            backgroundColor: "var(--background-color)",
          },
          selectLabel: {
            margin: "0 16px",
          },
        },
      },
      MuiSnackbarContent: {
        styleOverrides: {
          root: {
            padding: "15px 10px",
            backgroundColor: "transparent",
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          list: {
            padding: 0,
          },
        },
      },
    },
  });

  useEffect(() => {
    const body = document.body;

    body.classList.remove(
      "theme-light",
      "theme-dark",
      "color-blue",
      "color-green",
      "color-purple",
      "color-orange"
    );

    body.classList.add(`theme-${mode}`, `color-${color}`);

    localStorage.setItem(LOCAL_STORAGE_KEYS.THEME_PREFERENCE, mode);
    localStorage.setItem(LOCAL_STORAGE_KEYS.COLOR_PREFERENCE, color);
  }, [mode, color]);

  const setThemeAndColor = (theme: ThemeMode, clr: ThemeColor) => {
    setMode(theme);
    setColor(clr);
  };

  return (
    <ThemeCtx.Provider
      value={{
        mode,
        color,
        setMode,
        setColor,
        setThemeAndColor,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeCtx.Provider>
  );
};
