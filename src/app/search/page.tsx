import Site from "@/components/site";
import SearchProvider from "./search-provider";
import EpisodeTable from "./table/episode-table";
import SearchBox from "./search-box";

export const dynamic = "force-dynamic";

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
