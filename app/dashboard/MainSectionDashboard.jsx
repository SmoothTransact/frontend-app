/* eslint-disable react/jsx-key */
"use client";

import React, { useState } from "react";
import Image from "next/image";

import emptyIcon from "@/public/dashboard/icon.svg";
import dummyData from "./dummyData.json";
import Popup from "../components/Popup";

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
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import TextInput from "../components/Input";
import Link from "next/link";
export { Card, CardHeader, Typography, CardBody, Chip, IconButton, Tooltip };
import fi_plus_add from "@/public/dashboard/fi_plus_add.svg";

import fi_wallet from "@/public/dashboard/fi_wallet.svg";
import fi_arrow_up from "@/public/dashboard/fi_arrow_up_right.svg";
import fi_check from "@/public/fi_check.svg";
import fi_x from "@/public/dashboard/fi_x.svg";
import error_outline from "@/public/error_outline.svg";
import fi_loader from "@/public/fi_loader.svg";
import fi_plus from "@/public/dashboard/fi_plus.svg";

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
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 2,
    width: "90%",
    bgcolor: "background.paper",
    border: ".5px solid #f2f2f2",
    boxShadow: 24,
    p: 4,
  };

  const [selectInvoiceType, setSelectInvoiceType] = useState("existing");
  const [open, setOpen] = useState(false);
  const [openAccountModal, setOpenAccountModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleAccountModal = () => setOpenAccountModal(!openAccountModal);
  const handleOpen = () => setOpen(!open);
  const handleOpenModal = () => setOpenModal(!openModal);

  const data = dummyData.dummyData;

  const [successMessage, setSuccessMessage] = useState("");
  const [generalMessage, setGeneralMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleBankChange = (event) => {
    setBankName(event.target.value);
  };

  // Create new client
  const handleCreateClient = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !phone || !fullName) {
      setGeneralMessage("All inputs are required to add a client");
      setSuccessMessage("");
      setIsLoading(false);
      return false;
    }

    const userData = {
      fullName,
      email,
      phone,
    };

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}clients`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      handleGetAllClients();
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
      if (error.message === "Request failed with status code 401") {
        setGeneralMessage("Unauthorized! User not logged in");
        localStorage.clear();
        return router.push("/auth/login");
      }
      setSuccessMessage("");
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-neutral-100 min-h-screen pb-8">
      <header className="  border-neutral-100 bg-white">
        <span className="flex justify-between items-center px-6 py-3  bg-white border-neutral-100 border-b-[1px]">
          <p className="text-lg font-bold">Overview</p>

          <button
            onClick={handleOpen}
            className="flex gap-2 items-center justify-center py-[10px] px-5 bg-neutral-900 text-neutral-50 rounded-full text-sm"
          >
            {" "}
            <Image src={fi_plus} alt="add button" width={20} height={20} />
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
              <Image src={fi_arrow_up} alt="Arrow Up" />
            </span>
          </span>
          {/* wallet section */}
          <div className="mt-4">
            <p className="text-3xl text-neutral-900 font-bold">₦342,153.63</p>
            <p className="text-sm text-neutral-700 font-bold flex items-center gap-2 my-4">
              <span>Wallet:</span>
              <Image src={fi_wallet} width={20} height={20} alt="Arrow Up" />
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
            <button className="text-base cursor-pointer text-[#5162FF] capitalize font-bold flex items-center gap-1">
              <Link href="dashboard/clients"> View all </Link>
              <Image src={fi_arrow_up} width={20} height={20} alt="Arrow Up" />
            </button>
          </span>

          <div className="flex items-center flex-col justify-center my-4">
            <button className="cursor-pointer" onClick={handleOpenModal}>
              <Image
                src={fi_plus_add}
                width={52}
                height={52}
                alt="add button"
              />
            </button>
            <span className="text-sm text-neutral-900 mt-2 font-semibold">
              Add new
            </span>
          </div>
          <Modal
            open={openModal}
            onClose={handleOpenModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <span className="flex justify-between items-center">
                <p className="text-xl text-gray-900 font-bold mb-3">
                  Add new client
                </p>
                <buttton onClick={handleOpenModal} className="cursor-pointer">
                  <Image src={fi_x} alt="close button" />
                </buttton>
              </span>
              <section>
                <form className="my-3">
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
                </form>
                {/* Option two */}
                <div className="my-3"></div>
              </section>
            </Box>
          </Modal>
        </div>
        {/* three */}
        <div className="xl:col-span-3 lg:col-span-4 md:col-span-3 w-full  inline-block self-center mx-1  rounded-lg border-neutral-50 bg-white border-[1px] px-5 py-[30px] snap-center">
          <span className=" flex justify-between items-center border-b-[1px] border-gray-100">
            {" "}
            <span className="text-base text-neutral-700 uppercase font-bold">
              Account
            </span>
            <Link
              href="/dashboard/accounts"
              className="text-base text-[#5162FF] capitalize font-bold flex items-center gap-1"
            >
              <span> View all </span>
              <Image src={fi_arrow_up} width={20} height={20} alt="Arrow Up" />
            </Link>
          </span>
          <div className="flex items-center flex-col justify-center my-4">
            <button onClick={handleAccountModal} className="cursor-pointer">
              <Image
                src={fi_plus_add}
                width={52}
                height={52}
                alt="add button"
              />
            </button>
            <span className="text-sm text-neutral-900 mt-2 font-semibold">
              Add new
            </span>
            <Modal
              open={openAccountModal}
              onClose={handleAccountModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <span className="flex justify-between items-center">
                  <p className="text-xl text-gray-900 font-bold mb-3">
                    Add new bank account
                  </p>
                  <buttton
                    onClick={handleAccountModal}
                    className="cursor-pointer"
                  >
                    <Image src={fi_x} alt="close button" />
                  </buttton>
                </span>
                <section>
                  <form className="my-3">
                    <>
                      <p className="text-neutral-900 uppercase text-sm font-bold mb-3">
                        ACCOUNT INFO
                      </p>

                      {/* task */}
                      <div className="my-6">
                        <div className="my-3">
                          <label className="text-sm  text-neutral-600">
                            Bank
                            <Select
                              labelId="demo-select-small-label"
                              id="demo-select-small"
                              className="w-full px-2 border-[.5px] py-[-10px] border-neutral-300 rounded-lg focus:outline-blue-500"
                              value={bankName}
                              label="Bank Name"
                              onChange={handleBankChange}
                              inputProps={{ "aria-label": "Without label" }}
                              labelProps={{
                                className:
                                  "before:content-none after:content-none",
                              }}
                            >
                              <MenuItem value={1}>Access Bank</MenuItem>
                              <MenuItem value={2}>Zenith Bank</MenuItem>
                              <MenuItem value={3}>GTB</MenuItem>
                            </Select>
                          </label>
                        </div>
                        <div className="my-3">
                          <label className="text-sm  text-neutral-600">
                            Account number
                            <input
                              type="number"
                              className="w-full py-3 px-6 border-[1px] border-neutral-300 rounded-lg focus:outline-blue-500"
                              placeholder="Enter the client/business email "
                              required
                              value={accountNumber}
                              onChange={(e) => setAccountNumber(e.target.value)}
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
                  </form>
                  {/* Option two */}
                  <div className="my-3"></div>
                </section>
              </Box>
            </Modal>
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
                    <Link href="/dashboard/transactions"> view All </Link>
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
                    <Link href="/dashboard/transactions"> view All </Link>
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
