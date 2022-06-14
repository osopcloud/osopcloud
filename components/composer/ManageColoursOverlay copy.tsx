// Design
import {
  Badge,
  Button,
  Center,
  createStandaloneToast,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import theme from "lib/Theming";

// First party components
import DynamicModal from "components/overlays/DynamicModal";

// Storage
import { deleteFromStorage, writeStorage } from "@rehooks/local-storage";

import { useState, useRef } from "react";

// Start component
export default function ManageColoursOverlay() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const toast = createStandaloneToast({ theme: theme });

  // Temporary colour storage
  const [tempColour, setTempColour] = useState("");

  // Eyedropper
  function OpenEyedropper() {
    // @ts-expect-error: Experimental API, not typed yet
    const eyeDropper = new EyeDropper();

    eyeDropper
      .open()
      .then((result: object) => {
        // @ts-expect-error
        const newColour = result.sRGBHex.toString();
        // Remove the # from the start of the colour
        const newColourNoHash = newColour.substring(1);
        setTempColour(newColourNoHash);
      })
      .catch((e: string) => {
        console.log(e);
      });
  }

  function BeginEyedropperFeature() {
    if (window.hasOwnProperty("EyeDropper")) {
      OpenEyedropper();
    } else {
      console.error("EyeDropper API not supported. (2)");
      toast({
        title: "This browser doesn't support the eyedropper",
        description: "Try using Google Chrome or Microsoft Edge. (2)",
        status: "error",
        position: "top",
      });
    }
  }

  // Check if tempColour has sufficient contrast
  function CheckContrast() {
    // Remove # from tempColour, if it exists
    setTempColour(tempColour.substring(1));

    // Get the red, green, and blue, values of the hex tempColour
    const tempColourRed = parseInt(tempColour.substring(0, 2), 16);
    const tempColourGreen = parseInt(tempColour.substring(2, 4), 16);
    const tempColourBlue = parseInt(tempColour.substring(4, 6), 16);

    // Luminance function used internally by CalculateContrast()
    function Luminance(r: number, g: number, b: number) {
      const a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    }

    // Calculate the contrast
    // rgb1 is the background colour, Rgb2 is the tempColourNoHash
    function CalculateContrast(rgb1: number[], rgb2: number[]) {
      const lum1 = Luminance(rgb1[0], rgb1[1], rgb1[2]);
      const lum2 = Luminance(rgb2[0], rgb2[1], rgb2[2]);
      var brightest = Math.max(lum1, lum2);
      var darkest = Math.min(lum1, lum2);
      return (brightest + 0.05) / (darkest + 0.05);
    }
    const attemptedContrastRatioLightMode = CalculateContrast(
      [tempColourRed, tempColourGreen, tempColourBlue],
      [247, 250, 252]
    );
    const attemptedContrastRatioDarkMode = CalculateContrast(
      [tempColourRed, tempColourGreen, tempColourBlue],
      [26, 32, 44]
    );

    // Check if the ratio between the two colours is equal or greater than 7:1
    if (attemptedContrastRatioLightMode >= 3) {
      if (attemptedContrastRatioDarkMode >= 3) {
        return true;
      } else return "dark";
    } else return "light";
  }

  // Apply the temporary colour
  function ApplyTempColour() {
    CheckContrast();
    if (CheckContrast() === true) {
      deleteFromStorage("composerProjectColour");
      writeStorage("composerProjectColour", tempColour);
      onClose();
    } else {
      console.error("Not enough contrast. Colour not applied. (9)");
      toast({
        title: "There isn't enough contrast",
        status: "error",
        position: "top",
        description: `This colour is too ${CheckContrast()}. (9)`,
      });
    }
  }

  return (
    <>
      <Button isActive={isOpen} onClick={onOpen}>
        Add a Project Colour
      </Button>

      <DynamicModal
        isOpen={isOpen}
        onClose={onClose}
        useAlertDialog={false}
        cancelRef={cancelRef}
      >
        <Stack direction="column" spacing={5}>
          <Stack direction="row" spacing={5}>
            <Heading size="md">Manage Colours</Heading>
            <Center>
              <Badge colorScheme="orange">Beta Preview</Badge>
            </Center>
          </Stack>
          <Text fontSize="xs">
            <b>Important:</b> Brand colours can sometimes be copyrighted. Check
            the project's brand guidelines to check if this limitation applies.
          </Text>
          <Input
            type="color"
            value={tempColour ? tempColour : ""}
            onChange={(e) => setTempColour(e.target.value)}
            shadow="inner"
            rounded="xl"
            focusBorderColor={tempColour ? tempColour : "black"}
          />
          <Stack direction="column" spacing={2}>
            <Button onClick={BeginEyedropperFeature}>Toggle Eyedropper</Button>
            <Text fontSize="xs">
              Select a colour from anywhere on your display.
            </Text>
          </Stack>
          <Button onClick={ApplyTempColour} isDisabled={!tempColour}>
            Apply{" "}
            {tempColour
              ? // Show #tempColour
                // If tempColour already includes #, remove the hash
                tempColour.startsWith("#")
                ? `#${tempColour.substring(1)}`
                : `#${tempColour}`
              : "Colour"}
          </Button>
          <Button onClick={onClose} ref={cancelRef}>
            Cancel
          </Button>
        </Stack>
      </DynamicModal>
    </>
  );
}
