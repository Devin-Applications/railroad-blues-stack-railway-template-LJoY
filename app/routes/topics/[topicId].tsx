import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getTopic } from "~/models/topic.server";

interface LoaderData {
  topic: Awaited<ReturnType<typeof getTopic>>;
}

export const loader: LoaderFunction = async ({ params }) => {
  const topicId = params.topicId;
  if (!topicId) {
    throw new Response("Topic ID is required", { status: 400 });
  }

  const topic = await getTopic({ id: topicId, userId: "some-user-id" });
  if (!topic) {
    throw new Response("Topic not found", { status: 404 });
  }
  return json<LoaderData>({ topic });
};

export default function TopicDetailPage() {
  const { topic } = useLoaderData<LoaderData>();
  if (!topic) {
    return <div>Topic not found</div>;
  }
  return (
    <div>
      <h1>{topic.title}</h1>
      <p>{topic.body}</p>
    </div>
  );
}
