/**
 * Runs `localStorage.clear()` and **erases everything** in local storage, except for reserved keys.
 */
export const clearStorage = () => {
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

  // Clear filtered storage
  Object.keys(filteredStorage).forEach((key) => {
    // @ts-ignore: Will be fixed at a later date
    localStorage.removeItem(key);
  });

  console.log("MXUPS: Cleared local storage, excluding reserved keys.");
};

/**
 * Runs `localStorage.clear()` and **completely erases everything** in local storage.
 */
export const clearAllStorage = () => {
  localStorage.clear();
  console.log("MXUPS: Cleared all local storage.");
};
