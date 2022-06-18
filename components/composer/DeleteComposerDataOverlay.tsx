// Design
import {
  Button,
  Heading,
  Input,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FiArrowLeft, FiTrash2 } from "react-icons/fi";

// First party components
import DynamicModal from "components/overlays/DynamicModal";

// Storage
import useLocalStorage, {
  deleteFromStorage,
  writeStorage,
} from "@rehooks/local-storage";

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

  const [moreOptionsPage, setMoreOptionsPage] = useState(false);
  const [changeNamePage, setChangeNamePage] = useState(false);

  const [isResetting, setIsResetting] = useState(false);
  const [isResettingName, setIsResettingName] = useState(false);

  function DeleteProjectColour() {
    deleteFromStorage("composerProjectColour");
  }

  return (
    <>
      <Button isActive={isOpen} onClick={onOpen} isDisabled={!name}>
        Reset
      </Button>

      <DynamicModal
        isOpen={isOpen}
        onClose={onClose}
        useAlertDialog={moreOptionsPage ? false : true}
        cancelRef={cancelRef}
      >
        <Stack direction="column" spacing={5}>
          <Heading size="md">
            {moreOptionsPage
              ? changeNamePage
                ? "Change Name"
                : "Advanced Reset Options"
              : "Reset the Composer?"}
          </Heading>
          {moreOptionsPage ? (
            changeNamePage ? (
              <>
                <Input
                  placeholder="Enter the new Operating System name"
                  onChange={(e) => {
                    writeStorage("composerName", e.target.value);
                  }}
                />
                <Button
                  onClick={() => {
                    setChangeNamePage(false);
                    setMoreOptionsPage(false);
                  }}
                  ref={cancelRef}
                  leftIcon={<FiArrowLeft />}
                >
                  Go Back
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => {
                    setChangeNamePage(true);
                  }}
                >
                  Change Name
                </Button>
                <Button
                  onClick={() => {
                    DeleteProjectColour();
                    onClose();
                  }}
                >
                  Reset Project Colour
                </Button>
                <Button
                  onClick={() => {
                    setMoreOptionsPage(false);
                  }}
                  ref={cancelRef}
                  leftIcon={<FiArrowLeft />}
                >
                  Go Back
                </Button>
              </>
            )
          ) : (
            <>
              <Text>Your work will be lost.</Text>
              <Button
                onClick={() => {
                  setMoreOptionsPage(true);
                }}
              >
                Advanced Reset Options
              </Button>
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
            </>
          )}
        </Stack>
      </DynamicModal>
    </>
  );
}
