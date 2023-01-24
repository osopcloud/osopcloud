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
import { commit } from "components/Commit";

import React from "react";

// Start component
export class ErrorFallbackApplication extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  // Get the error details from React and set them in the state so they can be shown to the user
  componentDidCatch(error: any, errorInfo: any) {
    console.log(error, errorInfo);
  }

  hasTriedAgain = false;

  // Truncate commit to 7 characters
  truncateCommit = () => {
    if (commit) {
      return commit.substring(0, 7);
    } else {
      return "a local environment";
    }
  };

  render() {
    // @ts-expect-error: Property 'hasError' does not exist on type 'Readonly<{}>'.ts(2339)
    if (this.state.hasError) {
      return (
        <Container maxWidth="container.sm" mt="25vh">
          <SimpleGrid minChildWidth="150px" spacing={10}>
            <Stack direction="column" spacing={5}>
              <Text>A serious error has occurred.</Text>
              <Button
                leftIcon={<FiRefreshCw />}
                onClick={() => {
                  this.hasTriedAgain = true;
                  this.setState({ hasError: false });
                }}
                isDisabled={this.hasTriedAgain}
              >
                Try Again
              </Button>
              <Stack direction="column" spacing={2}>
                <Text fontSize="xs">Application version {version}</Text>
                <Text fontSize="xs">Deployed from {this.truncateCommit()}</Text>
                <Text fontSize="xs">
                  When reporting this error, reference error code{" "}
                  <Code fontSize="xs">3</Code>.
                </Text>
              </Stack>
            </Stack>
            <Center display={{ base: "none", lg: "flex" }}>
              <Icon as={FiAlertTriangle} w={150} h={150} aria-label="Error" />
            </Center>
          </SimpleGrid>
        </Container>
      );
    }

    // @ts-expect-error: Property 'hasError' does not exist on type 'Readonly<{}>'.ts(2339)
    return this.props.children;
  }
}
