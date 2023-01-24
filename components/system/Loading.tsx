// Design
import { Spinner, Text, usePrefersReducedMotion } from "@chakra-ui/react";

/**
 * Displays a loading indicator.
 *
 * @remarks
 * Adapts to "prefer reduced motion" OS setting - if that's enabled, we won't show a spinner. From the system collection, replacing Chakra UI `<Spinner>`.
 */
export default function Loading() {
  // Honour system accessibility preferences
  const animation = usePrefersReducedMotion();
  return animation ? <Text>Loading</Text> : <Spinner />;
}
