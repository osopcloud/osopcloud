// Types
import type { ReactElement } from "react";

// Routing

// SEO
import Head from "next/head";

// Design
import { Heading, Stack, Text, SimpleGrid } from "@chakra-ui/react";

// First-party components

// Layouts
import Layout from "components/layouts/Layout";

// Start page
export default function Home() {
  return (
    <>
      <Head>
        <title>Discover Open-Source Operating Systems &mdash; Osopcloud</title>
        <meta
          name="description"
          content="Discover Open-Source Operating Systems and Build Open-Source Operating System Culture."
        />
        <meta
          name="og:title"
          content="Discover Open-Source Operating Systems"
        />
        <meta
          name="og:description"
          content="Discover Open-Source Operating Systems and Build Culture."
        />
      </Head>

      <Stack direction="column" spacing={5}>
        <Heading>Home</Heading>
        <SimpleGrid minChildWidth="350px">
          <Text>This is the new Osopcloud.</Text>
          <Text>More text</Text>
        </SimpleGrid>
      </Stack>
    </>
  );
}
Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout showToTopButton={true}>{page}</Layout>;
};
