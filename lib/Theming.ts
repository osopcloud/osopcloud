import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { Button, Heading } from "lib/ComponentStyles";

const config: ThemeConfig = {
  useSystemColorMode: true,
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
    Heading,
  },
});

export default theme;
