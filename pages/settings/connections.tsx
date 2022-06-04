// Types
import type { ReactElement } from "react";

// SEO
import Head from "next/head";

// Design
import {
  Button,
  Center,
  Flex,
  Heading,
  Spacer,
  Stack,
  Switch,
  Text,
  useColorMode,
} from "@chakra-ui/react";

// First party components

// Layouts
import Layout from "components/layouts/Layout";
import SettingsLayout from "components/layouts/SettingsLayout";

// Settings
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";

// Start page
export default function ConnectionsSettings() {
  // Get settings
  const [printButton] = useLocalStorage("settingsShowPrintButton");

  return (
    <>
      <Head>
        <title>Connections Settings &mdash; Osopcloud</title>
        <meta
          name="description"
          content="Configure how Osopcloud interfaces with other apps and services."
        />
        <meta name="og:title" content="Connections Settings" />
        <meta
          name="og:description"
          content="Configure how Osopcloud interfaces with other applications."
        />
      </Head>

      <Heading size="md">Appearance &amp; Layout Settings</Heading>
      <Flex>
        <Center>
          <Stack direction="column" spacing={0}>
            <Text>Use Dynamic Printing</Text>
            <Text fontSize="xs">
              Only show content when printing. To print the full page, use the
              browser menu.
            </Text>
          </Stack>
        </Center>
        <Spacer />
        <Center>
          <Switch
            // @ts-ignore
            isChecked={printButton}
            onChange={() =>
              writeStorage(
                "settingsShowPrintButton",
                printButton ? false : true
              )
            }
            colorScheme="almondScheme"
            size="lg"
          />
        </Center>
      </Flex>
    </>
  );
}
ConnectionsSettings.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout showToTopButton={false} showShareButton={false}>
      <SettingsLayout>{page}</SettingsLayout>
    </Layout>
  );
};
