import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import {
  Badge,
  Button,
  Heading,
  Input,
  Select,
  Textarea,
} from "lib/ComponentStyles";

const config: ThemeConfig = {
  useSystemColorMode: true,
};

function isLocalStorageAvailable() {
  const test = "test";
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

export const systemFont = isLocalStorageAvailable()
  ? typeof window !== "undefined"
    ? localStorage.getItem("settingsUseSystemFont") === "true"
    : ""
  : true;

const theme = extendTheme({
  systemFont,
  config,
  textStyles: {
    miniHeading: {
      fontSize: "sm",
      fontWeight: 600,
      lineHeight: "200%",
      textTransform: "uppercase",
      as: "h6",
    },
  },
  colors: {
    brand: "#e9e1b0",
    // "hazelnut" is not used
    hazelnut: "#57300A",
    // "sandstone" is our secondary, replaces almond on dark backgrounds
    sandstone: "#EFE7DF",
    // "honeycomb" may be used for errors only
    honeycomb: "#D67718",
    // "almond" is our primary
    almond: "#573D24",
    // "peanut" is not used
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
    Badge,
    Button,
    Heading,
    Input,
    Select,
    Textarea,
  },
});

export default theme;
