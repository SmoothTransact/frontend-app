import React from "react";
import axios from "axios";

async function getClient(id) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}clients/${id}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );
  return res;
}

export default async function ClientDetails({ params }) {
  const client = await getClient(params.id);

  console.log(`ID is: , ${process.env.NEXT_PUBLIC_BASE_URL}clients/${client}`);

  return (
    <main className="px-6 py-8">
      <nav>Client {client.fullName}</nav>
    </main>
  );
}
