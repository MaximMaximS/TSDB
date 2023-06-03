import { basicResponse, parseId } from "@/lib/api";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const season = parseId(params.get("s"));
  const episode = parseId(params.get("e"));

  if (season instanceof Response || episode instanceof Response) {
    return basicResponse(400);
  }

  const id = await prisma.episode.findUnique({
    where: {
      // eslint-disable-next-line camelcase
      season_episode: {
        season,
        episode,
      },
    },
    select: {
      id: true,
    },
  });

  if (id === null) {
    return basicResponse(404);
  }

  return NextResponse.json(id.id);
}
