// Types
import type { ReactElement } from "react";

// Design
import {
  Box,
  Center,
  Divider,
  Flex,
  Icon,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { FiMoreHorizontal, FiXCircle } from "react-icons/fi";

interface WindowProps {
  children: ReactElement;
  title: string;
}

/**
 * Displays content inside of a window. Used for UI demonstrations/simulations.
 *
 * @remarks
 * From the system collection. Inspired by Geist `<Window>`.
 */
export default function Window({ children, title }: WindowProps) {
  return (
    <Box>
      <Box bg="whiteAlpha.500" borderRadius="xl">
        <Flex py={2} px={5}>
          <Center>
            <Icon
              as={FiMoreHorizontal}
              aria-label="Window Menu icon"
              h={4}
              w={4}
            />
          </Center>
          <Spacer />
          <Text fontSize="xs">{title}</Text>
          <Spacer />
          <Center>
            <Icon as={FiXCircle} aria-label="Close Window icon" h={4} w={4} />
          </Center>
        </Flex>
        <Divider />
        <Box p={5}>{children}</Box>
      </Box>
    </Box>
  );
}
