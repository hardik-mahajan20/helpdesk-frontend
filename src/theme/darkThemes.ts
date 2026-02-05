import { createTheme } from "@mui/material/styles";

export const darkThemes = {
  blue: createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#90caf9" },
      secondary: { main: "#5c6bc0" },
    },
  }),

  green: createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#81c784" },
      secondary: { main: "#26a69a" },
    },
  }),

  purple: createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#ce93d8" },
      secondary: { main: "#9575cd" },
    },
  }),

  orange: createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#ffb74d" },
      secondary: { main: "#ff8a65" },
    },
  }),
};
