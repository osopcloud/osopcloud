// Design
import { Text } from "@chakra-ui/react";

import React from "react";

// Start components
export class ErrorFallback extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  render() {
    // @ts-expect-error: Property 'hasError' does not exist on type 'Readonly<{}>'.ts(2339)
    if (this.state.hasError) {
      return <Text>An error occurred. (2)</Text>;
    }

    // @ts-expect-error: Property 'hasError' does not exist on type 'Readonly<{}>'.ts(2339)
    return this.props.children;
  }
}
