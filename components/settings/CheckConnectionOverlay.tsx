// Design
import {
  Button,
  Center,
  Code,
  Heading,
  Icon,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FiCheck, FiMinus, FiTool, FiX } from "react-icons/fi";

// First party components
import DynamicModal from "components/overlays/DynamicModal";

import { useRef, useState } from "react";

// Start component
export default function CheckConnectionOverlay() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  // Hooks
  const [isConnectedVercel, setIsConnectedVercel] = useState(false);
  const [ipAddress, setIPAddress] = useState("");
  const [ip, setIP] = useState("");

  const [checkDuration, setCheckDuration] = useState(0);
  const [requestDuration, setRequestDuration] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  async function RunAllChecks() {
    setIsLoading(true);

    const startTime = Date.now();

    // Contact Vercel API
    setLoadingText("Communicating with Vercel Edge Network");
    const vercelResponse = await fetch("https://vercel.com");
    if (vercelResponse.status === 200) {
      setIsConnectedVercel(true);
    } else {
      setIsConnectedVercel(false);
    }

    // Check IP
    setLoadingText("Downloading IP Information");
    const startIPRequestTime = Date.now();
    const IPAPIresponse = await fetch("https://api.ipify.org?format=text");
    const ip = await IPAPIresponse.text();
    setIPAddress(ip);
    if (ip.includes(".")) {
      // IPv4
      setIP("IPv4");
    }
    if (ip.includes(":")) {
      // IPv6
      setIP("IPv6");
    }
    const requestDuration = Date.now() - startIPRequestTime;
    setRequestDuration(requestDuration);

    // Check duration
    setLoadingText("Finalising");
    const duration = Date.now() - startTime;
    // Round up to seconds
    const durationRounded = Math.ceil(duration / 1000);
    setCheckDuration(durationRounded);

    setIsLoading(false);
  }

  return (
    <>
      <Button
        leftIcon={<FiTool />}
        onClick={() => {
          onOpen();
          RunAllChecks();
        }}
        isActive={isOpen}
      >
        Check Networking
      </Button>

      <DynamicModal
        isOpen={isOpen}
        onClose={onClose}
        useAlertDialog={false}
        cancelRef={cancelRef}
      >
        <Stack direction="column" spacing={5}>
          <Heading size="md">Network Troubleshooting</Heading>
          {isLoading ? (
            <>
              <Center py={10}>
                <Spinner />
              </Center>
              <Text fontSize="xs">{loadingText}</Text>
            </>
          ) : (
            <>
              <Stack direction="column" spacing={2}>
                <Stack direction="row" spacing={5}>
                  <Center>
                    <Icon
                      as={isConnectedVercel ? FiCheck : FiX}
                      aria-label={isConnectedVercel ? "Success" : "Fail"}
                    />
                  </Center>
                  <Text>
                    Vercel {isConnectedVercel ? "is" : "is not"} working
                  </Text>
                </Stack>
                <Stack direction="row" spacing={5}>
                  <Center>
                    <Icon
                      as={ipAddress ? FiCheck : FiX}
                      aria-label={ipAddress ? "Success" : "Fail"}
                    />
                  </Center>
                  <Text>
                    {ipAddress ? "You're" : "You are not"} connected to DNS (
                    <Code fontSize="xs">{ipAddress}</Code>)
                  </Text>
                </Stack>
                <Stack direction="row" spacing={5}>
                  <Center>
                    <Icon
                      as={ip === "IPv6" ? FiCheck : FiMinus}
                      aria-label={ipAddress ? "Success" : "Fail"}
                    />
                  </Center>
                  <Text>Using the {ip} Protocol</Text>
                </Stack>
                <Stack direction="row" spacing={5}>
                  <Center>
                    <Icon
                      as={
                        requestDuration <= 2000
                          ? FiCheck
                          : requestDuration <= 4000
                          ? FiMinus
                          : FiX
                      }
                      aria-label={requestDuration ? "Success" : "Fail"}
                    />
                  </Center>
                  <Text>Response time of {requestDuration}ms</Text>
                </Stack>
              </Stack>
              <Text fontSize="xs">
                This check took approximately {checkDuration}s.
              </Text>
            </>
          )}

          <Button
            onClick={() => {
              onClose();
            }}
            ref={cancelRef}
          >
            {isLoading ? "Cancel" : "Close & Discard"}
          </Button>
        </Stack>
      </DynamicModal>
    </>
  );
}
