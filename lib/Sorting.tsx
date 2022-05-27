// Markdown processing libraries
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function GetSortedOperatingSystemPages() {
  const store = path.join(process.cwd(), "public/markdown/browse");

  // Get all markdown files in the store
  const paths = fs.readdirSync(store);

  // Get the metadata for each file
  const OSPageData = paths.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "");
    const fullPath = path.join(store, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const frontmatter = matter(fileContents);
    return {
      slug,
      ...(frontmatter.data as { date: string; title: string }),
    };
  });

  // Sort the data by date, newest first
  return OSPageData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
