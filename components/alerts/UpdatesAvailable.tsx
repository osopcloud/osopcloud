// Design
import {
  Button,
  Center,
  Container,
  DarkMode,
  Flex,
  Icon,
  Spacer,
  Stack,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import { FiDownload } from "react-icons/fi";

// Settings
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";

// Start component
export default function UpdatesAvailable() {
  // Get settings
  const [updatePreference] = useLocalStorage("forceUpdate");

  const [isUpdating, setUpdating] = useBoolean();

  return (
    <Flex bg="almond" color="white" w="100%" p={5} ps={{ base: 0, sm: 115 }}>
      {/* @ts-ignore */}
      <DarkMode>
        <Flex w="full" ps={5} pe={{ base: 5, sm: 10 }}>
          <Stack direction={{ base: "column", sm: "row" }} spacing={5}>
            <Center>
              <Icon as={FiDownload} aria-label="Download icon" w={6} h={6} />
            </Center>
            <Stack direction="column" spacing={0}>
              <Text>There are updates waiting to be installed</Text>
              <Text fontSize="xs">
                Update to get the latest content and features.
              </Text>
            </Stack>
          </Stack>
          <Spacer />
          {isUpdating ? (
            <Button isLoading loadingText="Updating">
              Update Now
            </Button>
          ) : (
            <Button
              onClick={(_) => {
                setUpdating.on();
                writeStorage("forceUpdate", updatePreference ? false : true);
              }}
            >
              Update Now
            </Button>
          )}
        </Flex>
      </DarkMode>
    </Flex>
  );
}
