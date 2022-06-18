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
import {
  FiHardDrive,
  FiLayout,
  FiLifeBuoy,
  FiShare,
  FiUser,
  FiWifi,
} from "react-icons/fi";

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
        <Heading>Options</Heading>
        <Stack direction="column" spacing={2}>
          <Link href="/settings/general" passHref>
            <Button leftIcon={<FiLayout />} as="a">
              Appearance
            </Button>
          </Link>
          <Link href="/settings/accessibility" passHref>
            <Button leftIcon={<FiUser />} as="a">
              Accessibility
            </Button>
          </Link>
          <Link href="/settings/sharing" passHref>
            <Button leftIcon={<FiShare />} as="a">
              Sharing &amp; Printing
            </Button>
          </Link>
          <Link href="/settings/network" passHref>
            <Button leftIcon={<FiWifi />} as="a">
              Updates &amp; Network
            </Button>
          </Link>
          <Link href="/settings/storage" passHref>
            <Button leftIcon={<FiHardDrive />} as="a">
              Application Storage
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
