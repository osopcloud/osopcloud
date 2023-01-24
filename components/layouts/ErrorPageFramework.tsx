// Routing
import Link from "next/link";
import { useRouter } from "next/router";

// Design
import {
  Button,
  Center,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { m } from "framer-motion";
import {
  FiAlertTriangle,
  FiArrowLeft,
  FiHome,
  FiRefreshCw,
} from "react-icons/fi";

interface LayoutProps {
  children: React.ReactNode;
  heading: string;
  errorCode: string | number;
}

// Start component
export default function ErrorPageFramework({
  children,
  heading,
  errorCode,
}: LayoutProps) {
  const router = useRouter();

  return (
    <Stack direction="column" spacing={5}>
      <Heading>{heading}</Heading>
      <SimpleGrid minChildWidth="340px" spacing={10}>
        <m.div
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Stack direction="column" spacing={5}>
            {children}
            <Stack direction="column" spacing={2}>
              <Link href="/" passHref>
                <Button leftIcon={<FiHome />} as="a">
                  Go Home
                </Button>
              </Link>
              <Button leftIcon={<FiArrowLeft />} onClick={router.back}>
                Go Back
              </Button>
            </Stack>
            <Button leftIcon={<FiRefreshCw />} onClick={router.reload}>
              Try Again
            </Button>
          </Stack>
        </m.div>
        <m.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <Center h="50vh" display={{ base: "none", lg: "flex" }}>
            <Icon as={FiAlertTriangle} w={150} h={150} aria-label="Options" />
          </Center>
        </m.div>
      </SimpleGrid>
    </Stack>
  );
}
