// SEO
import Head from "next/head";

import { commit } from "components/Commit";

// Start page
export default function CommitDisplayPage() {
  console.log(commit);
  return (
    <>
      <Head>
        <title>Commit and Deployment Details &mdash; Osopcloud</title>
        <meta
          name="description"
          content="See information about this deployment of Osopcloud."
        />
        <meta name="og:title" content="Commit and Deployment Details" />
        <meta
          name="og:description"
          content="See information about this deployment."
        />
      </Head>

      {commit ? <code>{commit}</code> : <p>Commit is undefined</p>}
    </>
  );
}
