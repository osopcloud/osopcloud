// Suspense
import { Suspense } from "react";
import Loading from "components/system/Loading";

// Routing
import Link from "next/link";
import { useRouter } from "next/router";

// Design
import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  IconButton,
  DarkMode,
  Spacer,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FiPlus,
  FiShare,
  FiGithub,
  FiPrinter,
  FiMoreVertical,
  FiEdit,
  FiArrowLeft,
} from "react-icons/fi";
import { AnimatePresence, m } from "framer-motion";
import { HeaderLogo, LogoNoColour } from "components/brand/Logo";

// First party components
import CheckPWA from "lib/CheckPWA";

// Settings
import { useLocalStorage } from "@rehooks/local-storage";

import { useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
  showShareButton?: boolean;
  showToTopButton: boolean;
  sidebarActiveIndex?: number;
}

// Start component
export default function Layout({
  children,
  showShareButton,
  sidebarActiveIndex,
}: LayoutProps) {
  const router = useRouter();

  // Get settings
  const [showPrintButton] = useLocalStorage("settingsShowPrintButton");
  const [disableDynamicPrinting] = useLocalStorage(
    "settingsDisableDynamicPrinting"
  );

  // Share experience
  function Share() {
    if (navigator.share) {
      const url = document.location.href;
      navigator
        .share({
          title: document.title,
          text: `Discover ${document.title} on Osopcloud`,
          url: url,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) =>
          console.warn("Unable to complete sharing (8)", error)
        );
    }
  }

  // Dynamic printing
  function Print() {
    if (disableDynamicPrinting) {
      window.print();
    } else {
      DynamicPrint();
    }
  }
  function DynamicPrint() {
    // @ts-ignore
    const printContents = document.getElementById("printRegion").innerHTML;

    // Set the DOM to the defined region and print it
    document.body.innerHTML = printContents;
    window.print();

    // Exit the print mode when the print dialog is closed
    window.location.reload();
  }

  // Layout keyboard shortcuts
  useEffect(() => {
    // If disableDynamicPrinting is not true
    if (!disableDynamicPrinting) {
      const listener = (event: KeyboardEvent) => {
        if (event.metaKey && event.key === "p") {
          event.preventDefault();
          DynamicPrint();
        }
      };
      window.addEventListener("keydown", listener);
      return () => window.removeEventListener("keydown", listener);
    }
  }, [disableDynamicPrinting]);

  const shareCompatibility =
    typeof navigator !== "undefined" ? navigator.share : "";

  function LogoIcon() {
    return (
      <Icon w={8} h={8}>
        <LogoNoColour />
      </Icon>
    );
  }

  return (
    // Create a flex container
    <Flex
      display="flex"
      direction={{ base: "column", sm: "row" }}
      bg={useColorModeValue("gray.50", "inherit")}
    >
      {/* Create a persistent sidebar */}
      <Flex
        h="100vh"
        bg="almond"
        position="fixed"
        top="0"
        left="0"
        overflow="auto"
        zIndex={1}
        display={{ base: "none", sm: "flex" }}
        as="aside"
      >
        <Flex direction="column" p={5}>
          <Suspense fallback={<Loading />}>
            {CheckPWA() && (
              <>
                <AnimatePresence exitBeforeEnter>
                  <m.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {/* @ts-ignore */}
                    <DarkMode>
                      <Suspense fallback={<Loading />}>
                        <IconButton
                          icon={<FiArrowLeft />}
                          aria-label="Go Back"
                          size="lg"
                          mb={5}
                          onClick={router.back}
                          isDisabled={router.pathname === "/"}
                        />
                      </Suspense>
                    </DarkMode>
                  </m.div>
                </AnimatePresence>
              </>
            )}
          </Suspense>
          <Stack direction="column" spacing={2}>
            {/* @ts-ignore */}
            <DarkMode>
              <Link href="/" passHref>
                <IconButton
                  icon={<LogoIcon />}
                  aria-label="Go Home"
                  size="lg"
                  as="a"
                  isActive={sidebarActiveIndex === 0}
                />
              </Link>
            </DarkMode>
            {/* @ts-ignore */}
            <DarkMode>
              <Link href="/composer" passHref>
                <IconButton
                  icon={<FiEdit />}
                  aria-label="Osopcloud Composer"
                  size="lg"
                  as="a"
                  isActive={sidebarActiveIndex === 1}
                />
              </Link>
            </DarkMode>
          </Stack>
          <Spacer />
          <Stack direction="column" spacing={2}>
            <Suspense fallback={<Loading />}>
              {showShareButton ?? (
                <>
                  <Suspense fallback={<Loading />}>
                    {shareCompatibility ? (
                      <AnimatePresence exitBeforeEnter>
                        <m.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -10, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          {/* @ts-ignore */}
                          <DarkMode>
                            <IconButton
                              icon={<FiShare />}
                              size="lg"
                              aria-label="Share"
                              onClick={Share}
                            />
                          </DarkMode>
                        </m.div>
                      </AnimatePresence>
                    ) : null}
                  </Suspense>
                  <Suspense fallback={<Loading />}>
                    {showPrintButton && (
                      <AnimatePresence exitBeforeEnter>
                        <m.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -10, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          {/* @ts-ignore */}
                          <DarkMode>
                            <IconButton
                              icon={<FiPrinter />}
                              size="lg"
                              aria-label="Print"
                              onClick={Print}
                            />
                          </DarkMode>
                        </m.div>
                      </AnimatePresence>
                    )}
                  </Suspense>
                </>
              )}
            </Suspense>
            {/* @ts-ignore */}
            <DarkMode>
              <Link href="/options" passHref>
                <IconButton
                  icon={<FiMoreVertical />}
                  aria-label="Settings"
                  size="lg"
                  as="a"
                  isActive={sidebarActiveIndex === 2}
                />
              </Link>
            </DarkMode>
          </Stack>
        </Flex>
      </Flex>

      {/* Mobile header */}
      <Flex display={{ base: "flex", sm: "none" }} p={5} as="header">
        <Stack direction="row" spacing={5}>
          <IconButton
            icon={<FiArrowLeft />}
            aria-label="Go Back"
            size="lg"
            onClick={router.back}
          />
          <Center>
            <Link href="/" passHref>
              <Icon w={12} h={12} cursor="pointer" as="a" rounded="xl">
                <HeaderLogo />
              </Icon>
            </Link>
          </Center>
        </Stack>
        <Spacer />
        <Stack direction="row" spacing={2}>
          <Link href="/composer" passHref>
            <IconButton
              icon={<FiPlus />}
              aria-label="Osopcloud Composer"
              size="lg"
              isActive={sidebarActiveIndex === 1}
            />
          </Link>
          <Link href="/options" passHref>
            <IconButton
              icon={<FiMoreVertical />}
              aria-label="Options"
              size="lg"
              as="a"
              isActive={sidebarActiveIndex === 2}
            />
          </Link>
        </Stack>
      </Flex>

      {/* Make sure the children are not obstructed the sidebar */}
      <Flex
        minH="100vh"
        w="100%"
        position="relative"
        overflow="hidden"
        direction="column"
        ps={{ base: 0, sm: 150 }}
      >
        <Flex flex={1} ps={5} pe={{ base: 5, sm: 10 }} pt={20} pb={20}>
          <Box w="100%" id="printRegion" as="main">
            {children}
          </Box>
        </Flex>
        {/* We need a way for noscript users to access these due to legal requirements */}
        <noscript>
          <Stack
            p={5}
            pe={{ base: "inherit", sm: 10 }}
            as="footer"
            direction="row"
            spacing={2}
          >
            <Link href="https://github.com/osopcloud/osopcloud" passHref>
              <Button leftIcon={<FiGithub />} size="sm" as="a">
                GitHub
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
        </noscript>
      </Flex>
    </Flex>
  );
}
