import Site from "@/components/site";
import SearchProvider from "./search-provider";
import EpisodeTable from "./table/episode-table";
import SearchBox from "./search-box";

export default function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = searchParams.q ?? "";
  return (
    <Site>
      <SearchProvider>
        <SearchBox value={q} />
        <EpisodeTable query={q} />
      </SearchProvider>
    </Site>
  );
}
