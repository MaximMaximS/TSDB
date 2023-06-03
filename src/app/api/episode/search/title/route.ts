import { basicResponse } from "@/lib/api";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const querySchema = z.string().trim().min(3);

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const query = querySchema.safeParse(params.get("q"));

  if (!query.success) {
    return basicResponse(400);
  }

  const episodes = await prisma.episode.findMany({
    where: { title: { contains: query.data, mode: "insensitive" } },
    select: { id: true, title: true },
  });

  return NextResponse.json(episodes);
}
