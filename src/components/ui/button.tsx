import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center",
    "font-medium",
    "transition-all duration-300",
    "disabled:pointer-events-none disabled:opacity-50",
    "focus-visible:outline-none",
    "cursor-pointer",
    "whitespace-nowrap",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-sip-orange",
          "text-white",
          "shadow-sm",
          "hover:-translate-y-0.5",
          "hover:shadow-md",
        ].join(" "),

        secondary: [
          "bg-white",
          "border",
          "border-border",
          "text-sip-text",
          "hover:bg-sip-orange-light",
        ].join(" "),

        ghost: [
          "bg-transparent",
          "text-sip-text",
          "hover:bg-sip-orange-light",
        ].join(" "),
      },

      size: {
        sm: "h-10 px-5 text-sm rounded-full",

        md: "h-12 px-6 text-[15px] rounded-full",

        lg: "h-14 px-8 text-base rounded-full",

        xl: "h-16 px-10 text-lg rounded-full",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  },
);

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
