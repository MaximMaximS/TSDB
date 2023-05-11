import Site from "@/components/site";
import { inlineCodeClassName } from "@/components/typography";
import getTime from "./get-time";
import Refetch from "./refetch";
import { cn } from "@/lib/utils";

export const revalidate = 3;

export default async function Page() {
  const time = await getTime();

  return (
    <Site>
      <h1 className={cn(inlineCodeClassName, "select-none")}>
        {time.toISOString()}
      </h1>
      <Refetch />
    </Site>
  );
}
