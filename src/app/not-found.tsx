"use client";

import { h1ClassName, inlineCodeClassName } from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const path = usePathname();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="m-2">
        <h1 className={h1ClassName}>404 - Page Not Found</h1>
      </div>
      <p className="text m-2 text-muted-foreground">
        The page <code className={inlineCodeClassName}>{path}</code> could not
        be found.
      </p>
      <a href="/" className={cn(buttonVariants({ variant: "outline" }), "m-2")}>
        Go Home
      </a>
    </div>
  );
}
