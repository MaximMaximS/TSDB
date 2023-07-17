import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import prisma from "./prisma";
import { cacher, reqInfo } from "./utils";

const [sessionGet] = cacher(
  async (id: string, info: ReturnType<typeof reqInfo>) => {
    const session = await prisma.session.findUnique({
      where: { id },
      select: {
        id: true,
        expiresAt: true,
      },
    });

    if (session === null) {
      return null;
    }

    const now = new Date();

    if (session.expiresAt < now) {
      await prisma.session.delete({ where: { id: session.id } });
      return null;
    }

    const { user } = await prisma.session.update({
      where: { id: session.id },
      data: { lastUsed: now, agent: info.agent, ip: info.ip },
      select: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    return {
      id: session.id,
      expiresAt: session.expiresAt,
      user: user.username,
    };
  },
);

export async function getSession() {
  const sessionCookie = cookies().get("__Host-session");
  const info = reqInfo();
  if (sessionCookie === undefined) {
    return null;
  }

  const session = await sessionGet(sessionCookie.value, info);

  if (session === null) {
    return null;
  }

  if (session.expiresAt < new Date()) {
    await prisma.session.delete({ where: { id: session.id } });
    return null;
  }

  return session;
}

export async function authWall() {
  const session = await getSession();
  if (session === null) {
    redirect("/");
  }
  return session;
}
