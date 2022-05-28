// This allows us to render a default overlay component
// This is <Modal> (or <AlertDialog>) on large displays and a Drawer on smaller displays

// Types
import type { ReactElement } from "react";

// Design
import {
  Button,
  Heading,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Menu,
  MenuButton,
  MenuGroup,
  MenuList,
  MenuItem,
  Stack,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";

import { useRef } from "react";

interface OverlayProps {
  options: {
    name: string;
    map?: any;
    onClick: () => void;
    isDisabled?: boolean | undefined;
  };
  buttonLabel: string;
  actionLabel: string;
}

// Begin component
export function OverlayMenu({
  options,
  actionLabel,
  buttonLabel,
}: OverlayProps): ReactElement {
  return (
    <Menu>
      <MenuButton as={Button}>{buttonLabel}</MenuButton>
      <MenuList borderRadius="xl">
        <MenuGroup title={actionLabel}>
          {/* Map a MenuItem for each option */}
          {options.map((option: any) => (
            <MenuItem
              key={option.name}
              onClick={option.onClick}
              isDisabled={option.isDisabled}
            >
              {option.name}
            </MenuItem>
          ))}
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}

export function OverlayDrawer({
  options,
  actionLabel,
  buttonLabel,
}: OverlayProps): ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const closeRef: any = useRef();
  return (
    <>
      {isOpen ? (
        <Button isActive>{buttonLabel}</Button>
      ) : (
        <Button onClick={onOpen}>{buttonLabel}</Button>
      )}

      <Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
        <DrawerOverlay />
        <DrawerContent roundedTop="3xl" py={5}>
          <DrawerBody>
            <Stack direction="column" spacing={5}>
              <Heading size="md">{actionLabel}</Heading>
              <Stack direction="column" spacing={2}>
                {options.map((option: any) => (
                  <Button
                    key={option.name}
                    // When clicked, run onClick and close the drawer
                    onClick={() => {
                      option.onClick();
                      onClose();
                    }}
                    isDisabled={option.isDisabled}
                  >
                    {option.name}
                  </Button>
                ))}
              </Stack>
              <Button ref={closeRef} onClick={onClose}>
                Cancel
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default function DynamicMenu({
  options,
  buttonLabel,
  actionLabel,
}: OverlayProps): ReactElement {
  const overlay = useBreakpointValue({
    base: (
      <OverlayDrawer
        options={options}
        buttonLabel={buttonLabel}
        actionLabel={actionLabel}
      />
    ),
    sm: (
      <OverlayMenu
        options={options}
        buttonLabel={buttonLabel}
        actionLabel={actionLabel}
      />
    ),
  });
  return <>{overlay}</>;
}
