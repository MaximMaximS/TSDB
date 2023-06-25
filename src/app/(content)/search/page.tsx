import Site from "@/components/site";
import { useSession } from "@/lib/server/auth";
import { redirect } from "next/navigation";

import SearchBox from "./search-box";
import SearchProvider from "./search-provider";
import EpisodeTable from "./table/episode-table";

export default async function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const session = await useSession();
  if (session === null) {
    redirect("/");
  }
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
