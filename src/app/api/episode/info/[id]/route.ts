import { NextResponse } from "next/server";

import { basicResponse, fixDate, parseId } from "@/lib/server/api";
import prisma from "@/lib/server/prisma";

export async function GET(
  _: Request,
  {
    params,
  }: {
    params: { id: string };
  },
) {
  const id = parseId(params.id);

  if (id instanceof Response) {
    return id;
  }

  const episode = await prisma.episode.findUnique({
    where: { id },
  });
  if (episode === null) {
    return basicResponse(404);
  }

  return NextResponse.json(fixDate(episode));
}
