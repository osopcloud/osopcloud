// Types
import type { ReactElement } from "react";

// Routing
import Link from "next/link";

// SEO
import Head from "next/head";

// Design
import {
  Button,
  Center,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import {
  FiFileText,
  FiGithub,
  FiLifeBuoy,
  FiMoreVertical,
  FiSettings,
} from "react-icons/fi";
import { m } from "framer-motion";

// Layouts
import Layout from "components/layouts/Layout";

// Application configuration
import { config } from "../platform.config";

// Start page
export default function Options() {
  return (
    <>
      <Head>
        <title>Osopcloud Options</title>
        <meta
          name="description"
          content="Access additional functions and settings on Osopcloud."
        />
        <meta name="og:title" content="Osopcloud Options" />
        <meta
          name="og:description"
          content="Additional options on Osopcloud."
        />
      </Head>

      <Stack direction="column" spacing={10}>
        <Heading>Options</Heading>
        <SimpleGrid minChildWidth="340px" spacing={10}>
          <m.div
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -10, opacity: 0 }}
            transition={{ duration: 0.175 }}
          >
            <Stack direction="column" spacing={5}>
              <Link href="/settings" passHref>
                <Button leftIcon={<FiSettings />} as="a">
                  Osopcloud Settings
                </Button>
              </Link>
              <Link href={config.repositoryURL} passHref>
                <Button leftIcon={<FiGithub />} as="a" target="_blank">
                  Osopcloud GitHub Repository
                </Button>
              </Link>
              <Link href={config.documentationURL} passHref>
                <Button leftIcon={<FiLifeBuoy />} as="a" target="_blank">
                  Documentation on GitHub
                </Button>
              </Link>
              <Stack direction="column" spacing={2}>
                <Link href="/about/privacy" passHref>
                  <Button leftIcon={<FiFileText />} as="a">
                    Osopcloud Privacy Statement
                  </Button>
                </Link>
                <Link href="/about/terms" passHref>
                  <Button leftIcon={<FiFileText />} as="a">
                    Terms
                  </Button>
                </Link>
              </Stack>
            </Stack>
          </m.div>
          <m.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Center h="50vh" display={{ base: "none", lg: "flex" }}>
              <Icon as={FiMoreVertical} w={150} h={150} aria-label="Options" />
            </Center>
          </m.div>
        </SimpleGrid>
      </Stack>
    </>
  );
}
Options.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      showToTopButton={false}
      showShareButton={false}
      sidebarActiveIndex={2}
    >
      {page}
    </Layout>
  );
};
