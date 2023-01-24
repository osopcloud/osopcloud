import { createPackage } from "./utils/createPackage";

/**
 * Saves a local storage package file to the file system.
 */
export const exportFS = () => {
  // Get the package from local storage
  const packageData = createPackage();

  // Create a file
  const blob = new Blob([packageData], { type: "application/json" });

  // Create a link to the file
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "data.json";
  link.click();
  URL.revokeObjectURL(url);

  // Log the export
  console.log("Exported local storage to file system.");
};
