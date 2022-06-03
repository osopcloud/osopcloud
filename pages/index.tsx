// This page uses the legacy Node.js Runtime delivery technology
// Reason: Uses eval() to process MDX
// https://nextjs.org/docs/api-reference/edge-runtime

// Types
import type { ReactElement } from "react";
import { GetStaticProps } from "next";

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
} from "@chakra-ui/react";

// First-party components
import Logo from "components/brand/Logo";

// Settings
import { useLocalStorage } from "@rehooks/local-storage";

// Markdown processing
import { GetSortedOperatingSystemPages } from "lib/Sorting";

// Layouts
import Layout from "components/layouts/Layout";

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
  length: number;
}

// Start page
export default function Home({
  AZOSPageData,
}: {
  AZOSPageData: MetadataTypes;
}) {
  // Get settings
  const [showTagsOnHome] = useLocalStorage("settingsShowTagsOnHome");
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
        <Stack direction="column" spacing={2} p={20}>
          <Stack direction="row" spacing={5} fontSize="xs">
            <Text>
              {AZOSPageData.length} Operating System
              {AZOSPageData.length <= 1 ? "" : "s"}
            </Text>
            <Text>
              {showTagsOnHome
                ? "Showing All Tags"
                : "Showing Selected Metadata"}
            </Text>
          </Stack>
          {AZOSPageData.map(
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
                    {showTagsOnHome ? (
                      // Show all tags
                      tags.map((tag: string) => (
                        <Badge key={`${slug}-${tag}`}>{tag}</Badge>
                      ))
                    ) : (
                      <>
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
                      </>
                    )}
                  </Stack>
                </Button>
              </Link>
            )
          )}
        </Stack>
        <Center h="100vh" pb="100">
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

// Import AZOSPageData OS Page handling
export const getStaticProps: GetStaticProps = async () => {
  const AZOSPageData = GetSortedOperatingSystemPages();
  return {
    props: {
      AZOSPageData,
    },
  };
};
