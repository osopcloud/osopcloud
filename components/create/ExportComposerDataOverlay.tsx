// Types
import type { ReactElement } from "react";

// Routing
import { useRouter } from "next/router";

// Design
import {
  Button,
  Code,
  Heading,
  ListItem,
  OrderedList,
  Stack,
  Text,
  useClipboard,
  useDisclosure,
} from "@chakra-ui/react";
import { FiArrowLeft, FiArrowRight, FiShare, FiTrash2 } from "react-icons/fi";

// First party components
import DynamicModal from "components/overlays/DynamicModal";
import { DeleteComposerData } from "components/create/DeleteComposerDataOverlay";
import { version } from "components/Version";

// Storage
import { useLocalStorage } from "@rehooks/local-storage";

// Layouts
import Layout from "components/layouts/Layout";

import { useRef, useState } from "react";

// Start component
export default function ExportComposerDataOverlay() {
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  // Storage
  const [name] = useLocalStorage("composerName");
  const [description] = useLocalStorage("composerDescription");
  const [tags, setTags] = useLocalStorage("composerTags", []);
  const [platforms, setPlatforms] = useLocalStorage("composerPlatforms", []);
  const [basedOn] = useLocalStorage("composerBasedOn");
  const [desktop] = useLocalStorage("composerDefaultDesktop");
  const [shell] = useLocalStorage("composerDefaultShell");
  const [software, setSoftware] = useLocalStorage("composerSoftware", []);
  const [packageManagement, setPackageManagement] = useLocalStorage(
    "composerPackageManagement",
    []
  );
  const [startup] = useLocalStorage("composerStartup");
  const [authors, setAuthors] = useLocalStorage("composerAuthors", []);
  const [website] = useLocalStorage("composerWebsite");
  const [sourceRepository] = useLocalStorage("composerSourceRepository");

  // Convert tags to YAML
  const tagsYAML = tags
    .map((tag) => {
      return `- "${tag}"`;
    })
    .join("\n");
  // Convert platforms to YAML
  const platformsYAML = platforms
    .map((platform) => {
      return `- "${platform}"`;
    })
    .join("\n");
  // Convert software to YAML
  const softwareYAML = software
    .map((software) => {
      return `- "${software}"`;
    })
    .join("\n");
  // Convert package management to YAML
  const packageManagementYAML = packageManagement
    .map((packageManagement) => {
      return `- "${packageManagement}"`;
    })
    .join("\n");
  // Convert authors to YAML
  const authorsYAML = authors
    .map((author) => {
      return `- "${author}"`;
    })
    .join("\n");

  // Return a YAML array with the current date as ISO 8601 date string
  const date = new Date().toISOString();
  const dateYAML = `- "${date}"`;

  // Take this metadata and create an MDX file with embedded metadata
  const mdx = `---
# Generated with Osopcloud Composer (${version})

# Start metadata
name: "${name}"
date: ${dateYAML}
authors: ${authorsYAML}
tags: ${tagsYAML}
platforms: ${platformsYAML}
basedOn: "${basedOn}"
defaultDesktop: "${desktop}"
defaultShell: "${shell}"
software: ${softwareYAML}
packageManagement: ${packageManagementYAML}
startup: "${startup}"
website: "${website}"
repository: "${sourceRepository}"
---

${description}`;

  // Share the file using the Web Share API
  function ShareAsFile() {
    const blob = new Blob([mdx], { type: "text/plain" });
    const fileName = `${name}.mdx`.toLowerCase();
    const file = new File([blob], fileName, { type: "text/plain" });
    navigator.share({
      title: `${name}`,
      text: "Generated file with Osopcloud Composer",
      files: [file],
    });
  }

  const fileName = name
    ? `${name.replace(/\s/g, "-").toLowerCase()}.mdx`
    : null;

  // Download the file
  function DownloadAsFile() {
    const blob = new Blob([mdx], { type: "text/plain" });
    // @ts-ignore
    const file = new File([blob], fileName, { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    // @ts-ignore
    a.download = fileName;
    a.click();
  }

  const { hasCopied, onCopy } = useClipboard(mdx);

  function ContinueOnGitHub() {
    setIsNavigatingAway(true);
    onCopy();
    router.push(
      `https://github.com/noahlst/osopcloud/new/main/public/markdown/browse`
    );
  }

  const [isNavigatingAway, setIsNavigatingAway] = useState(false);

  // Show advanced options
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <>
      <Button leftIcon={<FiShare />} onClick={onOpen}>
        Export and Share
      </Button>

      <DynamicModal
        isOpen={isOpen}
        onClose={onClose}
        useAlertDialog={false}
        cancelRef={cancelRef}
      >
        <Stack direction="column" spacing={5}>
          <Heading size="md">
            {showAdvanced ? "Advanced Export Options" : "Export"}
          </Heading>
          {showAdvanced ? (
            <>
              <Stack direction="column" spacing={2}>
                <Button onClick={ShareAsFile}>
                  Share <Code mx={2}>.mdx</Code> File
                </Button>
                <Text fontSize="xs">
                  Share a .mdx text file with apps and people.
                </Text>
              </Stack>
              <Stack direction="column" spacing={2}>
                <Button onClick={DownloadAsFile}>
                  Save <Code mx={2}>.mdx</Code> File
                </Button>
                <Text fontSize="xs">
                  Save a .mdx text file on your local system.
                </Text>
              </Stack>
              <Button onClick={onCopy} isDisabled={hasCopied}>
                {hasCopied ? "Copied" : "Export Text to Clipboard"}
              </Button>
              <Button
                leftIcon={<FiArrowLeft />}
                onClick={() => setShowAdvanced(false)}
              >
                Go Back
              </Button>
            </>
          ) : (
            <>
              <Text>
                The next step is to publish the OS file onto the Osopcloud Git
                repository.
              </Text>
              <Text>
                It's easiest to use the GitHub web interface to directly create
                a pull request:
              </Text>
              <OrderedList ps={10}>
                <ListItem>Select "Continue on GitHub".</ListItem>
                <ListItem>
                  Name the file "{fileName}" and paste within the file.
                </ListItem>
                <ListItem>
                  Select "Create a New Branch", name the pull request, and
                  select "Commit".
                </ListItem>
              </OrderedList>
              <Button
                leftIcon={<FiArrowRight />}
                onClick={ContinueOnGitHub}
                isLoading={isNavigatingAway}
                loadingText="Opening GitHub"
              >
                Continue on GitHub
              </Button>
              <Button onClick={() => setShowAdvanced(true)}>
                Export as a File Instead
              </Button>
            </>
          )}
          <Button
            onClick={() => {
              onClose();
              setShowAdvanced(false);
            }}
            ref={cancelRef}
          >
            Cancel
          </Button>
        </Stack>
      </DynamicModal>
    </>
  );
}
ExportComposerDataOverlay.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout showToTopButton={false} showShareButton={false}>
      {page}
    </Layout>
  );
};
