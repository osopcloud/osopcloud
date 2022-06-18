// Design
import { Spinner, usePrefersReducedMotion } from "@chakra-ui/react";

export default function Loading() {
  // Honour system accessibility preferences
  const animation = usePrefersReducedMotion();
  return animation ? <Spinner /> : <></>;
}
