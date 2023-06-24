import "server-only";

import { cookies } from "next/headers";

import prisma from "./prisma";

export async function useSession() {
  const sessionCookie = cookies().get("__Host-session");
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
  return session;
}
