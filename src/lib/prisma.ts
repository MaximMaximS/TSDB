import "server-only";
import { PrismaClient } from "@prisma/client";
import { verify, hash } from "argon2";

function newPrisma() {
  const prisma = new PrismaClient(
    process.env.NODE_ENV === "development" ? { log: ["query"] } : undefined
  ).$extends({
    model: {
      user: {
        async login(username: string, password: string) {
          const user = await prisma.user.findUnique({
            where: { username },
            select: { password: true, id: true },
          });

          if (user === null) {
            return null;
          }

          const hash = user.password;
          const valid = await verify(hash, password);
          return valid ? user.id : null;
        },
        async register(username: string, password: string) {
          const exists = await prisma.user.findUnique({
            where: { username },
            select: { id: true },
          });

          if (exists !== null) {
            return null;
          }

          const hsh = await hash(password);

          const user = await prisma.user.create({
            data: { username, password: hsh },
            select: { id: true },
          });
          return user.id;
        },
      },
    },
  });
  return prisma;
}

const globalForPrisma = global as unknown as {
  prisma: ReturnType<typeof newPrisma> | undefined;
};

const prisma = globalForPrisma.prisma ?? newPrisma();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
