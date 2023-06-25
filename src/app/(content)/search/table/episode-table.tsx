import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Episodes from "./episodes";
import Wrapper from "./wrapper";

export default function EpisodeTable({ query }: { query: string }) {
  return (
    <div className="my-2 flex h-96 w-[32rem] rounded-md border p-4">
      <Table>
        <TableHeader className="sticky top-0 z-10 bg-background">
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
    </div>
  );
}
