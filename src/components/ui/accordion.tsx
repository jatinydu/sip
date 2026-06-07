"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col gap-4", className)}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        [
          "overflow-hidden",
          "rounded-[32px]",
          "border",
          "border-border",
          "bg-card",
          "shadow-sm",
          "transition-all",
          "duration-300",
          "hover:shadow-md",
        ].join(" "),
        className,
      )}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header>
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          [
            "group",
            "flex",
            "w-full",
            "items-center",
            "justify-between",
            "px-8",
            "py-6",
            "text-left",
            "text-lg",
            "font-semibold",
            "outline-none",
            "transition-colors",
            "cursor-pointer",
          ].join(" "),
          className,
        )}
        {...props}
      >
        <span>{children}</span>

        <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 group-aria-expanded:rotate-180" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="
        overflow-hidden
        data-open:animate-accordion-down
        data-closed:animate-accordion-up
      "
      {...props}
    >
      <div
        className={cn(
          [
            "px-8",
            "pb-8",
            "text-base",
            "leading-relaxed",
            "text-muted-foreground",
          ].join(" "),
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
