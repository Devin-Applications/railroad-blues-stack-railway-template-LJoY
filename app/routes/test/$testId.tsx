import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const testId = params.testId;
  console.log("Loader function invoked"); // Logging to confirm invocation
  console.log("Params:", params); // Logging the params object
  console.log("Test ID:", testId); // Logging the testId
  if (!testId) {
    throw new Response("Test ID is required", { status: 400 });
  }
  return json({ testId });
};

export default function TestDetailPage() {
  const { testId } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1 className="text-2xl font-bold">Test ID: {testId}</h1>
    </div>
  );
}
