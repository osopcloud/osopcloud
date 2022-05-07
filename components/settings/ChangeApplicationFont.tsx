// Design
import {
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { useRef } from "react";

// Start component
export default function ChangeApplicationFont() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const closeRef: any = useRef();

  // Change font settings
  function ApplyDefault() {
    localStorage.removeItem("settingsFontOverride");
    window.location.reload();
    onClose();
  }
  function ApplyHyperlegible() {
    localStorage.setItem("settingsFontOverride", "true");
    window.location.reload();
    onClose();
  }
  function ApplySystem() {
    localStorage.setItem("settingsFontOverride", "system");
    window.location.reload();
    onClose();
  }

  // Get current font settings
  const accessibleFonts =
    typeof window !== "undefined"
      ? localStorage.getItem("settingsFontOverride")
      : "";

  return (
    <>
      <Button onClick={onOpen}>Change the Application Font</Button>

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
              <Heading size="md">Change the Application Font</Heading>
              <Stack direction="column" spacing={2}>
                {accessibleFonts! && (
                  <Button fontFamily="Public Sans" onClick={ApplyDefault}>
                    Switch to Public Sans
                  </Button>
                )}
                {accessibleFonts !== "true" && (
                  <Button
                    fontFamily="Atkinson Hyperlegible"
                    onClick={ApplyHyperlegible}
                  >
                    Switch to Atkinson Hyperlegible
                  </Button>
                )}
                {accessibleFonts !== "system" && (
                  <Button fontFamily="system-ui" onClick={ApplySystem}>
                    Switch to the System Font
                  </Button>
                )}
              </Stack>
              <Button onClick={onClose} ref={closeRef}>
                Cancel
              </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
