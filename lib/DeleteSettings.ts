// Settings
import { deleteFromStorage } from "@rehooks/local-storage";
import { DeleteComposerData } from "components/composer/DeleteComposerDataOverlay";

// Start component
export default function DeleteSettings() {
  // Delete Settings data
  deleteFromStorage("settingsShowPrintButton");
  deleteFromStorage("settingsDisableDynamicPrinting");
  deleteFromStorage("settingsUseSystemFont");
  deleteFromStorage("settingsShowSwitchLabels");
  deleteFromStorage("settingsDisableCOKeyboardShortcuts");
  deleteFromStorage("forceUpdate");
  // Delete Composer data
  DeleteComposerData();
  // Log completion
  console.info("LocalStorage cleared.");
}
