// Design
import {
  Button,
  Heading,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";

// First party components
import DynamicModal from "components/system/DynamicModal";

// Storage handling
import useLocalStorage from "@rehooks/local-storage";
import { clearAllStorage } from "lib/mxups/src";

import { useRef, useState } from "react";

// Start component
export default function ResetOsopcloudOverlay() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const [name] = useLocalStorage("composerName");
  const [settingsUseSystemFont] = useLocalStorage("settingsUseSystemFont");
  const [settingsDisableCOKeyboardShortcuts] = useLocalStorage(
    "settingsDisableCOKeyboardShortcuts"
  );

  const [isResetting, setIsResetting] = useState(false);

  // Check if local storage is not empty
  const isLocalStorageEmpty =
    typeof window !== "undefined"
      ? Object.keys(window.localStorage).length === 0
      : false;

  // Reset logic
  function ResetOsopcloud() {
    // Show a loading indicator
    setIsResetting(true);

    // Actually reset
    clearAllStorage();

    // Reload the page to ensure everything is reset
    window.location.href = "/";
  }

  return (
    <>
      <Button
        onClick={onOpen}
        isActive={isOpen}
        isDisabled={isLocalStorageEmpty}
      >
        Reset Osopcloud
      </Button>
      <DynamicModal
        useAlertDialog={true}
        cancelRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <Stack direction="column" spacing={5}>
          <Heading size="md">Reset Osopcloud?</Heading>
          <Stack direction="column" spacing={0}>
            <Text>This will:</Text>
            <UnorderedList ps={5} spacing={0}>
              <ListItem>Restore the default Settings</ListItem>
              {name && (
                <ListItem>
                  Permanently erase Osopcloud Composer project "{name}"
                </ListItem>
              )}
              {settingsUseSystemFont && (
                <ListItem>Restore custom product fonts</ListItem>
              )}
              {settingsDisableCOKeyboardShortcuts && (
                <ListItem>Enable character-only keyboard shortcuts</ListItem>
              )}
            </UnorderedList>
          </Stack>
          <Button
            leftIcon={<FiTrash2 />}
            onClick={ResetOsopcloud}
            isLoading={isResetting}
            loadingText="Resetting Osopcloud"
          >
            Continue &amp; Reset
          </Button>
          <Button onClick={onClose} ref={cancelRef}>
            Cancel
          </Button>
        </Stack>
      </DynamicModal>
    </>
  );
}
