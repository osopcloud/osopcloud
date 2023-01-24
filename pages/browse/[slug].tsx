// Types
import type { ReactElement } from "react";
import { GetStaticProps } from "next";

// Routing
import Link from "next/link";
import { useRouter } from "next/router";

// SEO
import Head from "next/head";
import CheckPWA from "lib/CheckPWA";

// Design
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { FiDatabase, FiFileText, FiTrash2 } from "react-icons/fi";
import { AnimatePresence, m } from "framer-motion";

// First party components
import DynamicModal from "components/system/DynamicModal";
import { DeleteComposerData } from "components/composer/DeleteComposerDataOverlay";
import { useKeyboardShortcut } from "hooks/useKeyboardShortcut";

// Layouts
import Layout from "components/layouts/Layout";

// Settings
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";

// JSON processing libraries
import fs from "fs";
import path from "path";

import { useRef, useState } from "react";

interface OSPageTypes {
  source: any;
  rawJSONLink: string;
}

// Start page
export default function OSPage({ source, rawJSONLink }: OSPageTypes) {
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  // Write Composer data
  const [currentComposerName] = useLocalStorage("composerName");
  const [composerNameTemp, setComposerNameTemp] = useState(currentComposerName);
  const [writingToComposer, setWritingToComposer] = useState(false);
  function CopyToComposer() {
    setWritingToComposer(true);
    DeleteComposerData();
    writeStorage("composerName", source.name);
    writeStorage("composerDescription", source.description);
    writeStorage("composerDate", source.date);
    writeStorage("composerAuthors", source.authors);
    writeStorage("composerTags", source.tags);
    writeStorage("composerPlatforms", source.platforms);
    writeStorage("composerBasedOn", source.basedOn);
    writeStorage("composerDefaultDesktop", source.desktop);
    writeStorage("composerDefaultShell", source.shell);
    writeStorage("composerSoftware", source.software);
    writeStorage("composerPackageManagement", source.packageManagement);
    writeStorage("composerStartup", source.startupManagement);
    writeStorage("composerWebsite", source.website);
    writeStorage("composerRepository", source.repository);
    writeStorage("composerDonationServiceName", source.donationServiceName);
    writeStorage("composerDonationURL", source.donationURL);
    router.push("/composer");
  }

  // Tabs
  function Description() {
    return (
      <>
        <Text>{source.description}</Text>
        {source.organisationName && (
          <Text fontSize="xs" mt={5}>
            This content presented by {source.organisationName}
            {!source.organisationName.endsWith(".") && "."}
          </Text>
        )}
      </>
    );
  }
  function MetadataTable() {
    return (
      <Table size="sm" variant="simple">
        <Tbody>
          <Tr>
            <Td>All Tags</Td>
            <Td>
              <Stack direction="row" spacing={2}>
                {/* Map source.tags */}
                {source.tags.map((tag: string) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </Stack>
            </Td>
          </Tr>
          <Tr>
            <Td>Popular Platforms</Td>
            <Td>
              {source.platforms.map((platform: string) => (
                <>
                  {platform}
                  {/* Add a comma if not the last date */}
                  {source.platforms.indexOf(platform) !==
                  source.platforms.length - 1
                    ? ", "
                    : ""}
                </>
              ))}
            </Td>
          </Tr>
          <Tr>
            <Td>Based On</Td>
            <Td>{source.basedOn}</Td>
          </Tr>
          <Tr>
            <Td>Default Desktop</Td>
            <Td>{source.desktop}</Td>
          </Tr>
          <Tr>
            <Td>Default Shell</Td>
            <Td>{source.shell}</Td>
          </Tr>
          <Tr>
            <Td>Key Software</Td>
            <Td>
              {/* Map source.software and sort alphabetically */}
              {source.software.sort().map((software: string) => (
                <>
                  {software}
                  {/* Add a comma if not the last date */}
                  {source.software.indexOf(software) !==
                  source.software.length - 1
                    ? ", "
                    : ""}
                </>
              ))}
            </Td>
          </Tr>
          <Tr>
            <Td>Package Management</Td>
            <Td>
              {source.packageManagement.sort().map((manager: string) => (
                <>
                  {manager}
                  {/* Add a comma if not the last date */}
                  {source.packageManagement.indexOf(manager) !==
                  source.packageManagement.length - 1
                    ? ", "
                    : ""}
                </>
              ))}
            </Td>
          </Tr>
          <Tr>
            <Td>Startup Framework</Td>
            <Td>{source.startupManagement}</Td>
          </Tr>
          <Tr>
            <Td>Authors</Td>
            <Td>
              {source.authors.sort().map((author: string) => {
                // Make everything starting with @ a link to GitHub
                if (author.startsWith("@")) {
                  const githubProfile = author.replace("@", "");
                  return (
                    <>
                      <Link href={`https://github.com/${githubProfile}`}>
                        {author}
                      </Link>
                      {/* Add a comma if not the last value */}
                      {source.authors.indexOf(author) !==
                      source.authors.length - 1
                        ? ", "
                        : ""}
                    </>
                  );
                } else {
                  return (
                    <>
                      {author}
                      {/* Add a comma if not the last value */}
                      {source.authors.indexOf(author) !==
                      source.authors.length - 1
                        ? ", "
                        : ""}
                    </>
                  );
                }
              })}
            </Td>
          </Tr>
          <Tr>
            <Td>Page Created</Td>
            <Td>
              {new Date(source.date[0])
                .toDateString()
                .split(" ")
                .slice(1)
                .join(" ")}
            </Td>
          </Tr>
          <Tr>
            <Td>Page Updated</Td>
            <Td>
              {/* Map source.date but leave out 0*/}
              {/* If source.donate has more than 1 value */}
              {source.date.slice(1).map((date: string) => (
                <>
                  {/* Format the date with toDateString() removing the day */}
                  {new Date(date).toDateString().split(" ").slice(1).join(" ")}
                  {/* Add a comma if not the last date */}
                  {source.date.indexOf(date) !== source.date.length - 1
                    ? ", "
                    : ""}
                </>
              ))}
            </Td>
          </Tr>
        </Tbody>
      </Table>
    );
  }

  // Tab array
  const [activeTab, setActiveTab] = useState(0);
  const tabArray = [
    {
      label: "Description",
      icon: <FiFileText />,
      content: <Description />,
    },
    {
      label: "Metadata & More",
      icon: <FiDatabase />,
      content: <MetadataTable />,
    },
  ];

  // Keyboard shortcuts
  useKeyboardShortcut("w", () => {
    window.open(source.website, "_blank");
  });
  useKeyboardShortcut("r", () => {
    window.open(source.repository, "_blank");
  });

  return (
    <>
      <Head>
        <title>Osopcloud &mdash; {source.name}</title>
        <meta
          name="description"
          content={`Discover ${source.name} on Osopcloud.`}
        />
        <meta name="og:title" content={source.name} />
        <meta
          name="og:description"
          content={`Discover ${source.name} on Osopcloud.`}
        />
      </Head>

      <Stack direction="column" spacing={5}>
        <Heading>{source.name}</Heading>
        <Flex display="flex" flexDirection={{ base: "column", md: "row" }}>
          {/* This can't be a Stack because the first child might not be shown on small windows */}
          <Box flex={1} mb={{ base: 5, sm: 0 }}>
            <Stack
              direction="row"
              spacing={2}
              display={{ base: "flex", sm: "none" }}
              mb={5}
            >
              {tabArray.map((tab, index) => (
                <Button
                  key={index}
                  leftIcon={tab.icon}
                  onClick={(_) => setActiveTab(index)}
                  isActive={activeTab === index}
                >
                  {tab.label}
                </Button>
              ))}
            </Stack>
            <AnimatePresence exitBeforeEnter>
              <m.div
                key={activeTab}
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -10, opacity: 0 }}
                transition={{ duration: 0.175 }}
              >
                {tabArray[activeTab].content}
              </m.div>
            </AnimatePresence>
          </Box>
          <m.div
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -10, opacity: 0 }}
            transition={{ duration: 0.175 }}
          >
            <Stack direction="column" spacing={5} ms={{ base: 0, sm: 10 }}>
              <Stack direction="row" spacing={2}>
                {/* Map source.tags but only show two */}
                {source.tags.slice(0, 2).map((tag: string) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </Stack>
              <Stack
                direction="column"
                spacing={2}
                display={{ base: "none", sm: "flex" }}
              >
                {tabArray.map((tab, index) => (
                  <Button
                    key={index}
                    leftIcon={tab.icon}
                    onClick={(_) => setActiveTab(index)}
                    isActive={activeTab === index}
                  >
                    {tab.label}
                  </Button>
                ))}
              </Stack>
              <Stack direction="column" spacing={2}>
                {source.donationURL && (
                  <Link href={source.donationURL} passHref>
                    <Button as="a">
                      Donate with {source.donationServiceName}
                    </Button>
                  </Link>
                )}
                <Link href={source.website} passHref>
                  <Button as="a">Visit Project Website</Button>
                </Link>
                <Link href={source.repository} passHref>
                  <Button as="a">Visit Project Repository</Button>
                </Link>
              </Stack>
              <Button onClick={currentComposerName ? onOpen : CopyToComposer}>
                Open in Composer
              </Button>
              <DynamicModal
                isOpen={isOpen}
                onClose={onClose}
                cancelRef={cancelRef}
                useAlertDialog={true}
              >
                <Stack direction="column" spacing={5}>
                  <Heading size="md">Open in Composer?</Heading>
                  <Text>
                    There is already a project open in the Osopcloud Composer.
                  </Text>
                  <Text>
                    Your work, "{composerNameTemp}", will be lost if you
                    continue.
                  </Text>
                  <Button
                    onClick={CopyToComposer}
                    leftIcon={<FiTrash2 />}
                    isLoading={writingToComposer}
                    loadingText="Preparing Composer"
                  >
                    Continue &amp; Reset Composer
                  </Button>
                  <Button onClick={onClose} ref={cancelRef}>
                    Cancel
                  </Button>
                </Stack>
              </DynamicModal>
            </Stack>
          </m.div>
        </Flex>
      </Stack>
    </>
  );
}
OSPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout showToTopButton={false}>{page}</Layout>;
};

interface PathProps {
  params: any;
}

// @ts-expect-error
export const getStaticProps: GetStaticProps = async ({ params }: PathProps) => {
  const source = fs.readFileSync(`public/json/${params.slug}.json`, "utf8");

  // Take this JSON and turn it into a JS object
  const sourceObject = JSON.parse(source);

  const rawJSONLink = `/json/${params.slug}.json`;

  return {
    props: {
      source: sourceObject,
      rawJSONLink,
    },
  };
};

export const getStaticPaths = async () => {
  const pageContentPath = path.join(process.cwd(), "public/json");

  const pageFilePaths = fs
    .readdirSync(pageContentPath)
    .filter((path) => /\.json?$/.test(path));

  const paths = pageFilePaths
    .map((path) => path.replace(/\.json?$/, ""))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
