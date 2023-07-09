import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import prisma from "./prisma";
import { reqInfo } from "./utils";

export async function getSession() {
  const sessionCookie = cookies().get("__Host-session");
  const { ip, agent } = reqInfo();
  if (sessionCookie === undefined) {
    return null;
  }
  const session = await prisma.session.findUnique({
    where: { id: sessionCookie.value },
    select: {
      id: true,
      expiresAt: true,
    },
  });

  if (session === null) {
    return null;
  }

  if (session.expiresAt < new Date()) {
    await prisma.session.delete({ where: { id: session.id } });
    return null;
  }

  const used = new Date();
  console.log("updating");
  const { user } = await prisma.session.update({
    where: { id: session.id },
    data: { lastUsed: used, agent, ip },
    select: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  return user;
}

export async function authWall() {
  const session = await getSession();
  if (session === null) {
    redirect("/");
  }
  return session;
}
