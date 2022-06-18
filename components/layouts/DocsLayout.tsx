// Routing
import Link from "next/link";

// Design
import { Box, Button, Flex, Heading, Stack } from "@chakra-ui/react";

interface LayoutProps {
  children: React.ReactNode;
}

// Start component
export default function DocsLayout({ children }: LayoutProps) {
  return (
    <Stack direction="column" spacing={5}>
      <Heading>Osopcloud Documentation</Heading>
      <Flex display="flex" flexDirection={{ base: "column", md: "row" }}>
        <Stack direction="column" spacing={2} me={10} mb={5}>
          <Link href="/docs/getting-started" passHref>
            <Button as="a">Getting Started</Button>
          </Link>
          <Link href="/docs/sharing" passHref>
            <Button as="a">Apps and Sharing</Button>
          </Link>
          <Link href="/docs/composer" passHref>
            <Button as="a">Composer</Button>
          </Link>
          <Link href="/docs/settings" passHref>
            <Button as="a">Settings</Button>
          </Link>
          <Link href="/docs/accessibility" passHref>
            <Button as="a">Accessibility</Button>
          </Link>
          <Link href="/docs/keyboard-shortcuts" passHref>
            <Button as="a">Keyboard Shortcuts</Button>
          </Link>
          <Link href="/docs/errors" passHref>
            <Button as="a">Error Reference</Button>
          </Link>
        </Stack>
        <Box flex={1}>{children}</Box>
      </Flex>
    </Stack>
  );
}
