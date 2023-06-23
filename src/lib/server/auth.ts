import "server-only";

import siteConfig from "@/config/site";
import type { PrismaClient } from "@prisma/client";
import { hash, verify } from "argon2";

export default class Auth {
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
}
