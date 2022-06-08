// Types
import type { ReactElement } from "react";

// Suspense
import { Suspense } from "react";
import Loading from "components/Loading";

// Routing
import Link from "next/link";

// SEO
import Head from "next/head";

// Design
import {
  Badge,
  Box,
  Button,
  Center,
  Container,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
  IconButton,
  Input,
  Select,
  Spacer,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Tr,
} from "@chakra-ui/react";
import { FiArrowRight, FiMinus, FiPlus, FiX } from "react-icons/fi";

// First party components
import DeleteComposerDataOverlay from "components/composer/DeleteComposerDataOverlay";
import ExportComposerDataOverlay from "components/composer/ExportComposerDataOverlay";
import URLManagementOverlay from "components/composer/URLManagementOverlay";

// Storage
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";

// Layouts
import Layout from "components/layouts/Layout";

import { useState } from "react";

// Start page
export default function Create() {
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

  // Composer greeting
  const openComposerGreeting = () => {
    if (!name) {
      return true;
    } else return false;
  };
  const [composerGreeting, setComposerGreeting] =
    useState(openComposerGreeting);

  // Array editing fields
  const [editingTags, setEditingTags] = useState(false);
  const [editingPlatforms, setEditingPlatforms] = useState(false);
  const [editingSoftware, setEditingSoftware] = useState(false);
  const [editingPackageManagement, setEditingPackageManagement] =
    useState(false);
  const [editingAuthors, setEditingAuthors] = useState(false);

  // Array editing input UI state
  const [editingTagsInput, setEditingTagsInput] = useState("");
  const [editingPlatformsInput, setEditingPlatformsInput] = useState("");
  const [editingSoftwareInput, setEditingSoftwareInput] = useState("");
  const [editingPackageManagementInput, setEditingPackageManagementInput] =
    useState("");
  const [editingAuthorsInput, setEditingAuthorsInput] = useState("");

  // Array of tags which the user can choose from
  const availableTags = [
    "Select an Option...",
    "Desktop",
    "Mobile",
    "Advanced",
    "Enterprise",
    "Utility",
    "Shell",
    "Server",
    "Research",
  ];

  // Array of popular platforms which the user can choose from
  const availablePlatforms = [
    "Select an Option...",
    "x86",
    "arm",
    "PowerPC",
    "sparc",
    "riscv",
    "Itanium",
  ];

  return (
    <>
      <Head>
        <title>Create &mdash; Osopcloud</title>
        <meta
          name="description"
          content="Create an operating system page ready for publication on Osopcloud."
        />
        <meta name="og:title" content="Create an Osopcloud Page" />
        <meta
          name="og:description"
          content="Create an operating system page."
        />
      </Head>

      <Stack
        direction="row"
        spacing={2}
        display={{ base: "flex", lg: "none" }}
        mb={5}
      >
        <Badge colorScheme="almondScheme">Composer</Badge>
        <Suspense fallback={<Loading />}>
          {name && <Badge colorScheme="green">Saved to Storage</Badge>}
        </Suspense>
      </Stack>
      <Stack direction="column" spacing={5}>
        <Flex direction={{ base: "column", sm: "row" }}>
          <Suspense fallback={<Loading />}>
            <Stack direction="row" spacing={5}>
              <Heading>{name}</Heading>
              <Center display={{ base: "none", lg: "flex" }}>
                <Stack direction="row" spacing={2}>
                  <Badge colorScheme="almondScheme">Composer</Badge>
                  {name && <Badge colorScheme="green">Saved to Storage</Badge>}
                </Stack>
              </Center>
            </Stack>
          </Suspense>
          <Spacer />
          <Center>
            <Stack direction="row" spacing={2}>
              <DeleteComposerDataOverlay />
              <ExportComposerDataOverlay />
            </Stack>
          </Center>
        </Flex>

        <Suspense fallback={<Loading />}>
          {composerGreeting ? (
            <Flex w="100%">
              <Container
                maxWidth="container.sm"
                mt={{ base: "none", lg: "20vh" }}
              >
                <Stack direction="column" spacing={5}>
                  <Heading size="md">What's the name of the OS?</Heading>
                  <Input
                    placeholder="Enter the Operating System name"
                    onChange={(e) => {
                      writeStorage("composerName", e.target.value);
                    }}
                  />
                  <Text fontSize="xs">
                    You're about to create{" "}
                    {name ? `a page for ${name}` : "something new"}. To edit an
                    operating system that's already on Osopcloud, open it and
                    select "Open in Composer".
                  </Text>
                  <Button
                    leftIcon={<FiArrowRight />}
                    onClick={() => {
                      setComposerGreeting(false);
                    }}
                    isDisabled={!name}
                  >
                    Open the Composer
                  </Button>
                </Stack>
              </Container>
            </Flex>
          ) : (
            <Flex display="flex" flexDirection={{ base: "column", md: "row" }}>
              {/* This can't be a Stack because the first child might not be shown on small windows */}
              <Box flex={1} mb={{ base: 5, sm: 0 }}>
                <Stack direction="column" spacing={5}>
                  <Editable
                    // @ts-ignore
                    value={description || "Click to edit the description..."}
                  >
                    <EditablePreview />
                    <Textarea
                      as={EditableInput}
                      onChange={(e) => {
                        writeStorage("composerDescription", e.target.value);
                      }}
                    />
                  </Editable>
                  <Table size="sm" variant="simple">
                    <Tbody>
                      <Tr>
                        <Td>All Tags</Td>
                        <Td>
                          {editingTags ? (
                            <Stack direction="row" spacing={5}>
                              <Select
                                onChange={(e) => {
                                  setEditingTagsInput(e.target.value);
                                }}
                                size="sm"
                              >
                                {availableTags.map((tag, index) => (
                                  <option key={index} value={tag}>
                                    {tag}
                                  </option>
                                ))}
                              </Select>
                              <Stack direction="row" spacing={2}>
                                <Button
                                  onClick={() => {
                                    // @ts-ignore
                                    setTags([...tags, editingTagsInput]);
                                    setEditingTags(false);
                                  }}
                                  size="sm"
                                >
                                  Add Tag
                                </Button>
                                <IconButton
                                  icon={<FiX />}
                                  aria-label="Cancel"
                                  onClick={() => {
                                    setEditingTags(false);
                                  }}
                                  size="sm"
                                />
                              </Stack>
                            </Stack>
                          ) : (
                            <Stack direction="row" spacing={5}>
                              <Center>
                                <Stack direction="row" spacing={2}>
                                  {tags.map((tag, index) => (
                                    <Badge key={index}>{tag}</Badge>
                                  ))}
                                </Stack>
                              </Center>
                              <Stack direction="row" spacing={2}>
                                <IconButton
                                  icon={<FiPlus />}
                                  aria-label="Add a Tag"
                                  onClick={() => {
                                    setEditingTags(true);
                                  }}
                                  size="sm"
                                />
                                {tags.length > 0 && (
                                  <IconButton
                                    icon={<FiMinus />}
                                    aria-label="Remove the Last Tag"
                                    onClick={() => {
                                      setTags(
                                        tags.filter(
                                          (tag, index) =>
                                            index !== tags.length - 1
                                        )
                                      );
                                    }}
                                    size="sm"
                                  />
                                )}
                              </Stack>
                            </Stack>
                          )}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Popular Platforms</Td>
                        <Td>
                          {editingPlatforms ? (
                            <Stack direction="row" spacing={5}>
                              {/* Let the user select from the popular platforms */}
                              <Select
                                onChange={(e) => {
                                  setEditingPlatformsInput(e.target.value);
                                }}
                                size="sm"
                              >
                                {availablePlatforms.map((platform, index) => (
                                  <option key={index} value={platform}>
                                    {platform}
                                  </option>
                                ))}
                              </Select>
                              <Stack direction="row" spacing={2}>
                                <Button
                                  onClick={() => {
                                    setPlatforms([
                                      // @ts-ignore
                                      ...platforms,
                                      // @ts-ignore
                                      editingPlatformsInput,
                                    ]);
                                    setEditingPlatforms(false);
                                  }}
                                  size="sm"
                                >
                                  Add Platform
                                </Button>
                                <IconButton
                                  icon={<FiX />}
                                  aria-label="Cancel"
                                  onClick={() => {
                                    setEditingPlatforms(false);
                                  }}
                                  size="sm"
                                />
                              </Stack>
                            </Stack>
                          ) : (
                            // Map platforms
                            // Add a comma if it's not the last platform
                            <Stack direction="row" spacing={5}>
                              <Center>
                                <Text fontSize="sm">
                                  {platforms.sort().map((platform, index) => (
                                    <>
                                      {platform}
                                      {index !== platforms.length - 1 && ", "}
                                    </>
                                  ))}
                                </Text>
                              </Center>
                              <Stack direction="row" spacing={2}>
                                <IconButton
                                  icon={<FiPlus />}
                                  aria-label="Add a Platform"
                                  onClick={() => {
                                    setEditingPlatforms(true);
                                  }}
                                  size="sm"
                                />
                                {/* Button to remove the last platform from the array */}
                                {platforms.length > 0 && (
                                  <IconButton
                                    icon={<FiMinus />}
                                    aria-label="Remove the Last Platform"
                                    onClick={() => {
                                      setPlatforms(
                                        platforms.filter(
                                          (platform, index) =>
                                            index !== platforms.length - 1
                                        )
                                      );
                                    }}
                                    size="sm"
                                  />
                                )}
                              </Stack>
                            </Stack>
                          )}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Based On</Td>
                        <Td>
                          <Editable
                            // @ts-ignore
                            value={basedOn || "Click to edit..."}
                          >
                            <EditablePreview />
                            <Input
                              as={EditableInput}
                              onChange={(e) => {
                                writeStorage("composerBasedOn", e.target.value);
                              }}
                              size="sm"
                            />
                          </Editable>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Default Desktop</Td>
                        <Td>
                          <Editable
                            // @ts-ignore
                            value={desktop || "Click to edit..."}
                          >
                            <EditablePreview />
                            <Input
                              as={EditableInput}
                              onChange={(e) => {
                                writeStorage(
                                  "composerDefaultDesktop",
                                  e.target.value
                                );
                              }}
                              size="sm"
                            />
                          </Editable>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Default Shell</Td>
                        <Td>
                          <Editable
                            // @ts-ignore
                            value={shell || "Click to edit..."}
                          >
                            <EditablePreview />
                            <Input
                              as={EditableInput}
                              onChange={(e) => {
                                writeStorage(
                                  "composerDefaultShell",
                                  e.target.value
                                );
                              }}
                              size="sm"
                            />
                          </Editable>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Key Software</Td>
                        <Td>
                          {editingSoftware ? (
                            <Stack direction="row" spacing={5}>
                              <Input
                                onChange={(e) => {
                                  setEditingSoftwareInput(e.target.value);
                                }}
                                size="sm"
                              />
                              <Stack direction="row" spacing={2}>
                                <Button
                                  onClick={() => {
                                    setSoftware([
                                      // @ts-ignore
                                      ...software,
                                      // @ts-ignore
                                      editingSoftwareInput,
                                    ]);
                                    setEditingSoftware(false);
                                  }}
                                  size="sm"
                                >
                                  Add Software Title
                                </Button>
                                <IconButton
                                  icon={<FiX />}
                                  aria-label="Cancel"
                                  onClick={() => {
                                    setEditingSoftware(false);
                                  }}
                                  size="sm"
                                />
                              </Stack>
                            </Stack>
                          ) : (
                            <Stack direction="row" spacing={5}>
                              <Center>
                                <Text fontSize="sm">
                                  {software
                                    .sort()
                                    .map((softwareTitle, index) => (
                                      <>
                                        {softwareTitle}
                                        {index !== software.length - 1 && ", "}
                                      </>
                                    ))}
                                </Text>
                              </Center>
                              <Stack direction="row" spacing={2}>
                                <IconButton
                                  icon={<FiPlus />}
                                  aria-label="Add a Software Title"
                                  onClick={() => {
                                    setEditingSoftware(true);
                                  }}
                                  size="sm"
                                />
                                {software.length > 0 && (
                                  <IconButton
                                    icon={<FiMinus />}
                                    aria-label="Remove the Last Software Title"
                                    onClick={() => {
                                      setSoftware(
                                        software.filter(
                                          (softwareTitle, index) =>
                                            index !== software.length - 1
                                        )
                                      );
                                    }}
                                    size="sm"
                                  />
                                )}
                              </Stack>
                            </Stack>
                          )}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Package Management</Td>
                        <Td>
                          {editingPackageManagement ? (
                            <Stack direction="row" spacing={5}>
                              <Input
                                onChange={(e) => {
                                  setEditingPackageManagementInput(
                                    e.target.value
                                  );
                                }}
                                size="sm"
                              />
                              <Stack direction="row" spacing={2}>
                                <Button
                                  onClick={() => {
                                    setPackageManagement([
                                      // @ts-ignore
                                      ...packageManagement,
                                      // @ts-ignore
                                      editingPackageManagementInput,
                                    ]);
                                    setEditingPackageManagement(false);
                                  }}
                                  size="sm"
                                >
                                  Add Package Manager
                                </Button>
                                <IconButton
                                  icon={<FiX />}
                                  aria-label="Cancel"
                                  onClick={() => {
                                    setEditingPackageManagement(false);
                                  }}
                                  size="sm"
                                />
                              </Stack>
                            </Stack>
                          ) : (
                            <Stack direction="row" spacing={5}>
                              <Center>
                                <Text fontSize="sm">
                                  {packageManagement
                                    .sort()
                                    .map((manager, index) => (
                                      <>
                                        {manager}
                                        {index !==
                                          packageManagement.length - 1 && ", "}
                                      </>
                                    ))}
                                </Text>
                              </Center>
                              <Stack direction="row" spacing={2}>
                                <IconButton
                                  icon={<FiPlus />}
                                  aria-label="Add a Package Manager"
                                  onClick={() => {
                                    setEditingPackageManagement(true);
                                  }}
                                  size="sm"
                                />
                                {packageManagement.length > 0 && (
                                  <IconButton
                                    icon={<FiMinus />}
                                    aria-label="Remove the Last Package Manager"
                                    onClick={() => {
                                      setPackageManagement(
                                        packageManagement.filter(
                                          (manager, index) =>
                                            index !==
                                            packageManagement.length - 1
                                        )
                                      );
                                    }}
                                    size="sm"
                                  />
                                )}
                              </Stack>
                            </Stack>
                          )}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Startup Framework</Td>
                        <Td>
                          <Editable
                            // @ts-ignore
                            value={startup || "Click to edit..."}
                          >
                            <EditablePreview />
                            <Input
                              as={EditableInput}
                              onChange={(e) => {
                                writeStorage("composerStartup", e.target.value);
                              }}
                              size="sm"
                            />
                          </Editable>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Authors</Td>
                        <Td>
                          {editingAuthors ? (
                            <Stack direction="row" spacing={5}>
                              <Input
                                onChange={(e) => {
                                  setEditingAuthorsInput(e.target.value);
                                }}
                                size="sm"
                              />
                              <Stack direction="row" spacing={2}>
                                <Button
                                  onClick={() => {
                                    setAuthors([
                                      // @ts-ignore
                                      ...authors,
                                      // @ts-ignore
                                      editingAuthorsInput,
                                    ]);
                                    setEditingAuthors(false);
                                  }}
                                  size="sm"
                                >
                                  Add Author
                                </Button>
                                <IconButton
                                  icon={<FiX />}
                                  aria-label="Cancel"
                                  onClick={() => {
                                    setEditingAuthors(false);
                                  }}
                                  size="sm"
                                />
                              </Stack>
                            </Stack>
                          ) : (
                            <Stack direction="row" spacing={5}>
                              <Center>
                                <Text fontSize="sm">
                                  {authors.sort().map((author, index) => {
                                    // Make everything starting with @ a link to GitHub
                                    // @ts-ignore
                                    if (author.startsWith("@")) {
                                      // @ts-ignore
                                      const githubProfile = author.replace(
                                        "@",
                                        ""
                                      );
                                      return (
                                        <>
                                          <Link
                                            href={`https://github.com/${githubProfile}`}
                                          >
                                            {author}
                                          </Link>
                                          {index !== authors.length - 1 && ", "}
                                        </>
                                      );
                                    } else {
                                      return (
                                        <>
                                          {author}
                                          {index !== authors.length - 1 && ", "}
                                        </>
                                      );
                                    }
                                  })}
                                </Text>
                              </Center>
                              <Stack direction="row" spacing={2}>
                                <IconButton
                                  icon={<FiPlus />}
                                  aria-label="Add an Author"
                                  onClick={() => {
                                    setEditingAuthors(true);
                                  }}
                                  size="sm"
                                />
                                {authors.length > 0 && (
                                  <IconButton
                                    icon={<FiMinus />}
                                    aria-label="Remove the Last Author"
                                    onClick={() => {
                                      setAuthors(
                                        authors.filter(
                                          (author, index) =>
                                            index !== authors.length - 1
                                        )
                                      );
                                    }}
                                    size="sm"
                                  />
                                )}
                              </Stack>
                            </Stack>
                          )}
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </Stack>
              </Box>
              <Stack direction="column" spacing={2} ms={{ base: 0, sm: 10 }}>
                <URLManagementOverlay />
              </Stack>
            </Flex>
          )}
        </Suspense>
      </Stack>
    </>
  );
}
Create.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout showToTopButton={false} showShareButton={false}>
      {page}
    </Layout>
  );
};
