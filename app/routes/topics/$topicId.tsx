import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const topicId = params.topicId;
  return json({ message: `Topic ID: ${topicId}` });
};

export default function TopicDetailPage() {
  const { message } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1 className="text-2xl font-bold">{message}</h1>
    </div>
  );
}
