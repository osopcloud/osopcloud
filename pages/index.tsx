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
import { Heading, Stack, Text, SimpleGrid, Button } from "@chakra-ui/react";

// First-party components

// Markdown processing
import { GetSortedOperatingSystemPages } from "lib/Sorting";

// Layouts
import Layout from "components/layouts/Layout";

interface MetadataTypes {
  slug: string;
  name: string;
  platforms: object;
  packageManagement: string;
  startupManagement: string;
}

// Start page
export default function Home({
  AZOSPageData,
}: {
  AZOSPageData: MetadataTypes;
}) {
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

      <Stack direction="column" spacing={5}>
        <Heading>Home</Heading>
        <SimpleGrid minChildWidth="340px" spacing={10}>
          <Text>This is the new Osopcloud.</Text>
          <Stack direction="column" spacing={2}>
            {AZOSPageData.map(
              ({
                slug,
                name,
                platforms,
                packageManagement,
                startupManagement,
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
                      <Text>{startupManagement}</Text>
                    </Stack>
                  </Button>
                </Link>
              )
            )}
          </Stack>
        </SimpleGrid>
      </Stack>
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
