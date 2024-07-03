import type { User, Topic } from "@prisma/client";

import { prisma } from "~/db.server";

export function getTopic({
  id,
}: Pick<Topic, "id">) {
  console.log("getTopic called with ID:", id); // Logging the input ID
  return prisma.topic.findFirst({
    select: { id: true, body: true, title: true },
    where: { id },
  }).then(topic => {
    console.log("getTopic result:", topic); // Logging the result of the database query
    return topic;
  });
}

export function getTopicListItems({ userId }: { userId: User["id"] }) {
  return prisma.topic.findMany({
    where: { userId },
    select: { id: true, title: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createTopic({
  body,
  title,
  userId,
}: Pick<Topic, "body" | "title"> & {
  userId: User["id"];
}) {
  return prisma.topic.create({
    data: {
      title,
      body,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteTopic({
  id,
  userId,
}: Pick<Topic, "id"> & { userId: User["id"] }) {
  return prisma.topic.deleteMany({
    where: { id, userId },
  });
}
