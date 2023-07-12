"use server";

import prisma from "@/lib/server/prisma";
import { expirity, reqInfo } from "@/lib/server/utils";
import { cookies } from "next/headers";

/**
 * Creates new user session
 * @param username Username
 * @param password Password
 * @returns Whether the login was successful
 */
export async function login(username: string, password: string) {
  const { ip, agent } = reqInfo();
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
