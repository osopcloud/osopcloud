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
import { FiArrowLeft, FiArrowRight, FiShare } from "react-icons/fi";

// First party components
import DynamicModal from "components/overlays/DynamicModal";

// Storage
import { useLocalStorage } from "@rehooks/local-storage";

import { useRef, useState } from "react";

// Start component
export default function ExportComposerDataOverlay() {
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  // Storage
  const [name] = useLocalStorage("composerName");
  const [description] = useLocalStorage("composerDescription");
  const [date, setDate] = useLocalStorage("composerDate", []);
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
  const [sourceRepository] = useLocalStorage("composerRepository");

  const currentDate = new Date().toISOString();

  // Take this metadata and create the text of a JSON file
  const json = `
{
  "name": "${name}",
  "description": "${description}",
  "date": [
    "${date}",
    "${currentDate}"
  ]
  "tags": ${JSON.stringify(tags)},
  "platforms": ${JSON.stringify(platforms)},
  "basedOn": "${basedOn}",
  "desktop": "${desktop}",
  "shell": "${shell}",
  "software": ${JSON.stringify(software)},
  "packageManagement": ${JSON.stringify(packageManagement)},
  "startupManagement": "${startup}",
  "authors": ${JSON.stringify(authors)},
  "website": "${website}",
  "sourceRepository": "${sourceRepository}"
}`;

  // Share the file using the Web Share API
  function ShareAsFile() {
    const blob = new Blob([json], { type: "text/json" });
    const fileName = `${name}.json`.toLowerCase();
    const file = new File([blob], fileName, { type: "text/json" });
    if (navigator.share) {
      navigator
        .share({
          title: `${name}`,
          text: "Generated file with Osopcloud Composer",
          files: [file],
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) =>
          console.warn("Unable to complete sharing (8)", error)
        );
    }
  }

  const fileName = name
    ? `${name.replace(/\s/g, "-").toLowerCase()}.json`
    : null;

  // Download the file
  function DownloadAsFile() {
    const blob = new Blob([json], { type: "application/json" });
    // @ts-ignore
    const file = new File([blob], fileName, { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    // @ts-ignore
    a.download = fileName;
    a.click();
  }

  const { hasCopied, onCopy } = useClipboard(json);

  function ContinueOnGitHub() {
    setIsNavigatingAway(true);
    onCopy();
    router.push(
      `https://github.com/osopcloud/osopcloud/new/main/public/markdown/browse`
    );
  }

  const [isNavigatingAway, setIsNavigatingAway] = useState(false);

  // Show advanced options
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <>
      {/* This opens the export menu */}
      {/* This button needs to be disabled (isDisabled) when any of name, description, tags, platforms, basedOn, website are empty */}
      <Button
        leftIcon={<FiShare />}
        onClick={onOpen}
        isDisabled={
          !name || !description || !tags || !platforms || !basedOn || !website
        }
      >
        Export and Publish
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
                  Share <Code mx={2}>.json</Code> File
                </Button>
                <Text fontSize="xs">
                  Share a .json file with apps and people.
                </Text>
              </Stack>
              <Stack direction="column" spacing={2}>
                <Button onClick={DownloadAsFile}>
                  Save <Code mx={2}>.json</Code> File
                </Button>
                <Text fontSize="xs">
                  Save a .json file on your local system.
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
                  Name the file <Code mx={1}>{fileName}</Code> and paste within
                  the file.
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
