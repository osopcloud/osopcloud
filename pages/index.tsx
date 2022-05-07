// Types
import type { ReactElement } from "react";

// Routing

// SEO

// Design
import { Heading, Text } from "@chakra-ui/react";

// First-party components

// Layouts
import Layout from "components/layouts/Layout";

// Start page
export default function Page() {
  return (
    <Stack direction="column" spacing={5}>
      <Heading>Home</Heading>
      <Text>This is the new Osopcloud, opening in September.</Text>
    </Stack>
  );
}
Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout showToTopButton={true}>{page}</Layout>;
};
