// This implements global theming for Chakra UI

import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  useSystemColorMode: true,
};

export const accessibleFont =
  typeof window !== "undefined"
    ? localStorage.getItem("P3PrefAccessibleFonts")
    : "";

export const systemFont =
  typeof window !== "undefined"
    ? localStorage.getItem("P3PrefAccessibleFonts") === "system"
    : "";

const theme = extendTheme({
  accessibleFont,
  config,
  styles: {
    global: {
      b: {
        fontWeight: 600,
      },
      a: {
        textDecoration: "underline",
      },
    },
  },
  fonts: {
    heading: accessibleFont
      ? systemFont
        ? "system-ui"
        : "Atkinson Hyperlegible"
      : "Public Sans",
    body: accessibleFont
      ? systemFont
        ? "system-ui"
        : "Atkinson Hyperlegible"
      : "Public Sans",
  },
});

// This is imported by Application Kit (general) and _document.tsx (colour mode only)
export default theme;
