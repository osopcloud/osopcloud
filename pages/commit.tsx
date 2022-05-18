import { commit } from "components/Commit";

// Start page
export default function CommitDisplayPage() {
  console.log(commit);
  return commit ? <code>{commit}</code> : <p>Commit is undefined</p>;
}
