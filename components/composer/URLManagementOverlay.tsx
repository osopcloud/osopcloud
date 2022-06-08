// Types
import type { ReactElement } from "react";

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
import DynamicModal from "components/overlays/DynamicModal";

// Storage
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";

// Layouts
import Layout from "components/layouts/Layout";

import { useRef } from "react";

// Start component
export default function URLManagementOverlay() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  // Storage
  const [website] = useLocalStorage("composerWebsite");
  const [sourceRepository] = useLocalStorage("composerRepository");

  return (
    <>
      <Button onClick={onOpen}>Edit Website &amp; Repository</Button>

      <DynamicModal
        isOpen={isOpen}
        onClose={onClose}
        useAlertDialog={false}
        cancelRef={cancelRef}
      >
        <Stack direction="column" spacing={5}>
          <Heading size="md">Edit Website and Source Repository</Heading>
          <Table size="sm" variant="simple">
            <Tbody>
              <Tr>
                <Td>Website</Td>
                <Td>
                  <Editable
                    // @ts-ignore
                    value={website || "Click to edit..."}
                  >
                    <EditablePreview />
                    <Input
                      as={EditableInput}
                      onChange={(e) => {
                        writeStorage("composerWebsite", e.target.value);
                      }}
                      size="sm"
                    />
                  </Editable>
                </Td>
              </Tr>
              <Tr>
                <Td>Source Repository</Td>
                <Td>
                  <Editable
                    // @ts-ignore
                    value={sourceRepository || "Click to edit..."}
                  >
                    <EditablePreview />
                    <Input
                      as={EditableInput}
                      onChange={(e) => {
                        writeStorage("composerRepository", e.target.value);
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
URLManagementOverlay.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout showToTopButton={false} showShareButton={false}>
      {page}
    </Layout>
  );
};
