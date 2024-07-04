import type { User, Reply } from "@prisma/client";

import { prisma } from "~/db.server";

export function getReply({
  id,
  userId,
}: Pick<Reply, "id"> & {
  userId: User["id"];
}) {
  return prisma.reply.findFirst({
    select: { id: true, body: true, topicId: true },
    where: { id, userId },
  });
}

export function getReplyListItems({ topicId }: { topicId: Reply["topicId"] }) {
  return prisma.reply.findMany({
    where: { topicId },
    select: { id: true, body: true, userId: true },
    orderBy: { createdAt: "asc" },
  });
}

export function createReply({
  body,
  topicId,
  userId,
}: Pick<Reply, "body" | "topicId"> & {
  userId: User["id"];
}) {
  return prisma.reply.create({
    data: {
      body,
      topic: {
        connect: {
          id: topicId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteReply({
  id,
  userId,
}: Pick<Reply, "id"> & { userId: User["id"] }) {
  return prisma.reply.deleteMany({
    where: { id, userId },
  });
}
