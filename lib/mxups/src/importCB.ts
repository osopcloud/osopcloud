import { writeObject } from "./utils/writeObject";

/**
 * Reads the contents of the clipboard and **overwrites** local storage with the contents of the clipboard.
 *
 * For privacy reasons, this must be called on a user action, like upon a button click.
 *
 * @param {() => void} errorCallback Callback function that will be called if an error occurs. **If not provided, the user will not be notified of any errors.**
 */
export const importCB = (errorCallback?: () => void) => {
  if (navigator.clipboard.readText) {
    console.debug(
      "MXUPS: navigator.clipboard.readText() supported. Beginning import."
    );
    navigator.clipboard.readText().then((text) => {
      // Try to JSON parse the text, if it fails, it's not a valid JSON string
      // Then show an error toast
      try {
        const importedStorage = JSON.parse(text);
        console.log(
          "MXUPS: JSON detected in clipboard. Resetting local storage and applying new storage data.",
          text
        );
        writeObject(importedStorage);
      } catch (e) {
        // If it fails, it's not a valid JSON string
        console.error("MXUPS: Import failed. Invalid JSON string.", e, text);
        // Call the custom error callback if it exists
        if (errorCallback) {
          errorCallback();
        }
      }
    });
  } else {
    console.error(
      "MXUPS: navigator.clipboard.readText() not supported. Import failed."
    );
    // Call the custom error callback if it exists
    if (errorCallback) {
      errorCallback();
    }
  }
};
