import { h1ClassName } from "@/components/typography";
import { cn } from "@/lib/utils";

export default function Page() {
  return (
    <h1 className={cn(h1ClassName, "font-simpsons")}>TheSimpsonsDatabase</h1>
  );
}
