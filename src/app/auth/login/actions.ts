"use server";

import prisma from "@/lib/prisma";
import "server-only";

export async function login(username: string, password: string) {
  return await prisma.user.login(username, password);
}
