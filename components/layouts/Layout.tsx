// Design
import {
  Button,
  Container,
  Flex,
  IconButton,
  Skeleton,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiArrowUp, FiShare } from "react-icons/fi";

// First-party components
import Header from "components/layout-dependencies/Header";
import Footer from "components/layout-dependencies/Footer";
import JSWarning from "components/alerts/JSWarning";
import BrowserWarning from "components/alerts/BrowserWarning";
import DevelopmentWarning from "components/alerts/DevelopmentWarning";

// Settings
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";
import { isLegacyEdge, isIE } from "react-device-detect";

import { Suspense, useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
  showShareButton?: boolean;
  showToTopButton: boolean;
}

// Start component
export default function Layout({
  children,
  showShareButton,
  showToTopButton,
}: LayoutProps) {
  // Get settings
  const [hideNotifications] = useLocalStorage("settingsHideNotifications");
  const [backButtonLargeWindows] = useLocalStorage(
    "settingsAlwaysShowBackButton"
  );

  // Layout keyboard shortcuts
  useEffect(() => {
    // Add an event listener that listens for the keydown Option+Command+LeftArrow key combination on Mac and the Alt+Control+LeftArrow key on others, preventing the default behavior and writing settingsAlwaysShowBackButton to true.
    const listener = (event: KeyboardEvent) => {
      if (event.metaKey && event.altKey && event.key === "ArrowLeft") {
        event.preventDefault();
        writeStorage(
          "settingsAlwaysShowBackButton",
          backButtonLargeWindows ? false : true
        );
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [backButtonLargeWindows]);

  // Share experience
  function Share() {
    if (navigator.share) {
      const url = document.location.href;
      navigator
        .share({
          title: document.title,
          text: "Discover ULOSINO",
          url: url,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) =>
          console.warn("Integrated Application Error: ShareErrorCaught", error)
        );
    }
  }

  return (
    <Flex
      display="flex"
      minH="100vh"
      direction="column"
      bg={useColorModeValue("gray.50", "inherit")}
    >
      {/* JavaScript warning */}
      <noscript>
        <JSWarning />
      </noscript>
      {/* If the browser isLegacyEdge or isIE, show <BrowserWarning /> */}
      {isLegacyEdge || isIE ? <BrowserWarning /> : null}
      {hideNotifications ? "" : <DevelopmentWarning />}
      {/* Header */}
      <Suspense fallback={<Skeleton />}>
        <Header />
      </Suspense>
      {/* Page content */}
      <Container maxWidth="container.md" flex={1} my={10}>
        {children}
      </Container>
      {/* Share footer (subfooter) */}
      <Container
        maxWidth="container.md"
        display={{ base: "none", sm: "block" }}
        mb={5}
      >
        <Flex>
          {showShareButton ?? (
            <Button leftIcon={<FiShare />} onClick={Share}>
              Share
            </Button>
          )}
          <Spacer />
          {showToTopButton && (
            <IconButton
              icon={<FiArrowUp />}
              aria-label="Go to top"
              onClick={() => window.scrollTo(0, 0)}
            />
          )}
        </Flex>
      </Container>
      {/* Footer */}
      <Suspense fallback={<Skeleton />}>
        <Footer />
      </Suspense>
    </Flex>
  );
}
