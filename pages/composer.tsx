// Types
import type { ReactElement } from "react";

// Suspense
import { Suspense } from "react";
import Loading from "components/system/Loading";

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
  SimpleGrid,
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
import { AnimatePresence, m } from "framer-motion";

// First party components
import Card from "components/system/Card";
import DeleteComposerDataOverlay from "components/composer/DeleteComposerDataOverlay";
import ExportComposerDataOverlay from "components/composer/ExportComposerDataOverlay";
import DonationManagementOverlay from "components/composer/DonationManagementOverlay";
import OrganisationNameOverlay from "components/composer/OrganisationNameOverlay";

// Storage
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";

// Layouts
import Layout from "components/layouts/Layout";

import { useState } from "react";

// Start page
export default function Composer() {
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
  const [sourceRepository] = useLocalStorage("composerRepository");
  const [organisationName] = useLocalStorage("composerOrganisationName");

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
        <title>Osopcloud Composer</title>
        <meta
          name="description"
          content="Composer an operating system page ready for publication on Osopcloud."
        />
        <meta name="og:title" content="Osopcloud Composer" />
        <meta
          name="og:description"
          content="Composer an OS page for Osopcloud."
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
              {composerGreeting ? (
                <Heading>{name}</Heading>
              ) : (
                <Editable
                  // @ts-ignore
                  value={name || ""}
                >
                  <EditablePreview as={Heading} fontWeight={600} />
                  <Center>
                    <Input
                      as={EditableInput}
                      onChange={(e) => {
                        writeStorage("composerName", e.target.value);
                      }}
                      size="lg"
                    />
                  </Center>
                </Editable>
              )}

              <Center display={{ base: "none", lg: "flex" }}>
                <Stack direction="row" spacing={2}>
                  <m.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Badge colorScheme="almondScheme">
                      Composer{organisationName && " for Organisations"}
                    </Badge>
                  </m.div>
                  <Center>
                    <AnimatePresence exitBeforeEnter>
                      <m.div
                        // @ts-ignore: This works
                        key={composerGreeting}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        {!composerGreeting && (
                          <Badge colorScheme="green">Saved to Storage</Badge>
                        )}
                      </m.div>
                    </AnimatePresence>
                  </Center>
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
            <m.div
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -10, opacity: 0 }}
              transition={{ duration: 0.175 }}
            >
              <Flex w="100%">
                <Container
                  maxWidth="container.lg"
                  mt={{ base: "none", lg: "15vh" }}
                >
                  <SimpleGrid minChildWidth="150px" spacing={10}>
                    <Center>
                      <Stack direction="column" spacing={5}>
                        <Heading size="md">
                          What should we call this OS?
                        </Heading>
                        <Input
                          placeholder="Enter the operating system name"
                          // @ts-ignore
                          value={name}
                          onChange={(e) => {
                            writeStorage("composerName", e.target.value);
                          }}
                          shadow="inner"
                          borderRadius="xl"
                        />
                        <Button
                          leftIcon={<FiArrowRight />}
                          onClick={() => {
                            setComposerGreeting(false);
                          }}
                          isDisabled={!name}
                        >
                          Create {name ? name : "this OS"}
                        </Button>
                        <Text fontSize="xs">
                          To edit an existing operating system, open it and
                          select "Open in Composer".
                        </Text>
                      </Stack>
                    </Center>
                    <Box display={{ base: "none", lg: "flex" }}>
                      <Card useBrandColours>
                        <Stack direction="column" spacing={5}>
                          <Text textStyle="miniHeading">
                            The Osopcloud Composer
                          </Text>
                          <Text>
                            Osopcloud Composer makes it easy to get operating
                            systems ready for Osopcloud.
                          </Text>
                          <Text>
                            With Osopcloud Composer, you'll compose together
                            information about the open-source operating system.
                            Then, use the export tools to get the OS on GitHub.
                          </Text>
                        </Stack>
                      </Card>
                    </Box>
                  </SimpleGrid>
                </Container>
              </Flex>
            </m.div>
          ) : (
            <Flex display="flex" flexDirection={{ base: "column", md: "row" }}>
              {/* This can't be a Stack because the first child might not be shown on small windows */}
              <Box flex={1} mb={{ base: 5, sm: 0 }}>
                <m.div
                  initial={{ x: 10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -10, opacity: 0 }}
                  transition={{ duration: 0.175 }}
                >
                  <Stack direction="column" spacing={5}>
                    <Textarea
                      // @ts-ignore
                      value={description}
                      onChange={(e) => {
                        writeStorage("composerDescription", e.target.value);
                      }}
                      placeholder={`Write about ${
                        name ? name : "this Project"
                      }`}
                      borderRadius="xl"
                      shadow="inner"
                      h={150}
                    />
                    <Table size="sm" variant="simple">
                      <Tbody>
                        <Tr>
                          <Td>Website URL</Td>
                          <Td>
                            <Editable
                              // @ts-ignore
                              value={website || "Click to Edit..."}
                            >
                              <EditablePreview />
                              <Input
                                as={EditableInput}
                                onChange={(e) => {
                                  writeStorage(
                                    "composerWebsite",
                                    e.target.value
                                  );
                                }}
                                size="sm"
                              />
                            </Editable>
                          </Td>
                        </Tr>
                        <Tr>
                          <Td>Source Repository URL</Td>
                          <Td>
                            <Editable
                              // @ts-ignore
                              value={sourceRepository || "Click to Edit..."}
                            >
                              <EditablePreview />
                              <Input
                                as={EditableInput}
                                onChange={(e) => {
                                  writeStorage(
                                    "composerRepository",
                                    e.target.value
                                  );
                                }}
                                size="sm"
                              />
                            </Editable>
                          </Td>
                        </Tr>
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
                              value={basedOn || "Click to Edit..."}
                            >
                              <EditablePreview />
                              <Input
                                as={EditableInput}
                                onChange={(e) => {
                                  writeStorage(
                                    "composerBasedOn",
                                    e.target.value
                                  );
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
                              value={desktop || "Click to Edit..."}
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
                              value={shell || "Click to Edit..."}
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
                                          {index !== software.length - 1 &&
                                            ", "}
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
                                            packageManagement.length - 1 &&
                                            ", "}
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
                              value={startup || "Click to Edit..."}
                            >
                              <EditablePreview />
                              <Input
                                as={EditableInput}
                                onChange={(e) => {
                                  writeStorage(
                                    "composerStartup",
                                    e.target.value
                                  );
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
                                            {index !== authors.length - 1 &&
                                              ", "}
                                          </>
                                        );
                                      } else {
                                        return (
                                          <>
                                            {author}
                                            {index !== authors.length - 1 &&
                                              ", "}
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
                        <Tr>
                          <Td>Full Corporate Organisation Name</Td>
                          <Td>
                            <Editable
                              // @ts-ignore
                              value={organisationName || "Click to Edit..."}
                            >
                              <EditablePreview />
                              <Input
                                as={EditableInput}
                                onChange={(e) => {
                                  writeStorage(
                                    "composerOrganisation",
                                    e.target.value
                                  );
                                }}
                                size="sm"
                              />
                            </Editable>
                          </Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </Stack>
                </m.div>
              </Box>
              <m.div
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -10, opacity: 0 }}
                transition={{ duration: 0.175 }}
              >
                <Stack direction="column" spacing={2} ms={{ base: 0, sm: 10 }}>
                  <DonationManagementOverlay />
                  <OrganisationNameOverlay />
                </Stack>
              </m.div>
            </Flex>
          )}
        </Suspense>
      </Stack>
    </>
  );
}
Composer.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      showToTopButton={false}
      showShareButton={false}
      sidebarActiveIndex={1}
    >
      {page}
    </Layout>
  );
};
