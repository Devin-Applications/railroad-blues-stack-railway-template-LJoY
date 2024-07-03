import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import invariant from "tiny-invariant";

import { deleteTopic, getTopic } from "~/models/topic.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.topicId, "topicId not found");

  const topic = await getTopic({ id: params.topicId });
  if (!topic) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ topic });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
  invariant(params.topicId, "topicId not found");

  await deleteTopic({ id: params.topicId, userId });

  return redirect("/topics");
};

export default function TopicDetailsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <h3 className="text-2xl font-bold">{data.topic.title}</h3>
      <p className="py-6">{data.topic.body}</p>
      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
      <hr className="my-4" />
      <h4 className="text-xl font-bold">Replies</h4>
      <Form method="post" action={`/topics/${data.topic.id}/replies`}>
        <textarea
          name="content"
          className="w-full rounded border border-gray-300 p-2"
          placeholder="Write your reply here..."
        />
        <button
          type="submit"
          className="mt-2 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:bg-green-400"
        >
          Reply
        </button>
      </Form>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (error instanceof Error) {
    return <div>An unexpected error occurred: {error.message}</div>;
  }

  if (!isRouteErrorResponse(error)) {
    return <h1>Unknown Error</h1>;
  }

  if (error.status === 404) {
    return <div>Topic not found</div>;
  }

  return <div>An unexpected error occurred: {error.statusText}</div>;
}
