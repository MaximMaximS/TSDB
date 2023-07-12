import { authWall } from "@/lib/server/auth";

import SearchBox from "./search-box";
import SearchProvider from "./search-provider";
import EpisodeTable from "./table/episode-table";

export default async function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  await authWall();
  const q = searchParams.q ?? "";

  return (
    <SearchProvider>
      <SearchBox />
      <EpisodeTable query={q} />
    </SearchProvider>
  );
}
