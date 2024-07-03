import type { User, Upvote } from "@prisma/client";

import { prisma } from "~/db.server";

export function getUpvote({
  id,
  userId,
}: Pick<Upvote, "id"> & {
  userId: User["id"];
}) {
  return prisma.upvote.findFirst({
    select: { id: true, topicId: true, userId: true },
    where: { id, userId },
  });
}

export function createUpvote({
  topicId,
  userId,
}: Pick<Upvote, "topicId"> & {
  userId: User["id"];
}) {
  return prisma.upvote.create({
    data: {
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

export function deleteUpvote({
  id,
  userId,
}: Pick<Upvote, "id"> & { userId: User["id"] }) {
  return prisma.upvote.deleteMany({
    where: { id, userId },
  });
}
