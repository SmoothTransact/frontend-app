"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Radio } from "@material-tailwind/react";
import axios from "axios";

import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";

// import trans_empty_icon from "@/public/dashboard/trans_empty_icon.svg";
import trans_empty_icon from "@/public/dashboard/trans_empty_icon.svg";
import TextInput from "@/app/components/Input";
import fi_plus from "@/public/dashboard/fi_plus.svg";
import fi_user_check from "@/public/dashboard/fi_user_check.svg";
import fi_user_plus from "@/public/dashboard/fi_user_plus.svg";

const InvoicesComponent = () => {
  const [tabs, setTabs] = useState(1);
  const [selectInvoiceType, setSelectInvoiceType] = useState("existing");
  const [open, setOpen] = useState(false);

  const [isPending, setIsPending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = () => setOpen(!open);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [clientId, setClientId] = useState("");
  const [date, setDate] = useState("");

  // check for clients
  const clients = useSelector((state) => state.clients.clients);

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
      dispatch(dispatchClients(result.data));
      setIsPending(false);
    } catch (er) {
      console.error(`${er.message}`);
    }
  };

  const handleCreateInvoice = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!description || !amount || !clientId || !date) {
      setGeneralMessage("All inputs are required to add an invoice");
      setSuccessMessage("");
      setIsLoading(false);
      return false;
    }
    // Note, create an arguement to let the axios function know when a client is selected or addingn a new client.
    const userData = {
      description,
      amount,
      date,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}invoices/${clientId}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleGetAllInvoices();
      setSuccessMessage("Client added successfully");
      console.log("creating client", response.data);
      dispatch(addClient(response.data));
      setGeneralMessage("");
      setFullName("");
      setEmail("");
      setPhone("");
      setIsLoading(false);
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        setGeneralMessage("Unauthorized! User not logged in");
        localStorage.clear();
        return router.push("/auth/login");
      }
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
      <header className="  border-neutral-100 bg-white px-6 py-3 lg:flex lg:justify-between items-center ">
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
          <Image src={fi_plus} alt="add button" width={20} height={20} />

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
      <div>
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
                        <Image
                          src={fi_user_check}
                          alt="add button"
                          width={24}
                          height={24}
                        />
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
                        <Image
                          src={fi_user_plus}
                          alt="add button"
                          width={24}
                          height={24}
                        />
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
                            className=" w-full py-3 px-3 border-[1px] border-neutral-300 rounded-lg focus:outline-blue-500 "
                            value={clientId}
                            onChange={(e) => {
                              setClientId(e.target.value);
                            }}

                            // labelProps={{
                            //   className: "hidden",
                            // }}
                          >
                            <option>Select a client</option>
                            {clients &&
                              clients?.map((client) => (
                                <option key={client.id} value={client.id}>
                                  {client.fullName}
                                </option>
                              ))}
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
                      {/* <button className="flex items-center justify-center font-bold text-neutral-900 gap-2">
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
                      </button> */}
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
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
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
                          value={name}
                          onChange={(e) => setName(e.target.value)}
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
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
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                              required
                            />
                          </label>
                        </div>
                      </div>
                      {/* Add another task */}
                      {/* <button className="flex items-center justify-center font-bold text-neutral-900 gap-2">
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
                      </button> */}
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
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
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
      </div>
    </main>
  );
};

export default InvoicesComponent;
