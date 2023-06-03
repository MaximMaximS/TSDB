import { config } from "dotenv";
import argon2 from "argon2";

config({ path: ".env.development.local" });

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  if (process.env["NODE_ENV"] === "production") {
    throw new Error("Don't run this in production");
  }
  await prisma.$connect();
  await prisma.user.create({
    data: {
      username: "admin",
      password: await argon2.hash("admin"),
      watched: {
        connect: {
          id: 1,
        },
      },
    },
  });
  await prisma.$disconnect();
}

void main();
