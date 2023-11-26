"use client";

import Image from "next/image";
import React from "react";
import { Typography } from "@material-tailwind/react";
export { Typography };
import dummyData from "../dummyData.json";
import trans_empty_icon from "../../../public/dashboard/trans_empty_icon.svg";

const ClientsComponent = () => {
  const data = dummyData.dummyData;

  const Empty = (
    <section className="min-h-[70vh] flex justify-center items-center">
      <div className="flex justify-center flex-col gap-2 items-center py-12 px-6 max-w-[480px]">
        <Image src={trans_empty_icon} alt="empty Icon" />
        <p className="text-2xl text-center font-bold text-neutral-900 m-2">
          Nothing to show here
        </p>
        <p className="text-lg text-center font-bold text-neutral-700 mt-2">
          Create and save client profiles to make it easy to send invoices.
        </p>
      </div>
    </section>
  );

  return (
    <main>
      <header className="  border-neutral-100 bg-neutral-50">
        <span className="flex justify-between items-center px-6 py-3 lg:bg-neutral-50 bg-white border-neutral-100 border-b-[1px]">
          <p className="text-lg font-bold">Overview</p>

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
        </span>
      </header>
      <section className="grid grid-cols-12 gap-5 justify-center px-6 py-12">
        {data.length > 0 ? (
          data?.map((user) => (
            <div
              key={user.id}
              className="xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-6 col-span-12 drop-shadow-sm border-[0.5px] border-neutral-50  shadow-xl p-4 rounded-lg bg-white"
            >
              <div className="flex justify-between border-b-[1px] border-b-neutral-100 pb-3">
                <span>
                  <div className="flex flex-col items-start  gap-3">
                    <span className="uppercase bg-[#EB7B7B] text-[#580E0E] w-12 h-12 flex items-center font-bold justify-center rounded-full ">
                      {user?.fullName
                        .split(" ")
                        .map((e) => e[0])
                        .join("")}
                    </span>
                    <span>
                      <Typography
                        variant="small"
                        className="capitalize text-lg font-bold text-neutral-900"
                      >
                        {user.fullName}
                      </Typography>
                      <Typography
                        variant="small"
                        className=" text-base  text-neutral-600"
                      >
                        {user.email}
                      </Typography>
                      <Typography
                        variant="small"
                        className=" text-base  text-neutral-600"
                      >
                        {user.phone}
                      </Typography>
                    </span>
                  </div>
                </span>
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12.3333" cy="5" r="2" fill="#1D1D24" />
                  <circle cx="12.3333" cy="12" r="2" fill="#1D1D24" />
                  <circle cx="12.3333" cy="19" r="2" fill="#1D1D24" />
                </svg>
              </div>
              <p className="text-xs uppercase text-neutral-700 font-bold my-2">
                invoices
              </p>
              <div className="bg-neutral-100 mt-3 rounded-md flex flex-col">
                <div className="flex justify-between items-center px-3 py-2 font-bold  text-sm uppercase text-green-700">
                  <span className="flex gap-1 items-center ">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="5" cy="5" r="5" fill="#289052" />
                    </svg>
                    paid
                  </span>{" "}
                  <span>10</span>
                </div>
                <div className="flex justify-between items-center px-3 py-2 font-bold  text-sm uppercase text-[#C29C17]">
                  <span className="flex gap-1 items-center ">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="5" cy="5" r="5" fill="#C29C17" />
                    </svg>
                    pending
                  </span>{" "}
                  <span>10</span>
                </div>
                <div className="flex justify-between items-center px-3 py-2 font-bold  text-sm uppercase text-red-700">
                  <span className="flex gap-1 items-center ">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="5" cy="5" r="5" fill="#B11C1C" />
                    </svg>
                    due
                  </span>{" "}
                  <span>10</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <section className="px-6 py-3">{Empty}</section>
        )}
      </section>
    </main>
  );
};

export default ClientsComponent;
