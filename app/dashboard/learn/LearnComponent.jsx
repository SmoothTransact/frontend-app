import Image from "next/image";
import React from "react";
import l1 from "@/public/dashboard/learn/l1.jpg";
import l2 from "@/public/dashboard/learn/l2.jpg";
import l3 from "@/public/dashboard/learn/l3.jpg";

const LearnComponent = () => {
  const blogs = [
    {
      id: 1,
      tag: "article",
      title: "How to build global businesses from local communities",
      author: "By Daniel Onikola",
      date: "26/09/2023",
      avatar: l1,
    },
    {
      id: 2,
      tag: "article",
      title:
        "Building million dollar businesses that survive economic downturn",
      author: "By Daniel Onikola",
      date: "26/09/2023",
      avatar: l2,
    },
    {
      id: 3,
      tag: "tutorial",
      title: "How to create, send and manage invoices",
      author: "By Daniel Onikola",
      date: "26/09/2023",
      avatar: l3,
    },
  ];
  return (
    <main>
      <header className="  border-neutral-100 bg-neutral-50 ">
        <span className="flex justify-between items-center px-6 py-3 lg:bg-white bg-white border-neutral-100 border-b-[1px]">
          <p className="text-lg font-bold">All content</p>
        </span>
      </header>
      <section className="grid grid-cols-12 gap-5 justify-center px-6 py-5 bg-neutral-50 min-h-screen">
        {blogs.map((blog) => (
          <div
            className="lg:col-span-4 md:col-span-6 col-span-12 bg-white rounded-xl shadow-2xl h-fit"
            key={blog.id}
          >
            <Image
              src={blog.avatar}
              alt="learn image one"
              width="100%"
              className=" rounded-t-xl"
              priority
            />
            <div className=" p-5">
              <span
                className={`${
                  blog.tag === "article"
                    ? "text-green-600 bg-green-100"
                    : "text-purple-600 bg-purple-100"
                } uppercase rounded-full text-xs font-bold px-3 py-2`}
              >
                {blog.tag}
              </span>
              <p className="my-5 font-bold text-neutral-900 text-xl">
                {blog.title}
              </p>
              <div className="flex justify-between items-center">
                <p className="text-neutral-600 text-sm font-semibold">
                  {blog.author}
                </p>
                <p className="text-neutral-600 text-sm font-semibold">
                  {blog.date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default LearnComponent;
