// TypeScript is not supported
// @ts-nocheck

// Design
import { Text } from "@chakra-ui/react";

import React from "react";

// Start components
export class ErrorFallback extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <Text>An error occurred. (2)</Text>;
    }

    return this.props.children;
  }
}
