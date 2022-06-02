// Types
import type { ReactElement } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

// Application-scope providers
import { ChakraProvider } from "@chakra-ui/react";
import theme from "lib/Theming";
import UpdateServices from "lib/UpdateServices";
import { ErrorFallbackApplication } from "components/error-handling/ErrorFallbackApplication";

// Routing
import { useRouter } from "next/router";

// Design
import "@fontsource/public-sans/400.css";
import "@fontsource/public-sans/600.css";

import { useEffect } from "react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactElement;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// Start application
export default function Application({
  Component,
  pageProps,
}: AppPropsWithLayout) {
  const router = useRouter();

  // Set up keyboard shortcuts
  useEffect(() => {
    // Add an event listener that listens for the keydown Command+/ key combination, preventing the default behavior and opening Home.
    const listener = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === "/") {
        event.preventDefault();
        router.push("/");
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [router]);
  useEffect(() => {
    // Add an event listener that listens for the keydown Command+Shift+, key combination, preventing the default behavior and opening settings.
    const listener = (event: KeyboardEvent) => {
      if (event.metaKey && event.shiftKey && event.key === ",") {
        event.preventDefault();
        router.push("/settings");
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [router]);
  useEffect(() => {
    // Add an event listener that listens for the keydown Command+UpArrow key combination, preventing the default behavior and scrolling up.
    const listener = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === "ArrowUp") {
        event.preventDefault();
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, []);

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ChakraProvider theme={theme}>
      <ErrorFallbackApplication>
        <UpdateServices>
          {getLayout(<Component {...pageProps} />)}
        </UpdateServices>
      </ErrorFallbackApplication>
    </ChakraProvider>
  );
}
