import "server-only";

import siteConfig from "@/config/site";
import type { PrismaClient } from "@prisma/client";
import { hash, verify } from "argon2";

interface SessionPayload {
  id: string;
  expiresAt: Date;
  ip: string | null;
  agent: string | null;
}

export class Auth {
  private prisma: PrismaClient;

  public constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public login = async (username: string, password: string) => {
    if (
      username.length < siteConfig.security.minUsernameLength ||
      password.length < siteConfig.security.minPasswordLength
    ) {
      return null;
    }

    const user = await this.prisma.user.findUnique({
      where: { username },
      select: { password: true, id: true },
    });

    if (user === null) {
      return null;
    }

    const hash = user.password;
    const valid = await verify(hash, password);
    return valid ? user.id : null;
  };

  public register = async (username: string, password: string) => {
    if (
      username.length < siteConfig.security.minUsernameLength ||
      password.length < siteConfig.security.minPasswordLength
    ) {
      return null;
    }

    const exists = await this.prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });

    if (exists !== null) {
      return null;
    }

    const hsh = await hash(password);

    const user = await this.prisma.user.create({
      data: { username, password: hsh },
      select: { id: true },
    });
    return user.id;
  };

  public createSession = async ({
    id,
    ip,
    agent,
    expiresAt,
  }: SessionPayload) => {
    const { id: sessionId } = await this.prisma.session.create({
      data: {
        ip,
        agent,
        expiresAt,
        user: { connect: { id } },
      },
      select: { id: true },
    });
    return sessionId;
  };
}

export class Content {
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
