import { found } from "@/lib/format";
import { search } from "./get-episodes";
import { Loader } from "lucide-react";

export default async function Caption({ query }: { query: string }) {
  const episodes = await search(query);

  return <>{found(episodes.length, "episode")}</>;
}

export function CaptionFallback() {
  return (
    <div className="flex items-center justify-center">
      Searching... <Loader className="ml-2 h-4 w-4 animate-spin" />
    </div>
  );
}
