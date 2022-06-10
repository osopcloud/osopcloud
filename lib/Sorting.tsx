// JSON processing libraries
import fs from "fs";
import path from "path";

export function GetSortedOperatingSystemPages() {
  const store = path.join(process.cwd(), "public/json");

  // Get all JSON files in the store
  const paths = fs.readdirSync(store);

  // Take this JSON and turn it into a JS object
  const operatingSystems = paths.map((file) => {
    const slug = file.replace(/\.json$/, "");
    const operatingSystem = JSON.parse(
      fs.readFileSync(path.join(store, file), "utf8")
    );
    return { slug, ...operatingSystem };
  });

  // Sort the data by date, newest first
  return operatingSystems.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function SortByTags() {
  const store = path.join(process.cwd(), "public/json");

  // Get all JSON files in the store
  const paths = fs.readdirSync(store);

  // Take this JSON and turn it into a JS object
  const operatingSystems = paths.map((file) => {
    const slug = file.replace(/\.json$/, "");
    const operatingSystem = JSON.parse(
      fs.readFileSync(path.join(store, file), "utf8")
    );
    return { slug, ...operatingSystem };
  });

  // Sort the data by tags
  return operatingSystems.sort((a, b) => {
    if (a.tags < b.tags) {
      return -1;
    } else {
      return 1;
    }
  });
}
