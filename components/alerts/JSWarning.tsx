// Design
import { Center, Container, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { FiAlertCircle } from "react-icons/fi";

// Start component
export default function JSWarning() {
  return (
    <Flex bg="peanut" color="white" as="footer">
      <Container maxWidth="container.md" py={2}>
        <Stack direction={{ base: "column", sm: "row" }} spacing={5}>
          <Center>
            <Icon
              as={FiAlertCircle}
              aria-label="Exclamation icon"
              w={6}
              h={6}
            />
          </Center>
          <Stack direction="column" spacing={0}>
            <Text>Please use a browser that supports JavaScript.</Text>
            <Text fontSize="xs">
              Most features won't work correctly. Unexpected behaviour may
              occur. (1102)
            </Text>
          </Stack>
        </Stack>
      </Container>
    </Flex>
  );
}
