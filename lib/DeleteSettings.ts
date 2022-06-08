// Settings
import { deleteFromStorage } from "@rehooks/local-storage";

// Start component
export default function DeleteSettings() {
  // Delete Settings data
  deleteFromStorage("settingsShowTagsOnHome");
  deleteFromStorage("settingsShowPrintButton");
  deleteFromStorage("settingsDisableDynamicPrinting");
  deleteFromStorage("settingsUseSystemFont");
  deleteFromStorage("settingsShowDeveloperOptions");
  // Delete Composer data
  deleteFromStorage("composerName");
  deleteFromStorage("composerDescription");
  deleteFromStorage("composerDate");
  deleteFromStorage("composerTags");
  deleteFromStorage("composerPlatforms");
  deleteFromStorage("composerBasedOn");
  deleteFromStorage("composerDefaultDesktop");
  deleteFromStorage("composerDefaultShell");
  deleteFromStorage("composerSoftware");
  deleteFromStorage("composerPackageManagement");
  deleteFromStorage("composerStartup");
  deleteFromStorage("composerAuthors");
  deleteFromStorage("composerWebsite");
  deleteFromStorage("composerRepository");
  // Log completion
  console.info("LocalStorage cleared. Using default settings.");
}
