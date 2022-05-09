// Design
import { Center, Container, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { FiSettings } from "react-icons/fi";

// Start component
export default function ConflictingSettings() {
  return (
    <Flex bg="peanut" color="white" as="footer">
      <Container maxWidth="container.md" py={2}>
        <Stack direction="row" spacing={5}>
          <Center>
            <Icon as={FiSettings} aria-label="Settings icon" w={6} h={6} />
          </Center>
          <Stack direction="column" spacing={0}>
            <Text>There's been an issue storing your Settings.</Text>
            <Text fontSize="xs">
              Reload Osopcloud to apply the correct Settings. (2201)
            </Text>
          </Stack>
        </Stack>
      </Container>
    </Flex>
  );
}
