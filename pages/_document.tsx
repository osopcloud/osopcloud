// Document-scope providers
import NextDocument, { Html, Head, Main, NextScript } from "next/document";

// Design
import { ColorModeScript } from "@chakra-ui/react";
import theme from "lib/ThemeProvider";

// Start HTML document
export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
