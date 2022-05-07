// Types
import type { ReactElement } from "react";

// Routing
import Link from "next/link";

// SEO

// Design
import { Button, Heading, Stack, Text, Tooltip } from "@chakra-ui/react";

// First-party components
import ChangeApplicationFont from "components/settings/ChangeApplicationFont";
import AboutApplication from "components/settings/AboutApplication";

// Layouts
import Layout from "components/layouts/Layout";

// Settings
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";

// Start page
export default function Settings() {
  // Get settings
  const [hideNotifications] = useLocalStorage("settingsHideNotifications");
  const [backButtonLargeWindows] = useLocalStorage(
    "settingsAlwaysShowBackButton"
  );
  const [showSessionThemeToggle] = useLocalStorage("settingsShowThemeToggle");

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
          {hideNotifications ? "Allow All" : "Hide Most"} Notifications
        </Button>
        <Tooltip label="&#8997;&#8984;&#8592;" placement="right">
          <Button
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
          onClick={(_) => {
            writeStorage(
              "settingsShowThemeToggle",
              showSessionThemeToggle ? false : true
            );
          }}
        >
          {showSessionThemeToggle ? "Hide" : "Show"} the Session Theme Toggle
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
