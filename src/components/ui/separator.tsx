"use client";

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";

import { cn } from "@/lib/utils";

function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        orientation === "horizontal"
          ? "h-px w-full bg-border"
          : "h-full w-px bg-border",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
