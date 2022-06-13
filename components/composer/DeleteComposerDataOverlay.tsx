// Design
import { Button, Heading, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";

// First party components
import DynamicModal from "components/overlays/DynamicModal";

// Storage
import useLocalStorage, { deleteFromStorage } from "@rehooks/local-storage";

import { useRef, useState } from "react";

// Delete Composer storage values
export function DeleteComposerData() {
  deleteFromStorage("composerName");
  deleteFromStorage("composerDescription");
  deleteFromStorage("composerDate");
  deleteFromStorage("composerTags");
  deleteFromStorage("composerPlatforms");
  deleteFromStorage("composerBasedOn");
  deleteFromStorage("composerDefaultDesktop");
  deleteFromStorage("composerDefaultShell");
  deleteFromStorage("composerSoftware");
  deleteFromStorage("composerPackageManagement");
  deleteFromStorage("composerStartup");
  deleteFromStorage("composerAuthors");
  deleteFromStorage("composerWebsite");
  deleteFromStorage("composerRepository");
  deleteFromStorage("composerProjectColour");
}

// Start component
export default function DeleteComposerDataOverlay() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const [name] = useLocalStorage("composerName");

  const [isResetting, setIsResetting] = useState(false);

  return (
    <>
      <Button isActive={isOpen} onClick={onOpen} isDisabled={!name}>
        Reset
      </Button>

      <DynamicModal
        isOpen={isOpen}
        onClose={onClose}
        useAlertDialog={true}
        cancelRef={cancelRef}
      >
        <Stack direction="column" spacing={5}>
          <Heading size="md">Reset the Composer?</Heading>
          <Text>Your work will be lost.</Text>
          <Button
            leftIcon={<FiTrash2 />}
            onClick={() => {
              setIsResetting(true);
              DeleteComposerData();
              window.location.reload();
            }}
            isLoading={isResetting}
            loadingText="Resetting"
          >
            Continue &amp; Reset
          </Button>
          <Button
            onClick={() => {
              onClose();
            }}
            ref={cancelRef}
          >
            Cancel
          </Button>
        </Stack>
      </DynamicModal>
    </>
  );
}
