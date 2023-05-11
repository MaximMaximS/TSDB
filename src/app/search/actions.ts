"use server";
import prisma from "@/lib/prisma";

export function search(data: FormData) {
  const title = data.get("title");
  if (typeof title !== "string") {
    console.log(data);
    throw new TypeError("title is not a string");
  }
  return prisma.episode.findMany({
    where: {
      title: {
        contains: title,
        mode: "insensitive",
      },
    },
  });
}
