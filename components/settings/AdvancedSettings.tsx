// Routing
import Link from "next/link";

// Design
import {
  Button,
  Heading,
  Stack,
  Text,
  useClipboard,
  useDisclosure,
} from "@chakra-ui/react";

// First party components
import ChangeApplicationFont from "components/settings/ChangeApplicationFont";
import DynamicModal from "components/overlays/DynamicModal";
import DeleteSettings from "components/settings/DeleteSettings";
import { version } from "components/Version";

// Settings
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";

import { useRef, useState } from "react";

// Start component
export default function AdvancedSettings() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const closeRef: any = useRef();

  // Get settings
  const [disableDonationOptions] = useLocalStorage(
    "settingsDisableDonationOptions"
  );

  // Reset functions
  function BeginReset() {
    DeleteSettings();
    if (accessibleFonts) {
      window.location.reload();
      onClose();
    } else onClose();
    console.info("Reset completed.");
  }

  // Check reset eligibility
  const [hideNotifications] = useLocalStorage("settingsHideNotifications");
  const [backButtonLargeWindows] = useLocalStorage(
    "settingsAlwaysShowBackButton"
  );
  const [showSessionThemeToggle] = useLocalStorage("settingsShowThemeToggle");
  const [metadataView] = useLocalStorage("settingsHomeMetadataView");
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
    onClose();
  }

  // Import settings
  function ImportSettings() {
    // navigator.clipboard.readText(), then JSON parse, and writeStorage for each key value pair

    // @ts-ignore
    navigator.clipboard.readText().then((text) => {
      const importedSettings = JSON.parse(text);
      for (const key in importedSettings) {
        writeStorage(key, importedSettings[key]);
      }
    });
    onClose();
  }

  return (
    <>
      {isOpen ? (
        <Button isActive>Advanced Settings</Button>
      ) : (
        <Button onClick={onOpen}>Advanced Settings</Button>
      )}

      <DynamicModal
        isOpen={isOpen}
        onClose={onClose}
        cancelRef={closeRef}
        useAlertDialog={false}
      >
        <Stack direction="column" spacing={5}>
          <Heading size="md">Advanced Settings</Heading>
          <ChangeApplicationFont />
          <Button
            onClick={(_) =>
              writeStorage(
                "settingsDisableDonationOptions",
                disableDonationOptions ? false : true
              )
            }
          >
            {disableDonationOptions ? "Enable" : "Disable"} Donation Features
          </Button>
          <Stack direction="column" spacing={2}>
            <Button onClick={ImportSettings}>
              Import Settings from Clipboard
            </Button>
            <Button isDisabled={resetStatus()} onClick={ExportSettings}>
              Export Settings to Clipboard
            </Button>
            <Button isDisabled={resetStatus()} onClick={BeginReset}>
              Reset Osopcloud
            </Button>
          </Stack>
          <Text fontSize="xs">
            Import Settings from Clipboard will reveal your full clipboard to
            the application.{" "}
            <Link href="/about/privacy">Osopcloud Privacy Notice...</Link>
          </Text>
          <Stack direction="column" spacing={0} fontSize="xs">
            <Text>Osopcloud Web Application</Text>
            <Text>
              Version {version} (<Link href="/commit">View Commit</Link>)
            </Text>
            <Text>
              <Link href="https://nextjs.org">Next.js</Link> technology on{" "}
              <Link href="https://vercel.com">Vercel</Link>
            </Text>
            <Text>
              Set in{" "}
              {accessibleFonts === "true"
                ? "Atkinson Hyperlegible"
                : accessibleFonts === "system"
                ? "the System Font"
                : "Public Sans"}
            </Text>
          </Stack>
          <Button onClick={onClose} ref={closeRef}>
            Close
          </Button>
        </Stack>
      </DynamicModal>
    </>
  );
}
function readText() {
  throw new Error("Function not implemented.");
}
