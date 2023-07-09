// @ts-check
import { PrismaClient } from "@prisma/client";
import fs from "fs-extra";
import { z } from "zod";

const prisma = new PrismaClient();

const users = JSON.parse(fs.readFileSync("/tmp/users.json").toString());

const userSchema = z.array(
  z.object({
    id: z.string(),
    username: z.string(),
    password: z.string(),
    watched: z.array(z.object({ id: z.number() })),
  })
);

const parsed = userSchema.parse(users);

async function main() {
  await prisma.$connect();
  for (const user of parsed) {
    await prisma.user.update({
      where: { username: user.username },
      data: {
        watched: {
          connect: user.watched.map((x) => ({ id: x.id })),
        },
      },
    });
  }
  await prisma.$disconnect();
}

void main();
