import { TableCell, TableRow } from "@/components/ui/table";

import EpisodeLink from "./episode-link";
import getEpisodes from "./get-episodes";

export default async function Episodes({ query }: { query: string }) {
  const episodes = await getEpisodes(query);

  return (
    <>
      {episodes.map((episode) => (
        <TableRow key={episode.id}>
          <TableCell className="w-[53px] max-w-[5.5rem] font-medium">
            <EpisodeLink episode={episode} type="number" />
          </TableCell>
          <TableCell className="w-[53px] max-w-[24rem] truncate">
            <EpisodeLink episode={episode} type="title" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
