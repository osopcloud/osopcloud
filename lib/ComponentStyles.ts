export const Badge = {
  baseStyle: {
    fontWeight: 700,
    borderRadius: "md",
  },
};

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
  baseStyle: {
    fontWeight: 700,
    fontSize: "xl",
  },
};

export const Input = {
  defaultProps: {
    focusBorderColor: "almond",
  },
  baseStyle: {
    shadow: "inner",
    borderRadius: "xl",
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
