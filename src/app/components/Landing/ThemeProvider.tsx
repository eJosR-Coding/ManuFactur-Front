// src/app/components/ThemeProvider.tsx
"use client";

import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { ReactNode } from "react";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0a0a0a",
      paper: "#171717",
    },
    text: {
      primary: "#ededed",
      secondary: "#aaaaaa",
    },
    primary: {
      main: "#171717",
    },
    secondary: {
      main: "#ededed",
    },
  },
  typography: {
    fontFamily: "Arial, Helvetica, sans-serif",
  },
});

export default function CustomThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
