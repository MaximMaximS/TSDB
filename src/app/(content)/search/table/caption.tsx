import { found } from "@/lib/utils";
import { Loader } from "lucide-react";

import getEpisodes from "./get-episodes";

export default async function Caption({ query }: { query: string }) {
  const episodes = await getEpisodes(query);

  return <>{found(episodes.length, "episode")}</>;
}

export function CaptionFallback() {
  return (
    <div className="flex items-center justify-center">
      Searching... <Loader className="ml-2 h-4 w-4 animate-spin" />
    </div>
  );
}
