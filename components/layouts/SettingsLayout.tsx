// Routing
import Link from "next/link";

// Design
import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import {
  FiHardDrive,
  FiLayout,
  FiShare,
  FiSquare,
  FiTool,
  FiUser,
  FiWifi,
} from "react-icons/fi";

interface LayoutProps {
  children: React.ReactNode;
  sidebarActiveIndex: number;
}

// Start component
export default function SettingsLayout({
  children,
  sidebarActiveIndex,
}: LayoutProps) {
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
            <Button
              leftIcon={<FiLayout />}
              as="a"
              isActive={sidebarActiveIndex === 0}
            >
              Appearance
            </Button>
          </Link>
          <Link href="/settings/accessibility" passHref>
            <Button
              leftIcon={<FiUser />}
              as="a"
              isActive={sidebarActiveIndex === 1}
            >
              Accessibility
            </Button>
          </Link>
          <Link href="/settings/sharing" passHref>
            <Button
              leftIcon={<FiShare />}
              as="a"
              isActive={sidebarActiveIndex === 2}
            >
              Sharing &amp; Printing
            </Button>
          </Link>
          <Link href="/settings/network" passHref>
            <Button
              leftIcon={<FiWifi />}
              as="a"
              isActive={sidebarActiveIndex === 3}
            >
              Updates &amp; Network
            </Button>
          </Link>
          <Link href="/settings/storage" passHref>
            <Button
              leftIcon={<FiHardDrive />}
              as="a"
              isActive={sidebarActiveIndex === 4}
            >
              Application Storage
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
