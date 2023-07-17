import type { Episode } from "@prisma/client";
import Link from "next/link";

import { seFormat } from "@/lib/utils";

interface EpisodeLinkProps {
  episode: Episode;
  type: "title" | "number";
}

export default function EpisodeLink({ episode, type }: EpisodeLinkProps) {
  return (
    <Link
      href={`/episode/${episode.id}`}
      prefetch={false}
      className="underline-offset-4 hover:underline">
      {type === "title"
        ? episode.title
        : seFormat(episode.season, episode.episode)}
    </Link>
  );
}
