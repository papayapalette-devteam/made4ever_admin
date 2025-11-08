"use client";

const React = require("react");
const { cva } = require("class-variance-authority");

// Simple helper for merging class names
function cn() {
  return Array.from(arguments)
    .filter(Boolean)
    .join(" ");
}

// Define badge style variants
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Badge component (no JSX)
function Badge(props) {
  const { className, variant, ...rest } = props;
  const combinedClassName = cn(badgeVariants({ variant }), className);

  return React.createElement("div", {
    className: combinedClassName,
    ...rest,
  });
}

module.exports = {
  Badge,
  badgeVariants,
};
