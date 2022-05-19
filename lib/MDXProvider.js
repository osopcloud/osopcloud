// @ts-nocheck

import { MDXProvider } from "@mdx-js/react";

// Design
import { Heading, Text, Divider, UnorderedList } from "@chakra-ui/react";

const componentOverrides = {
  h1: (props) => <Heading size="xl" mb={5} {...props} />,
  h2: (props) => <Heading size="md" my={5} {...props} />,
  h3: (props) => <Text fontWeight={600} as="h6" {...props} />,
  p: (props) => <Text {...props} my={2} />,
  hr: (props) => <Divider {...props} my={5} />,
  ul: (props) => <UnorderedList {...props} ps={5} />,
};

export default function MDXProviderComponent({ children }) {
  return <MDXProvider components={componentOverrides}>{children}</MDXProvider>;
}
