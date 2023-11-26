"use client";

import Image from "next/image";
import React, { useState, useEffect, use } from "react";
import trans_empty_icon from "../../../public/dashboard/trans_empty_icon.svg";
// import { useGetallclientsMutation } from "@/app/utils/rtk/apiSlice";
import fi_rotate from "../../../public/dashboard/fi_rotate.svg";
import fi_loader from "../../../public/fi_loader.svg";
import fi_check from "../../../public/fi_check.svg";
import error_outline from "../../../public/error_outline.svg";

import axios from "axios";
import TextInput from "@/app/components/Input";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";

import { useSelector } from "react-redux";

function ClientsComponent() {
  const [getClients, setGetClients] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [generalMessage, setGeneralMessage] = useState(null);
  const handleOpen = () => setOpen(!open);

  // Users
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const token = useSelector((state) => state.user.accessToken);

  // console.log("token is :", token);

  const handleGetAllClients = async () => {
    setIsPending(true);

    try {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}clients`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGetClients(result.data);
      setIsPending(false);
    } catch (er) {
      console.error(`${er.message}`);
    }
  };

  // Create new client
  const handleCreateClient = async () => {
    setIsLoading(true);

    const userData = {
      fullName,
      email,
      phone,
    };

    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}clients`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGetClients(result.data);
      setSuccessMessage("Client added successfully");
      setGeneralMessage("");

      setFullName("");
      setEmail("");
      setPhone("");
      setIsLoading(false);
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    } catch (error) {
      setGeneralMessage(`${error.message}`);
      setSuccessMessage("");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <span onClick={handleOpen}>Add new</span>
          </button>
        </span>
      </header>
      <section className="grid grid-cols-12 gap-5 justify-center px-6 py-12">
        {/* <div className="col-span-12 text-center">
          {isPending && <>Pending...</>}
        </div> */}
        {isPending ? (
          <p className="items-center text-center col-span-12 flex justify-center h-[50vh]">
            <Image src={fi_rotate} alt="Spinner" className="animate-spin" />
          </p>
        ) : getClients?.length > 0 ? (
          getClients.map((user) => (
            <div
              key={user.id}
              className="xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-6 col-span-12 drop-shadow-sm border-[0.5px] border-neutral-50 shadow-xl p-4 rounded-lg bg-white"
            >
              <div className="flex justify-between border-b-[1px] border-b-neutral-100 pb-3">
                <span>
                  <div className="flex flex-col items-start gap-3">
                    <span className="uppercase bg-[#EB7B7B] text-[#580E0E] w-12 h-12 flex items-center font-bold justify-center rounded-full">
                      {user?.fullName
                        .split(" ")
                        .map((e) => e[0])
                        .join("")}
                    </span>
                    <span>
                      <p
                        variant="small"
                        className="capitalize text-lg font-bold text-neutral-900"
                      >
                        {user.fullName}
                      </p>
                      <p variant="small" className="text-base text-neutral-600">
                        {user.email}
                      </p>
                      <p variant="small" className="text-base text-neutral-600">
                        {user.phone}
                      </p>
                    </span>
                  </div>
                </span>
                <span className="cursor-pointer">
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
                </span>
              </div>
              <p className="text-xs uppercase text-neutral-700 font-bold my-2">
                invoices
              </p>
              <div className="bg-neutral-100 mt-3 rounded-md flex flex-col">
                {/* ... (rest of the code) ... */}
              </div>
            </div>
          ))
        ) : (
          <section className="px-6 py-3 col-span-12">{Empty}</section>
        )}
      </section>
      <Dialog open={open} handler={handleOpen}>
        <span className="flex justify-between items-center">
          <DialogHeader className="text-2xl text-gray-900">
            Add new client
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
          <section>
            <div className="my-3">
              <>
                <p className="text-neutral-900 uppercase text-sm font-bold mb-3">
                  CLIENT INFO
                </p>

                {/* task */}
                <div className="my-6">
                  <div className="my-3">
                    <label className="text-sm  text-neutral-600">
                      Client/Business name
                      <input
                        type="text"
                        className="w-full py-3 px-6 border-[1px] border-neutral-300 rounded-lg focus:outline-blue-500"
                        placeholder="Enter the client/business name"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </label>
                  </div>
                  <div className="my-3">
                    <label className="text-sm  text-neutral-600">
                      Email address
                      <input
                        type="email"
                        className="w-full py-3 px-6 border-[1px] border-neutral-300 rounded-lg focus:outline-blue-500"
                        placeholder="Enter the client/business email "
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </label>
                  </div>
                  <div className="my-3">
                    <label className="text-sm  text-neutral-600">
                      Phone number
                      <input
                        type="number"
                        className="w-full py-3 px-6 border-[1px] border-neutral-300 rounded-lg focus:outline-blue-500"
                        placeholder="Enter phone number here"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </label>
                  </div>
                </div>
                <p
                  className={
                    successMessage
                      ? "flex items-center text-left justify-start text-green-500 text-sm gap-2 mt-3"
                      : "hidden my-2"
                  }
                >
                  <Image src={fi_check} alt="loader" className="" />
                  {successMessage}
                </p>
                <p
                  className={
                    generalMessage
                      ? "flex items-center text-left justify-start text-red-500 text-sm gap-2 mt-3"
                      : "hidden my-2"
                  }
                >
                  <Image src={error_outline} alt="loader" className="" />
                  {generalMessage}
                </p>

                <button
                  className={
                    isLoading
                      ? " disabled w-full mt-8  bg-gray-200 text-gray-900 rounded-full px-8 py-[14px] lg:text-lg text-base"
                      : "bg-neutral-900 text-neutral-50 py-[14px] px-8 rounded-full h-[54px] w-full mt-8"
                  }
                  onClick={handleCreateClient}
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
                    "Save"
                  )}
                </button>
              </>
            </div>
            {/* Option two */}
            <div className="my-3"></div>
          </section>
        </DialogBody>
      </Dialog>
    </main>
  );
}

export default ClientsComponent;
