"use client";

import Box from "@/components/static/box";
import Site from "@/components/static/site";
import { H1 } from "@/components/static/text";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const path = usePathname();

  return (
    <Site>
      <Box>
        <div className="mb-4">
          <H1>Not Found</H1>
        </div>
        <p className="text mb-4 text-muted-foreground">
          The page{" "}
          <code className="rounded-sm bg-accent p-1 font-mono">{path}</code>{" "}
          could not be found.
        </p>
        <a href="/">
          <Button variant="outline">Go Home</Button>
        </a>
      </Box>
    </Site>
  );
}
