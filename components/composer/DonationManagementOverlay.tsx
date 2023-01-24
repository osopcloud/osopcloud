// Design
import {
  Button,
  Code,
  Editable,
  EditableInput,
  EditablePreview,
  Heading,
  Input,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";

// First party components
import DynamicModal from "components/system/DynamicModal";

// Storage
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";

import { useRef } from "react";

// Start component
export default function DonationManagementOverlay() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  // Storage
  const [name] = useLocalStorage("composerName");
  const [donationServiceName] = useLocalStorage("composerDonationServiceName");
  const [donationURL] = useLocalStorage("composerDonationURL");

  return (
    <>
      <Button isActive={isOpen} onClick={onOpen}>
        Add a Donation Option
      </Button>

      <DynamicModal
        isOpen={isOpen}
        onClose={onClose}
        useAlertDialog={false}
        cancelRef={cancelRef}
      >
        <Stack direction="column" spacing={5}>
          <Heading size="md">Donation Options</Heading>
          <Table size="sm" variant="simple">
            <Tbody>
              <Tr>
                <Td>Donation Service Name</Td>
                <Td>
                  <Editable
                    // @ts-ignore
                    value={donationServiceName || "Click to Edit..."}
                  >
                    <EditablePreview />
                    <Input
                      as={EditableInput}
                      onChange={(e) => {
                        writeStorage(
                          "composerDonationServiceName",
                          e.target.value
                        );
                      }}
                      size="sm"
                    />
                  </Editable>
                </Td>
              </Tr>
              <Tr>
                <Td>Donation URL</Td>
                <Td>
                  <Editable
                    // @ts-ignore
                    value={donationURL || "Click to Edit..."}
                  >
                    <EditablePreview />
                    <Input
                      as={EditableInput}
                      onChange={(e) => {
                        writeStorage("composerDonationURL", e.target.value);
                      }}
                      size="sm"
                    />
                  </Editable>
                </Td>
              </Tr>
            </Tbody>
          </Table>
          <Text fontSize="xs">
            URLs need to include <Code fontSize="xs">https://</Code>.
          </Text>
          <Button onClick={onClose} ref={cancelRef}>
            Close
          </Button>
        </Stack>
      </DynamicModal>
    </>
  );
}
