// Types
import type { ReactElement } from "react";

// Routing
import Link from "next/link";

// SEO
import Head from "next/head";

// Design
import {
  Button,
  Center,
  Heading,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { VercelLogo } from "components/brand/VercelPromotion";

// First-party components
import ChangeHomeMetadataView from "components/settings/ChangeHomeMetadataView";
import ChangeApplicationFont from "components/settings/ChangeApplicationFont";
import ManageSettings from "components/settings/ManageSettings";
import { version } from "components/Version";

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
  const [disableDonationOptions] = useLocalStorage(
    "settingsDisableDonationOptions"
  );
  const accessibleFonts =
    typeof window !== "undefined"
      ? localStorage.getItem("settingsFontOverride")
      : "";

  const { toggleColorMode } = useColorMode();

  return (
    <>
      <Head>
        <title>Settings &mdash; Osopcloud</title>
        <meta
          name="description"
          content="Customise and configure Osopcloud with Settings."
        />
        <meta name="og:title" content="Settings" />
        <meta
          name="og:description"
          content="Customise and configure Osopcloud."
        />
      </Head>

      <Stack direction="column" spacing={5}>
        <Heading>Osopcloud Settings</Heading>
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
          <Button
            display={{ base: "none", sm: "flex" }}
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
            display={{ base: "flex", sm: "none" }}
            onClick={toggleColorMode}
          >
            Toggle the Session Theme
          </Button>
        </Stack>
        <Stack direction="column" spacing={2}>
          <ChangeHomeMetadataView />
          <ChangeApplicationFont />
        </Stack>
        <Stack direction="column" spacing={2}>
          <Button
            onClick={(_) =>
              writeStorage(
                "settingsDisableDonationOptions",
                disableDonationOptions ? false : true
              )
            }
          >
            {disableDonationOptions ? "Enable" : "Disable"} Donation Features
          </Button>
        </Stack>
        <Stack direction="column" spacing={2}>
          <ManageSettings />
        </Stack>
        <Link href="/docs/introduction" passHref>
          <Button display={{ base: "flex", sm: "none" }} as="a">
            Osopcloud Documentation
          </Button>
        </Link>
        <Button
          aria-label="Powered by Vercel"
          display={{ base: "flex", md: "none" }}
          isDisabled
        >
          <Stack direction="row" spacing={2}>
            <Text>Powered by</Text>
            <Center>
              <VercelLogo />
            </Center>
          </Stack>
        </Button>
        <Stack direction="column" spacing={0} fontSize="xs">
          <Text>Osopcloud Web Application</Text>
          <Text>
            Version {version} (<Link href="/commit">View Commit</Link>)
          </Text>
          <Text>
            <Link href="https://nextjs.org">Next.js</Link> technology on{" "}
            <Link href="https://vercel.com">Vercel</Link>
          </Text>
          <Text>
            Set in{" "}
            {accessibleFonts === "true"
              ? "Atkinson Hyperlegible"
              : accessibleFonts === "system"
              ? "the System Font"
              : "Public Sans"}
          </Text>
        </Stack>
      </Stack>
    </>
  );
}
Settings.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout showToTopButton={false} showShareButton={false}>
      {page}
    </Layout>
  );
};
