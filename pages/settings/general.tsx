// Types
import type { ReactElement } from "react";

// SEO
import Head from "next/head";

// Design
import { Center, Flex, Heading, Spacer, Switch, Text } from "@chakra-ui/react";

// First party components

// Layouts
import Layout from "components/layouts/Layout";
import SettingsLayout from "components/layouts/SettingsLayout";

// Settings
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";

// Start page
export default function GeneralSettings() {
  // Get settings
  const [showTagsOnHome] = useLocalStorage("settingsShowTagsOnHome");
  const [showPrintButton] = useLocalStorage("settingsShowPrintButton");

  return (
    <>
      <Head>
        <title>Appearance &amp; Layout Settings &mdash; Osopcloud</title>
        <meta
          name="description"
          content="Customise how Osopcloud looks with Settings."
        />
        <meta name="og:title" content="Appearance Settings" />
        <meta name="og:description" content="Customise how Osopcloud looks." />
      </Head>

      <Heading size="md">Appearance &amp; Layout Settings</Heading>
      <Flex>
        <Center>
          <Text>Show All Tags on Home</Text>
        </Center>
        <Spacer />
        <Switch
          // @ts-ignore
          isChecked={showTagsOnHome}
          onChange={() =>
            writeStorage(
              "settingsShowTagsOnHome",
              showTagsOnHome ? false : true
            )
          }
          colorScheme="almondScheme"
          size="lg"
        />
      </Flex>
      <Flex>
        <Center>
          <Text>Show Printing Options in the Sidebar</Text>
        </Center>
        <Spacer />
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
      </Flex>
    </>
  );
}
GeneralSettings.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout showToTopButton={false} showShareButton={false}>
      <SettingsLayout>{page}</SettingsLayout>
    </Layout>
  );
};
