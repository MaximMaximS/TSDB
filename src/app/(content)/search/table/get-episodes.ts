import prisma from "@/lib/server/prisma";
import { cacher } from "@/lib/server/utils";

const [getEpisodes, preload] = cacher((query: string) =>
  prisma.episode.search(query),
);

export { preload };

export default getEpisodes;
