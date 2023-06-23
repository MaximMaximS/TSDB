import prisma from "@/lib/server/prisma";
import { cacher } from "@/lib/server/utils";

const [getEpisode, preload] = cacher((id: number) => prisma.episode.get(id));

export { preload };

export default getEpisode;
