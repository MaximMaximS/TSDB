import Site from "@/components/site";

import SearchBox from "./search-box";
import SearchProvider from "./search-provider";
import EpisodeTable from "./table/episode-table";

export default function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = searchParams.q ?? "";
  return (
    <Site>
      <SearchProvider>
        <SearchBox />
        <EpisodeTable query={q} />
      </SearchProvider>
    </Site>
  );
}
