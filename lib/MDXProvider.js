// @ts-nocheck

import { MDXProvider } from "@mdx-js/react";

// Design
import { Heading, Text, Divider, UnorderedList, Code } from "@chakra-ui/react";

const componentOverrides = {
  h1: (props) => <Heading size="xl" mb={5} {...props} />,
  h2: (props) => <Heading size="md" mb={5} {...props} />,
  h3: (props) => <Text fontWeight={600} as="h6" {...props} />,
  p: (props) => <Text mb={2} {...props} />,
  hr: (props) => <Divider my={5} {...props} />,
  ul: (props) => <UnorderedList ps={5} {...props} />,
  code: (props) => <Code {...props} />,
};

export default function MDXProviderComponent({ children }) {
  return <MDXProvider components={componentOverrides}>{children}</MDXProvider>;
}
