import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="text-center min-h-screen flex flex-col items-center justify-center gap-6">
      <h2 className="text-3xl text-neutral-900">There was a problem</h2>
      <p>We could not find the page you were looking for</p>

      <p>
        Go back to the{" "}
        <Link
          href="/"
          className=" font-bold text-blue-700 underline hover:text-neutral-700 "
        >
          Homepage
        </Link>
      </p>
    </main>
  );
};

export default NotFound;
