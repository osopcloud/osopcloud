// Types
import type { ReactNode } from "react";

// Design
import {
  Box,
  Center,
  Code,
  Flex,
  Icon,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiAlertTriangle, FiCheck, FiInfo } from "react-icons/fi";

import { Suspense } from "react";

interface NoteProps {
  children: ReactNode | string;
  type?: string | boolean;
  isToast?: boolean;
  errorCode?: number;
  m?: boolean;
}

/**
 * Displays a notice to the user, informing them of something important.
 *
 * @remarks
 * This is from the system collection, replacing Chakra UI `<Alert>`. Inspired by Geist `<Note>`.
 *
 * @example
 * ```js
 * <Note>Always change your password after a leak on another site.</Note>
 * ```
 *
 * @example
 * We can add a string type, choosing from "error", "warning", or "success".
 * ```js
 * <Note type="error">Incorrect password.</Note>
 * ```
 *
 * @example
 * We can also remove the "note" bolded text label, like this:
 * ```js
 * <Note type={false}>A (more) discreet note without "note"</Note>
 * ```
 */
export default function Note({
  children,
  type,
  errorCode,
  isToast,
  m,
}: NoteProps) {
  const greenFocusColour = useColorModeValue("green.800", "green.200");
  const orangeFocusColour = useColorModeValue("orange.800", "orange.200");
  const redFocusColour = useColorModeValue("red.800", "red.200");
  const focusColour =
    type === "success"
      ? greenFocusColour
      : type === "warning"
      ? orangeFocusColour
      : type === "error"
      ? redFocusColour
      : "inherit";

  // Children
  return (
    <Box
      px={5}
      py={2}
      border="1px solid"
      borderColor="inherit"
      borderRadius="xl"
      shadow="md"
      my={m ? 2 : 0}
      minW={errorCode ? 500 : "inherit"}
      color={isToast ? "gray.800" : "inherit"}
    >
      <Suspense fallback={children}>
        <Flex>
          <Center>
            {type !== false && (
              <Icon
                as={
                  type === "success"
                    ? FiCheck
                    : type === "warning"
                    ? FiInfo
                    : type === "error"
                    ? FiAlertTriangle
                    : FiInfo
                }
                color={focusColour}
                me={5}
              />
            )}
          </Center>
          <Text fontSize="sm">{children}</Text>
          {errorCode && (
            <>
              <Spacer />
              <Center>
                <Code fontSize="xs">{errorCode}</Code>
              </Center>
            </>
          )}
        </Flex>
      </Suspense>
    </Box>
  );
}
