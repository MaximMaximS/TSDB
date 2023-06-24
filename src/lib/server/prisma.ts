import "server-only";

import { PrismaClient } from "@prisma/client";

import { Auth, Content } from "./modules";

function newPrisma() {
  const prisma = new PrismaClient(
    process.env.NODE_ENV === "development" ? { log: ["query"] } : undefined
  );

  const auth = new Auth(prisma);
  const content = new Content(prisma);

  return prisma.$extends({
    model: {
      user: {
        login: auth.login,
        register: auth.register,
      },
      episode: {
        get: content.get,
        search: content.search,
      },
      session: {
        new: auth.createSession,
      },
    },
  });
}

const globalForPrisma = global as unknown as {
  prisma: ReturnType<typeof newPrisma> | undefined;
};

const prisma = globalForPrisma.prisma ?? newPrisma();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
