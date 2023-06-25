import Site from "@/components/site";
import { h1ClassName } from "@/components/typography";
import { useSession } from "@/lib/server/auth";
import { redirect } from "next/navigation";

import getEpisode from "./get-episode";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await useSession();
  if (session === null) {
    redirect("/");
  }

  const id = Number.parseInt(params.id);

  if (Number.isNaN(id)) {
    throw new TypeError("Invalid episode id");
  }

  const episode = await getEpisode(id);

  if (episode === null) {
    throw new Error("Episode not found");
  }

  return (
    <Site>
      <h1 className={h1ClassName}>{episode.title}</h1>
    </Site>
  );
}
