// Design
import {
  Button,
  Center,
  Code,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spacer,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { deleteFromStorage, useLocalStorage } from "@rehooks/local-storage";
import { Logo } from "components/brand/Logo";

import { useRef } from "react";

// Start component
export default function AboutApplication() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const closeRef: any = useRef();

  // Application information
  const commit = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;

  // Initialisation functions
  const [hideNotifications] = useLocalStorage("settingsHideNotifications");
  const [backButtonLargeWindows] = useLocalStorage(
    "settingsAlwaysShowBackButton"
  );
  const [showSessionThemeToggle] = useLocalStorage("settingsShowThemeToggle");
  function DeleteSettings() {
    deleteFromStorage("settingsHideNotifications");
    deleteFromStorage("settingsAlwaysShowBackButton");
    deleteFromStorage("settingsShowThemeToggle");
    localStorage.removeItem("settingsFontOverride");
    console.info(
      "All preferences in LocalStorage have been cleared - using default settings"
    );
  }
  const accessibleFonts =
    typeof window !== "undefined"
      ? localStorage.getItem("settingsFontOverride")
      : "";
  function BeginInitialise() {
    DeleteSettings();
    if (accessibleFonts) {
      window.location.reload();
    } else onClose();
  }
  function InitialisationButton() {
    return (
      <Tooltip label="Reset All Settings and Clear the Cache" placement="right">
        <Button colorScheme="red" onClick={BeginInitialise}>
          Initialise Osopcloud
        </Button>
      </Tooltip>
    );
  }
  function InitialisationDisabled() {
    return <Button isDisabled>Initialise Osopcloud</Button>;
  }
  function Initialise() {
    if (hideNotifications) {
      return <InitialisationButton />;
    } else {
      if (backButtonLargeWindows) {
        return <InitialisationButton />;
      } else {
        if (showSessionThemeToggle) {
          return <InitialisationButton />;
        } else {
          if (accessibleFonts) {
            return <InitialisationButton />;
          } else {
            return <InitialisationDisabled />;
          }
        }
      }
    }
  }

  return (
    <>
      <Button onClick={onOpen}>About the Osopcloud Application</Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={closeRef}
        isCentered
      >
        <ModalOverlay />
        <ModalContent rounded="3xl" p={5}>
          <ModalBody>
            <Stack direction="column" spacing={5}>
              <Icon aria-label="Osopcloud Logo" w={20} h={20}>
                <Logo />
              </Icon>
              <Stack direction="column" spacing={0} fontSize="xs">
                <Text>Osopcloud Web Application</Text>
                <Flex>
                  <Text>Version</Text>
                  <Spacer />
                  <Code fontSize="xs">1.0.0-alpha.1</Code>
                </Flex>
                <Flex>
                  <Text>Commit</Text>
                  <Spacer />
                  {commit ? (
                    <Code fontSize="xs">{commit}</Code>
                  ) : (
                    <Text>Undefined</Text>
                  )}
                </Flex>
                <Flex>
                  <Text>GAS</Text>
                  <Spacer />
                  <Text>Platform 3</Text>
                </Flex>
              </Stack>
              <Initialise />
              <Button onClick={onClose} ref={closeRef}>
                Done
              </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
