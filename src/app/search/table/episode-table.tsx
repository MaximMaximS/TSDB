import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import Wrapper from "./wrapper";
import Caption, { CaptionFallback } from "./caption";
import Episodes from "./episodes";

export const container = "my-2 h-96 rounded-md border p-4 w-[32rem]";

interface EpisodeTableProps {
  query: string;
}

export default function EpisodeTable({ query }: EpisodeTableProps) {
  return (
    <ScrollArea className={container}>
      <Table>
        <TableCaption>
          <Wrapper fallback={<CaptionFallback />}>
            {/* @ts-expect-error Async Server Component */}
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
            {/* @ts-expect-error Async Server Component */}
            <Episodes query={query} />
          </Wrapper>
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
