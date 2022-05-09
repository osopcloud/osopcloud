# Error Reference

---

## Application Error Codes

> **Note:** The first number denotes a category, the second denotes a subcategory, and the third and fourth denote the error.

### 1xxx (Feature Availability)

- **1001:** The feature has been disabled by the user.
- **1002:** The feature has been disabled, or isn't supported, by the browser.
- **1003:** The feature has been disabled, or isn't supported, by the system.
- **1101:** The feature has been disabled by the application as a precautionary measure.
- **1201:** The feature isn't available in the detected region.
- **1301:** The feature requires a dependency that isn't available.
- **1302:** The feature requires an network connection, but one isn't available.

### 2xxx (Settings and Versions)

- **2001:** The setting is invalid.
- **2002:** The version is invalid.
- **2101:** Conflicting settings.
- **2102:** Conflicting version or commit.
- **2201:** The setting is not supported.
- **2202:** The version or commit is not supported.
- **2301:** The setting change could not be applied.
- **2302:** The update could not be applied.
- **2303:** The reset could not be completed.

### 3xxx (General Exception)

- **3001:** An exception was found in a defined area of the document.
- **3002:** An exception was found in a non-defined document area.

---

## HTTP Status Codes with Fallbacks

### HTTP 4xx (Client)

- **404**: Not Found

### HTTP 5xx (Server)

- **500**: Internal Server Error
