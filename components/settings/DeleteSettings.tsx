// Settings
import { deleteFromStorage } from "@rehooks/local-storage";

// Start component
export default function DeleteSettings() {
  deleteFromStorage("settingsHideNotifications");
  deleteFromStorage("settingsAlwaysShowBackButton");
  deleteFromStorage("settingsShowThemeToggle");
  deleteFromStorage("settingsHomeMetadataView");
  deleteFromStorage("settingsDisableDonationOptions");
  localStorage.removeItem("settingsFontOverride");
  console.info("LocalStorage cleared. Using default Settings.");
}
