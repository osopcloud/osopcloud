// JSON processing libraries
import fs from "fs";
import path from "path";

// Get and process JSON files
export function GetOperatingSystemsAsObject() {
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
  const operatingSystems = GetOperatingSystemsAsObject();

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
  const operatingSystems = GetOperatingSystemsAsObject();

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
  const operatingSystems = GetOperatingSystemsAsObject();

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
  const operatingSystems = GetOperatingSystemsAsObject();

  // Sort the data by packageManagement
  return operatingSystems.sort((a, b) => {
    if (a.packageManagement < b.packageManagement) {
      return -1;
    } else {
      return 1;
    }
  });
}

// Sort by startupManagement
export function SortByStartupManagement() {
  const operatingSystems = GetOperatingSystemsAsObject();

  // Sort the data by startupManagement
  return operatingSystems.sort((a, b) => {
    if (a.startupManagement < b.startupManagement) {
      return -1;
    } else {
      return 1;
    }
  });
}

// Sort by desktop
export function SortByDesktop() {
  const operatingSystems = GetOperatingSystemsAsObject();

  // Sort the data by desktop
  return operatingSystems.sort((a, b) => {
    if (a.desktop < b.desktop) {
      return -1;
    } else {
      return 1;
    }
  });
}

// Sort by shell
export function SortByShell() {
  const operatingSystems = GetOperatingSystemsAsObject();

  // Sort the data by shell
  return operatingSystems.sort((a, b) => {
    if (a.shell < b.shell) {
      return -1;
    } else {
      return 1;
    }
  });
}

// Sort by basedOn
export function SortByBasedOn() {
  const operatingSystems = GetOperatingSystemsAsObject();

  // Sort the data by basedOn
  return operatingSystems.sort((a, b) => {
    if (a.basedOn < b.basedOn) {
      return -1;
    } else {
      return 1;
    }
  });
}
