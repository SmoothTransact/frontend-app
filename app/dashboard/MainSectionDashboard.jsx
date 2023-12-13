/* eslint-disable react/jsx-key */
"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import axios from "axios";
import dateFormat from "dateformat";
import { useDispatch } from "react-redux";

import emptyIcon from "@/public/dashboard/icon.svg";
import dummyData from "./dummyData.json";

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
export { Card, CardHeader, Typography, CardBody, Chip, IconButton, Tooltip };
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import Link from "next/link";
import { useSelector } from "react-redux";

import { useRouter } from "next/navigation";

// import TextInput from "../components/Input";

import fi_plus_add from "@/public/dashboard/fi_plus_add.svg";
import fi_wallet from "@/public/dashboard/fi_wallet.svg";
import fi_arrow_up from "@/public/dashboard/fi_arrow_up_right.svg";
import fi_check from "@/public/fi_check.svg";
import fi_x from "@/public/dashboard/fi_x.svg";
import error_outline from "@/public/error_outline.svg";
import fi_loader from "@/public/fi_loader.svg";
import fi_plus from "@/public/dashboard/fi_plus.svg";
import fi_user_check from "@/public/dashboard/fi_user_check.svg";
import fi_user_plus from "@/public/dashboard/fi_user_plus.svg";
import { addInvoice } from "../utils/redux/invoiceSlice";
import { dispatchUser } from "../utils/redux/userSlice";

const TABLE_HEAD = ["Name", "Amount", "Narration", "Date", "Status", ""];

function UserRow({ invoice, index }) {
  const isLast = index === invoice?.length - 1;
  const classes = isLast ? "p-4" : "p-4 ";

  return (
    <tr key={invoice?.id}>
      <td className={classes}>
        <div className="flex items-center gap-3">
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
        </div>
      </td>
      <td className={classes}>
        <div className="flex items-center gap-3">
          <Typography
            variant="small"
            className="capitalize text-base font-semibold text-neutral-700"
          >
            ₦{formatNumber(invoice?.invoice?.invoice?.amount)}
          </Typography>
        </div>
      </td>
      <td className={classes}>
        <div className="flex items-center gap-3">
          <Typography
            variant="small"
            className="capitalize text-base font-semibold text-neutral-700"
          >
            {invoice?.invoice?.invoice.description}
          </Typography>
        </div>
      </td>

      <td className={classes}>
        <div className="flex items-center gap-3">
          <Typography
            variant="small"
            className="capitalize text-base font-semibold text-neutral-700"
          >
            {dateFormat(invoice?.invoice?.invoice.createdAt, "shortDate")}
          </Typography>
        </div>
      </td>

      <td className={classes}>
        <span
          className={
            invoice?.invoice?.invoice.status === "paid"
              ? "text-green-400  text-sm uppercase font-semibold"
              : invoice?.invoice?.invoice.status === "pending"
                ? "text-[#C29C17]  text-sm uppercase font-semibold"
                : "text-[#B11C1C]  text-sm uppercase font-semibold py-2 px-3 rounded-full bg-red-50"
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

const MainSectionDashboard = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 2,
    width: "100%",
    maxWidth: "350px",
    bgcolor: "background.paper",
    border: ".5px solid #f2f2f2",
    boxShadow: 24,
    p: 4,
  };

  const [selectInvoiceType, setSelectInvoiceType] = useState("existing");
  const router = useRouter();
  const dispatch = useDispatch();

  // Modals States
  const [open, setOpen] = useState(false);
  const [openAccountModal, setOpenAccountModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleAccountModal = () => setOpenAccountModal(!openAccountModal);
  const handleOpen = () => setOpen(!open);
  const handleOpenModal = () => setOpenModal(!openModal);

  const data = dummyData.dummyData;

  // Message notifications
  const [successMessage, setSuccessMessage] = useState("");
  const [generalMessage, setGeneralMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Client Modal Inputs States
  const [fullName, setFullName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bankLists, setBankLists] = useState([]);

  const [userProfile, setUserProfile] = useState([]);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [clientId, setClientId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [clientFullName, setClientFullName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  // check for clients and wallet from the store
  const token = useSelector((state) => state.user.accessToken);
  const invoices = useSelector((state) => state.invoices.invoices);
  const clients = useSelector((state) => state.clients.clients);
  // const wallet = useSelector((state) => state.user.user);

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const getAllBankNames = async () => {
    try {
      const response = await axios.get("https://api.paystack.co/bank");

      if (Array.isArray(response.data.data)) {
        setBankLists(response.data.data);
      } else {
        console.error("Response data is not an array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching bank names:", error);
    }
  };

  useEffect(() => {
    getAllBankNames();
    // handleGetAllAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helper function to handle API requests
  const makeApiRequest = async (url, data) => {
    try {
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  };

  // Helper function to handle API errors
  const handleApiError = (error) => {
    if (
      error?.response?.data.message ===
      "Failed to resolve and save account details"
    ) {
      setGeneralMessage(
        "The account number does not match the associated bank name. Please review and verify the information"
      );
    } else if (
      error?.response?.data.message === "Account number already exists"
    ) {
      setGeneralMessage("Account is already added");
    } else if (error?.response?.data.message === "Unauthorized") {
      localStorage.clear();
      router.push("/auth/login");
    }
    setSuccessMessage("");
    setIsLoading(false);
  };

  // Helper function to reset form fields and messages
  const resetForm = () => {
    setBankName("");
    setAccountNumber("");
    setSuccessMessage("");
    setGeneralMessage("");
    setIsLoading(false);
  };

  const createAccount = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const userData = {
      bankName,
      accountNumber,
    };

    try {
      if (!bankName || !accountNumber) {
        setGeneralMessage("All inputs are required to add an account");
        setSuccessMessage("");
        setIsLoading(false);
        return false;
      }

      const response = await makeApiRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}accounts`,
        userData
      );

      dispatch(addAccount(response.data));

      setSuccessMessage(response.message);
      setGeneralMessage("");
      setTimeout(() => {
        setOpenAccountModal(false);
      }, 2000);
      resetForm();
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleBankChange = (event) => {
    setBankName(event.target.value);
  };

  const getProfile = async () => {
    try {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}users/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(dispatchUser(result.data.user));
      const walletBalanceAmount = parseFloat(
        result?.data?.user?.wallet?.balance?.amount
      );
      setUserProfile(walletBalanceAmount);

      // setIsPending(false);
    } catch (error) {
      console.error(`${error.message}`);
    }
  };

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Create Invoice
  const createInvoice = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const url = selectInvoiceType === "existing" ? `?clientId=${clientId}` : "";

    // console.log("Invoice Created");

    try {
      const userData =
        selectInvoiceType === "existing"
          ? { description, amount, dueDate }
          : {
              description,
              amount,
              dueDate,
              clientFullName,
              clientEmail,
              clientPhone,
            };

      if (Object.keys(userData).length === 0) {
        setGeneralMessage("All inputs are required to add an invoice");
        setSuccessMessage("");
        setIsLoading(false);
        return false;
      }
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}invoices${url}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage("Invoice created successfully");
      // Assuming addClient is an action to update the state with the new invoice
      dispatch(addInvoice(response.data));
      resetForm();
      setIsLoading(false);
      setOpen(false);
      setTimeout(() => {
        setOpen(!open);
      }, 2000);
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const handleErrorResponse = (error) => {
    if (error.message === "Request failed with status code 401") {
      handleUnauthorizedError();
    } else {
      setSuccessMessage("");
      setIsLoading(false);
    }
  };

  const handleUnauthorizedError = () => {
    setGeneralMessage("Unauthorized! User not logged in");
    localStorage.clear();
    router.push("/auth/login");
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
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}clients`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage("Client added successfully");
      // console.log("creating client", response.data);
      dispatch(addClient(response.data));
      setTimeout(() => {
        setSuccessMessage("Client added successfully");
        setOpenModal(false);
      }, 2000);
      setGeneralMessage("");
      setFullName("");
      setEmail("");
      setPhone("");
      setIsLoading(false);
    } catch (error) {
      if (error?.response?.data.message === "Client profile already exists") {
        setGeneralMessage("Client profile already exists");
        setIsLoading(false);
      } else if (error.message === "Request failed with status code 401") {
        setGeneralMessage("Unauthorized! User not logged in");
        setIsLoading(false);
        localStorage.clear();
        return router.push("/auth/login");
      }
      setSuccessMessage("");
      setIsLoading(false);
    }
  };

  // Invoice Render Section
  const renderClientInfo = () => (
    <>
      <p className="text-neutral-900 uppercase text-sm font-bold mb-3">
        CLIENT&apos;S INFO
      </p>
      {selectInvoiceType === "existing" ? (
        <section>
          <label className="text-sm text-neutral-600">
            Client
            <select
              className="w-full py-3 px-3 border-[1px] border-neutral-300 rounded-lg focus:outline-blue-500"
              value={clientId}
              onChange={handleInputChange(setClientId)}
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
      ) : (
        <>
          <label className="text-sm text-neutral-600 mb-2">
            Client&apos;s name{" "}
            <input
              type="text"
              className="w-full py-3 px-6 border-[1px] border-neutral-300 rounded-lg focus:outline-blue-500"
              placeholder="Enter the client's name"
              value={clientFullName}
              onChange={handleInputChange(setClientFullName)}
              required
            />
          </label>
          <div className="my-3">
            <label className="text-sm text-neutral-600">
              Email address
              <input
                type="email"
                className="w-full py-3 px-6 border-[1px] border-neutral-300 rounded-lg focus:outline-blue-500"
                placeholder="Enter the email address"
                value={clientEmail}
                onChange={handleInputChange(setClientEmail)}
                required
              />
            </label>
          </div>
          <div className="my-3">
            <label className="text-sm text-neutral-600">
              Phone number
              <input
                type="number"
                className="w-full py-3 px-6 border-[1px] border-neutral-300 rounded-lg focus:outline-blue-500"
                placeholder="Enter the phone number"
                value={clientPhone}
                onChange={handleInputChange(setClientPhone)}
                required
              />
            </label>
          </div>
        </>
      )}
    </>
  );

  const renderTaskInfo = () => (
    <div className="my-8">
      <p className="text-neutral-900 uppercase text-sm font-bold mb-3">
        TASK INFO
      </p>
      <div className="my-3">
        <label className="text-sm text-neutral-600">
          Task name
          <input
            type="text"
            className="w-full py-3 px-6 border-[1px] border-neutral-300 rounded-lg focus:outline-blue-500"
            placeholder="Enter the name of the task"
            value={description}
            onChange={handleInputChange(setDescription)}
            required
          />
        </label>
      </div>
      <div className="my-3">
        <label className="text-sm text-neutral-600">
          Amount charged
          <input
            type="number"
            className="w-full py-3 px-6 border-[1px] border-neutral-300 rounded-lg focus:outline-blue-500"
            placeholder="Enter the amount for this task"
            value={amount}
            onChange={handleInputChange(setAmount)}
            required
          />
        </label>
      </div>
    </div>
  );

  const renderTimeline = () => (
    <div className="my-4">
      <p className="text-neutral-900 uppercase text-sm font-bold mb-3">
        TIMELINE
      </p>
      <label className="text-sm text-neutral-600">
        Due Date
        <input
          type="date"
          value={dueDate}
          onChange={handleInputChange(setDueDate)}
          placeholder="Enter the name of the task"
          className="w-full py-3 px-6 border-[1px] border-neutral-300 rounded-lg focus:outline-blue-500"
          required
        />
      </label>
    </div>
  );

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
                    {renderClientInfo()}
                    {renderTaskInfo()}
                    {renderTimeline()}
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
                    <button
                      className={`${
                        isLoading
                          ? "disabled w-full mt-8 bg-gray-200 text-gray-900 rounded-full px-8 py-[14px] lg:text-lg text-base"
                          : "bg-neutral-900 text-neutral-50 py-[14px] px-8 rounded-full h-[54px] w-full mt-8"
                      }`}
                      onClick={createInvoice}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex justify-center items-center">
                          <Image
                            src={fi_loader}
                            alt="loader"
                            className="animate-spin"
                          />
                          Sending...
                        </div>
                      ) : (
                        "Send Now"
                      )}
                    </button>
                  </div>
                  {/* Option two */}
                </section>
              </div>
            </DialogBody>
          </Dialog>
        </span>
      </header>

      {/* ----------------------------------------------- Sample -----------------------------------------------*/}

      <div className="mx-auto py-[17px] px-2">
        {/* Slide-in Children on Mobile Screens */}
        <div className="  mt-4 overflow-x-scroll scroll-smooth whitespace-nowrap snap-x snap-mandatory scrollbar-hide mx-auto py-[17px] px-3">
          <div className="flex lg:grid lg:grid-cols-12 lg:gap-3 sm:flex">
            <div className="min-w-full p-4 inline-block xl:col-span-3 lg:col-span-4 md:col-span-4 snap-center mx-1  rounded-lg border-neutral-50 bg-white border-[1px] px-5 py-[30px]">
              <div>
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
                  <p className="text-3xl text-neutral-900 font-bold">
                    ₦{formatNumber(userProfile)}
                  </p>
                  <p className="text-sm text-neutral-700 font-bold flex items-center gap-2 my-4">
                    <span>Wallet:</span>
                    <Image
                      src={fi_wallet}
                      width={20}
                      height={20}
                      alt="Arrow Up"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="min-w-full p-4 inline-block xl:col-span-6 lg:col-span-4 md:col-span-4 snap-center mx-1  rounded-lg border-neutral-50 bg-white border-[1px] px-5 py-[30px]">
              <div>
                <span className=" flex justify-between items-center border-b-[1px] border-gray-100">
                  {" "}
                  <span className="text-base text-neutral-700 uppercase font-bold">
                    Clients
                  </span>
                  <button className="text-base cursor-pointer text-[#5162FF] capitalize font-bold flex items-center gap-1">
                    <Link href="dashboard/clients"> View all </Link>
                    <Image
                      src={fi_arrow_up}
                      width={20}
                      height={20}
                      alt="Arrow Up"
                    />
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
                      <buttton
                        onClick={handleOpenModal}
                        className="cursor-pointer"
                      >
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
                            <Image
                              src={error_outline}
                              alt="loader"
                              className=""
                            />
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
            <div className="min-w-full p-4 inline-block xl:col-span-3 lg:col-span-4 md:col-span-4 snap-center mx-1  rounded-lg border-neutral-50 bg-white border-[1px] px-5 py-[30px]">
              <div>
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
                    <Image
                      src={fi_arrow_up}
                      width={20}
                      height={20}
                      alt="Arrow Up"
                    />
                  </Link>
                </span>
                <div className="flex items-center flex-col justify-center my-4">
                  <button
                    onClick={handleAccountModal}
                    className="cursor-pointer"
                  >
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
                        <p className="lg:text-xl text-sm text-gray-900 font-bold mb-3">
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
                                  <select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    // className="w-full !px-2  !border-neutral-300 !rounded-lg !focus:outline-blue-500"
                                    className="w-full py-3 px-6 border-[1px] border-neutral-300 rounded-lg focus:outline-blue-500"
                                    value={bankName}
                                    label="Bank Name"
                                    onChange={handleBankChange}
                                    // inputProps={{ "aria-label": "Without label" }}
                                    labelProps={{
                                      className:
                                        "before:content-none after:content-none",
                                    }}
                                  >
                                    {bankLists?.map((option) => (
                                      <option
                                        key={option.id}
                                        value={option.name}
                                      >
                                        {option.name}
                                      </option>
                                    ))}
                                  </select>
                                </label>
                              </div>
                              <div className="my-3">
                                <label className="text-sm  text-neutral-600">
                                  Account number
                                  <input
                                    type="number"
                                    className="w-full py-3 px-6 border-[1px] border-neutral-300 rounded-lg focus:outline-blue-500"
                                    placeholder="Enter account number"
                                    required
                                    value={accountNumber}
                                    onChange={(e) =>
                                      setAccountNumber(e.target.value)
                                    }
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
                              <Image
                                src={error_outline}
                                alt="loader"
                                className=""
                              />
                              {generalMessage}
                            </p>

                            <button
                              className={
                                isLoading
                                  ? " disabled w-full mt-3  bg-gray-200 text-gray-900 rounded-full px-8 py-[14px] lg:text-lg text-base"
                                  : "bg-neutral-900 text-neutral-50 py-[14px] px-8 rounded-full h-[54px] w-full mt-3"
                              }
                              onClick={createAccount}
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
                      </section>
                    </Box>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ----------------------------------------------- Sample -----------------------------------------------*/}

      {/* Filtered Paid Results */}

      {/* header */}
      <section>
        {invoices.length > 0 ? (
          <>
            <Card className=" mx-5 px-6 py-8 mb-8 shadow={false}">
              <CardHeader floated={false} shadow={false} className="">
                <span className=" flex justify-between items-center mb-6">
                  {" "}
                  <span className="text-lg text-neutral-900 capitalize font-bold">
                    Recently{" "}
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
                    {invoices.length > 0 &&
                      invoices?.map((item, index) => (
                        <UserRow invoice={item} index={index} />
                      ))}
                  </tbody>
                </table>
              </CardBody>
            </Card>

            {/* Filtered pending Results */}

            {/* header */}

            {/* <Card className=" mx-5 px-6 py-8 mb-8 shadow={false}">
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
            </Card> */}
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
