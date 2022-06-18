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
import { version } from "components/Version";

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
            <Text fontSize="xs">off</Text>
          </Center>
          <Switch colorScheme="almondScheme" size="lg" isDisabled />
        </Stack>
      </Flex>
      <Flex>
        <Center>
          <Text>Disable Character-Only Keyboard Shortcuts</Text>
        </Center>
        <Spacer />
        <Switch colorScheme="almondScheme" size="lg" isDisabled />
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
