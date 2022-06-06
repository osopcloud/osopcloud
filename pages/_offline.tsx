// Types
import type { ReactElement } from "react";

// Routing
import Link from "next/link";
import { useRouter } from "next/router";

// SEO
import Head from "next/head";

// Design
import { Button, Heading, Stack, Text } from "@chakra-ui/react";

// Layouts
import Layout from "components/layouts/Layout";
import { FiArrowLeft, FiChevronLeft, FiRefreshCw } from "react-icons/fi";

// Start page
export default function Offline() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>You're Offline &mdash; Osopcloud</title>
        <meta name="description" content="It looks like you're offline." />
        <meta name="og:title" content="You're Offline" />
        <meta name="og:description" content="It looks like you're offline." />
      </Head>

      <Stack direction="column" spacing={5}>
        <Heading>We Can't Reach the Server</Heading>
        <Text>Unfortunately, it looks like your device is offline.</Text>
        <Text>
          Check your data and networking settings and then return to Osopcloud.
        </Text>
        <Text>Or, try again later as the condition may be temporary.</Text>
        <Stack direction="column" spacing={2}>
          <Link href="/" passHref>
            <Button leftIcon={<FiArrowLeft />} as="a">
              Go Home
            </Button>
          </Link>
          <Button leftIcon={<FiChevronLeft />} onClick={router.back} as="a">
            Go Back
          </Button>
          <Button leftIcon={<FiRefreshCw />} onClick={router.reload} as="a">
            Try Again
          </Button>
        </Stack>
        <Text fontSize="xs">Error Reference: 1302</Text>
      </Stack>
    </>
  );
}
Offline.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout showToTopButton={false} showShareButton={false}>
      {page}
    </Layout>
  );
};
