"use server";

import prisma from "@/lib/server/prisma";
import { expirity } from "@/lib/server/utils";
import { cookies, headers as getHeaders } from "next/headers";

export async function login(username: string, password: string) {
  const headers = getHeaders();
  const ip = headers.get("x-real-ip");
  const agent = headers.get("user-agent");
  const id = await prisma.user.login(username, password);
  if (id === null) {
    return false;
  }

  const expiresAt = expirity();

  const sid = await prisma.session.new({ id, ip, agent, expiresAt });

  cookies().set("__Host-session", sid, {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    path: "/",
    expires: expiresAt,
  });

  return true;
}

export async function logout() {
  const sessionCookie = cookies().get("__Host-session");
  if (sessionCookie === undefined) {
    return false;
  }
  await prisma.session.delete({ where: { id: sessionCookie.value } });
  cookies().set("__Host-session", "", {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    path: "/",
    maxAge: 0,
  });
  return true;
}
