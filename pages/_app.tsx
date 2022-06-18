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

// Keyboard shortcuts
import { useKeyboardShortcut } from "hooks/useKeyboardShortcut";

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

  // Keyboard shortcuts
  useKeyboardShortcut("g then h", () => {
    router.push("/");
  });
  useKeyboardShortcut("g then c", () => {
    router.push("/composer");
  });
  useKeyboardShortcut(["g then s", ", then 1"], () => {
    router.push("/settings/general");
  });
  useKeyboardShortcut([", then 2"], () => {
    router.push("/settings/accessibility");
  });
  useKeyboardShortcut([", then 3"], () => {
    router.push("/settings/sharing");
  });
  useKeyboardShortcut([", then 4"], () => {
    router.push("/settings/network");
  });
  useKeyboardShortcut([", then 5"], () => {
    router.push("/settings/storage");
  });

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
