// Design
import {
  Button,
  Heading,
  Text,
  Input,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";

// First party components
import DynamicModal from "components/system/DynamicModal";

// Storage
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";

import { useRef } from "react";

// Start component
export default function OrganisationNameOverlay() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  // Storage
  const [name] = useLocalStorage("composerName");
  const [organisationName] = useLocalStorage("composerOrganisationName");

  return (
    <>
      <Button isActive={isOpen} onClick={onOpen}>
        Set Organisation Name
      </Button>

      <DynamicModal
        isOpen={isOpen}
        onClose={onClose}
        useAlertDialog={false}
        cancelRef={cancelRef}
      >
        <Stack direction="column" spacing={5}>
          <Heading size="md">Set Organisation Name</Heading>
          <Text>
            Setting your organisation's name helps users identify that the
            content is from it's developers.
          </Text>
          <Text fontSize="xs">
            This requires the full, corporate name of your organisation.
          </Text>
          <Input
            // @ts-ignore
            value={organisationName}
            onChange={(e) => {
              writeStorage("composerOrganisationName", e.target.value);
            }}
            placeholder="Enter your organisation's corporate name"
            borderRadius="xl"
            shadow="inner"
          />
          {organisationName && (
            <Text fontSize="xs">
              {name} will now show this label: "This content presented by{" "}
              {organisationName}."
            </Text>
          )}
          <Button onClick={onClose} ref={cancelRef}>
            Close
          </Button>
        </Stack>
      </DynamicModal>
    </>
  );
}
