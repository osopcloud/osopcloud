import type { ReactElement } from "react";

import Layout from "components/layouts/Layout";

import { Text } from "@chakra-ui/react";

export default function Page() {
  return <Text>Test</Text>;
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
