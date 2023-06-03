import Site from "@/components/site";
import { h1ClassName, inlineCodeClassName } from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Path from "./path";

export default function NotFound() {
  return (
    <Site>
      <div className="m-2">
        <h1 className={h1ClassName}>404 - Page Not Found</h1>
      </div>
      <p className="text m-2 text-muted-foreground">
        The page{" "}
        <code className={inlineCodeClassName}>
          <Path />
        </code>{" "}
        could not be found.
      </p>
      <a href="/" className={cn(buttonVariants({ variant: "outline" }), "m-2")}>
        Go Home
      </a>
    </Site>
  );
}
