import { TableRow, TableCell } from "@/components/ui/table";
import { search } from "./get-episodes";
import EpisodeLink from "./episode-link";

export default async function Episodes({ query }: { query: string }) {
  const episodes = await search(query);

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
