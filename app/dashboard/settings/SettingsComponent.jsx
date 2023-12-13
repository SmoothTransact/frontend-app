"use client";

import Image from "next/image";
import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import { useSelector } from "react-redux";

import fi_loader from "@/public/fi_loader.svg";

const SettingsComponent = () => {
  const user = useSelector((state) => state.user.user);

  const [tabs, setTabs] = useState(1);
  const [fullName, setFullName] = useState(user?.fullName);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const token = useSelector((state) => state.user.accessToken);

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
            Profile
          </button>
          <button
            onClick={() => setTabs(2)}
            className={
              tabs === 2
                ? "text-lg font-bold underline underline-offset-[20px]"
                : "text-lg font-bold"
            }
          >
            Security
          </button>
          <button
            onClick={() => setTabs(3)}
            className={
              tabs === 3
                ? "text-lg font-bold underline underline-offset-[20px]"
                : "text-lg font-bold"
            }
          >
            Notifications
          </button>
        </span>
      </header>
      <section className="h-screen">
        {/* Tabs Sections */}
        {/* Profile Section */}
        {tabs === 1 && (
          <section className="flex justify-center p-5 bg-neutral-50 min-h-full">
            <form className="rounded-xl bg-white shadow-lg p-10 h-fit">
              <div className="border-b-[1px] border-neutral-200 flex pb-3 items-center gap-4">
                <span className="rounded-full uppercase text-[40px] text-green-700 bg-green-100 p-3">
                  {user.fullName
                    .split(" ")
                    .map((e) => e[0])
                    .join("")}
                </span>
                <article>
                  <p className="uppercase text-neutral-700 font-bold mb-4 text-sm ">
                    {user?.types} Account
                  </p>
                  <p className="text-neutral-900 font-bold text-2xl capitalize">
                    {user?.fullName}
                  </p>
                  <p className="text-neutral-700 font-medium text-lg">
                    {user?.email}
                  </p>
                </article>
              </div>
              <div className="mt-6">
                <div className=" my-3">
                  <label className="text-sm  text-neutral-600 first-letter:capitalize">
                    {user.types} name
                    <input
                      type="text"
                      className="w-full py-3 px-6 border-[1px] border-neutral-300 rounded-lg focus:outline-blue-500"
                      placeholder="Enter account number"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </label>
                </div>
                <div className=" my-3">
                  <label className="text-sm  text-neutral-600 my-3">
                    Email address
                    <input
                      type="email"
                      className="w-full py-3 px-6 border-[1px] border-neutral-300 rounded-lg focus:outline-blue-500"
                      placeholder="info@cntbusiness.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                </div>
                <button
                  className={
                    isLoading
                      ? " disabled w-full mt-3  bg-gray-200 text-gray-900 rounded-full px-8 py-[14px] lg:text-lg text-base"
                      : "bg-neutral-900 text-neutral-50 py-[14px] px-8 rounded-full h-[54px] w-full mt-3"
                  }
                  // onClick={handleCreateAccount}
                >
                  {isLoading ? (
                    <div className="flex justify-center items-center ">
                      <Image
                        src={fi_loader}
                        alt="loader"
                        className="animate-spin"
                      />
                      Saving...
                    </div>
                  ) : (
                    "Save changes"
                  )}
                </button>
              </div>
            </form>
          </section>
        )}
        {/* Security Section */}
        {tabs === 2 && (
          <section className=" p-5 bg-neutral-50  min-h-full">
            <section className="flex items-center justify-center h-fit">
              <section className="rounded-xl bg-white shadow-lg p-10  max-w-xl">
                <article className="border-b-[1px] border-neutral-200 flex pb-3 items-center gap-4">
                  <p className="uppercase text-neutral-700 font-bold mb-2 text-sm">
                    change password
                  </p>
                </article>

                <article className="items-center gap-4 mt-5">
                  <p className=" text-neutral-900 font-bold mb-4 text-sm">
                    To change your password, kindly enter your email address
                    below and we will send you a link to reset your password.
                  </p>
                </article>

                <div className="mt-6">
                  <div className=" my-3">
                    <label className="text-sm  text-neutral-600 my-3">
                      Email address
                      <input
                        type="email"
                        className="w-full py-3 px-6 border-[1px] border-neutral-300 rounded-lg focus:outline-blue-500"
                        placeholder="Enter your email address here"
                        required
                        // value={accountNumber}
                        // onChange={(e) => setAccountNumber(e.target.value)}
                      />
                    </label>
                  </div>
                  <button
                    className={
                      isLoading
                        ? " disabled w-full mt-3  bg-gray-200 text-gray-900 rounded-full px-8 py-[14px] lg:text-lg text-base"
                        : "bg-neutral-900 text-neutral-50 py-[14px] px-8 rounded-full h-[54px] w-full mt-3"
                    }
                    // onClick={handleCreateAccount}
                  >
                    {isLoading ? (
                      <div className="flex justify-center items-center ">
                        <Image
                          src={fi_loader}
                          alt="loader"
                          className="animate-spin"
                        />
                        Saving...
                      </div>
                    ) : (
                      "Change Password"
                    )}
                  </button>
                </div>
              </section>
            </section>
          </section>
        )}

        {/* Notification */}
        {tabs === 3 && (
          <section>
            {" "}
            <section className=" p-5 bg-neutral-50  min-h-screen">
              <section className="h-fit">
                <section className="rounded-xl bg-white shadow-lg p-10  max-w-xl">
                  <article className="pb-3 items-center gap-4">
                    <p className="uppercase text-neutral-700 font-bold mb-2 text-sm">
                      all notifications
                    </p>
                  </article>
                  <div className="flex justify-between items-center my-3">
                    <article className=" text-neutral-700 font-bold mb-2 text-sm border-b-[1px] border-neutral-200">
                      <p className="text-neutral-900 font-semibold mb-2 text-xl">
                        In app notifications
                      </p>
                      <p className="text-neutral-700 font-medium mb-2 text-base ">
                        Recieve notifications directly in the dashboard through
                        the notifications tab
                      </p>
                    </article>
                    <span>
                      <Switch defaultChecked />
                    </span>
                  </div>
                  <div className="flex justify-between items-center my-3">
                    <article className=" text-neutral-700 font-bold mb-2 text-sm ">
                      <p className="text-neutral-900 font-semibold mb-2 text-xl">
                        Email notifications
                      </p>
                      <p className="text-neutral-700 font-medium mb-2 text-base ">
                        Recieve notifications directly in your email inbox
                      </p>
                    </article>
                    <span>
                      <Switch defaultChecked />
                    </span>
                  </div>
                </section>
              </section>
            </section>
          </section>
        )}
      </section>
    </main>
  );
};

export default SettingsComponent;
