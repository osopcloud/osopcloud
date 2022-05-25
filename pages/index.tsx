// Types
import type { ReactElement } from "react";

// Routing

// SEO

// Design
import { Heading, Stack, Text, SimpleGrid } from "@chakra-ui/react";

// First-party components

// Layouts
import Layout from "components/layouts/Layout";

// Start page
export default function Home() {
  return (
    <Stack direction="column" spacing={5}>
      <Heading>Home</Heading>
      <SimpleGrid minChildWidth="350px">
        <Text>This is the new Osopcloud.</Text>
        <Text>More text</Text>
      </SimpleGrid>
    </Stack>
  );
}
Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout showToTopButton={true}>{page}</Layout>;
};
