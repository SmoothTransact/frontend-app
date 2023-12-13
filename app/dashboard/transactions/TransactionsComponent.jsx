"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import dateFormat from "dateformat";

import trans_empty_icon from "@/public/dashboard/trans_empty_icon.svg";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Chip,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import Link from "next/link";
export { Card, CardHeader, Typography, CardBody, Chip, IconButton, Tooltip };

const TABLE_HEAD = ["Name", "Amount", "Narration", "Date", "Status", ""];

function UserRow({ invoice, index }) {
  const isLast = index === invoice?.length - 1;
  const classes = isLast ? "p-4" : "p-4 ";

  return (
    <tr key={invoice?.id}>
      <td className={classes}>
        <span className="flex items-center gap-3">
          <span className="uppercase bg-[#EB7B7B] text-[#580E0E] w-12 h-12 flex items-center justify-center rounded-full font-semibold">
            {invoice?.invoice?.clientDetails?.fullName
              .split(" ")
              .map((e) => e[0])
              .join("")}
          </span>
          <span>
            <Typography
              variant="small"
              className="capitalize text-base font-bold text-neutral-900"
            >
              {invoice?.invoice?.clientDetails?.fullName}
            </Typography>
            <Typography
              variant="small"
              className=" text-base font-semibold text-neutral-600"
            >
              {invoice?.invoice?.clientDetails?.email}
            </Typography>
          </span>
        </span>
      </td>
      <td className={classes}>
        <span className="flex items-center gap-3">
          <Typography
            variant="small"
            className={
              invoice?.invoice?.invoice.status === "paid"
                ? "text-green-400  text-sm uppercase font-semibold"
                : invoice?.invoice?.invoice.status === "pending"
                  ? "text-[#C29C17]  text-sm uppercase font-semibold"
                  : "text-[#B11C1C]  text-sm uppercase font-semibold "
            }
          >
            ₦{formatNumber(invoice.invoice.invoice.amount)}
          </Typography>
        </span>
      </td>
      <td className={classes}>
        <div className="flex items-center gap-3">
          <Typography
            variant="small"
            className="capitalize text-base font-semibold text-neutral-700"
          >
            {invoice?.invoice?.invoice?.description}
          </Typography>
        </div>
      </td>

      <td className={classes}>
        <span className="flex items-center gap-3">
          <Typography
            variant="small"
            className="capitalize text-base font-semibold text-neutral-700"
          >
            {dateFormat(invoice?.invoice?.invoice.createdAt, "shortDate")}
          </Typography>
        </span>
      </td>

      <td className={classes}>
        <span
          className={
            invoice?.invoice?.invoice.status === "paid"
              ? "text-green-400  text-sm capitalize font-semibold"
              : invoice?.invoice?.invoice.status === "pending"
                ? "text-[#C29C17]  text-sm capitalize font-semibold"
                : "text-[#B11C1C]  text-sm capitalize font-semibold  "
          }
        >
          {invoice?.invoice?.invoice.status}
        </span>
      </td>
    </tr>
  );
}

const formatNumber = (number) => {
  const formattedNumber = (number / 100).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formattedNumber;
};

const TransactionsComponent = () => {
  const [tabs, setTabs] = useState(1);
  const transactions = useSelector((state) => state.invoices.invoices);

  const unpaidInvoices = transactions.filter((invoice) => {
    return invoice.invoice.invoice.status === "unpaid";
  });
  // const invoices = useSelector((state) => state.invoices.invoices);

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
        <Link
          href="/dashboard/invoices"
          variant="primary"
          label="Create an invoice"
          className="h-[54px] py-[14px] px-8 rounded-full bg-gray-900 text-white"
        >
          Create an invoice
        </Link>
      </div>
    </section>
  );
  return (
    <main className="bg-neutral-100 min-h-screen pb-8">
      <header className="  border-neutral-100 bg-white px-6 py-3 ">
        <span className="flex items-center gap-8">
          <button
            onClick={() => setTabs(1)}
            className={
              tabs === 1
                ? "text-lg font-bold underline underline-offset-[20px]"
                : "text-lg font-bold"
            }
          >
            Pending ({unpaidInvoices?.length})
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
        {tabs === 1 &&
          (unpaidInvoices.length > 0 ? (
            <section>
              {" "}
              <Card className=" px-6 py-8 mb-8 shadow={false}">
                <CardBody className="overflow-scroll overscroll-none px-0 scrollbar-hide">
                  <table className="w-full min-w-max table-auto text-left">
                    <thead>
                      <tr>
                        {TABLE_HEAD.map((head, index) => (
                          <th key={index} className=" bg-white p-2" scope="col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-sm text-neutral-900 uppercase font-bold"
                            >
                              {head}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {transactions.length > 0 &&
                        transactions?.map((item, index) => (
                          <UserRow invoice={item} index={index} key={item.id} />
                        ))}
                    </tbody>
                  </table>
                </CardBody>
              </Card>
              {/* testing */}
            </section>
          ) : (
            Empty
          ))}
        {tabs === 2 && <section>{Empty}</section>}
        {tabs === 3 && <section>{Empty}</section>}
      </section>
    </main>
  );
};

export default TransactionsComponent;
