import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex",
    "items-center",
    "justify-center",
    "rounded-full",
    "font-medium",
    "text-sm",
    "px-4",
    "py-2",
    "transition-colors",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-white border border-border text-foreground",

        orange: "bg-sip-orange-light text-sip-orange border border-orange-200",

        purple: "bg-sip-purple-light text-sip-purple border border-purple-200",

        green: "bg-sip-green-light text-sip-green border border-green-200",
      },
    },

    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
