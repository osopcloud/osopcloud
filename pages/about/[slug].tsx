// This page uses the legacy Node.js Runtime delivery technology
// Reason: Uses eval() to process MDX
// https://nextjs.org/docs/api-reference/edge-runtime

// Types
import type { ReactElement } from "react";
import { GetStaticProps } from "next";

// SEO
import Head from "next/head";

// First party components
import Layout from "components/layouts/Layout";

// Markdown processing libraries
import fs from "fs";
import path from "path";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
// @ts-expect-error
import MDXProvider from "lib/MDXProvider";

interface OSPageTypes {
  source: any;
  componentOverrides: object;
  descriptionPath: string;
}

// Start page
export default function About({ source, componentOverrides }: OSPageTypes) {
  return (
    <>
      <Head>
        <title>{source.frontmatter.name} &mdash; Osopcloud</title>
        <meta
          name="description"
          content={`${source.frontmatter.name} on Osopcloud.`}
        />
        <meta name="og:title" content={source.frontmatter.name} />
        <meta
          name="og:description"
          content={`${source.frontmatter.name} on Osopcloud.`}
        />
      </Head>

      <MDXProvider>
        <MDXRemote {...source} components={componentOverrides} />
      </MDXProvider>
    </>
  );
}
About.getLayout = function getLayout(page: ReactElement) {
  return <Layout showToTopButton={true}>{page}</Layout>;
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
  const filePath = path.join(`public/markdown/about`, `${params.slug}.mdx`);
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
  const pageContentPath = path.join(process.cwd(), "public/markdown/about");

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
