import { basicResponse, parseId, fixDate } from "@/lib/api";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  {
    params,
  }: {
    params: { id: string };
  }
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
