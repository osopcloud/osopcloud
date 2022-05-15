# Error Reference

---

## Application Error Codes

> **Note:** The first number denotes a category, the second denotes a subcategory, and the third and fourth denote the error.

### 1xxx (Feature Availability)

- **1000:** General feature availability error.
- **1101:** The feature has been disabled by the user.
- **1102:** The feature has been disabled, or isn't supported, by the browser.
- **1103:** The feature has been disabled, or isn't supported, by the system.
- **1201:** The feature has been disabled by the application as a precautionary measure.
- **1301:** The feature isn't available in the detected region.
- **1401:** The feature requires a dependency that isn't available.
- **1402:** The feature requires an network connection, but one isn't available.

### 2xxx (Settings and Versions)

- **2000:** General settings error.
- **2102:** The setting is invalid.
- **2102:** The version is invalid.
- **2201:** Conflicting settings.
- **2202:** Conflicting version or commit.
- **2301:** The setting is not supported.
- **2302:** The version or commit is not supported.
- **2401:** The setting change could not be applied.
- **2402:** The update could not be applied.
- **2403:** The reset could not be completed.

### 3xxx (General Exception)

- **3000:** General exception.
- **3101:** An exception was found in a defined area of the document.
- **3102:** An exception was found in a non-defined document area.

---

## HTTP Status Codes with Fallbacks

### HTTP 4xx (Client)

- **404**: Not Found

### HTTP 5xx (Server)

- **500**: Internal Server Error
