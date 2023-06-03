import "server-only";
import { cache } from "react";
import prisma from "@/lib/prisma";

const getEpisode = cache((id: number) =>
  prisma.episode.findUnique({
    where: { id },
  })
);

export function preload(id: number) {
  void getEpisode(id);
}

export default getEpisode;
