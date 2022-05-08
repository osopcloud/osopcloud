// Design
import { Center, Container, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { FiAlertCircle } from "react-icons/fi";

// Start component
export default function BrowserWarning() {
  return (
    <Flex bg="peanut" color="white" as="footer">
      <Container maxWidth="container.md" py={2}>
        <Stack direction="row" spacing={5}>
          <Center>
            <Icon
              as={FiAlertCircle}
              aria-label="Exclamation icon"
              w={6}
              h={6}
            />
          </Center>
          <Stack direction="column" spacing={0}>
            <Text>Please upgrade to a modern browser.</Text>
            <Text fontSize="xs">
              Some features won't work correctly and others have been disabled
              as a precautionary measure. (1101)
            </Text>
          </Stack>
        </Stack>
      </Container>
    </Flex>
  );
}
