/**
 * Converts local storage to a JSON string.
 */
export const createPackage = () => {
  // Collect all keys in local storage
  const storage = typeof window !== "undefined" ? localStorage : "";

  // Filter out keys with the prefix "_"
  // These are reserved for internal use
  const filteredStorage = {};
  Object.keys(storage).forEach((key) => {
    if (key.substring(0, 1) !== "_") {
      // Filter out "ally-supports-cache"
      if (key !== "ally-supports-cache") {
        // @ts-ignore: Will be fixed at a later date
        filteredStorage[key] = storage[key];
      }
    }
  });

  // Package up all keys and values into an object
  const exportPackage = JSON.stringify(filteredStorage);
  return exportPackage;
};
