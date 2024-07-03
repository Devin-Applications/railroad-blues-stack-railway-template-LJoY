import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return json({ message: "Topics Index" });
};

export default function TopicsIndexPage() {
  const { message } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1 className="text-2xl font-bold">{message}</h1>
    </div>
  );
}
