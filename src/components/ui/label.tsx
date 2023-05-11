"use client";

import { Root } from "@radix-ui/react-label";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <Root ref={ref} className={cn(labelVariants(), className)} {...props} />
));
Label.displayName = Root.displayName;

export { Label };
