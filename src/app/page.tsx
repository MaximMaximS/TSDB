import { cn } from "@/lib/utils";

import { h1ClassName } from "@/components/typography";

export default function Page() {
  return (
    <h1 className={cn(h1ClassName, "font-simpsons")}>TheSimpsonsDatabase</h1>
  );
}
