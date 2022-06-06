export const Button = {
  baseStyle: {
    fontWeight: 600,
    borderRadius: "xl",
    shadow: "inner",
    userSelect: "none",
    textDecoration: "none",
  },
  defaultProps: {
    size: "md",
    variant: "outline",
  },
  variants: {
    ghost: {
      shadow: "none",
    },
  },
};

export const Heading = {
  baseStyle: ({ colorMode }: { colorMode: string }) => ({
    fontWeight: 600,
    fontSize: "xl",
    color: colorMode === "dark" ? "sandstone" : "almond",
  }),
};

export const Input = {
  defaultProps: {
    focusBorderColor: "almond",
  },
};

export const Select = {
  defaultProps: {
    focusBorderColor: "almond",
  },
};

export const Textarea = {
  defaultProps: {
    focusBorderColor: "almond",
  },
};
