import { createPackage } from "./utils/createPackage";

/**
 * Copies a local storage package to the clipboard.
 *
 * @param {() => void} errorCallback Callback function that will be called if an error occurs. **If not provided, the user will not be notified of any errors.**
 */
export const exportCB = (errorCallback?: () => void) => {
  // Get the package from local storage
  const packageData = createPackage();

  // Copy the package to the clipboard
  if (navigator.clipboard.writeText) {
    console.debug(
      "MXUPS: navigator.clipboard.readText() supported. Beginning export."
    );
    navigator.clipboard.writeText(packageData);
    console.log("MXUPS: Copied local storage to clipboard.", packageData);
  } else {
    console.error(
      "MXUPS: Copy failed. navigator.clipboard.writeText() not supported."
    );
    // Call the custom error callback if it exists
    if (errorCallback) {
      errorCallback();
    }
  }
};
