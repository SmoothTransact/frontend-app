"use client";
import Image from "next/image";
import React, { useState } from "react";
import trans_empty_icon from "@/public/dashboard/trans_empty_icon.svg";
import Button from "@/app/components/Button";

const NotificationsComponent = () => {
  const [tabs, setTabs] = useState(1);

  const Empty = (
    <section className="min-h-[70vh] flex justify-center items-center">
      <div className="flex justify-center flex-col gap-5 items-center py-12 px-6 max-w-[480px]">
        <Image src={trans_empty_icon} alt="empty Icon" />
        <p className="text-2xl text-center font-bold text-neutral-900 m-2">
          You do not have any notifications
        </p>
        <p className="text-lg text-center font-bold text-neutral-700 mt-2">
          Notifications will show up here when your invoices are paid or due.
        </p>
        <button
          variant="primary"
          label="Create an invoice"
          className="h-[54px] py-[14px] px-8 rounded-full bg-gray-900 text-white"
        >
          Create an invoice
        </button>
      </div>
    </section>
  );
  return (
    <main className="bg-neutral-100 min-h-screen pb-8">
      <header className="  border-neutral-100 bg-neutral-50 px-6 py-3 flex justify-between items-center">
        <span className="flex items-center gap-8">
          <button
            onClick={() => setTabs(1)}
            className={
              tabs === 1
                ? "text-lg font-bold underline underline-offset-[20px]"
                : "text-lg font-bold"
            }
          >
            Read (0)
          </button>
          <button
            onClick={() => setTabs(2)}
            className={
              tabs === 2
                ? "text-lg font-bold underline underline-offset-[20px]"
                : "text-lg font-bold"
            }
          >
            Unread (0)
          </button>
        </span>
        <button className="flex gap-2 items-center justify-center py-[10px] px-5 bg-neutral-900 text-neutral-50 rounded-full text-sm">
          {" "}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 4.16699V15.8337"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4.16675 10H15.8334"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>{" "}
          <span>Add new</span>
        </button>
      </header>
      <section className="px-6 py-3">
        {/* Tabs Sections */}
        {tabs === 1 && <section>{Empty}</section>}
        {tabs === 2 && <section>{Empty}</section>}
      </section>
    </main>
  );
};

export default NotificationsComponent;
