import { Link } from "@remix-run/react";

export default function NoteIndexPage() {
  return (
    <p>
      No topic selected. Select a topic on the left, or{" "}
      <Link to="new" className="text-blue-500 underline">
        create a new topic.
      </Link>
    </p>
  );
}
