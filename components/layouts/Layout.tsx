// Routing
import Link from "next/link";
import { useRouter } from "next/router";

// Design
import {
  Box,
  Button,
  Flex,
  IconButton,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FiHome,
  FiPlus,
  FiSettings,
  FiShare,
  FiGithub,
  FiChevronLeft,
} from "react-icons/fi";
import { VercelLogo } from "components/brand/VercelPromotion";

// Settings
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";

import { useEffect } from "react";

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
  const router = useRouter();

  // Get settings
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
    // Create a flex container
    <Flex
      display="flex"
      direction="row"
      bg={useColorModeValue("gray.50", "inherit")}
    >
      {/* Create a persistent sidebar */}
      <Flex
        h="100vh"
        bg={useColorModeValue("gray.50", "inherit")}
        position="fixed"
        top="0"
        left="0"
        overflow="auto"
        zIndex={1}
      >
        <Flex direction="column" p={5}>
          {backButtonLargeWindows && (
            <IconButton
              icon={<FiChevronLeft />}
              aria-label="Go Back"
              size="lg"
              mb={5}
              onClick={router.back}
            />
          )}
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
              icon={<FiPlus />}
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
          </Stack>
        </Flex>
      </Flex>

      {/* Make sure the children are not obstructed the sidebar */}
      <Flex
        minH="100vh"
        w="100%"
        position="relative"
        overflow="hidden"
        direction="column"
        ps={100}
      >
        <Flex flex={1} p={5} pe={10} py={10}>
          <Box w="100%">{children}</Box>
        </Flex>
        <Flex p={5} pe={10}>
          <Stack direction="row" spacing={2}>
            <Link href="https://github.com/osopcloud/osopcloud" passHref>
              <Button leftIcon={<FiGithub />} size="sm" as="a">
                GitHub
              </Button>
            </Link>
            <Link href="/docs/introduction" passHref>
              <Button size="sm" as="a">
                Documentation
              </Button>
            </Link>
            <Link href="/docs/keyboard-shortcuts" passHref>
              <Button size="sm" as="a">
                Keyboard Shortcuts
              </Button>
            </Link>
            <Link href="/about/privacy" passHref>
              <Button size="sm" as="a">
                Privacy
              </Button>
            </Link>
            <Link href="/about/terms" passHref>
              <Button size="sm" as="a">
                Terms
              </Button>
            </Link>
          </Stack>
          <Spacer />
          <Button
            colorScheme="black"
            bg="black"
            color="white"
            variant="solid"
            size="sm"
          >
            <Text me={2}>Powered by</Text>
            <VercelLogo />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
