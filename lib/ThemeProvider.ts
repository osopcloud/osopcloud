// This implements global theming for Chakra UI

import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  useSystemColorMode: true,
};

// Components
const Button = {
  baseStyle: {
    fontWeight: 600,
    borderRadius: "xl",
    shadow: "inner",
    userSelect: "none",
    textDecoration: "none",
  },
  defaultProps: {
    size: "md",
    variant: "outline",
  },
  variants: {
    ghost: {
      shadow: "none",
    },
  },
};
const Tooltip = {
  baseStyle: {
    rounded: "md",
  },
};
const Heading = {
  baseStyle: ({ colorMode }: { colorMode: string }) => ({
    fontWeight: 600,
    fontSize: "xl",
    color: colorMode === "dark" ? "sandstone" : "almond",
  }),
};

export const accessibleFont =
  typeof window !== "undefined"
    ? localStorage.getItem("settingsFontOverride")
    : "";

export const systemFont =
  typeof window !== "undefined"
    ? localStorage.getItem("settingsFontOverride") === "system"
    : "";

const theme = extendTheme({
  accessibleFont,
  config,
  colors: {
    hazelnut: "#57300A",
    sandstone: "#EFE7DF",
    honeycomb: "#D67718",
    almond: "#573D24",
    peanut: "#A35B12",
  },
  styles: {
    global: {
      b: {
        fontWeight: 600,
      },
      a: {
        textDecoration: "underline",
        cursor: "pointer",
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
  components: {
    Button,
    Tooltip,
    Heading,
  },
});

// This is imported by Application Kit (general) and _document.tsx (colour mode only)
export default theme;
