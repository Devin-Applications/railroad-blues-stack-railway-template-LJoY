import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getTopic } from "~/models/topic.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  const topicId = params.topicId;
  if (!topicId) {
    throw new Response("Topic ID is required", { status: 400 });
  }
  const topic = await getTopic({ userId, id: topicId });
  if (!topic) {
    throw new Response("Topic not found", { status: 404 });
  }
  return json({ topic });
};

export default function TopicDetailPage() {
  const { topic } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1 className="text-2xl font-bold">{topic.title}</h1>
      <p className="mt-4">{topic.body}</p>
    </div>
  );
}
