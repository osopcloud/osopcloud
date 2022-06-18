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
import { FiArrowLeft, FiChevronLeft } from "react-icons/fi";

// Start page
export default function Custom404() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>There's Nothing to Show Here &mdash; Osopcloud</title>
        <meta name="description" content="There isn't a page to show here." />
        <meta name="og:title" content="Page Not Found" />
        <meta
          name="og:description"
          content="There isn't a page to show here."
        />
      </Head>

      <Stack direction="column" spacing={5}>
        <Heading>We're Lost in (the web) Space</Heading>
        <Text>Unfortunately, there's nothing to show here.</Text>
        <Text>Let's blast past the clouds and go somewhere interesting.</Text>
        <Stack direction="column" spacing={2}>
          <Link href="/" passHref>
            <Button leftIcon={<FiArrowLeft />} as="a">
              Go Home
            </Button>
          </Link>
          <Button leftIcon={<FiChevronLeft />} onClick={router.back} as="a">
            Go Back
          </Button>
        </Stack>
        <Text fontSize="xs">Error Reference: HTTP 404</Text>
      </Stack>
    </>
  );
}
Custom404.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout showToTopButton={false} showShareButton={false}>
      {page}
    </Layout>
  );
};
