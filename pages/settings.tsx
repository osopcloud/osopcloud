// Types
import type { ReactElement } from "react";

// Routing
import Link from "next/link";

// SEO
import Head from "next/head";

// Design
import { Button, Heading, Stack, Text } from "@chakra-ui/react";
import { VercelLogo } from "components/brand/VercelPromotion";

// Layouts
import Layout from "components/layouts/Layout";
import { FiLayout, FiLifeBuoy, FiSettings, FiTrash2 } from "react-icons/fi";

// Start page
export default function Settings() {
  return (
    <>
      <Head>
        <title>Settings &mdash; Osopcloud</title>
        <meta name="description" content="Customise and configure Osopcloud." />
        <meta name="og:title" content="Osopcloud Settings" />
        <meta
          name="og:description"
          content="Customise and configure Osopcloud."
        />
      </Head>

      <Stack direction="column" spacing={5}>
        <Heading>Settings</Heading>
        <Stack direction="column" spacing={2}>
          <Link href="/settings/general" passHref>
            <Button leftIcon={<FiLayout />} as="a">
              Appearance &amp; Layout
            </Button>
          </Link>
          <Link href="/settings/advanced" passHref>
            <Button leftIcon={<FiSettings />} as="a">
              Advanced Settings
            </Button>
          </Link>
          <Link href="/settings/manage-data" passHref>
            <Button leftIcon={<FiTrash2 />} as="a">
              Manage Data &amp; Reset
            </Button>
          </Link>
        </Stack>
        <Link href="/docs/getting-started" passHref>
          <Button leftIcon={<FiLifeBuoy />} as="a">
            Osopcloud Documentation
          </Button>
        </Link>
        <Button colorScheme="black" bg="black" color="white" variant="solid">
          <Text me={2}>Powered by</Text>
          <VercelLogo />
        </Button>
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
