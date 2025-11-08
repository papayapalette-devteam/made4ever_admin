"use client";

const React = require("react");
const { Slot } = require("@radix-ui/react-slot");
const { cva } = require("class-variance-authority");

// Simple helper for merging class names
function cn() {
  return Array.from(arguments)
    .filter(Boolean)
    .join(" ");
}

// Button style variants
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Button component (no JSX)
const Button = React.forwardRef(function Button(props, ref) {
  const { className, variant, size, asChild = false, ...rest } = props;
  const Comp = asChild ? Slot : "button";

  return React.createElement(
    Comp,
    Object.assign(
      {
        ref: ref,
        className: cn(buttonVariants({ variant, size }), className),
      },
      rest
    )
  );
});

Button.displayName = "Button";

module.exports = {
  Button,
  buttonVariants,
};
