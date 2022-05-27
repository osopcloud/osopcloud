// This allows us to render a default overlay component
// This is <Modal> (or <AlertDialog>) on large displays and a Drawer on smaller displays

// Types
import type { ReactElement } from "react";

// Design
import {
  Modal,
  ModalContent,
  ModalOverlay,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
  useBreakpointValue,
  usePrefersReducedMotion,
  ModalBody,
  DrawerBody,
  AlertDialogBody,
} from "@chakra-ui/react";

interface OverlayPropsDrawerOnly {
  children: ReactElement;
  cancelRef: any;
  isOpen: boolean;
  onClose: () => void;
}

interface OverlayProps {
  children: ReactElement;
  cancelRef: any;
  isOpen: boolean;
  onClose: () => void;
  useAlertDialog: boolean;
}

// Begin component
export function OverlayModal({
  children,
  cancelRef,
  isOpen,
  onClose,
  useAlertDialog,
}: OverlayProps): ReactElement {
  // Honour system accessibility preferences
  const animationSpeed = usePrefersReducedMotion();

  return (
    <>
      {useAlertDialog ? (
        <AlertDialog
          isOpen={isOpen}
          onClose={onClose}
          leastDestructiveRef={cancelRef}
          motionPreset={animationSpeed ? "none" : "slideInBottom"}
          scrollBehavior="inside"
          size="sm"
          isCentered
        >
          <AlertDialogOverlay />
          <AlertDialogContent rounded="3xl" p={5}>
            <AlertDialogBody>{children}</AlertDialogBody>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          initialFocusRef={cancelRef}
          motionPreset={animationSpeed ? "none" : "slideInBottom"}
          scrollBehavior="inside"
          size="md"
          isCentered
        >
          <ModalOverlay />
          <ModalContent rounded="3xl" p={5}>
            <ModalBody>{children}</ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

export function OverlayDrawer({
  children,
  cancelRef,
  isOpen,
  onClose,
}: OverlayPropsDrawerOnly): ReactElement {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={cancelRef}
      placement="bottom"
    >
      <DrawerOverlay />
      <DrawerContent roundedTop="3xl" py={5}>
        <DrawerBody>{children}</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default function DynamicModal({
  children,
  cancelRef,
  isOpen,
  onClose,
  useAlertDialog,
}: OverlayProps) {
  const overlayStyle = useBreakpointValue({
    base: (
      <OverlayDrawer cancelRef={cancelRef} isOpen={isOpen} onClose={onClose}>
        {children}
      </OverlayDrawer>
    ),
    sm: (
      <OverlayModal
        cancelRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
        useAlertDialog={useAlertDialog}
      >
        {children}
      </OverlayModal>
    ),
  });
  return <>{overlayStyle}</>;
}
