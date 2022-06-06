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
export default function Custom500() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Server Error &mdash; Osopcloud</title>
        <meta
          name="description"
          content="An expected condition prevented the completion of this request."
        />
        <meta name="og:title" content="Server Error" />
        <meta
          name="og:description"
          content="An expected condition prevented the completion of this request."
        />
      </Head>

      <Stack direction="column" spacing={5}>
        <Heading>Errors Happen in (the web) Space</Heading>
        <Text>
          Unfortunately, an unexpected condition prevented the completion of
          this request.
        </Text>
        <Text>
          Detailed information on this error isn't available at the moment.
        </Text>
        <Text>Try again later as the condition may be temporary.</Text>
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
        <Text fontSize="xs">Error Reference: HTTP 500</Text>
      </Stack>
    </>
  );
}
Custom500.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout showToTopButton={false} showShareButton={false}>
      {page}
    </Layout>
  );
};
