// Types
import type { ReactElement } from "react";

// SEO
import Head from "next/head";

// Design
import {
  Box,
  Button,
  Center,
  createStandaloneToast,
  Flex,
  Heading,
  SimpleGrid,
  Spacer,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Switch,
  Text,
  useClipboard,
} from "@chakra-ui/react";
import theme from "lib/Theming";

// First party components
import DeleteSettings from "lib/DeleteSettings";
import { version } from "components/Version";

// Layouts
import Layout from "components/layouts/Layout";
import SettingsLayout from "components/layouts/SettingsLayout";

// Settings
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";

import { useState, useEffect } from "react";

// Start page
export default function StorageManagement() {
  const toast = createStandaloneToast({ theme: theme });

  // Get storage size
  const [storageSize, setStorageSize] = useState(0);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (navigator.storage) {
        navigator.storage.estimate().then((estimate) => {
          // estimate.usage is in bytes
          // We need to log the full byte value
          console.log("Full storage size", estimate.usage);
          // However to show the user, we need to convert to MB and round to one decimal place
          const storageSizeMB = estimate.usage
            ? Math.round((estimate.usage / 1024 / 1024) * 10) / 10
            : 0;
          setStorageSize(storageSizeMB);
        });
      }
    }
  });

  useEffect(() => {
    writeStorage("version", version);
  });

  // Get settings
  const systemFont =
    typeof window !== "undefined"
      ? localStorage.getItem("settingsUseSystemFont") === "true"
      : "";

  // Reset functions
  function BeginReset() {
    DeleteSettings();
    if (systemFont) {
      window.location.reload();
    }
    console.info("Reset completed.");
  }
  function BeginResetWithToast() {
    DeleteSettings();
    if (systemFont) {
      setResetting(true);
      window.location.reload();
    }
    toast({
      title: "Reset Successful",
      status: "success",
      position: "top",
    });
    console.info("Reset completed.");
  }

  // Check reset eligibility
  const [showPrintButton] = useLocalStorage("settingsShowPrintButton");
  const [disableDynamicPrinting] = useLocalStorage(
    "settingsDisableDynamicPrinting"
  );
  const [useSystemFont] = useLocalStorage("settingsUseSystemFont");
  const [composerName] = useLocalStorage("composerName");
  const [composerDescription] = useLocalStorage("composerDescription");
  const [composerDate] = useLocalStorage("composerDate");
  const [composerTags] = useLocalStorage("composerTags");
  const [composerPlatforms] = useLocalStorage("composerPlatforms");
  const [composerBasedOn] = useLocalStorage("composerBasedOn");
  const [composerDefaultDesktop] = useLocalStorage("composerDefaultDesktop");
  const [composerDefaultShell] = useLocalStorage("composerDefaultShell");
  const [composerSoftware] = useLocalStorage("composerSoftware");
  const [composerPackageManagement] = useLocalStorage(
    "composerPackageManagement"
  );
  const [composerStartup] = useLocalStorage("composerStartup");
  const [composerAuthors] = useLocalStorage("composerAuthors");
  const [composerWebsite] = useLocalStorage("composerWebsite");
  const [composerRepository] = useLocalStorage("composerRepository");
  const [composerProjectColour] = useLocalStorage("composerProjectColour");
  const resetStatus = showPrintButton
    ? false
    : disableDynamicPrinting
    ? false
    : useSystemFont
    ? false
    : composerName
    ? false
    : composerDescription
    ? false
    : composerDate
    ? false
    : composerTags
    ? false
    : composerPlatforms
    ? false
    : composerBasedOn
    ? false
    : composerDefaultDesktop
    ? false
    : composerDefaultShell
    ? false
    : composerSoftware
    ? false
    : composerPackageManagement
    ? false
    : composerStartup
    ? false
    : composerAuthors
    ? false
    : composerWebsite
    ? false
    : composerRepository
    ? false
    : composerProjectColour
    ? false
    : true;

  // Export settings
  const storage = typeof window !== "undefined" ? localStorage : "";
  const exportedSettings = JSON.stringify(storage);
  const { onCopy } = useClipboard(exportedSettings);
  function ExportSettings() {
    onCopy();
    console.info(
      "Export completed. Osopcloud storage data copied to clipboard."
    );
    toast({
      title: "Storage Data Successfully Exported",
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
          // If the version key in the imported settings is not the same as the current version, show an error toast
          if (importedSettings.version !== version) {
            console.error(
              "Storage data is from a different version (6)",
              importedSettings.version,
              version
            );
            toast({
              title: "These Settings are from a different version",
              status: "error",
              position: "top",
              description: "Try exporting storage data again. (6)",
            });
          } else {
            console.debug(
              "JSON detected in clipboard. Resetting Osopcloud and applying new storage data.",
              text
            );
            BeginReset();
            for (const key in importedSettings) {
              writeStorage(key, importedSettings[key]);
            }
            // If text includes the settingsUseSystemFont key, refresh the page
            // Else just show a toast
            if (importedSettings.settingsUseSystemFont) {
              setImporting(true);
              console.info(
                "Import completed. Reloading to apply font settings."
              );
              window.location.reload();
            } else {
              console.info(
                "Import completed. Applied storage data from clipboard."
              );
              toast({
                title: "Storage Successfully Imported",
                status: "success",
                position: "top",
              });
            }
          }
        } catch (e) {
          // If it fails, it's not a valid JSON string
          console.error("Import failed. Invalid JSON string.", e, text);
          toast({
            title: "No Storage Data Detected",
            status: "warning",
            position: "top",
          });
        }
      });
    } else {
      console.error(
        "Import failed. navigator.clipboard.readText() not supported. (2)"
      );
      toast({
        title: "This browser doesn't support reading the clipboard",
        description: "Storage data was not imported. (2)",
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
        <title>Storage Management &mdash; Osopcloud</title>
        <meta
          name="description"
          content="Import, export, or reset Osopcloud storage."
        />
        <meta name="og:title" content="Osopcloud Storage Settings" />
        <meta name="og:description" content="Manage Osopcloud app storage." />
      </Head>

      <SimpleGrid minChildWidth="300px" spacing={5}>
        <Stack direction="column" spacing={5}>
          <Stack direction="column" spacing={2}>
            <Button
              onClick={ImportSettings}
              isLoading={importing}
              loadingText="Importing"
            >
              Import Storage from Clipboard
            </Button>
            <Text fontSize="xs">
              Allow Osopcloud to read and analyse your clipboard for compatible
              storage data.
            </Text>
          </Stack>
          <Button onClick={ExportSettings} isDisabled={resetStatus}>
            Export Storage Data to Clipboard
          </Button>
          <Stack direction="column" spacing={2}>
            <Button
              onClick={BeginResetWithToast}
              isDisabled={resetStatus}
              isLoading={resetting}
              loadingText="Resetting Osopcloud"
            >
              Reset Osopcloud
            </Button>
            <Text fontSize="xs">
              Reset the Composer and apply the default Settings. Your work will
              be lost.
            </Text>
          </Stack>
        </Stack>
        {storageSize !== 0 && (
          <Center>
            <Stack direction="column" spacing={5} w="50%">
              <Stat>
                <StatLabel>Osopcloud is Storing</StatLabel>
                <StatNumber>{storageSize}mb</StatNumber>
                <StatHelpText>On this device, for this browser</StatHelpText>
              </Stat>
              <Text fontSize="xs">
                This includes the Offline Experience cache. Use your browser
                settings to clear the Osopcloud cache.
              </Text>
            </Stack>
          </Center>
        )}
      </SimpleGrid>
      <Text fontSize="xs">Version {version}</Text>
    </>
  );
}
StorageManagement.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout showToTopButton={false} showShareButton={false}>
      <SettingsLayout sidebarActiveIndex={4}>{page}</SettingsLayout>
    </Layout>
  );
};
