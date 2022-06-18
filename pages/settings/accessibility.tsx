// Types
import type { ReactElement } from "react";

// SEO
import Head from "next/head";

// Design
import {
  Center,
  Flex,
  Spacer,
  Spinner,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";

// First party components

// Layouts
import Layout from "components/layouts/Layout";
import SettingsLayout from "components/layouts/SettingsLayout";

// Settings
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";

import { useState } from "react";

// Start page
export default function AdvancedSettings() {
  // Get settings
  const [systemFont] = useLocalStorage("settingsUseSystemFont");
  const [switchLabels] = useLocalStorage("settingsShowSwitchLabels");
  const [settingsDisableCOKeyboardShortcuts] = useLocalStorage(
    "settingsDisableCOKeyboardShortcuts"
  );

  const [applyingCustomFont, setApplyingCustomFont] = useState(false);

  return (
    <>
      <Head>
        <title>Accessibility Settings &mdash; Osopcloud</title>
        <meta
          name="description"
          content="Customise Osopcloud to make it more accessible."
        />
        <meta name="og:title" content="Osopcloud Accessibility Settings" />
        <meta name="og:description" content="Make Osopcloud more accessible." />
      </Head>

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
          {switchLabels && (
            <Center>
              <Text fontSize="xs">
                {applyingCustomFont
                  ? systemFont
                    ? "turning on"
                    : "turning off"
                  : systemFont
                  ? "on"
                  : "off"}
              </Text>
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
          <Text>Show Labels on Switches</Text>
        </Center>
        <Spacer />
        <Stack direction="row" spacing={5}>
          <Center>
            <Text fontSize="xs">{switchLabels ? "on" : "off"}</Text>
          </Center>
          <Switch
            // @ts-ignore
            isChecked={switchLabels}
            onChange={() => {
              writeStorage(
                "settingsShowSwitchLabels",
                switchLabels ? false : true
              );
            }}
            colorScheme="almondScheme"
            size="lg"
          />
        </Stack>
      </Flex>
      <Flex>
        <Center>
          <Text>Disable Character-Only Keyboard Shortcuts</Text>
        </Center>
        <Spacer />
        <Stack direction="row" spacing={5}>
          {switchLabels && (
            <Center>
              <Text fontSize="xs">
                {settingsDisableCOKeyboardShortcuts ? "on" : "off"}
              </Text>
            </Center>
          )}
          <Switch
            // @ts-ignore
            isChecked={settingsDisableCOKeyboardShortcuts}
            onChange={() => {
              writeStorage(
                "settingsDisableCOKeyboardShortcuts",
                settingsDisableCOKeyboardShortcuts ? false : true
              );
            }}
            colorScheme="almondScheme"
            size="lg"
          />
        </Stack>
      </Flex>
    </>
  );
}
AdvancedSettings.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout showToTopButton={false} showShareButton={false}>
      <SettingsLayout sidebarActiveIndex={1}>{page}</SettingsLayout>
    </Layout>
  );
};
