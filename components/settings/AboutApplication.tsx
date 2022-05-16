// Routing
import Link from "next/link";

// Design
import {
  Button,
  Flex,
  Icon,
  Spacer,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";
import { Logo } from "components/brand/Logo";

// First party components
import DynamicModal from "components/overlays/DynamicModal";

// Settings
import { deleteFromStorage, useLocalStorage } from "@rehooks/local-storage";
import { browserName, browserVersion, osName } from "react-device-detect";

import { useRef } from "react";

export function DeleteSettings() {
  deleteFromStorage("settingsHideNotifications");
  deleteFromStorage("settingsAlwaysShowBackButton");
  deleteFromStorage("settingsShowThemeToggle");
  localStorage.removeItem("settingsFontOverride");
  console.info(
    "All preferences in LocalStorage have been cleared - using default settings"
  );
}

// Start component
export default function AboutApplication() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const closeRef: any = useRef();

  // Reset functions
  const [hideNotifications] = useLocalStorage("settingsHideNotifications");
  const [backButtonLargeWindows] = useLocalStorage(
    "settingsAlwaysShowBackButton"
  );
  const [showSessionThemeToggle] = useLocalStorage("settingsShowThemeToggle");
  const accessibleFonts =
    typeof window !== "undefined"
      ? localStorage.getItem("settingsFontOverride")
      : "";
  function BeginReset() {
    DeleteSettings();
    if (accessibleFonts) {
      onClose();
      window.location.reload();
    } else onClose();
  }
  function ResetButton() {
    return (
      <Tooltip label="Reset All Settings and Clear the Cache" placement="right">
        <Button
          leftIcon={<FiTrash2 />}
          // If the user is using accessible fonts, then resetting could make the page unreadable
          // To assist with conveying this, the colorScheme is changed from "warning" to "danger"
          colorScheme={accessibleFonts ? "red" : "orange"}
          onClick={BeginReset}
        >
          Reset Osopcloud
        </Button>
      </Tooltip>
    );
  }
  function ResetDisabled() {
    return (
      <Button leftIcon={<FiTrash2 />} isDisabled>
        Reset Osopcloud
      </Button>
    );
  }
  function Reset() {
    if (hideNotifications) {
      return <ResetButton />;
    } else {
      if (backButtonLargeWindows) {
        return <ResetButton />;
      } else {
        if (showSessionThemeToggle) {
          return <ResetButton />;
        } else {
          if (accessibleFonts) {
            return <ResetButton />;
          } else {
            return <ResetDisabled />;
          }
        }
      }
    }
  }

  return (
    <>
      {isOpen ? (
        <Button isActive>About the Osopcloud Application</Button>
      ) : (
        <Button onClick={onOpen}>About the Osopcloud Application</Button>
      )}

      <DynamicModal
        isOpen={isOpen}
        onClose={onClose}
        cancelRef={closeRef}
        useAlertDialog={false}
      >
        <Stack direction="column" spacing={5}>
          <Icon aria-label="Osopcloud Logo" w={20} h={20}>
            <Logo />
          </Icon>
          <Stack direction="column" spacing={0} fontSize="xs">
            <Text>Osopcloud Web Application</Text>
            <Flex>
              <Text>Version</Text>
              <Spacer />
              <Text>1.0.0</Text>
            </Flex>
            <Flex>
              <Text>Commit</Text>
              <Spacer />
              <Link href="/commit">View</Link>
            </Flex>
            <Flex>
              <Text>Detected Browser</Text>
              <Spacer />
              <Text>
                {/* Sometimes OEM browsers return engine details only, for example PlayStation consoles */}
                {browserName.includes("WebKit")
                  ? "Unknown (like Safari)"
                  : `${browserName} ${browserVersion}`}{" "}
                {/* iPad devices will always return Mac OS, which is potentially confusing */}
                ({osName === "Mac OS" ? "macOS/iPadOS" : osName})
              </Text>
            </Flex>
            <Flex>
              <Text>Technology</Text>
              <Spacer />
              <Text>
                <Link href="https://nextjs.org">Next.js</Link> on{" "}
                <Link href="https://vercel.com">Vercel</Link> (Platform 3)
              </Text>
            </Flex>
            <Flex>
              <Text>UTS</Text>
              <Spacer />
              <Text>
                <Link href="https://ackee.electerious.com">Ackee</Link> on{" "}
                <Link href="https://railway.app">Railway</Link>
              </Text>
            </Flex>
          </Stack>
          <Reset />
          <Button onClick={onClose} ref={closeRef}>
            Close
          </Button>
        </Stack>
      </DynamicModal>
    </>
  );
}
