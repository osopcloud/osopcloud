// Routing
import Link from "next/link";
import { useRouter } from "next/router";

// Design
import {
  Button,
  Center,
  Flex,
  Heading,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FiHardDrive, FiLayout, FiShare, FiUser, FiWifi } from "react-icons/fi";

// Settings Search Bar
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";

import { useRef, useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
  sidebarActiveIndex: number;
}

// Start component
export default function SettingsLayout({
  children,
  sidebarActiveIndex,
}: LayoutProps) {
  const router = useRouter();

  // All settings, with setting name and the url to the page it is on
  const settingsList = [
    {
      name: "Show Printing Options on the Sidebar",
      url: "/settings/general",
    },
    {
      name: "Use the System Font",
      url: "/settings/accessibility",
    },
    {
      name: "Show Labels on Switches",
      url: "/settings/accessibility",
    },
    {
      name: "Disable Character-Only Keyboard Shortcuts",
      url: "/settings/accessibility",
    },
    {
      name: "Disable Dynamic Printing",
      url: "/settings/sharing",
    },
    {
      name: "Install Updates Immediately",
      url: "/settings/network",
    },
    {
      name: "Check Networking",
      url: "/settings/network",
    },
    {
      name: "Import Storage from Clipboard",
      url: "/settings/storage",
    },
    {
      name: "Export Storage Data to Clipboard",
      url: "/settings/storage",
    },
    {
      name: "Reset Osopcloud",
      url: "/settings/storage",
    },
  ];

  const [settingOnSelect, setSettingOnSelect] = useState("");

  return (
    <Stack direction="column" spacing={5}>
      <Flex w="full">
        <Heading display={{ base: "none", sm: "flex" }}>
          Osopcloud Settings
        </Heading>
        <Spacer />
        <Center w="25%">
          <AutoComplete
            openOnFocus
            onSelectOption={() => {
              router.push(settingOnSelect);
            }}
            emptyState={<Text px={5}>No Settings Found</Text>}
          >
            <AutoCompleteInput
              placeholder="Search Settings"
              shadow="inner"
              borderRadius="xl"
              size="sm"
            />
            <AutoCompleteList rounded="xl">
              {settingsList.map((setting) => (
                <AutoCompleteItem
                  key={`option-${setting.name}`}
                  value={setting.name}
                  // When the user hovers over, or uses the keyboard to hover, setSettingOnSelect to the url
                  onMouseEnter={() => setSettingOnSelect(setting.url)}
                  onKeyDown={() => setSettingOnSelect(setting.url)}
                  // Styles
                  borderRadius="lg"
                >
                  {setting.name}
                </AutoCompleteItem>
              ))}
            </AutoCompleteList>
          </AutoComplete>
        </Center>
      </Flex>
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
