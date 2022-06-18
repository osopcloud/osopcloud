// Types
import type { ReactElement } from "react";

// SEO
import Head from "next/head";

// Design
import { Center, Flex, Spacer, Stack, Switch, Text } from "@chakra-ui/react";

// First party components

// Layouts
import Layout from "components/layouts/Layout";
import SettingsLayout from "components/layouts/SettingsLayout";

// Settings
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";

// Start page
export default function GeneralSettings() {
  // Get settings
  const [showPrintButton] = useLocalStorage("settingsShowPrintButton");
  const [switchLabels] = useLocalStorage("settingsShowSwitchLabels");

  return (
    <>
      <Head>
        <title>Appearance Settings &mdash; Osopcloud</title>
        <meta
          name="description"
          content="Customise how Osopcloud looks with Settings."
        />
        <meta name="og:title" content="Appearance Settings" />
        <meta name="og:description" content="Customise how Osopcloud looks." />
      </Head>

      <Flex>
        <Center>
          <Text>Show Printing Options in the Sidebar</Text>
        </Center>
        <Spacer />
        <Stack direction="row" spacing={5}>
          {switchLabels && (
            <Center>
              <Text fontSize="xs">{showPrintButton ? "on" : "off"}</Text>
            </Center>
          )}
          <Switch
            // @ts-ignore
            isChecked={showPrintButton}
            onChange={() =>
              writeStorage(
                "settingsShowPrintButton",
                showPrintButton ? false : true
              )
            }
            colorScheme="almondScheme"
            size="lg"
          />
        </Stack>
      </Flex>
    </>
  );
}
GeneralSettings.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout showToTopButton={false} showShareButton={false}>
      <SettingsLayout sidebarActiveIndex={0}>{page}</SettingsLayout>
    </Layout>
  );
};
