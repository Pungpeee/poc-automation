import { createTheme } from "@mui/material";

export const carbonTheme = createTheme({
  typography: {
    fontFamily: [
      "Gotham",
      "Prompt",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  breakpoints: {
    values: {
      xs: 0,
      ex_sm:360,
      sm: 500,
      md: 950,
      lg: 1200,
      xl: 1536,
    },
  },
});
