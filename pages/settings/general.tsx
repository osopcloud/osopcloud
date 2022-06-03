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
export default function GeneralSettings() {
  // Get settings
  const [backButtonLargeWindows] = useLocalStorage(
    "settingsAlwaysShowBackButton"
  );
  const [showTagsOnHome] = useLocalStorage("settingsShowTagsOnHome");

  const { toggleColorMode } = useColorMode();

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
          <Text>Show the Back Button on Large Windows</Text>
        </Center>
        <Spacer />
        <Switch
          // @ts-ignore
          isChecked={backButtonLargeWindows}
          onChange={() =>
            writeStorage(
              "settingsAlwaysShowBackButton",
              backButtonLargeWindows ? false : true
            )
          }
          colorScheme="almondScheme"
          size="lg"
        />
      </Flex>
      <Flex>
        <Center>
          <Text>Use the Opposite Colour Mode for this Session</Text>
        </Center>
        <Spacer />
        <Button size="sm" onClick={toggleColorMode}>
          Toggle
        </Button>
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
