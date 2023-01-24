// @ts-nocheck

import { MDXProvider } from "@mdx-js/react";

// Design
import {
  Heading,
  Text,
  Divider,
  UnorderedList,
  Code,
  OrderedList,
  Table,
  Th,
  Td,
  Tr,
  Tbody,
  Tfoot,
  Thead,
} from "@chakra-ui/react";

const componentOverrides = {
  h1: (props) => <Heading size="xl" mb={5} {...props} />,
  h2: (props) => <Heading size="md" my={5} {...props} />,
  h3: (props) => <Text fontWeight={600} mt={5} mb={2} {...props} />,
  p: (props) => <Text my={2} {...props} />,
  hr: (props) => <Divider my={5} {...props} />,
  ul: (props) => <UnorderedList ps={5} {...props} />,
  ol: (props) => <OrderedList ps={5} {...props} />,
  code: (props) => <Code {...props} />,
  table: (props) => <Table size="sm" {...props} />,
  th: (props) => <Th {...props} />,
  td: (props) => <Td {...props} />,
  tr: (props) => <Tr {...props} />,
  tbody: (props) => <Tbody {...props} />,
  tfoot: (props) => <Tfoot {...props} />,
  thead: (props) => <Thead {...props} />,
};

export default function MDXProviderComponent({ children }) {
  return <MDXProvider components={componentOverrides}>{children}</MDXProvider>;
}
