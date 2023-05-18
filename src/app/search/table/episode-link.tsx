import { pad } from "@/lib/format";
import { Episode } from "@prisma/client";
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
        : `S${pad(episode.season)}E${pad(episode.episode)}`}
    </Link>
  );
}
