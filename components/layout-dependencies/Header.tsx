// Routing
import Link from "next/link";
import { useRouter } from "next/router";

// Design
import {
  Box,
  Center,
  Container,
  Flex,
  Icon,
  IconButton,
  Spacer,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiChevronLeft, FiMoon, FiSettings, FiSun } from "react-icons/fi";

// First-party components
import { Logo } from "components/brand/Logo";

// Settings
import { useLocalStorage } from "@rehooks/local-storage";
import { isMacOs } from "react-device-detect";

// Start component
export default function Header() {
  const router = useRouter();

  // Get settings
  const [backButtonLargeWindows] = useLocalStorage(
    "settingsAlwaysShowBackButton"
  );
  const [sessionThemeToggle] = useLocalStorage("settingsShowThemeToggle");
  const { toggleColorMode } = useColorMode();
  const themeToggleIcon = useColorModeValue(<FiMoon />, <FiSun />);

  return (
    <Flex as="header">
      <Container maxWidth="container.md" py={2}>
        <Flex>
          {backButtonLargeWindows && (
            <Center>
              <IconButton
                icon={<FiChevronLeft />}
                me={5}
                aria-label="Go Back"
                onClick={router.back}
                as="a"
                display={{ base: "none", sm: "flex" }}
              />
            </Center>
          )}
          <Center>
            <IconButton
              icon={<FiChevronLeft />}
              me={5}
              aria-label="Go Back"
              onClick={router.back}
              as="a"
              display={{ base: "flex", sm: "none" }}
            />
          </Center>
          <Tooltip
            label={`Go Home (${isMacOs ? "⌘" : "⌃"}/)`}
            placement={backButtonLargeWindows ? "right" : "left"}
          >
            <Box>
              <Link href="/" passHref>
                <Icon w={20} h={20} cursor="pointer" as="a">
                  <Logo />
                </Icon>
              </Link>
            </Box>
          </Tooltip>
          <Spacer />
          {sessionThemeToggle && (
            <Center>
              <IconButton
                icon={themeToggleIcon}
                me={5}
                aria-label="Toggle the Colour Theme"
                onClick={toggleColorMode}
                display={{ base: "none", sm: "flex" }}
              />
            </Center>
          )}
          <Tooltip
            label={`Open Settings (⇧${isMacOs ? "⌘" : "⌃"},)`}
            placement="right"
          >
            <Center>
              <Link href="/settings" passHref>
                <IconButton
                  icon={<FiSettings />}
                  aria-label="Open Settings"
                  as="a"
                />
              </Link>
            </Center>
          </Tooltip>
        </Flex>
      </Container>
    </Flex>
  );
}
