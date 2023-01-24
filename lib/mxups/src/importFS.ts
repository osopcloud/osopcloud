import { writeObject } from "./utils/writeObject";

/**
 * Reads the contents of a JSON file and **overwrites** local storage with the contents of the file.
 *
 * @param {Blob} file The file to read.
 * @param {() => void} errorCallback Callback function that will be called if an error occurs. **If not provided, the user will not be notified of any errors.**
 */
export const importFS = (file: Blob, errorCallback?: () => void) => {
  try {
    // Read the file
    const reader = new FileReader();
    reader.onload = (e) => {
      // @ts-ignore
      const storage = JSON.parse(e.target.result).then((text) => {
        // Try to JSON parse the text, if it fails, it's not a valid JSON string
        // Then show an error toast
        try {
          console.log(
            "MXUPS: JSON detected in file. Resetting local storage and applying new storage data.",
            text
          );
          writeObject(storage);
        } catch (e) {
          // If it fails, it's not a valid JSON string
          console.error("MXUPS: Import failed. Invalid JSON string.", e, text);
        }
      });
    };
    reader.readAsText(file);
  } catch {
    console.error("MXUPS: FileReader() not supported. Import failed.");
    // Call the custom error callback if it exists
    if (errorCallback) {
      errorCallback();
    }
  }
};
