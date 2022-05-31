// Design
import { useClipboard } from "@chakra-ui/react";

// First party components
import DeleteSettings from "components/settings/DeleteSettings";
import DynamicMenu from "components/overlays/DynamicMenu";

// Settings
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";

// Start component
export default function ManageSettings() {
  // Reset functions
  function BeginReset() {
    DeleteSettings();
    if (accessibleFonts) {
      window.location.reload();
    }
    console.info("Reset completed.");
  }

  // Check reset eligibility
  const [hideNotifications] = useLocalStorage("settingsHideNotifications");
  const [backButtonLargeWindows] = useLocalStorage(
    "settingsAlwaysShowBackButton"
  );
  const [showSessionThemeToggle] = useLocalStorage("settingsShowThemeToggle");
  const [metadataView] = useLocalStorage("settingsHomeMetadataView");
  const [disableDonationOptions] = useLocalStorage(
    "settingsDisableDonationOptions"
  );
  const accessibleFonts =
    typeof window !== "undefined"
      ? localStorage.getItem("settingsFontOverride")
      : "";
  const resetStatus = () => {
    if (hideNotifications) {
      return false;
    } else {
      if (backButtonLargeWindows) {
        return false;
      } else {
        if (showSessionThemeToggle) {
          return false;
        } else {
          if (metadataView) {
            return false;
          } else {
            if (disableDonationOptions) {
              return false;
            } else {
              if (accessibleFonts) {
                return false;
              } else {
                return true;
              }
            }
          }
        }
      }
    }
  };

  // Export settings
  const storage = typeof window !== "undefined" ? localStorage : "";
  const exportedSettings = JSON.stringify(storage);
  const { onCopy } = useClipboard(exportedSettings);
  function ExportSettings() {
    onCopy();
  }

  // Import settings
  function ImportSettings() {
    // @ts-ignore
    navigator.clipboard.readText().then((text) => {
      const importedSettings = JSON.parse(text);
      for (const key in importedSettings) {
        writeStorage(key, importedSettings[key]);
      }
    });
  }

  // Button array
  const buttonArray = [
    {
      name: "Import Settings from Clipboard",
      onClick: ImportSettings,
    },
    {
      name: "Export Settings to Clipboard",
      onClick: ExportSettings,
      isDisabled: resetStatus(),
    },
    {
      name: "Reset Osopcloud",
      onClick: BeginReset,
      isDisabled: resetStatus(),
    },
  ];

  return (
    <DynamicMenu
      options={buttonArray}
      buttonLabel="Import, Export, or Reset"
      actionLabel="Manage Osopcloud Settings"
    />
  );
}
