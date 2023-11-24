/* eslint-disable react/jsx-key */
"use client";

import React from "react";
import { useState } from "react";
import emptyIcon from "../../public/dashboard/icon.svg";
import mobiile_logo from "../../public/dashboard/mobile_logo.svg";
import Image from "next/image";
import MobileView from "../components/MobileView";

import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Chip,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
export { Card, CardHeader, Typography, CardBody, Chip, IconButton, Tooltip };

const TABLE_HEAD = ["Name", "Amount", "Narration", "Date", "Status", ""];

// User

function UserRow({ user, index }) {
  const isLast = index === user.length - 1;
  const classes = isLast ? "p-4" : "p-4 ";

  return (
    <tr key={user.id}>
      <td className={classes}>
        <div className="flex items-center gap-3">
          <span className="uppercase bg-[#EB7B7B] text-[#580E0E] w-12 h-12 flex items-center justify-center rounded-full font-semibold">
            {user?.fullName
              .split(" ")
              .map((e) => e[0])
              .join("")}
          </span>
          <span>
            <Typography
              variant="small"
              className="capitalize text-base font-bold text-neutral-900"
            >
              {user.fullName}
            </Typography>
            <Typography
              variant="small"
              className=" text-base font-semibold text-neutral-600"
            >
              {user.email}
            </Typography>
          </span>
        </div>
      </td>
      <td className={classes}>
        <div className="flex items-center gap-3">
          <Typography
            variant="small"
            className={
              user.status === "paid"
                ? "text-green-400 capitalize text-base font-semibold"
                : "text-[#C29C17] capitalize text-base font-semibold"
            }
          >
            {user.amountPaid}
          </Typography>
        </div>
      </td>
      <td className={classes}>
        <div className="flex items-center gap-3">
          <Typography
            variant="small"
            className="capitalize text-base font-semibold text-neutral-700"
          >
            {`${user.narration}`}
          </Typography>
        </div>
      </td>
      <td className={classes}>
        <Typography
          variant="small"
          className="capitalize text-base font-semibold text-neutral-700"
        >
          {user.createdAt}
        </Typography>
      </td>

      <td className={classes}>
        <span
          className={
            user.status === "paid"
              ? "text-green-400 capitalize text-base font-semibold"
              : "text-[#C29C17] capitalize text-base font-semibold"
          }
        >
          {user.status}
        </span>
      </td>
    </tr>
  );
}

const MainSectionDashboard = () => {
  const [navbar, setNavbar] = useState(false);
  const [data] = useState([
    {
      id: 1,
      fullName: "Ahmed Olawale",
      email: "ayobamyahmed@gmail.com",
      amountPaid: "₦34,000",
      createdAt: "13/11/2023",
      status: "paid",
      narration: "Paid today",
    },
    {
      id: 2,
      fullName: "Shola Kale",
      email: "shola@gmail.com",
      amountPaid: "₦34,000",
      createdAt: "13/11/2023",
      status: "paid",
      narration: "Paid today",
    },
    {
      id: 3,
      fullName: "Bola Tito",
      email: "bolatitotiito@gmail.com",
      amountPaid: "₦34,500",
      createdAt: "23/6/2023",
      status: "pending",
      narration: "Not Paid",
    },
    {
      id: 4,
      fullName: "Segun Biola",
      email: "segunbiola@gmail.com",
      amountPaid: "₦34,500",
      createdAt: "23/6/2023",
      status: "pending",
      narration: "Not Paid",
    },
    {
      id: 5,
      fullName: "Femi Kanu",
      email: "femikanu@gmail.com",
      amountPaid: "₦34,500",
      createdAt: "23/6/2023",
      status: "paid",
      narration: "Not Paid",
    },
  ]);

  return (
    <main className="bg-neutral-100 min-h-screen pb-8">
      <header className="  border-neutral-100 bg-neutral-50">
        <nav className="xl:flex lg:flex pt-12 pb-5 md:hidden hidden px-6 border-b-[1px] gap-8 justify-between items-center">
          <div className="w-1/4">
            <p className="text-2xl text-neutral-900 font-semibold">Dashboard</p>
          </div>
          <div className="relative w-3/4">
            <input
              type="search"
              placeholder="Search"
              className="rounded-full w-full border-[1.5px] outline-none !border-neutral-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent text-base placeholder:text-neutral-600 focus:!border-blue-600 mt-2 focus:!border-t-blue-600 focus:bg-white focus:ring-blue-600/10  px-12 py-[14px] h-[44px]"
            />
            <span className="absolute left-4 top-6">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
                  stroke="#72768F"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17.5 17.5L13.875 13.875"
                  stroke="#72768F"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </div>
        </nav>
        <nav className="lg:hidden xl:hidden flex justify-between items-ceneter px-6 py-7 bg-white border-b-2 border-neutral-100">
          <div>
            <Image src={mobiile_logo} alt="Mobile Loogo" />
          </div>
          <div className="text-lg font-bold">Dashboard</div>
          <button onClick={() => setNavbar(!navbar)}>
            <svg
              width="32"
              height="33"
              viewBox="0 0 32 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 24.6953H28"
                stroke="#0F0F0F"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4 16.6953H28"
                stroke="#0F0F0F"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4 8.69531H28"
                stroke="#0F0F0F"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          {navbar && <MobileView navbar={navbar} setNavbar={setNavbar} />}
        </nav>
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
            <span>Create an invoice</span>
          </button>
        </span>
      </header>

      <section className="py-[17px] px-5 justify-center items-center lg:grid lg:grid-cols-12 lg:gap-[10px] block scroll-smooth whitespace-nowrap  overflow-x-scroll scrollbar-hide snap-x snap-mandatory ">
        {/* one */}
        <div className="xl:col-span-3 lg:col-span-4  md:col-span-3 w-full  inline-block self-center mx-1  rounded-lg border-neutral-50 bg-white border-[1px] px-5 py-[30px] snap-center">
          {" "}
          <span className=" flex justify-between items-center border-b-[1px] border-gray-100">
            {" "}
            <span className="text-base text-neutral-700 uppercase font-bold">
              Balance
            </span>
            <span className="text-base text-[#5162FF] capitalize font-bold flex items-center gap-1">
              <span> Withdraw </span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 17L17 7"
                  stroke="#5162FF"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7 7H17V17"
                  stroke="#5162FF"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </span>
          {/* wallet section */}
          <div className="mt-4">
            <p className="text-3xl text-neutral-900 font-bold">₦0.00</p>
            <p className="text-sm text-neutral-700 font-bold flex items-center gap-2 my-4">
              <span>Wallet:</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_175_1837)">
                  <path
                    d="M16.6667 7.5H9.16667C8.24619 7.5 7.5 8.24619 7.5 9.16667V16.6667C7.5 17.5871 8.24619 18.3333 9.16667 18.3333H16.6667C17.5871 18.3333 18.3333 17.5871 18.3333 16.6667V9.16667C18.3333 8.24619 17.5871 7.5 16.6667 7.5Z"
                    stroke="#0F0F0F"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M4.16663 12.5003H3.33329C2.89127 12.5003 2.46734 12.3247 2.15478 12.0122C1.84222 11.6996 1.66663 11.2757 1.66663 10.8337V3.33366C1.66663 2.89163 1.84222 2.46771 2.15478 2.15515C2.46734 1.84259 2.89127 1.66699 3.33329 1.66699H10.8333C11.2753 1.66699 11.6992 1.84259 12.0118 2.15515C12.3244 2.46771 12.5 2.89163 12.5 3.33366V4.16699"
                    stroke="#0F0F0F"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_175_1837">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </p>
          </div>
        </div>
        {/* two */}
        <div className="xl:col-span-6 lg:col-span-4 md:col-span-3 w-full  inline-block self-center mx-1  rounded-lg border-neutral-50 bg-white border-[1px] px-5 py-[30px] snap-center">
          <span className=" flex justify-between items-center border-b-[1px] border-gray-100">
            {" "}
            <span className="text-base text-neutral-700 uppercase font-bold">
              Clients
            </span>
            <span className="text-base text-[#5162FF] capitalize font-bold flex items-center gap-1">
              <span> View all </span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 17L17 7"
                  stroke="#5162FF"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7 7H17V17"
                  stroke="#5162FF"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </span>
          <div className="flex items-center flex-col justify-center my-4">
            <span>
              <svg
                width="52"
                height="52"
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width="51"
                  height="51"
                  rx="25.5"
                  fill="white"
                />
                <rect
                  x="0.5"
                  y="0.5"
                  width="51"
                  height="51"
                  rx="25.5"
                  stroke="#D2D4E1"
                />
                <path
                  d="M26 19V33"
                  stroke="#0F0F0F"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M19 26H33"
                  stroke="#0F0F0F"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <span className="text-sm text-neutral-900 mt-2 font-semibold">
              Add new
            </span>
          </div>
        </div>
        {/* three */}
        <div className="xl:col-span-3 lg:col-span-4 md:col-span-3 w-full  inline-block self-center mx-1  rounded-lg border-neutral-50 bg-white border-[1px] px-5 py-[30px] snap-center">
          <span className=" flex justify-between items-center border-b-[1px] border-gray-100">
            {" "}
            <span className="text-base text-neutral-700 uppercase font-bold">
              Account
            </span>
            <span className="text-base text-[#5162FF] capitalize font-bold flex items-center gap-1">
              <span> View all </span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 17L17 7"
                  stroke="#5162FF"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7 7H17V17"
                  stroke="#5162FF"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </span>
          <div className="flex items-center flex-col justify-center my-4">
            <span>
              <svg
                width="52"
                height="52"
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width="51"
                  height="51"
                  rx="25.5"
                  fill="white"
                />
                <rect
                  x="0.5"
                  y="0.5"
                  width="51"
                  height="51"
                  rx="25.5"
                  stroke="#D2D4E1"
                />
                <path
                  d="M26 19V33"
                  stroke="#0F0F0F"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M19 26H33"
                  stroke="#0F0F0F"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <span className="text-sm text-neutral-900 mt-2 font-semibold">
              Add new
            </span>
          </div>
        </div>
      </section>

      {/* Filtered Paid Results */}

      {/* header */}
      <section>
        {data.length > 0 ? (
          <>
            <Card className=" mx-5 px-6 py-8 mb-8 shadow={false}">
              <CardHeader floated={false} shadow={false} className="">
                <span className=" flex justify-between items-center mb-6">
                  {" "}
                  <span className="text-lg text-neutral-900 capitalize font-bold">
                    Recent transactions
                  </span>
                  <span className="text-base text-[#5162FF] capitalize font-bold flex items-center gap-1">
                    <span> view All </span>
                  </span>
                </span>
              </CardHeader>
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
                    {data.length > 0 &&
                      data
                        ?.filter((item) => item.status === "paid")
                        ?.map((item, index) => (
                          <UserRow user={item} index={index} />
                        ))}
                  </tbody>
                </table>
              </CardBody>
            </Card>

            {/* Filtered pending Results */}

            {/* header */}

            <Card className=" mx-5 px-6 py-8 mb-8 shadow={false}">
              <CardHeader
                floated={false}
                shadow={false}
                className="rounded-none p-1"
              >
                <span className=" flex justify-between items-center mb-6">
                  {" "}
                  <span className="text-lg text-neutral-900 capitalize font-bold">
                    Pending transactions
                  </span>
                  <span className="text-base text-[#5162FF] capitalize font-bold flex items-center gap-1">
                    <span> view All </span>
                  </span>
                </span>
              </CardHeader>
              <CardBody className="overflow-scroll px-0 scrollbar-hide">
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
                    {data.length > 0
                      ? data
                          ?.filter((item) => item.status === "pending")
                          ?.map((item, index) => (
                            <UserRow user={item} index={index} />
                          ))
                      : ""}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </>
        ) : (
          <div className="flex justify-center flex-col items-center py-12 px-6">
            <Image src={emptyIcon} alt="empty Icon" />
            <p className="text-2xl text-center font-bold text-neutral-900 m-2">
              Your dashboard is empty
            </p>
            <p className="text-lg text-center font-bold text-neutral-700 mt-2">
              Create an invoice or a client profile to get started.
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default MainSectionDashboard;
