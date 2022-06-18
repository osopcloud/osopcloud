// Design
import { Icon, useColorModeValue } from "@chakra-ui/react";

// Start component
export default function Logo() {
  const fill = useColorModeValue("#573d24", "#efe7df");
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 180 180"
    >
      <rect width="180" height="180" fill="none" />
      <circle
        cx="90.05"
        cy="89.66"
        r="80"
        fill="none"
        stroke={fill}
        strokeMiterlimit="10"
        strokeWidth="5"
      />
      <line
        x1="42.05"
        y1="114.81"
        x2="20.42"
        y2="129.79"
        fill="none"
        stroke={fill}
        strokeMiterlimit="10"
        strokeWidth="5"
      />
      <polygon
        points="169.4 42.11 56.5 117.87 47.34 102 169.4 42.11"
        fill="none"
        stroke={fill}
        strokeMiterlimit="10"
        strokeWidth="5"
      />
      <line
        x1="149.01"
        y1="73.47"
        x2="39.09"
        y2="150.43"
        fill="none"
        stroke={fill}
        strokeMiterlimit="10"
        strokeWidth="5"
      />
      <line
        x1="39.19"
        y1="150.81"
        x2="142.05"
        y2="150.81"
        fill="none"
        stroke={fill}
        strokeMiterlimit="10"
        strokeWidth="5"
      />
    </svg>
  );
}

export function HeaderLogo() {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 180 180"
    >
      <rect width="180" height="180" fill="#573d24" />
      <circle
        cx="90"
        cy="90"
        r="70"
        fill="none"
        stroke="#efe7df"
        strokeMiterlimit="10"
        strokeWidth="5"
      />
      <line
        x1="48"
        y1="112"
        x2="29.08"
        y2="125.11"
        fill="none"
        stroke="#efe7df"
        strokeMiterlimit="10"
        strokeWidth="5"
      />
      <polygon
        points="159.44 48.39 60.65 114.69 52.63 100.8 159.44 48.39"
        fill="none"
        stroke="#efe7df"
        strokeMiterlimit="10"
        strokeWidth="5"
      />
      <line
        x1="141.59"
        y1="75.83"
        x2="45.41"
        y2="143.17"
        fill="none"
        stroke="#efe7df"
        strokeMiterlimit="10"
        strokeWidth="5"
      />
      <line
        x1="45.5"
        y1="143.5"
        x2="135.5"
        y2="143.5"
        fill="none"
        stroke="#efe7df"
        strokeMiterlimit="10"
        strokeWidth="5"
      />
    </svg>
  );
}

export function HeaderLogoInverted() {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 180 180"
    >
      <rect width="180" height="180" fill="#efe7df" />
      <circle
        cx="90"
        cy="90"
        r="70"
        fill="none"
        stroke="#573d24"
        strokeMiterlimit="10"
        strokeWidth="5"
      />
      <line
        x1="48"
        y1="112"
        x2="29.08"
        y2="125.11"
        fill="none"
        stroke="#573d24"
        strokeMiterlimit="10"
        strokeWidth="5"
      />
      <polygon
        points="159.44 48.39 60.65 114.69 52.63 100.8 159.44 48.39"
        fill="none"
        stroke="#573d24"
        strokeMiterlimit="10"
        strokeWidth="5"
      />
      <line
        x1="141.59"
        y1="75.83"
        x2="45.41"
        y2="143.17"
        fill="none"
        stroke="#573d24"
        strokeMiterlimit="10"
        strokeWidth="5"
      />
      <line
        x1="45.5"
        y1="143.5"
        x2="135.5"
        y2="143.5"
        fill="none"
        stroke="#573d24"
        strokeMiterlimit="10"
        strokeWidth="5"
      />
    </svg>
  );
}
