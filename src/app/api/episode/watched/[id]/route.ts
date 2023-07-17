import { NextResponse } from "next/server";
import { z } from "zod";

import { apiAuth, basicResponse, parseId, parseJson } from "@/lib/server/api";
import prisma from "@/lib/server/prisma";

export async function GET(
  _: Request,
  {
    params,
  }: {
    params: { id: string };
  },
) {
  const uid = await apiAuth();
  if (uid instanceof Response) {
    return uid;
  }
  const eid = parseId(params.id);
  if (eid instanceof Response) {
    return eid;
  }

  const user = await prisma.user.findUnique({
    where: { id: uid },
    select: { watched: { select: { id: true } } },
  });
  if (user === null) {
    return basicResponse(500);
  }

  // Check if the episode is in the user's watched list
  const watched = user.watched.map((w) => w.id).includes(eid);
  return NextResponse.json(watched);
}

const bodySchema = z.boolean();

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: { id: string };
  },
) {
  const uid = await apiAuth();
  if (uid instanceof Response) {
    return uid;
  }
  const eid = parseId(params.id);
  if (eid instanceof Response) {
    return eid;
  }

  const desired = await parseJson(request, (json) => bodySchema.parse(json));
  if (desired instanceof Response) {
    return desired;
  }

  const user = await prisma.user.findUnique({
    where: { id: uid },
    select: { watched: { select: { id: true } } },
  });
  if (user === null) {
    return basicResponse(500);
  }

  const mapped = user.watched.map((w) => w.id);
  const watched = mapped.includes(eid);
  if (desired === watched) {
    return NextResponse.json(watched);
  }

  if (desired) {
    // Mark the episode as watched
    mapped.push(eid);
    const target = mapped.map((id) => ({ id }));
    await prisma.user.update({
      where: { id: uid },
      data: { watched: { set: target } },
    });
  } else {
    // Mark the episode as unwatched
    const target = mapped.filter((id) => id !== eid).map((id) => ({ id }));
    await prisma.user.update({
      where: { id: uid },
      data: { watched: { set: target } },
    });
  }

  return NextResponse.json(desired);
}
