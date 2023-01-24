// Types
import type { ReactElement } from "react";

// Design
import { Box, DarkMode } from "@chakra-ui/react";

interface CardProps {
  children: ReactElement;
  useBrandColours?: boolean;
}

/**
 * Displays content in a stylised card.
 *
 * @remarks
 * From the system collection.
 */
export default function Card({ children, useBrandColours }: CardProps) {
  return (
    <Box
      bg={useBrandColours ? "almond" : "whiteAlpha.400"}
      color={useBrandColours ? "white" : "inherit"}
      p={5}
      borderRadius="xl"
      shadow="md"
    >
      {useBrandColours ? (
        // @ts-ignore
        <DarkMode>{children}</DarkMode>
      ) : (
        children
      )}
    </Box>
  );
}
