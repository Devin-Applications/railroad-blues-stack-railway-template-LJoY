import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getTopic } from "~/models/topic.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  console.log("Loader function invoked"); // Logging to confirm invocation
  console.log("Params:", params); // Logging the params object
  const topicId = params.topicId;
  console.log("Topic ID:", topicId); // Logging the topicId
  if (!topicId) {
    throw new Response("Topic ID is required", { status: 400 });
  }
  try {
    const topic = await getTopic({ id: topicId });
    console.log("Fetched Topic:", topic); // Logging the fetched topic
    if (!topic) {
      throw new Response("Topic not found", { status: 404 });
    }
    return json({ topic });
  } catch (error) {
    console.error("Error fetching topic:", error); // Logging any errors
    throw new Response("Internal Server Error", { status: 500 });
  }
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
