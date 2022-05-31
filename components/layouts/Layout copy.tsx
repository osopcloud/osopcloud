// Design
import {
  Box,
  Button,
  Flex,
  IconButton,
  Skeleton,
  Spacer,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FiArrowUp,
  FiHome,
  FiLifeBuoy,
  FiFilePlus,
  FiSettings,
  FiShare,
} from "react-icons/fi";

// First-party components
import JSWarning from "components/alerts/JSWarning";
import BrowserWarning from "components/alerts/BrowserWarning";

// Settings
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";
import { isLegacyEdge, isIE } from "react-device-detect";

import { Suspense, useEffect } from "react";
import Link from "next/link";

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

  const shareCompatibility =
    typeof navigator !== "undefined" ? navigator.share : "";

  return (
    <Flex
      display="flex"
      minH="100vh"
      direction="row"
      bg={useColorModeValue("gray.50", "inherit")}
    >
      <Flex direction="column" p={5}>
        <Stack direction="column" spacing={2}>
          <Link href="/" passHref>
            <IconButton
              icon={<FiHome />}
              aria-label="Go Home"
              size="lg"
              as="a"
            />
          </Link>
          <IconButton
            icon={<FiFilePlus />}
            aria-label="Create and Contribute"
            size="lg"
            isDisabled
          />
        </Stack>
        <Spacer />
        <Stack direction="column" spacing={2}>
          {shareCompatibility ? (
            <>
              {showShareButton ?? (
                <IconButton
                  icon={<FiShare />}
                  aria-label="Share"
                  size="lg"
                  onClick={Share}
                />
              )}
            </>
          ) : null}
          <Link href="/settings" passHref>
            <IconButton
              icon={<FiSettings />}
              aria-label="Settings"
              size="lg"
              as="a"
            />
          </Link>
          <Link href="/docs/introduction" passHref>
            <IconButton
              icon={<FiLifeBuoy />}
              aria-label="Get Help with Documentation"
              size="lg"
              as="a"
            />
          </Link>
        </Stack>
      </Flex>
      {/* Page content */}
      <Box flex={1}>{children}</Box>
    </Flex>
  );
}
