import { json, LoaderFunctionArgs } from "@remix-run/node";

import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getTopicListItems } from "~/models/topic.server";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  const topicListItems = await getTopicListItems({ userId });
  return json({ topicListItems });
};

export default function TopicsPage() {
  const data = useLoaderData<typeof loader>();
  const user = useUser();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to=".">Discussions</Link>
        </h1>
        <p>{user.email}</p>
        <form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </form>
      </header>

      <main className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-gray-50">
          <Link to="new" className="block p-4 text-xl text-blue-500">
            + New Topic
          </Link>

          <hr />

          {data.topicListItems.length === 0 ? (
            <p className="p-4">No topics yet</p>
          ) : (
            <ol>
              {data.topicListItems.map((topic) => (
                <li key={topic.id}>
                  <Link
                    className="block border-b p-4 text-xl"
                    to={topic.id}
                  >
                    🗨️ {topic.title}
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
