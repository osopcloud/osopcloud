// Design
import { Center, Container, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { FiAlertCircle } from "react-icons/fi";

// Start component
export default function DevelopmentWarning() {
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
            <Text>Osopcloud is in early alpha.</Text>
            <Text fontSize="xs">
              Most features aren't available and existing features may change or
              get removed at any time.
            </Text>
          </Stack>
        </Stack>
      </Container>
    </Flex>
  );
}
