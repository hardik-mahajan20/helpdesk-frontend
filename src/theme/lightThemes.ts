import { createTheme } from "@mui/material/styles";
import { blue, green, purple, orange } from "./palettes";

export const lightThemes = {
  blue: createTheme({
    palette: {
      mode: "light",
      primary: { main: blue.primary, dark: blue.primaryDark },
      secondary: { main: blue.accent },
      error: { main: "#f44336" },
    },
  }),

  green: createTheme({
    palette: {
      mode: "light",
      primary: { main: green.primary, dark: green.primaryDark },
      secondary: { main: green.accent },
    },
  }),

  purple: createTheme({
    palette: {
      mode: "light",
      primary: { main: purple.primary, dark: purple.primaryDark },
      secondary: { main: purple.accent },
    },
  }),

  orange: createTheme({
    palette: {
      mode: "light",
      primary: { main: orange.primary, dark: orange.primaryDark },
      secondary: { main: orange.accent },
    },
  }),
};
