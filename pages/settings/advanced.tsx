// Types
import type { ReactElement } from "react";

// SEO
import Head from "next/head";

// Design
import {
  Center,
  Flex,
  Heading,
  Spacer,
  Spinner,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";

// First party components
import { version } from "components/Version";
import CheckPWA from "lib/CheckPWA";

// Layouts
import Layout from "components/layouts/Layout";
import SettingsLayout from "components/layouts/SettingsLayout";

// Settings
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";

import { useState } from "react";

// Start page
export default function AdvancedSettings() {
  // Get settings
  const [disableDonationLinks] = useLocalStorage(
    "settingsDisableDonationLinks"
  );
  const [systemFont] = useLocalStorage("settingsUseSystemFont");
  const [showDeveloperOptions] = useLocalStorage(
    "settingsShowDeveloperOptions"
  );

  const [applyingCustomFont, setApplyingCustomFont] = useState(false);

  return (
    <>
      <Head>
        <title>Advanced Settings &mdash; Osopcloud</title>
        <meta
          name="description"
          content="Customise advanced Osopcloud features with Settings."
        />
        <meta name="og:title" content="Advanced Settings" />
        <meta
          name="og:description"
          content="Customise advanced Osopcloud features."
        />
      </Head>

      <Heading size="md">Advanced Settings</Heading>
      <Flex>
        <Center>
          <Text>Hide Links to External Financial Services</Text>
        </Center>
        <Spacer />
        <Switch
          // @ts-ignore
          isChecked={disableDonationLinks}
          onChange={() => {
            writeStorage(
              "settingsDisableDonationLinks",
              disableDonationLinks ? false : true
            );
          }}
          colorScheme="almondScheme"
          size="lg"
        />
      </Flex>
      <Flex>
        <Center>
          <Text>Use the System Font</Text>
        </Center>
        <Spacer />
        <Stack direction="row" spacing={5}>
          {/* If applying the custom font, show a Spinner */}
          {applyingCustomFont && (
            <Center>
              <Spinner size="xs" />
            </Center>
          )}
          <Switch
            // @ts-ignore
            isChecked={systemFont}
            onChange={() => {
              setApplyingCustomFont(true);
              writeStorage("settingsUseSystemFont", systemFont ? false : true);
              window.location.reload();
            }}
            colorScheme="almondScheme"
            size="lg"
          />
        </Stack>
      </Flex>
      <Flex>
        <Center>
          <Text>Show Developer Options</Text>
        </Center>
        <Spacer />

        <Switch
          // @ts-ignore
          isChecked={showDeveloperOptions}
          onChange={() => {
            writeStorage(
              "settingsShowDeveloperOptions",
              showDeveloperOptions ? false : true
            );
          }}
          colorScheme="almondScheme"
          size="lg"
        />
      </Flex>
      <Stack direction="column" spacing={0}>
        <Text fontSize="xs">Version {version}</Text>
        <Text fontSize="xs">
          {CheckPWA() ? "Standalone Application" : "Web Browser Dependent"}
        </Text>
      </Stack>
    </>
  );
}
AdvancedSettings.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout showToTopButton={false} showShareButton={false}>
      <SettingsLayout>{page}</SettingsLayout>
    </Layout>
  );
};
