// Types
import type { ReactElement } from "react";

// SEO
import Head from "next/head";

// Design
import { Text } from "@chakra-ui/react";

// First party components
import ErrorPageFramework from "components/layouts/ErrorPageFramework";

// Layouts
import Layout from "components/layouts/Layout";

// Start page
export default function Offline() {
  return (
    <>
      <Head>
        <title>Osopcloud &mdash; Offline</title>
        <meta name="description" content="It looks like you're offline." />
        <meta name="og:title" content="You're Offline" />
        <meta name="og:description" content="It looks like you're offline." />
      </Head>

      <ErrorPageFramework heading="We Can't Reach the Server" errorCode={1}>
        <Text>Unfortunately, it looks like your device is offline.</Text>
        <Text>
          Check your data and networking settings and then return to Osopcloud.
        </Text>
        <Text>Or, try again later as the condition may be temporary.</Text>
      </ErrorPageFramework>
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
