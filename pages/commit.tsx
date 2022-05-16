// Start page
export default function CommitDisplayPage() {
  const commit = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;
  console.log(commit);
  return commit ? <code>{commit}</code> : <p>Commit is undefined</p>;
}
