import { SEFormat } from "@/lib/utils";
import type { Episode } from "@prisma/client";
import Link from "next/link";

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
        : SEFormat(episode.season, episode.episode)}
    </Link>
  );
}
