import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import prisma from "./prisma";
import { cacher } from "./utils";

const [sessionGet] = cacher((id: string) =>
  prisma.session.findUnique({
    where: { id },
    select: {
      id: true,
      expiresAt: true,
    },
  })
);

export async function getSession() {
  const sessionCookie = cookies().get("__Host-session");
  if (sessionCookie === undefined) {
    return null;
  }
  const session = await sessionGet(sessionCookie.value);
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
