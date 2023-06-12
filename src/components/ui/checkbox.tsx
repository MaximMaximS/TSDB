"use client";

import { cn } from "@/lib/utils";
import { Indicator, Root } from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { forwardRef } from "react";

const Checkbox = forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, ref) => (
  <Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary",
      className
    )}
    {...props}>
    <Indicator className={cn("flex items-center justify-center text-primary")}>
      <Check className="h-4 w-4" />
    </Indicator>
  </Root>
));
Checkbox.displayName = Root.displayName;

export { Checkbox };
