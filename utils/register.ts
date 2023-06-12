import { PrismaClient } from "@prisma/client";
import { hash } from "argon2";
import { createInterface } from "node:readline/promises";

const prisma = new PrismaClient();

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  const username = await rl.question("Username: ");
  const password = await rl.question("Password: ");

  const exists = await prisma.user.findUnique({
    where: { username },
    select: { id: true },
  });

  if (exists !== null) {
    console.error("User already exists");
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }

  const hsh = await hash(password);

  const user = await prisma.user.create({
    data: { username, password: hsh },
    select: { id: true },
  });
  console.log(`Registered user with id ${user.id}`);
  await prisma.$disconnect();
  rl.close();
}

void main();
