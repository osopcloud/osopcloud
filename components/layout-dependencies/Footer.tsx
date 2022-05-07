// Design
import {
  Button,
  Container,
  Flex,
  Stack,
  Text,
  Spacer,
  Center,
  DarkMode,
} from "@chakra-ui/react";
import { FiGithub } from "react-icons/fi";
import { VercelLogo } from "components/brand/VercelPromotion";

// Start component
export default function Footer() {
  return (
    <Flex bg="almond" color="white" as="footer">
      {/* @ts-ignore */}
      <DarkMode>
        <Container maxWidth="container.md" py={2}>
          <Flex>
            <Stack direction="row" spacing={5}>
              <Button
                size="sm"
                leftIcon={<FiGithub />}
                display={{ base: "none", sm: "flex" }}
              >
                GitHub
              </Button>
              <Button size="sm" display={{ base: "none", sm: "flex" }}>
                Documentation
              </Button>
              <Button size="sm">Privacy</Button>
              <Button size="sm">Terms</Button>
            </Stack>
            <Spacer />
            <Button
              size="sm"
              aria-label="Powered by Vercel"
              display={{ base: "none", md: "flex" }}
            >
              <Stack direction="row" spacing={2}>
                <Text>Powered by</Text>
                <Center>
                  <VercelLogo fill="white" />
                </Center>
              </Stack>
            </Button>
          </Flex>
        </Container>
      </DarkMode>
    </Flex>
  );
}
