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
import DocsLayout from "components/layouts/DocsLayout";

interface OSPageTypes {
  source: any;
  componentOverrides: object;
  descriptionPath: string;
}

// Start page
export default function DocsPage({ source, componentOverrides }: OSPageTypes) {
  return (
    <>
      <Head>
        <title>
          Documentation: {source.frontmatter.name} &mdash; Osopcloud
        </title>
        <meta
          name="description"
          content={`Read through Osopcloud documentation on ${source.frontmatter.name}.`}
        />
        <meta name="og:title" content={source.frontmatter.name} />
        <meta
          name="og:description"
          content={`Read through Osopcloud documentation on ${source.frontmatter.name}.`}
        />
      </Head>

      <MDXProvider>
        <MDXRemote {...source} components={componentOverrides} />
      </MDXProvider>
    </>
  );
}
DocsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout showToTopButton={true}>
      <DocsLayout>{page}</DocsLayout>
    </Layout>
  );
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
  const filePath = path.join(`public/markdown/docs`, `${params.slug}.mdx`);
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
  const pageContentPath = path.join(process.cwd(), "public/markdown/docs");

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
