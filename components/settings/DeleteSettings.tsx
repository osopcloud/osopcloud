// Settings
import { deleteFromStorage } from "@rehooks/local-storage";

// Start component
export default function DeleteSettings() {
  deleteFromStorage("settingsHideNotifications");
  deleteFromStorage("settingsAlwaysShowBackButton");
  deleteFromStorage("settingsShowThemeToggle");
  deleteFromStorage("settingsShowTagsOnHome");
  deleteFromStorage("settingsDisableDonationOptions");
  localStorage.removeItem("settingsUseSystemFont");
  console.info("LocalStorage cleared. Using default settings.");
}
