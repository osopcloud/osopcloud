// TypeScript is not supported
// @ts-nocheck

// Design
import {
  Button,
  Container,
  Heading,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FiTool } from "react-icons/fi";

// First party components
import { Logo } from "components/brand/Logo";
import { DeleteSettings } from "components/settings/AboutApplication";
import Version from "components/Version";
import { commit } from "components/Commit";

import React from "react";

// Start component
export class ErrorFallbackApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // Get the error details from React and set them in the state so they can be shown to the user
  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  counter = 0;

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="container.md">
          <Stack direction="column" spacing={5} mt={20}>
            <Icon aria-label="Osopcloud Logo" w={20} h={20}>
              <Logo />
            </Icon>
            <Heading>Errors Happen in (the web) Space</Heading>
            <Text>
              Unfortunately, an unexpected error has crashed the application.
            </Text>
            {this.counter >= 5 ? (
              <Button leftIcon={<FiTool />} isDisabled>
                Attempt to Recover Osopcloud
              </Button>
            ) : (
              <Button
                leftIcon={<FiTool />}
                onClick={(_) => {
                  // Reset Settings
                  DeleteSettings();
                  // Attempt to recover React state
                  this.setState({ hasError: false });
                  // Add to the counter
                  this.counter++;
                }}
              >
                Attempt to Recover Osopcloud
              </Button>
            )}
            <Stack direction="column" spacing={0} fontSize="xs">
              <Stack direction="row" spacing={5}>
                <Stack direction="column" spacing={0}>
                  <Text>Error Reference:</Text>
                  <Text>Version:</Text>
                  <Text>Commit:</Text>
                </Stack>
                <Stack direction="column" spacing={0}>
                  {/* Find that error information from React */}
                  <Text>3102</Text>
                  <Version />
                  <Text>{commit ? commit : "Undefined"}</Text>
                </Stack>
              </Stack>
            </Stack>
            {/* Render counter */}
            {this.counter !== 0 && (
              <>
                {this.counter >= 5 ? (
                  <Text fontSize="xs">Too many recovery attempts</Text>
                ) : (
                  <Text fontSize="xs">
                    {this.counter} unsuccessful recovery attempt
                    {this.counter === 1 ? "" : "s"}
                  </Text>
                )}
              </>
            )}
          </Stack>
        </Container>
      );
    }

    return this.props.children;
  }
}
