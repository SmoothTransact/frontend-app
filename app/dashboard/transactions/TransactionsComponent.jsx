"use client";
import Image from "next/image";
import React, { useState } from "react";
import trans_empty_icon from "@/public/dashboard/trans_empty_icon.svg";
import Button from "@/app/components/Button";

const TransactionsComponent = () => {
  const [tabs, setTabs] = useState(1);

  const Empty = (
    <section className="min-h-[70vh] flex justify-center items-center">
      <div className="flex justify-center flex-col gap-5 items-center py-12 px-6 max-w-[480px]">
        <Image src={trans_empty_icon} alt="empty Icon" />
        <p className="text-2xl text-center font-bold text-neutral-900 m-2">
          No transactions have happened yet
        </p>
        <p className="text-lg text-center font-bold text-neutral-700 mt-2">
          Once a client pays an invoice, transactions will show up here. Create
          an invoice to get started.
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
      <header className="  border-neutral-100 bg-neutral-50 px-6 py-3 ">
        <span className="flex items-center gap-8">
          <button
            onClick={() => setTabs(1)}
            className={
              tabs === 1
                ? "text-lg font-bold underline underline-offset-[20px]"
                : "text-lg font-bold"
            }
          >
            Pending (0)
          </button>
          <button
            onClick={() => setTabs(2)}
            className={
              tabs === 2
                ? "text-lg font-bold underline underline-offset-[20px]"
                : "text-lg font-bold"
            }
          >
            Credit (0)
          </button>
          <button
            onClick={() => setTabs(3)}
            className={
              tabs === 3
                ? "text-lg font-bold underline underline-offset-[20px]"
                : "text-lg font-bold"
            }
          >
            Debit (0)
          </button>
        </span>
      </header>
      <section className="px-6 py-3">
        {/* Tabs Sections */}
        {tabs === 1 && <section>{Empty}</section>}
        {tabs === 2 && <section>{Empty}</section>}
        {tabs === 3 && <section>{Empty}</section>}
      </section>
    </main>
  );
};

export default TransactionsComponent;
