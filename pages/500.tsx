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
export default function Custom500() {
  return (
    <>
      <Head>
        <title>Osopcloud &mdash; 500</title>
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

      <ErrorPageFramework
        heading="Errors Happen in (the web) Space"
        errorCode="HTTP 500"
      >
        <Text>
          Unfortunately, an unexpected condition prevented the completion of
          this request.
        </Text>
        <Text>
          Detailed information on this error isn't available at the moment.
        </Text>
      </ErrorPageFramework>
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
