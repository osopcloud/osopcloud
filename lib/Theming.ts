import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { Button, Heading, Input, Select, Textarea } from "lib/ComponentStyles";

const config: ThemeConfig = {
  useSystemColorMode: true,
};

export const systemFont =
  typeof window !== "undefined"
    ? localStorage.getItem("settingsUseSystemFont") === "true"
    : "";

const theme = extendTheme({
  systemFont,
  config,
  colors: {
    hazelnut: "#57300A",
    sandstone: "#EFE7DF",
    honeycomb: "#D67718",
    almond: "#573D24",
    peanut: "#A35B12",
    almondScheme: {
      50: "#fef1e5",
      100: "#ebd8c6",
      200: "#dabfa5",
      300: "#caa582",
      400: "#bb8b5f",
      500: "#a17245",
      600: "#7d5935",
      700: "#5a3f25",
      800: "#372614",
      900: "#170c00",
    },
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
    heading: systemFont ? "system-ui" : "Public Sans",
    body: systemFont ? "system-ui" : "Public Sans",
  },
  components: {
    Button,
    Heading,
    Input,
    Select,
    Textarea,
  },
});

export default theme;
