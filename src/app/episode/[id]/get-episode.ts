import "server-only";
import { cache } from "react";
import prisma from "@/lib/prisma";

const getEpisode = cache((id: number) => {
  return prisma.episode.findUnique({
    where: { id: id },
    select: { title: true },
  });
});

export function preload(id: number) {
  void getEpisode(id);
}

export default getEpisode;
