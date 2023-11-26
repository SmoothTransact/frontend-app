"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Radio } from "@material-tailwind/react";
// import { Select, Option } from "@material-tailwind/react";

import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";

import trans_empty_icon from "../../../public/dashboard/trans_empty_icon.svg";
import TextInput from "@/app/components/Input";
import Button from "@/app/components/Button";

const InvoicesComponent = () => {
  const [tabs, setTabs] = useState(1);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const [selectInputOne, setSelectInputOne] = useState(false);
  const [selectInputTwo, setSelectInputTwo] = useState(false);

  const handleSelectInputOne = () => {
    setSelectInputOne(true);
    setSelectInputTwo(false);
  };
  const handleSelectInputTwo = () => {
    setSelectInputTwo(true);
    setSelectInputOne(false);
  };

  const Empty = (
    <section className="min-h-[70vh] flex justify-center items-center">
      <div className="flex justify-center flex-col gap-2 items-center py-12 px-6 max-w-[440px]">
        <Image src={trans_empty_icon} alt="empty Icon" />
        <p className="text-2xl text-center font-bold text-neutral-900 m-2">
          Nothing to show here
        </p>
        <p className="text-lg text-center font-bold text-neutral-700 mt-2">
          Create an invoice for clients and it will show up here.
        </p>
      </div>
    </section>
  );
  return (
    <main className="bg-neutral-100 min-h-screen pb-8 relative">
      <header className="  border-neutral-100 bg-neutral-50 px-6 py-3 lg:flex lg:justify-between items-center ">
        <span className="flex items-center gap-8">
          <button
            onClick={() => setTabs(1)}
            className={
              tabs === 1
                ? "text-lg font-bold underline underline-offset-[20px]"
                : "text-lg font-bold"
            }
          >
            All (0)
          </button>
          <button
            onClick={() => setTabs(2)}
            className={
              tabs === 2
                ? "text-lg font-bold underline underline-offset-[20px]"
                : "text-lg font-bold"
            }
          >
            Paid (0)
          </button>
          <button
            onClick={() => setTabs(3)}
            className={
              tabs === 3
                ? "text-lg font-bold underline underline-offset-[20px]"
                : "text-lg font-bold"
            }
          >
            Pending (0)
          </button>
          <button
            onClick={() => setTabs(4)}
            className={
              tabs === 4
                ? "text-lg font-bold underline underline-offset-[20px]"
                : "text-lg font-bold"
            }
          >
            Due (0)
          </button>
        </span>
        <button
          className="lg:flex gap-2 items-center lg:justify-center justify-between py-[10px] px-5 bg-neutral-900 hidden text-neutral-50 rounded-full text-sm"
          onClick={handleOpen}
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
          <span>Create new</span>
        </button>

        {/* Mobile Button */}
        <button
          className="lg:hidden block absolute bottom-32 right-4"
          onClick={handleOpen}
        >
          {" "}
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="64" height="64" rx="32" fill="#0F0F0F" />
            <path
              d="M32 25V39"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M25 32H39"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        {/* Mobile Button */}
      </header>
      <section className="px-6 py-3">
        {/* Tabs Sections */}
        {tabs === 1 && <section>{Empty}</section>}
        {tabs === 2 && <section>{Empty}</section>}
        {tabs === 3 && <section>{Empty}</section>}
        {tabs === 4 && <section>{Empty}</section>}
      </section>

      {/* popup modal */}
      <>
        <Dialog open={open} handler={handleOpen}>
          <span className="flex justify-between items-center">
            <DialogHeader className="text-2xl text-gray-900">
              Create invoice
            </DialogHeader>
            <DialogHeader onClick={handleOpen} className="cursor-pointer">
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
            <span className="text-xl text-neutral-500 uppercase">INV-234</span>
            <div className="my-4">
              <span className="text-sm text-neutral-900 uppercase font-bold mb-6">
                who is this for?
              </span>
              <div>
                <div className=" mt-3">
                  <label
                    className="flex justify-between items-center"
                    onClick={handleSelectInputOne}
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
                    <Radio name="type" ripple={true} />
                  </label>
                </div>
                <div>
                  <label
                    className="flex justify-between items-center"
                    onClick={handleSelectInputTwo}
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
                {selectInputOne && (
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
                )}
              </div>
              {/* Option two */}
              <div className="my-6">
                {selectInputTwo && (
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
            </section>
          </DialogBody>
        </Dialog>
      </>
    </main>
  );
};

export default InvoicesComponent;
