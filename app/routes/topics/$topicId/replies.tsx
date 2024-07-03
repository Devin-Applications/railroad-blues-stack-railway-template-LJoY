import { json, redirect, ActionFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";

import { createReply } from "~/models/reply.server";
import { requireUserId } from "~/session.server";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  console.log("Action function invoked"); // Logging to confirm invocation
  const userId = await requireUserId(request);
  invariant(params.topicId, "topicId not found");

  const formData = await request.formData();
  const content = formData.get("content");

  if (typeof content !== "string" || content.length === 0) {
    return json({ error: "Content is required" }, { status: 400 });
  }

  await createReply({
    body: content,
    topicId: params.topicId,
    userId,
  });

  return redirect(`/topics/${params.topicId}`);
};
