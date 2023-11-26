"use client";

import Image from "next/image";
import React from "react";
import { Typography } from "@material-tailwind/react";
export { Typography };
import dummyData from "../dummyData.json";
import trans_empty_icon from "../../../public/dashboard/trans_empty_icon.svg";
import access_logo from "../../../public/dashboard/access_logo.svg";

const AccountsComponent = () => {
  const data = dummyData.dummyData;

  const Empty = (
    <section className="min-h-[70vh] flex justify-center items-center">
      <div className="flex justify-center flex-col gap-2 items-center py-12 px-6 max-w-[480px]">
        <Image src={trans_empty_icon} alt="empty Icon" />
        <p className="text-2xl text-center font-bold text-neutral-900 m-2">
          You do not have any saved bank accounts
        </p>
        <p className="text-lg text-center font-bold text-neutral-700 mt-2">
          Add bank accounts for ease of withdrawals
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
              <div className="flex justify-between  pb-3">
                <span>
                  <div className="flex flex-col items-start  gap-3">
                    <span className="uppercase bg-[#e9e9e9]  w-12 h-12 flex items-center font-bold justify-center rounded-full ">
                      <Image src={access_logo} alt="bank logo" />
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
                        Access Bank
                      </Typography>
                      <Typography
                        variant="small"
                        className=" text-base  text-neutral-600"
                      >
                        083456278
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
                  <path
                    d="M3.33398 6H5.33398H21.334"
                    stroke="#1D1D24"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.33398 6V4C8.33398 3.46957 8.5447 2.96086 8.91977 2.58579C9.29484 2.21071 9.80355 2 10.334 2H14.334C14.8644 2 15.3731 2.21071 15.7482 2.58579C16.1233 2.96086 16.334 3.46957 16.334 4V6M19.334 6V20C19.334 20.5304 19.1233 21.0391 18.7482 21.4142C18.3731 21.7893 17.8644 22 17.334 22H7.33398C6.80355 22 6.29484 21.7893 5.91977 21.4142C5.5447 21.0391 5.33398 20.5304 5.33398 20V6H19.334Z"
                    stroke="#1D1D24"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
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

export default AccountsComponent;
