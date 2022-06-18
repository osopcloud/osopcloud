// Types
import type { ReactElement } from "react";

// SEO
import Head from "next/head";

// Design
import { Center, Flex, Spacer, Switch, Text } from "@chakra-ui/react";

// First party components

// Layouts
import Layout from "components/layouts/Layout";
import SettingsLayout from "components/layouts/SettingsLayout";

// Settings
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";
import CheckConnectionOverlay from "components/settings/CheckConnectionOverlay";

// Start page
export default function NetworkSettings() {
  return (
    <>
      <Head>
        <title>Update &amp; Network Settings &mdash; Osopcloud</title>
        <meta
          name="description"
          content="Configure how Osopcloud updates and interfaces with the network."
        />
        <meta name="og:title" content="Osopcloud Networking Settings" />
        <meta
          name="og:description"
          content="Configure Osopcloud updates and networking."
        />
      </Head>

      <Flex>
        <Center>
          <Text>Install Updates Immediately</Text>
        </Center>
        <Spacer />
        <Switch colorScheme="almondScheme" size="lg" isDisabled />
      </Flex>
      <CheckConnectionOverlay />
    </>
  );
}
NetworkSettings.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout showToTopButton={false} showShareButton={false}>
      <SettingsLayout sidebarActiveIndex={3}>{page}</SettingsLayout>
    </Layout>
  );
};
