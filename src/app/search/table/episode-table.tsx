import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Caption, { CaptionFallback } from "./caption";
import Episodes from "./episodes";
import Wrapper from "./wrapper";

export default function EpisodeTable({ query }: { query: string }) {
  return (
    <ScrollArea className="my-2 h-96 w-[32rem] rounded-md border p-4">
      <Table>
        <TableCaption>
          <Wrapper fallback={<CaptionFallback />}>
            <Caption query={query} />
          </Wrapper>
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="w-[5.5rem]">Number</TableHead>
            <TableHead className="w-96">Title</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <Wrapper>
            <Episodes query={query} />
          </Wrapper>
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
