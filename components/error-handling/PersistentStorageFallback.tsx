// Design
import {
  Button,
  Center,
  Code,
  Container,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

// First party components
import { version } from "components/Version";
import Loading from "components/system/Loading";

import { useEffect, useState } from "react";

// Start component
export default function PersistentStorageFallback() {
  // Wait five seconds before showing the error
  const [showError, setShowError] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowError(true);
    }, 4000);
  }, []);

  return (
    <>
      {showError ? (
        <Container maxWidth="container.sm" mt="25vh">
          <SimpleGrid minChildWidth="150px" spacing={10}>
            <Stack direction="column" spacing={5}>
              <Text>Enable persistent storage.</Text>
              <Button
                leftIcon={<FiRefreshCw />}
                onClick={() => {
                  window.location.reload();
                }}
              >
                Try Again
              </Button>
              <Stack direction="column" spacing={2}>
                <Text fontSize="xs">Application version {version}</Text>
                <Text fontSize="xs">
                  When reporting this error, reference error code{" "}
                  <Code fontSize="xs">2</Code>.
                </Text>
              </Stack>
            </Stack>
            <Center display={{ base: "none", lg: "flex" }}>
              <Icon as={FiAlertTriangle} w={150} h={150} aria-label="Error" />
            </Center>
          </SimpleGrid>
        </Container>
      ) : (
        <Center pt={250}>
          <Loading />
        </Center>
      )}
    </>
  );
}
