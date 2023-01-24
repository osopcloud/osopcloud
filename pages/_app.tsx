// Types
import type { ReactElement } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

// Application-scope providers
import { ChakraProvider } from "@chakra-ui/react";
import { domAnimation, LazyMotion, MotionConfig } from "framer-motion";
import theme from "lib/Theming";
import UpdateServices from "lib/UpdateServices";
import { ErrorFallbackApplication } from "components/error-handling/ErrorFallbackApplication";
import PersistentStorageFallback from "components/error-handling/PersistentStorageFallback";

// Routing
import { useRouter } from "next/router";

// Design
import "@fontsource/public-sans/400.css";
import "@fontsource/public-sans/600.css";

// Keyboard shortcuts
import { useKeyboardShortcut } from "hooks/useKeyboardShortcut";

import { Suspense } from "react";
import Loading from "components/system/Loading";

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
  useKeyboardShortcut(["g then o"], () => {
    router.push("/options");
  });
  useKeyboardShortcut(["g then s", "g then ,"], () => {
    router.push("/settings");
  });

  // Check if the user has local storage enabled
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

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ChakraProvider theme={theme}>
      <ErrorFallbackApplication>
        <Suspense fallback={<Loading />}>
          {isLocalStorageAvailable() ? (
            <UpdateServices>
              <MotionConfig reducedMotion="user">
                {/* Strict is preferred, however it will break Chakra UI components and always throw */}
                <LazyMotion features={domAnimation}>
                  {getLayout(<Component {...pageProps} />)}
                </LazyMotion>
              </MotionConfig>
            </UpdateServices>
          ) : (
            <PersistentStorageFallback />
          )}
        </Suspense>
      </ErrorFallbackApplication>
    </ChakraProvider>
  );
}
