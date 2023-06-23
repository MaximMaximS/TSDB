import "server-only";

import type { PrismaClient } from "@prisma/client";

export default class Content {
  private prisma: PrismaClient;
  public constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public get = (id: number) => {
    return this.prisma.episode.findUnique({
      where: { id },
    });
  };

  public search = (query: string) => {
    if (query.length < 3) return [];
    return this.prisma.episode.findMany({
      where: { title: { contains: query, mode: "insensitive" } },
      orderBy: { id: "asc" },
    });
  };
}
