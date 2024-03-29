import prisma from "@/lib/prisma";
import { cache } from "react";
import "server-only";

const getEpisodes = cache(async (query: string) => {
  if (query.length < 3) return [];
  return await prisma.episode.findMany({
    where: { title: { contains: query, mode: "insensitive" } },
    orderBy: { id: "asc" },
  });
});

export function preload(query: string) {
  void getEpisodes(query);
}

export default getEpisodes;
