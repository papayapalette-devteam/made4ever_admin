"use client";

const React = require("react");

// Simple helper for merging class names
function cn() {
  return Array.from(arguments)
    .filter(Boolean)
    .join(" ");
}

const Card = React.forwardRef(function Card(props, ref) {
  const { className, ...rest } = props;
  return React.createElement(
    "div",
    Object.assign(
      {
        ref: ref,
        className: cn(
          "rounded-lg border bg-card text-card-foreground shadow-sm",
          className
        ),
      },
      rest
    )
  );
});
Card.displayName = "Card";

const CardHeader = React.forwardRef(function CardHeader(props, ref) {
  const { className, ...rest } = props;
  return React.createElement(
    "div",
    Object.assign(
      {
        ref: ref,
        className: cn("flex flex-col space-y-1.5 p-6", className),
      },
      rest
    )
  );
});
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(function CardTitle(props, ref) {
  const { className, ...rest } = props;
  return React.createElement(
    "h3",
    Object.assign(
      {
        ref: ref,
        className: cn(
          "text-2xl font-semibold leading-none tracking-tight",
          className
        ),
      },
      rest
    )
  );
});
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(function CardDescription(props, ref) {
  const { className, ...rest } = props;
  return React.createElement(
    "p",
    Object.assign(
      {
        ref: ref,
        className: cn("text-sm text-muted-foreground", className),
      },
      rest
    )
  );
});
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(function CardContent(props, ref) {
  const { className, ...rest } = props;
  return React.createElement(
    "div",
    Object.assign(
      {
        ref: ref,
        className: cn("p-6 pt-0", className),
      },
      rest
    )
  );
});
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(function CardFooter(props, ref) {
  const { className, ...rest } = props;
  return React.createElement(
    "div",
    Object.assign(
      {
        ref: ref,
        className: cn("flex items-center p-6 pt-0", className),
      },
      rest
    )
  );
});
CardFooter.displayName = "CardFooter";

module.exports = {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
