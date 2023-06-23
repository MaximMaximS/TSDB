"use server";

import prisma from "@/lib/server/prisma";

export async function login(username: string, password: string) {
  return await prisma.user.login(username, password);
}
