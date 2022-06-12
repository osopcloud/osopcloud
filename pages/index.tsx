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

// SEO
import Head from "next/head";

// Design
import {
  Stack,
  Text,
  SimpleGrid,
  Button,
  Badge,
  Center,
  Icon,
  Heading,
  useDisclosure,
  Box,
} from "@chakra-ui/react";

// First-party components
import Logo from "components/brand/Logo";
import DynamicModal from "components/overlays/DynamicModal";

// JSON processing
import {
  SortByBasedOn,
  SortByDesktop,
  SortByName,
  SortByPackageManagement,
  SortByPlatforms,
  SortByShell,
  SortByStartupManagement,
  SortByTags,
} from "lib/Sorting";

// Search libraries
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";

// Layouts
import Layout from "components/layouts/Layout";

import { useState, useRef } from "react";

interface MetadataTypes {
  map: any;
  slug: string;
  name: string;
  tags: {
    map: any;
    indexOf: (value: string) => number;
    length: number;
  };
  platforms: {
    map: any;
    indexOf: (value: string) => number;
    length: number;
  };
  packageManagement: {
    map: any;
    indexOf: (value: string) => number;
    length: number;
  };
  startupManagement: string;
  desktop: string;
  shell: string;
  basedOn: string;
  length: number;
}

// Start page
export default function Home({
  SortedNameData,
  SortedTagsData,
  SortedPlatformsData,
  SortedPackageManagementData,
  SortedStartupManagementData,
  SortedDesktopData,
  SortedShellData,
  SortedBasedOnData,
}: {
  SortedNameData: MetadataTypes;
  SortedTagsData: MetadataTypes;
  SortedPlatformsData: MetadataTypes;
  SortedPackageManagementData: MetadataTypes;
  SortedStartupManagementData: MetadataTypes;
  SortedDesktopData: MetadataTypes;
  SortedShellData: MetadataTypes;
  SortedBasedOnData: MetadataTypes;
}) {
  // List tabs
  function ListByName() {
    return (
      <>
        {SortedNameData.map(
          ({
            slug,
            name,
            tags,
            platforms,
            packageManagement,
          }: MetadataTypes) => (
            <Link href={`/browse/${slug}`} key={`/browse/${slug}`} passHref>
              <Button as="a" display="block" minH="fit-content" py={3}>
                <Text>{name}</Text>
                <Stack
                  direction="row"
                  spacing={2}
                  fontWeight="normal"
                  fontSize="sm"
                >
                  <Badge pt="0.5">
                    {tags.map((tag: string) => (
                      <>
                        {/* Limit to 1 tag */}
                        {tags.indexOf(tag) < 1 && <>{tag}</>}
                      </>
                    ))}
                  </Badge>
                  <Text>
                    {platforms.map((platform: string) => (
                      <>
                        {/* Limit to 2 platforms */}
                        {platforms.indexOf(platform) < 2 && <>{platform}</>}
                        {/* Add a comma if not the last date */}
                        {platforms.indexOf(platform) < 1 &&
                          platforms.indexOf(platform) <
                            platforms.length - 1 && <>, </>}
                      </>
                    ))}
                  </Text>
                  <Text>
                    {packageManagement.map((manager: string) => (
                      <>
                        {/* Limit to 2 platforms */}
                        {packageManagement.indexOf(manager) < 2 && (
                          <>{manager}</>
                        )}
                        {/* Add a comma if not the last date */}
                        {packageManagement.indexOf(manager) < 1 &&
                          packageManagement.indexOf(manager) <
                            packageManagement.length - 1 && <>, </>}
                      </>
                    ))}
                  </Text>
                </Stack>
              </Button>
            </Link>
          )
        )}
      </>
    );
  }
  // List by tags
  function ListByTags() {
    return (
      <>
        {SortedTagsData.map(({ slug, name, tags }: MetadataTypes) => (
          <Link href={`/browse/${slug}`} key={`/browse/${slug}`} passHref>
            <Button as="a" display="block" minH="fit-content" py={3}>
              <Text>{name}</Text>
              <Stack
                direction="row"
                spacing={2}
                fontWeight="normal"
                fontSize="sm"
              >
                {tags.map((tag: string) => (
                  <Badge key={`${slug}-${tag}`}>{tag}</Badge>
                ))}
              </Stack>
            </Button>
          </Link>
        ))}
      </>
    );
  }
  // List by platforms
  function ListByPlatforms() {
    return (
      <>
        {SortedPlatformsData.map(
          ({ slug, name, tags, platforms }: MetadataTypes) => (
            <Link href={`/browse/${slug}`} key={`/browse/${slug}`} passHref>
              <Button as="a" display="block" minH="fit-content" py={3}>
                <Text>{name}</Text>
                <Stack
                  direction="row"
                  spacing={2}
                  fontWeight="normal"
                  fontSize="sm"
                >
                  <Badge pt="0.5">
                    {tags.map((tag: string) => (
                      <>
                        {/* Limit to 1 tag */}
                        {tags.indexOf(tag) < 1 && <>{tag}</>}
                      </>
                    ))}
                  </Badge>
                  <Text>
                    {platforms.map((platform: string) => (
                      <>
                        {platform}
                        {/* Add a comma if not the last platform */}
                        {platforms.indexOf(platform) !== platforms.length - 1
                          ? ", "
                          : ""}
                      </>
                    ))}
                  </Text>
                </Stack>
              </Button>
            </Link>
          )
        )}
      </>
    );
  }
  // List by package management
  function ListByPackageManagement() {
    return (
      <>
        {SortedPackageManagementData.map(
          ({ slug, name, tags, packageManagement }: MetadataTypes) => (
            <Link href={`/browse/${slug}`} key={`/browse/${slug}`} passHref>
              <Button as="a" display="block" minH="fit-content" py={3}>
                <Text>{name}</Text>
                <Stack
                  direction="row"
                  spacing={2}
                  fontWeight="normal"
                  fontSize="sm"
                >
                  <Badge pt="0.5">
                    {tags.map((tag: string) => (
                      <>
                        {/* Limit to 1 tag */}
                        {tags.indexOf(tag) < 1 && <>{tag}</>}
                      </>
                    ))}
                  </Badge>
                  <Text>
                    {packageManagement.map((manager: string) => (
                      <>
                        {manager}
                        {/* Add a comma if not the last manager */}
                        {packageManagement.indexOf(manager) !==
                        packageManagement.length - 1
                          ? ", "
                          : ""}
                      </>
                    ))}
                  </Text>
                </Stack>
              </Button>
            </Link>
          )
        )}
      </>
    );
  }
  // List by startup management
  function ListByStartupManagement() {
    return (
      <>
        {SortedStartupManagementData.map(
          ({ slug, name, tags, startupManagement }: MetadataTypes) => (
            <Link href={`/browse/${slug}`} key={`/browse/${slug}`} passHref>
              <Button as="a" display="block" minH="fit-content" py={3}>
                <Text>{name}</Text>
                <Stack
                  direction="row"
                  spacing={2}
                  fontWeight="normal"
                  fontSize="sm"
                >
                  <Badge pt="0.5">
                    {tags.map((tag: string) => (
                      <>
                        {/* Limit to 1 tag */}
                        {tags.indexOf(tag) < 1 && <>{tag}</>}
                      </>
                    ))}
                  </Badge>
                  <Text>{startupManagement}</Text>
                </Stack>
              </Button>
            </Link>
          )
        )}
      </>
    );
  }
  // List by desktop
  function ListByDesktop() {
    return (
      <>
        {SortedDesktopData.map(
          ({ slug, name, tags, desktop }: MetadataTypes) => (
            <Link href={`/browse/${slug}`} key={`/browse/${slug}`} passHref>
              <Button as="a" display="block" minH="fit-content" py={3}>
                <Text>{name}</Text>
                <Stack
                  direction="row"
                  spacing={2}
                  fontWeight="normal"
                  fontSize="sm"
                >
                  <Badge pt="0.5">
                    {tags.map((tag: string) => (
                      <>
                        {/* Limit to 1 tag */}
                        {tags.indexOf(tag) < 1 && <>{tag}</>}
                      </>
                    ))}
                  </Badge>
                  <Text>{desktop}</Text>
                </Stack>
              </Button>
            </Link>
          )
        )}
      </>
    );
  }
  // List by shell
  function ListByShell() {
    return (
      <>
        {SortedShellData.map(({ slug, name, tags, shell }: MetadataTypes) => (
          <Link href={`/browse/${slug}`} key={`/browse/${slug}`} passHref>
            <Button as="a" display="block" minH="fit-content" py={3}>
              <Text>{name}</Text>
              <Stack
                direction="row"
                spacing={2}
                fontWeight="normal"
                fontSize="sm"
              >
                <Badge pt="0.5">
                  {tags.map((tag: string) => (
                    <>
                      {/* Limit to 1 tag */}
                      {tags.indexOf(tag) < 1 && <>{tag}</>}
                    </>
                  ))}
                </Badge>
                <Text>{shell}</Text>
              </Stack>
            </Button>
          </Link>
        ))}
      </>
    );
  }
  // List by basedOn
  function ListByBasedOn() {
    return (
      <>
        {SortedBasedOnData.map(
          ({ slug, name, tags, basedOn }: MetadataTypes) => (
            <Link href={`/browse/${slug}`} key={`/browse/${slug}`} passHref>
              <Button as="a" display="block" minH="fit-content" py={3}>
                <Text>{name}</Text>
                <Stack
                  direction="row"
                  spacing={2}
                  fontWeight="normal"
                  fontSize="sm"
                >
                  <Badge pt="0.5">
                    {tags.map((tag: string) => (
                      <>
                        {/* Limit to 1 tag */}
                        {tags.indexOf(tag) < 1 && <>{tag}</>}
                      </>
                    ))}
                  </Badge>
                  <Text>{basedOn}</Text>
                </Stack>
              </Button>
            </Link>
          )
        )}
      </>
    );
  }

  // Tab system for the list
  const [activeTab, setActiveTab] = useState(0);
  const tabArray = [
    {
      label: "Name",
      component: <ListByName />,
    },
    {
      label: "Tag",
      component: <ListByTags />,
    },
    {
      label: "Platform",
      component: <ListByPlatforms />,
    },
    {
      label: "Package Manager",
      component: <ListByPackageManagement />,
    },
    {
      label: "Startup Framework",
      component: <ListByStartupManagement />,
    },
    { label: "Desktop", component: <ListByDesktop /> },
    { label: "Shell", component: <ListByShell /> },
    { label: "Based On", component: <ListByBasedOn /> },
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  return (
    <>
      <Head>
        <title>Discover Open-Source Operating Systems &mdash; Osopcloud</title>
        <meta
          name="description"
          content="Discover Open-Source Operating Systems and Build Open-Source Operating System Culture."
        />
        <meta
          name="og:title"
          content="Discover Open-Source Operating Systems"
        />
        <meta
          name="og:description"
          content="Discover Open-Source Operating Systems and Build Culture."
        />
      </Head>

      <SimpleGrid minChildWidth="340px" spacing={10}>
        <Stack direction="column" spacing={10} p={{ base: 0, sm: 20 }}>
          <AutoComplete>
            <AutoCompleteInput
              variant="outline"
              size="md"
              borderRadius="xl"
              shadow="inner"
              placeholder="Find an Operating System..."
            />
            <AutoCompleteList>
              {SortedNameData.map(
                ({
                  slug,
                  name,
                  tags,
                  platforms,
                  packageManagement,
                }: MetadataTypes) => (
                  <Link
                    href={`/browse/${slug}`}
                    key={`/browse/${slug}`}
                    passHref
                  >
                    <AutoCompleteItem
                      value={name}
                      key={`option-${name}`}
                      textDecoration="none"
                      p={4}
                      mb={1}
                      as="a"
                    >
                      <Text>{name}</Text>
                      <Stack
                        direction="row"
                        spacing={2}
                        fontWeight="normal"
                        fontSize="sm"
                      >
                        <Badge pt="0.5">
                          {tags.map((tag: string) => (
                            <>
                              {/* Limit to 1 tag */}
                              {tags.indexOf(tag) < 1 && <>{tag}</>}
                            </>
                          ))}
                        </Badge>
                        <Text>
                          {platforms.map((platform: string) => (
                            <>
                              {/* Limit to 2 platforms */}
                              {platforms.indexOf(platform) < 2 && (
                                <>{platform}</>
                              )}
                              {/* Add a comma if not the last date */}
                              {platforms.indexOf(platform) < 1 &&
                                platforms.indexOf(platform) <
                                  platforms.length - 1 && <>, </>}
                            </>
                          ))}
                        </Text>
                        <Text>
                          {packageManagement.map((manager: string) => (
                            <>
                              {/* Limit to 2 platforms */}
                              {packageManagement.indexOf(manager) < 2 && (
                                <>{manager}</>
                              )}
                              {/* Add a comma if not the last date */}
                              {packageManagement.indexOf(manager) < 1 &&
                                packageManagement.indexOf(manager) <
                                  packageManagement.length - 1 && <>, </>}
                            </>
                          ))}
                        </Text>
                      </Stack>
                    </AutoCompleteItem>
                  </Link>
                )
              )}
            </AutoCompleteList>
          </AutoComplete>
          <Stack direction="column" spacing={2}>
            <Text fontSize="xs">
              {activeTab > 0
                ? `Grouping ${tabArray[activeTab].label}s`
                : `
                    ${SortedNameData.length} Operating System${
                    SortedNameData.length <= 1 ? "" : "s"
                  }
                  `}
            </Text>
            <Stack direction="row" spacing={2} fontSize="xs">
              {/* Show 4 tabs at most on large windows */}
              {tabArray.slice(0, 4).map(({ label }, index) => (
                <Button
                  key={`tab-${label}`}
                  isActive={activeTab === index}
                  onClick={() => setActiveTab(index)}
                  size="sm"
                  display={{ base: "none", sm: "flex" }}
                >
                  {label}
                </Button>
              ))}
              {/* Show 1 tab at most on small windows */}
              {tabArray.slice(0, 1).map(({ label }, index) => (
                <Button
                  key={`tab-${label}`}
                  isActive={activeTab === index}
                  onClick={() => setActiveTab(index)}
                  size="sm"
                  display={{ base: "flex", sm: "none" }}
                >
                  {label}
                </Button>
              ))}
              <Button size="sm" onClick={onOpen}>
                More
              </Button>
              <DynamicModal
                isOpen={isOpen}
                onClose={onClose}
                useAlertDialog={false}
                cancelRef={cancelRef}
              >
                <Stack direction="column" spacing={5}>
                  <Heading size="md">Group the List by:</Heading>
                  <Stack direction="column" spacing={2}>
                    {/* All tab buttons */}
                    {tabArray.map(({ label }, index) => (
                      <Button
                        key={`tab-${label}`}
                        isActive={activeTab === index}
                        onClick={() => {
                          setActiveTab(index);
                          onClose();
                        }}
                      >
                        {label}
                      </Button>
                    ))}
                  </Stack>
                  <Button onClick={onClose} ref={cancelRef}>
                    Cancel
                  </Button>
                </Stack>
              </DynamicModal>
            </Stack>
            <Suspense fallback={<Loading />}>
              {/* Current tab */}
              {tabArray[activeTab].component}
            </Suspense>
          </Stack>
        </Stack>
        <Center h="100vh" pb="100" display={{ base: "none", sm: "flex" }}>
          <Icon w={250} h={250} aria-label="Osopcloud Logo">
            <Logo />
          </Icon>
        </Center>
      </SimpleGrid>
    </>
  );
}
Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout showToTopButton={true}>{page}</Layout>;
};

// Disable the Edge Runtime
export const config = {
  runtime: "nodejs",
};

export const getStaticProps: GetStaticProps = async () => {
  const SortedNameData = SortByName();
  const SortedTagsData = SortByTags();
  const SortedPlatformsData = SortByPlatforms();
  const SortedPackageManagementData = SortByPackageManagement();
  const SortedStartupManagementData = SortByStartupManagement();
  const SortedDesktopData = SortByDesktop();
  const SortedShellData = SortByShell();
  const SortedBasedOnData = SortByBasedOn();
  return {
    props: {
      SortedNameData,
      SortedTagsData,
      SortedPlatformsData,
      SortedPackageManagementData,
      SortedStartupManagementData,
      SortedDesktopData,
      SortedShellData,
      SortedBasedOnData,
    },
  };
};
