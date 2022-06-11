// JSON processing libraries
import fs from "fs";
import path from "path";

// Get and process JSON files
export function GetOperatingSystemPages() {
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

  return operatingSystems;
}

// Sort by name
export function SortByName() {
  const operatingSystems = GetOperatingSystemPages();

  // Sort the data by date, newest first
  return operatingSystems.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Sort by tags
export function SortByTags() {
  const operatingSystems = GetOperatingSystemPages();

  // Sort the data by tags
  return operatingSystems.sort((a, b) => {
    if (a.tags < b.tags) {
      return -1;
    } else {
      return 1;
    }
  });
}

// Sort by platforms
export function SortByPlatforms() {
  const operatingSystems = GetOperatingSystemPages();

  // Sort the data by platforms
  return operatingSystems.sort((a, b) => {
    if (a.platforms < b.platforms) {
      return -1;
    } else {
      return 1;
    }
  });
}

// Sort by packageManagement
export function SortByPackageManagement() {
  const operatingSystems = GetOperatingSystemPages();

  // Sort the data by packageManagement
  return operatingSystems.sort((a, b) => {
    if (a.packageManagement < b.packageManagement) {
      return -1;
    } else {
      return 1;
    }
  });
}
