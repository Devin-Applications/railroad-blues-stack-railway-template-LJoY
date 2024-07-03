import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async () => {
  return json({ message: "New Topic Page" });
};

export default function NewTopicPage() {
  const { message } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1 className="text-2xl font-bold">{message}</h1>
    </div>
  );
}
