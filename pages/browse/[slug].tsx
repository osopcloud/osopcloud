// This page uses the legacy Node.js Runtime delivery technology
// Reason: Uses eval() to process MDX
// https://nextjs.org/docs/api-reference/edge-runtime

// Types
import type { ReactElement } from "react";
import { GetStaticProps } from "next";

// Suspense
import { Suspense } from "react";
import Loading from "components/Loading";

// Routing
import Link from "next/link";
import { useRouter } from "next/router";

// SEO
import Head from "next/head";

// Design
import {
  Badge,
  Box,
  Button,
  Code,
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

// First party components
import DynamicModal from "components/overlays/DynamicModal";
import { DeleteComposerData } from "components/create/DeleteComposerDataOverlay";

// Layouts
import Layout from "components/layouts/Layout";

// Settings
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";

// JSON processing libraries
import fs from "fs";
import path from "path";
import { FiDatabase, FiFileText } from "react-icons/fi";

import { useRef, useState } from "react";

interface OSPageTypes {
  source: any;
  rawJSONLink: string;
}

// Start page
export default function OSPage({ source, rawJSONLink }: OSPageTypes) {
  const router = useRouter();

  const [showDeveloperOptions] = useLocalStorage(
    "settingsShowDeveloperOptions"
  );

  // Tabs
  function MDXDescription() {
    return <Text>{source.description}</Text>;
  }
  function EmbeddedMetadataTable() {
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
      content: <MDXDescription />,
    },
    {
      label: "Metadata & More",
      icon: <FiDatabase />,
      content: <EmbeddedMetadataTable />,
    },
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  // Write Composer data
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
    router.push("/create");
  }

  return (
    <>
      <Head>
        <title>{source.name} &mdash; Osopcloud</title>
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
            <Box>{tabArray[activeTab].content}</Box>
          </Box>
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
              <Link href={source.website} passHref>
                <Button as="a">Visit Project Website</Button>
              </Link>
              <Link href={source.repository} passHref>
                <Button as="a">Visit Project Repository</Button>
              </Link>
            </Stack>
            <Stack direction="column" spacing={2}>
              <Button size="sm" onClick={onOpen}>
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
                    You are about to open {source.name} in the Osopcloud
                    Composer.
                  </Text>
                  <Text>
                    If a project is already open in the Composer, your work will
                    be lost.
                  </Text>
                  <Button
                    onClick={CopyToComposer}
                    isLoading={writingToComposer}
                    loadingText="Preparing Composer"
                  >
                    Continue
                  </Button>
                  <Button onClick={onClose} ref={cancelRef}>
                    Cancel
                  </Button>
                </Stack>
              </DynamicModal>
              <Suspense fallback={<Loading />}>
                {showDeveloperOptions && (
                  <Link href={rawJSONLink} passHref>
                    <Button size="sm" as="a">
                      Show Raw <Code ms={2}>JSON</Code>
                    </Button>
                  </Link>
                )}
              </Suspense>
            </Stack>
          </Stack>
        </Flex>
      </Stack>
    </>
  );
}
OSPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout showToTopButton={false}>{page}</Layout>;
};

// Disable the Edge Runtime
export const config = {
  runtime: "nodejs",
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
