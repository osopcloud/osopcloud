// This page uses the legacy Node.js Runtime delivery technology
// Reason: Uses eval() to process MDX
// https://nextjs.org/docs/api-reference/edge-runtime

// Types
import type { ReactElement } from "react";
import { GetStaticProps } from "next";

// SEO
import Head from "next/head";

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
  Tr,
  useDisclosure,
} from "@chakra-ui/react";

// First party components
import Layout from "components/layouts/Layout";
import DynamicMenu from "components/overlays/DynamicMenu";

// Settings
import { useLocalStorage } from "@rehooks/local-storage";

// Markdown processing libraries
import fs from "fs";
import path from "path";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
// @ts-expect-error
import MDXProvider from "lib/MDXProvider";
import { FiDatabase, FiFileText } from "react-icons/fi";

import { useState } from "react";
import Link from "next/link";

interface OSPageTypes {
  source: any;
  componentOverrides: object;
  descriptionPath: string;
}

// Start page
export default function OSPage({ source, componentOverrides }: OSPageTypes) {
  // Get settings
  const [disableDonationOptions] = useLocalStorage(
    "settingsDisableDonationOptions"
  );

  // Tabs
  function MDXDescription() {
    return (
      <MDXProvider>
        <MDXRemote {...source} components={componentOverrides} />
      </MDXProvider>
    );
  }
  function EmbeddedMetadataTable() {
    return (
      <Stack direction="column" spacing={5}>
        <Table size="sm" variant="simple">
          <Tbody>
            <Tr>
              <Td>All Tags</Td>
              <Td>
                <Stack direction="row" spacing={2}>
                  {/* Map source.frontmatter.tags */}
                  {source.frontmatter.tags.map((tag: string) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </Stack>
              </Td>
            </Tr>
          </Tbody>
        </Table>
        <Table size="sm" variant="simple">
          <Tbody>
            <Tr>
              <Td>Popular Platforms</Td>
              <Td>
                {source.frontmatter.platforms.map((platform: string) => (
                  <>
                    {platform}
                    {/* Add a comma if not the last date */}
                    {source.frontmatter.platforms.indexOf(platform) !==
                    source.frontmatter.platforms.length - 1
                      ? ", "
                      : ""}
                  </>
                ))}
              </Td>
            </Tr>
          </Tbody>
        </Table>
        <Table size="sm" variant="simple">
          <Tbody>
            <Tr>
              <Td>Based On</Td>
              <Td>{source.frontmatter.basedOn}</Td>
            </Tr>
            <Tr>
              <Td>Default Desktop</Td>
              <Td>{source.frontmatter.desktop}</Td>
            </Tr>
            <Tr>
              <Td>Default Shell</Td>
              <Td>{source.frontmatter.shell}</Td>
            </Tr>
            <Tr>
              <Td>Key Software</Td>
              <Td>
                {/* Map source.frontmatter.software and sort alphabetically */}
                {source.frontmatter.software.sort().map((software: string) => (
                  <>
                    {software}
                    {/* Add a comma if not the last date */}
                    {source.frontmatter.software.indexOf(software) !==
                    source.frontmatter.software.length - 1
                      ? ", "
                      : ""}
                  </>
                ))}
              </Td>
            </Tr>
            <Tr>
              <Td>Package Management</Td>
              <Td>
                {source.frontmatter.packageManagement
                  .sort()
                  .map((manager: string) => (
                    <>
                      {manager}
                      {/* Add a comma if not the last date */}
                      {source.frontmatter.packageManagement.indexOf(manager) !==
                      source.frontmatter.packageManagement.length - 1
                        ? ", "
                        : ""}
                    </>
                  ))}
              </Td>
            </Tr>
            <Tr>
              <Td>Startup Framework</Td>
              <Td>{source.frontmatter.startupManagement}</Td>
            </Tr>
          </Tbody>
        </Table>
        <Table size="sm" variant="simple">
          <Tbody>
            <Tr>
              <Td>Authors</Td>
              <Td>
                {source.frontmatter.authors.sort().map((author: string) => {
                  // Make everything starting with @ a link to GitHub
                  if (author.startsWith("@")) {
                    const githubProfile = author.replace("@", "");
                    return (
                      <>
                        <Link href={`https://github.com/${githubProfile}`}>
                          {author}
                        </Link>
                        {/* Add a comma if not the last value */}
                        {source.frontmatter.authors.indexOf(author) !==
                        source.frontmatter.authors.length - 1
                          ? ", "
                          : ""}
                      </>
                    );
                  } else {
                    return (
                      <>
                        {author}
                        {/* Add a comma if not the last value */}
                        {source.frontmatter.authors.indexOf(author) !==
                        source.frontmatter.authors.length - 1
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
                {new Date(source.frontmatter.date[0])
                  .toDateString()
                  .split(" ")
                  .slice(1)
                  .join(" ")}
              </Td>
            </Tr>
            <Tr>
              <Td>Page Updated</Td>
              <Td>
                {/* Map source.frontmatter.date but leave out 0*/}
                {/* If source.frontmatter.donate has more than 1 value */}
                {source.frontmatter.date.slice(1).map((date: string) => (
                  <>
                    {/* Format the date with toDateString() removing the day */}
                    {new Date(date)
                      .toDateString()
                      .split(" ")
                      .slice(1)
                      .join(" ")}
                    {/* Add a comma if not the last date */}
                    {source.frontmatter.date.indexOf(date) !==
                    source.frontmatter.date.length - 1
                      ? ", "
                      : ""}
                  </>
                ))}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Stack>
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
  return (
    <>
      <Head>
        <title>{source.frontmatter.name} &mdash; Osopcloud</title>
        <meta
          name="description"
          content={`Discover ${source.frontmatter.name} on Osopcloud.`}
        />
        <meta name="og:title" content={source.frontmatter.name} />
        <meta
          name="og:description"
          content={`Discover ${source.frontmatter.name} on Osopcloud.`}
        />
      </Head>

      <Stack direction="column" spacing={5}>
        <Heading>{source.frontmatter.name}</Heading>
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
              {/* Map source.frontmatter.tags but only show two */}
              {source.frontmatter.tags.slice(0, 2).map((tag: string) => (
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
              <Link href={source.frontmatter.website} passHref>
                <Button as="a">Visit Project Website</Button>
              </Link>
              <Link href={source.frontmatter.repository} passHref>
                <Button as="a">Visit Project Repository</Button>
              </Link>
              {disableDonationOptions ? (
                <Button isDisabled>Donation Options</Button>
              ) : (
                <DynamicMenu
                  options={source.frontmatter.tags}
                  buttonLabel="Donation Options"
                  actionLabel="Select Donation Service"
                />
              )}
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
  params: {
    slug: string;
  };
  mdxSource: MDXRemoteSerializeResult;
}

// @ts-expect-error
export const getStaticProps: GetStaticProps = async ({ params }: PathProps) => {
  // Find Markdown files
  const filePath = path.join(`public/markdown/browse`, `${params.slug}.mdx`);
  const source = fs.readFileSync(filePath);

  // Use the files to parse MDX
  // @ts-expect-error
  const mdxSource = await serialize(source, {
    parseFrontmatter: true,
  });

  return {
    props: {
      source: mdxSource,
    },
  };
};
export const getStaticPaths = async () => {
  const pageContentPath = path.join(process.cwd(), "public/markdown/browse");

  const pageFilePaths = fs
    .readdirSync(pageContentPath)
    .filter((path) => /\.mdx?$/.test(path));

  const paths = pageFilePaths
    .map((path) => path.replace(/\.mdx?$/, ""))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
