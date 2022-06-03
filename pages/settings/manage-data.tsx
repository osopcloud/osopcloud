// Types
import type { ReactElement } from "react";

// SEO
import Head from "next/head";

// Design
import {
  Button,
  createStandaloneToast,
  Heading,
  Stack,
  Text,
  useClipboard,
} from "@chakra-ui/react";
import theme from "lib/Theming";

// First party components
import DeleteSettings from "components/settings/DeleteSettings";

// Layouts
import Layout from "components/layouts/Layout";
import SettingsLayout from "components/layouts/SettingsLayout";

// Settings
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";

import { useState } from "react";

// Start page
export default function DataManagement() {
  const toast = createStandaloneToast({ theme: theme });

  // Get settings
  const [backButtonLargeWindows] = useLocalStorage(
    "settingsAlwaysShowBackButton"
  );
  const [showSessionThemeToggle] = useLocalStorage("settingsShowThemeToggle");
  const [disableDonationOptions] = useLocalStorage(
    "settingsDisableDonationOptions"
  );
  const [showTagsOnHome] = useLocalStorage("settingsShowTagsOnHome");
  const systemFont =
    typeof window !== "undefined"
      ? localStorage.getItem("settingsUseSystemFont") === "true"
      : "";

  // Reset functions
  function BeginReset() {
    DeleteSettings();
    if (systemFont) {
      setResetting(true);
      window.location.reload();
    }
    console.info("Reset completed.");
  }
  function BeginResetWithToast() {
    BeginReset();
    toast({
      title: "Reset Successful",
      status: "success",
      position: "top",
    });
  }

  // Check reset eligibility
  const resetStatus = () => {
    if (backButtonLargeWindows) {
      return false;
    } else {
      if (showSessionThemeToggle) {
        return false;
      } else {
        if (showTagsOnHome) {
          return false;
        } else {
          if (disableDonationOptions) {
            return false;
          } else {
            if (systemFont) {
              return false;
            } else {
              return true;
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
    console.info("Export completed. Osopcloud settings copied to clipboard.");
    toast({
      title: "Settings Successfully Exported",
      status: "success",
      position: "top",
    });
  }

  // Import settings
  function ImportSettings() {
    // @ts-ignore
    if (navigator.clipboard.readText) {
      console.debug(
        "navigator.clipboard.readText() supported. Beginning import."
      );
      navigator.clipboard.readText().then((text) => {
        // Try to JSON parse the text, if it fails, it's not a valid JSON string
        // Then show an error toast
        try {
          const importedSettings = JSON.parse(text);
          console.debug(
            "JSON detected in clipboard. Resetting Osopcloud and applying settings."
          );
          BeginReset();
          for (const key in importedSettings) {
            writeStorage(key, importedSettings[key]);
          }
          // If text includes the settingsUseSystemFont key, refresh the page
          // Else just show a toast
          if (importedSettings.settingsUseSystemFont) {
            setImporting(true);
            console.info("Import completed. Reloading to apply font settings.");
            window.location.reload();
          } else {
            console.info("Import completed. Applied settings from clipboard.");
            toast({
              title: "Settings Successfully Imported",
              status: "success",
              position: "top",
            });
          }
        } catch (e) {
          // If it fails, it's not a valid JSON string
          console.error("Import failed. Invalid JSON string.");
          toast({
            title: "No Settings Detected",
            status: "warning",
            position: "top",
          });
        }
      });
    } else {
      console.error(
        "Import failed. navigator.clipboard.readText() not supported."
      );
      toast({
        title: "This browser doesn't support reading the clipboard.",
        description: "The settings were not imported. (1102)",
        status: "error",
        position: "top",
      });
    }
  }

  // Make the import and reset buttons have loading states
  const [importing, setImporting] = useState(false);
  const [resetting, setResetting] = useState(false);

  return (
    <>
      <Head>
        <title>Manage Data &amp; Reset &mdash; Osopcloud</title>
        <meta
          name="description"
          content="Import, export, or reset Osopcloud Settings."
        />
        <meta name="og:title" content="Manage Data &amp; Reset" />
        <meta
          name="og:description"
          content="Import, export, or reset Osopcloud Settings."
        />
      </Head>

      <Heading size="md">Manage Application Data</Heading>
      <Stack direction="column" spacing={2}>
        <Button
          onClick={ImportSettings}
          isLoading={importing}
          loadingText="Importing"
        >
          Import Settings from Clipboard
        </Button>
        <Text fontSize="xs">
          Allow Osopcloud to read and analyse your clipboard for compatible
          settings data.
        </Text>
      </Stack>
      <Button onClick={ExportSettings} isDisabled={resetStatus()}>
        Export Settings Data to Clipboard
      </Button>
      <Stack direction="column" spacing={2}>
        <Button
          onClick={BeginResetWithToast}
          isDisabled={resetStatus()}
          isLoading={resetting}
          loadingText="Resetting Osopcloud"
        >
          Reset Osopcloud
        </Button>
        <Text fontSize="xs">
          Clear all settings and reset the application to the defaults.
        </Text>
      </Stack>
    </>
  );
}
DataManagement.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout showToTopButton={false} showShareButton={false}>
      <SettingsLayout>{page}</SettingsLayout>
    </Layout>
  );
};
