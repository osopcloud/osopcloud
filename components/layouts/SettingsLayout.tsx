// Routing
import Link from "next/link";

// Design
import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { FiLayout, FiSettings, FiShare, FiTrash2 } from "react-icons/fi";

interface LayoutProps {
  children: React.ReactNode;
}

// Start component
export default function SettingsLayout({ children }: LayoutProps) {
  return (
    <Stack direction="column" spacing={5}>
      <Heading display={{ base: "none", sm: "flex" }}>
        Osopcloud Settings
      </Heading>
      <Flex flexDirection={{ base: "column", md: "row" }}>
        <Stack
          direction="column"
          spacing={2}
          me={{ base: 0, sm: 10 }}
          display={{ base: "none", sm: "flex" }}
        >
          <Link href="/settings/general" passHref>
            <Button leftIcon={<FiLayout />} as="a">
              Appearance &amp; Layout
            </Button>
          </Link>
          <Link href="/settings/connections" passHref>
            <Button leftIcon={<FiShare />} as="a">
              Apps, Share, &amp; Print
            </Button>
          </Link>
          <Link href="/settings/advanced" passHref>
            <Button leftIcon={<FiSettings />} as="a">
              Advanced Settings
            </Button>
          </Link>
          <Link href="/settings/manage-data" passHref>
            <Button leftIcon={<FiTrash2 />} as="a">
              Manage Data &amp; Reset
            </Button>
          </Link>
        </Stack>
        <Stack direction="column" spacing={5} flex={1} mb={{ base: 5, sm: 0 }}>
          {children}
        </Stack>
      </Flex>
    </Stack>
  );
}
