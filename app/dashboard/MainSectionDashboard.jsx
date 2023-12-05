/* eslint-disable react/jsx-key */
"use client";

import React, { useState } from "react";
import emptyIcon from "@/public/dashboard/icon.svg";
import Image from "next/image";
import dummyData from "./dummyData.json";
// import Popup from "../components/Popup";

import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Chip,
  IconButton,
  Tooltip,
  Radio,
  DialogBody,
  DialogHeader,
  Dialog,
} from "@material-tailwind/react";
import TextInput from "../components/Input";
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
  const [selectInvoiceType, setSelectInvoiceType] = useState("existing");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const data = dummyData.dummyData;

  return (
    <main className="bg-neutral-100 min-h-screen pb-8">
      <header className="  border-neutral-100 bg-neutral-50">
        <span className="flex justify-between items-center px-6 py-3 lg:bg-neutral-50 bg-white border-neutral-100 border-b-[1px]">
          <p className="text-lg font-bold">Overview</p>

          <button
            onClick={handleOpen}
            className="flex gap-2 items-center justify-center py-[10px] px-5 bg-neutral-900 text-neutral-50 rounded-full text-sm"
          >
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
            Create an invoice
          </button>
          <Dialog open={open} handler={handleOpen}>
            <span className="flex justify-between items-center">
              <DialogHeader className="text-2xl text-gray-900">
                Create an invoice
              </DialogHeader>
              <DialogHeader
                onClick={handleOpen}
                onClose={() => setSelectInvoiceType("existing")}
                className="cursor-pointer"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 8L8 24"
                    stroke="#1D1D24"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8 8L24 24"
                    stroke="#1D1D24"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </DialogHeader>
            </span>
            <DialogBody>
              <div className="overflow-auto max-h-[500px] overflow-y-scroll scrollbar-hide">
                <span className="text-xl text-neutral-500 uppercase">
                  INV-234
                </span>
                <div className="my-4">
                  <span className="text-sm text-neutral-900 uppercase font-bold mb-6">
                    who is this for?
                  </span>
                  <div>
                    <div className=" mt-3">
                      <label
                        className="flex justify-between items-center"
                        onClick={() => setSelectInvoiceType("existing")}
                      >
                        <span className="flex gap-2 items-center justify-center text-bae text-neutral-700">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                              stroke="#56586B"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M17 11L19 13L23 9"
                              stroke="#56586B"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z"
                              stroke="#56586B"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          For an existing client
                        </span>
                        <Radio name="type" ripple={true} defaultChecked />
                      </label>
                    </div>
                    <div>
                      <label
                        className="flex justify-between items-center"
                        onClick={() => setSelectInvoiceType("new")}
                      >
                        <span className="flex gap-2 items-center justify-center text-bae text-neutral-700">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                              stroke="#56586B"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M20 8V14"
                              stroke="#56586B"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M23 11H17"
                              stroke="#56586B"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z"
                              stroke="#56586B"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>{" "}
                          For a new client
                        </span>
                        <Radio name="type" ripple={true} />
                      </label>
                    </div>
                  </div>
                </div>
                {/* Select details */}

                <section>
                  <div className="my-6">
                    {selectInvoiceType === "existing" ? (
                      <>
                        <p className="text-neutral-900 uppercase text-sm font-bold mb-3">
                          CLIENT&apos;S INFO
                        </p>

                        <section>
                          <label className="text-sm text-neutral-600">
                            Client
                            <select
                              className=" w-full py-3 px-6 border-[1px] border-neutral-300 rounded-lg focus:outline-blue-500 "
                              placeholder="Select a client"
                              // labelProps={{
                              //   className: "hidden",
                              // }}
                            >
                              <option>Select a client</option>
                              <option>client A</option>
                              <option>client B</option>
                              <option>client C</option>
                              <option>client D</option>
                              <option>client E</option>
                            </select>
                          </label>
                        </section>
                        {/* task */}
                        <div className="my-8">
                          <p className="text-neutral-900 uppercase text-sm font-bold mb-3">
                            TASK INFO
                          </p>
                          <div className="my-3">
                            <label className="text-sm  text-neutral-600">
                              Task name
                              <input
                                type="text"
                                className="w-full py-3 px-6 border-[1px] border-neutral-300 rounded-lg focus:outline-blue-500"
                                placeholder="Enter the name of the task"
                                required
                              />
                            </label>
                          </div>
                          <div className="my-3">
                            <label className="text-sm  text-neutral-600">
                              Amount charged
                              <input
                                type="number"
                                className="w-full py-3 px-6 border-[1px] border-neutral-300 rounded-lg focus:outline-blue-500"
                                placeholder="Enter the amount for this task"
                                required
                              />
                            </label>
                          </div>
                        </div>
                        {/* Add another task */}
                        <button className="flex items-center justify-center font-bold text-neutral-900 gap-2">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 4.16699V15.8337"
                              stroke="black"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M4.16675 10H15.8334"
                              stroke="black"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          Add another task
                        </button>
                        {/* Add another task */}
                        {/* Time Line */}
                        <div className="my-4">
                          <p className="text-neutral-900 uppercase text-sm font-bold mb-3">
                            TIMELINE
                          </p>
                          <label className="text-sm  text-neutral-600">
                            Due Date
                            <TextInput
                              variant="outlined"
                              type="date"
                              value=""
                              onChange=""
                              placeholder="Enter the name of the task"
                              required
                            />
                          </label>
                        </div>
                        <button className="bg-neutral-900 text-neutral-50 py-[14px] px-8 rounded-full h-[54px] w-full mt-8">
                          Send Now
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="text-neutral-900 uppercase text-sm font-bold mb-3">
                          CLIENT&apos;S INFO
                        </p>
                        <label className="text-sm  text-neutral-600 mb-2">
                          Client&apos;s name
                          <input
                            type="text"
                            className="w-full py-3 px-6 border-[1px] border-neutral-300 rounded-lg focus:outline-blue-500"
                            placeholder="Enter the name of the task"
                            required
                          />
                        </label>
                        <div className="my-3">
                          <label className="text-sm  text-neutral-600 ">
                            Email address
                            <input
                              type="email"
                              className="w-full py-3 px-6 border-[1px] border-neutral-300 rounded-lg focus:outline-blue-500"
                              placeholder="Enter the name of the task"
                              required
                            />
                          </label>
                        </div>

                        {/* task */}
                        <div className="my-4">
                          <p className="text-neutral-900 uppercase text-sm font-bold mb-3">
                            TASK INFO
                          </p>
                          <div className="my-3">
                            <label className="text-sm  text-neutral-600">
                              Task name
                              <input
                                type="text"
                                className="w-full py-3 px-6 border-[1px] border-neutral-300 rounded-lg focus:outline-blue-500"
                                placeholder="Enter the name of the task"
                                required
                              />
                            </label>
                          </div>
                          <div className="my-3">
                            <label className="text-sm  text-neutral-600">
                              Amount charged
                              <input
                                type="number"
                                className="w-full py-3 px-6 border-[1px] border-neutral-300 rounded-lg focus:outline-blue-500"
                                placeholder="Enter the amount for this task"
                                required
                              />
                            </label>
                          </div>
                        </div>
                        {/* Add another task */}
                        <button className="flex items-center justify-center font-bold text-neutral-900 gap-2">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 4.16699V15.8337"
                              stroke="black"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M4.16675 10H15.8334"
                              stroke="black"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          Add another task
                        </button>
                        {/* Add another task */}
                        {/* Time Line */}
                        <div className="my-3">
                          <p className="text-neutral-900 uppercase text-sm font-bold mb-3">
                            TIMELINE
                          </p>
                          <label className="text-sm  text-neutral-600">
                            Due Date
                            <TextInput
                              variant="outlined"
                              type="date"
                              value=""
                              onChange=""
                              placeholder="Enter the name of the task"
                              required
                            />
                          </label>
                        </div>
                        <button className="bg-neutral-900 text-neutral-50 py-[14px] px-8 rounded-full h-[54px] w-full mt-8">
                          Send Now
                        </button>
                      </>
                    )}
                  </div>
                  {/* Option two */}
                  {/* <div className="my-6">
         {selectInputTwo && (
          
          )} 
        </div> */}
                </section>
              </div>
            </DialogBody>
          </Dialog>
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
