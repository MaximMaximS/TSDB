import "server-only";

import { cookies } from "next/headers";

import prisma from "./prisma";
import { cacher } from "./utils";

const [getSession] = cacher((id: string) =>
  prisma.session.findUnique({
    where: { id },
    select: {
      id: true,
      expiresAt: true,
    },
  })
);

export async function useSession() {
  const sessionCookie = cookies().get("__Host-session");
  if (sessionCookie === undefined) {
    return null;
  }
  const session = await getSession(sessionCookie.value);
  if (session === null) {
    return null;
  }
  if (session.expiresAt < new Date()) {
    await prisma.session.delete({ where: { id: session.id } });
    return null;
  }
  return session;
}
