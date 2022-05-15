// Types
import type { ReactElement } from "react";

// SEO

// Design
import {
  Button,
  Heading,
  Stack,
  Text,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";

// First-party components
import ChangeApplicationFont from "components/settings/ChangeApplicationFont";
import AboutApplication from "components/settings/AboutApplication";

// Layouts
import Layout from "components/layouts/Layout";

// Settings
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";
import { isMacOs } from "react-device-detect";

// Start page
export default function Settings() {
  // Get settings
  const [hideNotifications] = useLocalStorage("settingsHideNotifications");
  const [backButtonLargeWindows] = useLocalStorage(
    "settingsAlwaysShowBackButton"
  );
  const [showSessionThemeToggle] = useLocalStorage("settingsShowThemeToggle");

  const { toggleColorMode } = useColorMode();

  return (
    <Stack direction="column" spacing={5}>
      <Heading>Osopcloud Settings</Heading>
      <Text>
        Use Settings to customise how Osopcloud looks and configure how it
        behaves.
      </Text>
      <Stack direction="column" spacing={2}>
        <Button
          onClick={(_) => {
            writeStorage(
              "settingsHideNotifications",
              hideNotifications ? false : true
            );
          }}
        >
          {hideNotifications ? "Disable" : "Enable"} Focus Mode
        </Button>
        <Tooltip label={`⌥${isMacOs ? "⌘" : "⌃"}←`} placement="right">
          <Button
            display={{ base: "none", sm: "block" }}
            onClick={(_) => {
              writeStorage(
                "settingsAlwaysShowBackButton",
                backButtonLargeWindows ? false : true
              );
            }}
          >
            {backButtonLargeWindows ? "Hide" : "Show"} the Back Button on Large
            Windows
          </Button>
        </Tooltip>
        <Button
          display={{ base: "none", sm: "block" }}
          onClick={(_) => {
            writeStorage(
              "settingsShowThemeToggle",
              showSessionThemeToggle ? false : true
            );
          }}
        >
          {showSessionThemeToggle ? "Hide" : "Show"} the Session Theme Toggle
        </Button>
        <Button
          display={{ base: "block", sm: "none" }}
          onClick={toggleColorMode}
        >
          Toggle the Session Theme
        </Button>
      </Stack>
      <Stack direction="column" spacing={2}>
        <Button isDisabled>Disable Donation Features</Button>
      </Stack>
      <Stack direction="column" spacing={2}>
        <ChangeApplicationFont />
        <AboutApplication />
      </Stack>
    </Stack>
  );
}
Settings.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout showToTopButton={false} showShareButton={false}>
      {page}
    </Layout>
  );
};
