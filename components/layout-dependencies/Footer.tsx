// Routing
import Link from "next/link";

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
              <Link href="https://github.com/osopcloud" passHref>
                <Button
                  size="sm"
                  leftIcon={<FiGithub />}
                  display={{ base: "none", sm: "flex" }}
                  as="a"
                >
                  GitHub
                </Button>
              </Link>
              <Button
                size="sm"
                isDisabled
                display={{ base: "none", sm: "flex" }}
              >
                Documentation
              </Button>
              <Link href="/about/privacy" passHref>
                <Button size="sm" as="a">
                  Privacy
                </Button>
              </Link>
              <Button size="sm" isDisabled>
                Terms
              </Button>
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
