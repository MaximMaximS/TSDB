import "server-only";
import { cache } from "react";
import prisma from "@/lib/prisma";
import { Episode } from "@prisma/client";

const getEpisodes = cache(async (query: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return await prisma.episode.findMany({
    where: { title: { contains: query, mode: "insensitive" } },
    orderBy: { id: "asc" },
  });
});

export function preload(query: string) {
  void getEpisodes(query);
}

export async function search(query: string): Promise<Episode[]> {
  return query.length < 3 ? [] : getEpisodes(query);
}

export default getEpisodes;
