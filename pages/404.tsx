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
export default function Custom404() {
  return (
    <>
      <Head>
        <title>Osopcloud &mdash; 404</title>
        <meta name="description" content="There isn't a page to show here." />
        <meta name="og:title" content="Page Not Found" />
        <meta
          name="og:description"
          content="There isn't a page to show here."
        />
      </Head>

      <ErrorPageFramework
        heading="We're Lost in (the web) Space"
        errorCode="HTTP 404"
      >
        <Text>Unfortunately, there's nothing to show here.</Text>
        <Text>Let's blast past the clouds and go somewhere interesting.</Text>
      </ErrorPageFramework>
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
