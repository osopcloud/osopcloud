import { clearStorage } from "./clearStorage";

/**
 * **Overwrites** storage and then applies the given object.
 *
 * This automatically excludes keys with the "_" prefix and "ally-supports-cache". Applications can "_" keys to store device-specific data.
 *
 * @param {Object} storage The object containing the keys and values to be applied to storage.
 */
export const writeObject = (storage: { [x: string]: string }) => {
  // Clear storage except for reserved keys
  clearStorage();

  // For each key, set the value
  // However, do not set the values of keys with the prefix "_"
  // These are reserved for internal use
  Object.keys(storage).forEach((key) => {
    if (key.substring(0, 1) !== "_") {
      // Exclude "ally-supports-cache"
      if (key !== "ally-supports-cache") {
        localStorage.setItem(key, storage[key]);
      }
    }
  });
};
