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

interface OverlayProps extends OverlayPropsDrawerOnly {
  useAlertDialog: boolean;
  size?: string;
}

// Begin components
export function OverlayModal({
  children,
  cancelRef,
  isOpen,
  onClose,
  useAlertDialog,
  size,
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
          size={size}
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

/**
 * A modal that is a Chakra UI `<Modal>` on large windows, but a `<Drawer>` on small windows.
 *
 * @remarks
 * From the system collection, replacing Chakra UI `<Modal>`, `<AlertDialog>` and `<Drawer>`.
 * 
 * @example
 * This is a standard dynamic modal setup. If `useAlertDialog` is true, then the modal will be rendered as an `<AlertDialog>` on large windows.
 * ```js
 * function Modal() {
 *   const [isOpen, onOpen, onClose]
 *   const cancelRef = useRef(null);
 *   return (
 *     <>
 *       <Button
          onClick={() => {
            onOpen();
          }}
          isActive={isOpen}
        >
          Open Modal
         </Button>

 *       <DynamicModal
           isOpen={isOpen}
           onClose={onClose}
           useAlertDialog={false}
           cancelRef={cancelRef}
         >
 *         ...
 *       </DynamicModal>
 *     </>
 *   )
 * }
 * ```
 */
export default function DynamicModal({
  children,
  cancelRef,
  isOpen,
  onClose,
  useAlertDialog,
  size,
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
        size={size ? size : "md"}
      >
        {children}
      </OverlayModal>
    ),
  });
  return <>{overlayStyle}</>;
}
