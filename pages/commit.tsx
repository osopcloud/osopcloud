// Start page
export default function CommitDisplayPage() {
  const commit = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;
  return commit ? <code>commit</code> : <p>Commit is undefined</p>;
}
