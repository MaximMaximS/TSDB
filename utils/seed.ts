import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";
import { config } from "dotenv";

config({ path: ".env.development.local" });

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
