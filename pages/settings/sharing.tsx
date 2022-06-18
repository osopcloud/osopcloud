// Types
import type { ReactElement } from "react";

// Suspense
import { Suspense } from "react";
import Loading from "components/Loading";

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
export default function SharingSettings() {
  // Get settings
  const [disableDynamicPrinting] = useLocalStorage(
    "settingsDisableDynamicPrinting"
  );
  const [switchLabels] = useLocalStorage("settingsShowSwitchLabels");

  return (
    <>
      <Head>
        <title>Sharing Settings &mdash; Osopcloud</title>
        <meta
          name="description"
          content="Configure how Osopcloud interfaces with other apps and services."
        />
        <meta name="og:title" content="Osopcloud Sharing Settings" />
        <meta
          name="og:description"
          content="Configure how Osopcloud interfaces with other apps."
        />
      </Head>

      <Flex>
        <Center>
          <Stack direction="column" spacing={0}>
            <Text>Disable Dynamic Printing</Text>
            <Text fontSize="xs">
              Print the full page when using the sidebar printing option or the
              Command + P shortcut.
            </Text>
          </Stack>
        </Center>
        <Spacer />
        <Suspense fallback={<Loading />}>
          <Center>
            <Stack direction="row" spacing={5}>
              {switchLabels && (
                <Center>
                  <Text fontSize="xs">
                    {disableDynamicPrinting ? "on" : "off"}
                  </Text>
                </Center>
              )}
              <Switch
                // @ts-ignore
                isChecked={disableDynamicPrinting}
                onChange={() =>
                  writeStorage(
                    "settingsDisableDynamicPrinting",
                    disableDynamicPrinting ? false : true
                  )
                }
                colorScheme="almondScheme"
                size="lg"
              />
            </Stack>
          </Center>
        </Suspense>
      </Flex>
    </>
  );
}
SharingSettings.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout showToTopButton={false} showShareButton={false}>
      <SettingsLayout sidebarActiveIndex={2}>{page}</SettingsLayout>
    </Layout>
  );
};
