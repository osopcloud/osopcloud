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
        stroke-miterlimit="10"
        stroke-width="5"
      />
      <line
        x1="42.05"
        y1="114.81"
        x2="20.42"
        y2="129.79"
        fill="none"
        stroke={fill}
        stroke-miterlimit="10"
        stroke-width="5"
      />
      <polygon
        points="169.4 42.11 56.5 117.87 47.34 102 169.4 42.11"
        fill="none"
        stroke={fill}
        stroke-miterlimit="10"
        stroke-width="5"
      />
      <line
        x1="149.01"
        y1="73.47"
        x2="39.09"
        y2="150.43"
        fill="none"
        stroke={fill}
        stroke-miterlimit="10"
        stroke-width="5"
      />
      <line
        x1="39.19"
        y1="150.81"
        x2="142.05"
        y2="150.81"
        fill="none"
        stroke={fill}
        stroke-miterlimit="10"
        stroke-width="5"
      />
    </svg>
  );
}

export function HeaderLogo() {
  const fill = useColorModeValue("#573d24", "#efe7df");
  return (
    <Icon w={20} h={20} cursor="pointer" as="a">
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
          stroke-miterlimit="10"
          stroke-width="5"
        />
        <line
          x1="42.05"
          y1="114.81"
          x2="20.42"
          y2="129.79"
          fill="none"
          stroke={fill}
          stroke-miterlimit="10"
          stroke-width="5"
        />
        <polygon
          points="169.4 42.11 56.5 117.87 47.34 102 169.4 42.11"
          fill="none"
          stroke={fill}
          stroke-miterlimit="10"
          stroke-width="5"
        />
        <line
          x1="149.01"
          y1="73.47"
          x2="39.09"
          y2="150.43"
          fill="none"
          stroke={fill}
          stroke-miterlimit="10"
          stroke-width="5"
        />
        <line
          x1="39.19"
          y1="150.81"
          x2="142.05"
          y2="150.81"
          fill="none"
          stroke={fill}
          stroke-miterlimit="10"
          stroke-width="5"
        />
      </svg>
    </Icon>
  );
}
