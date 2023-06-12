import prisma from "@/lib/prisma";
import { cache } from "react";
import "server-only";

const getEpisode = cache((id: number) =>
  prisma.episode.findUnique({
    where: { id },
  })
);

export function preload(id: number) {
  void getEpisode(id);
}

export default getEpisode;
