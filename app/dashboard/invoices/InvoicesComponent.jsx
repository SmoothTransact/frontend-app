"use client";
import Image from "next/image";
import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { addInvoice } from "@/app/utils/redux/invoiceSlice";
import { Radio } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useRouter } from "next/navigation";
import dateFormat from "dateformat";

import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Chip,
  IconButton,
  Tooltip,
  DialogBody,
  DialogHeader,
  Dialog,
} from "@material-tailwind/react";
export { Card, CardHeader, Typography, CardBody, Chip, IconButton, Tooltip };

// import trans_empty_icon from "@/public/dashboard/trans_empty_icon.svg";
import trans_empty_icon from "@/public/dashboard/trans_empty_icon.svg";
import fi_plus from "@/public/dashboard/fi_plus.svg";
import fi_user_check from "@/public/dashboard/fi_user_check.svg";
import fi_user_plus from "@/public/dashboard/fi_user_plus.svg";
import fi_x from "@/public/dashboard/fi_x.svg";
import error_outline from "@/public/error_outline.svg";
import fi_loader from "@/public/fi_loader.svg";
import fi_check from "@/public/fi_check.svg";

const TABLE_HEAD = [
  "Client Name",
  "Invoice No.",
  "Amount",
  "Created",
  "Due",
  "Status",
  "",
];

function UserRow({ invoice, index }) {
  const isLast = index === invoice?.length - 1;
  const classes = isLast ? "p-4" : "p-4 ";

  return (
    <tr key={invoice.id}>
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
        <span className="flex items-center gap-3">
          <Typography
            variant="small"
            className="capitalize text-base font-semibold text-neutral-700"
          >
            {invoice?.invoice?.invoice.description}
          </Typography>
        </span>
      </td>
      <td className={classes}>
        <span className="flex items-center gap-3">
          <Typography
            variant="small"
            className={
              invoice?.invoice?.invoice.status === "paid"
                ? "text-green-400 capitalize text-base font-semibold"
                : invoice?.invoice?.invoice.status === "pending"
                  ? "text-[#C29C17] capitalize text-base font-semibold"
                  : "text-[#B11C1C] capitalize text-base font-semibold"
            }
          >
            {/* {currency(invoice?.invoice?.invoice.amount)} */}
            {formatNumber(invoice.invoice.invoice.amount)}
            {/* {formatCurrency(invoice.invoice.invoice.amount)} */}
          </Typography>
        </span>
      </td>

      <td className={classes}>
        <span className="flex items-center gap-3">
          <Typography
            variant="small"
            className="capitalize text-base font-semibold text-neutral-700"
          >
            {dateFormat(invoice?.invoice?.invoice.createdAt, "shortDate")}
          </Typography>
        </span>
      </td>
      <td className={classes}>
        <Typography
          variant="small"
          className="capitalize text-base font-semibold text-neutral-700"
        >
          {dateFormat(invoice?.invoice?.invoice.dueDate, "shortDate")}
        </Typography>
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

// const formatCurrency = () => (d) => {
//   return d.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
// };

const formatNumber = (number) => {
  const formattedNumber = (number / 100).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formattedNumber;
};

const InvoicesComponent = () => {
  // const formatCurrency = useMemo(
  //   () => (d) => {
  //     return d.toFixed(1).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  //   },
  //   []
  // );

  const [tabs, setTabs] = useState(1);
  const [selectInvoiceType, setSelectInvoiceType] = useState("existing");
  const [open, setOpen] = useState(false);

  const [isPending, setIsPending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [generalMessage, setGeneralMessage] = useState(null);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleOpen = () => setOpen(!open);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [clientId, setClientId] = useState("");

  const [dueDate, setDueDate] = useState("");
  const [clientFullName, setClientFullName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  // check for clients
  const clients = useSelector((state) => state.clients.clients);
  const token = useSelector((state) => state.user.accessToken);
  const invoices = useSelector((state) => state.invoices.invoices);

  const unpaidInvoices = invoices.filter((invoice) => {
    return invoice.invoice.invoice.status === "unpaid";
  });

  const paidInvoices = invoices.filter((invoice) => {
    return invoice.invoice.invoice.status === "paid";
  });

  const dueInvoices = invoices.filter((invoice) => {
    return invoice.invoice.invoice.status === "due";
  });

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

      // console.log("Invoice Created End");
      // console.log("response", response);

      setSuccessMessage("Invoice created successfully");
      // Assuming addClient is an action to update the state with the new invoice
      dispatch(addInvoice(response.data));
      resetForm();
      setIsLoading(false);

      setTimeout(() => {
        setOpen(false);
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

  const resetForm = () => {
    setDescription("");
    setAmount("");
    setDueDate("");
    setClientFullName("");
    setClientEmail("");
    setClientPhone("");
  };

  // useEffect(() => {
  //   handleGetAllClients();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
            All ({invoices?.length})
          </button>
          <button
            onClick={() => setTabs(2)}
            className={
              tabs === 2
                ? "text-lg font-bold underline underline-offset-[20px]"
                : "text-lg font-bold"
            }
          >
            Paid (0 )
          </button>
          <button
            onClick={() => setTabs(3)}
            className={
              tabs === 3
                ? "text-lg font-bold underline underline-offset-[20px]"
                : "text-lg font-bold"
            }
          >
            Pending ({unpaidInvoices?.length})
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
        {tabs === 1 &&
          (invoices?.length > 0 ? (
            <section>
              <Card className=" px-6 py-8 mb-8 shadow={false}">
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
                      {invoices?.length > 0 &&
                        invoices.map((item, index) => (
                          <UserRow invoice={item} index={index} key={item.id} />
                        ))}
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            </section>
          ) : (
            <>{Empty}</>
          ))}
        {tabs === 2 &&
          (paidInvoices.length > 0 ? (
            <section>
              {" "}
              <Card className=" px-6 py-8 mb-8 shadow={false}">
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
                      {invoices?.length > 0 &&
                        invoices
                          ?.filter(
                            (item) => item.invoice.invoice.status === "paid"
                          )
                          ?.map((item, index) => (
                            <UserRow
                              invoice={item}
                              index={index}
                              key={item.id}
                            />
                          ))}
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            </section>
          ) : (
            <>{Empty}</>
          ))}
        {tabs === 3 &&
          (unpaidInvoices.length > 0 ? (
            <section>
              {" "}
              <Card className=" px-6 py-8 mb-8 shadow={false}">
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
                      {invoices?.length > 0 &&
                        invoices
                          ?.filter(
                            (item) => item.invoice.invoice.status === "unpaid"
                          )
                          ?.map((item, index) => (
                            <UserRow
                              invoice={item}
                              index={index}
                              key={item.id}
                            />
                          ))}
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            </section>
          ) : (
            <>{Empty}</>
          ))}
        {tabs === 4 &&
          (dueInvoices.length > 0 ? (
            <section>
              {" "}
              <Card className=" px-6 py-8 mb-8 shadow={false}">
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
                      {invoices?.length > 0 &&
                        invoices
                          ?.filter(
                            (item) => item.invoice.invoice.status === "due"
                          )
                          ?.map((item, index) => (
                            <UserRow
                              invoice={item}
                              index={index}
                              key={item.id}
                            />
                          ))}
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            </section>
          ) : (
            <>{Empty}</>
          ))}
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
                    className={
                      isLoading
                        ? " disabled w-full mt-8  bg-gray-200 text-gray-900 rounded-full px-8 py-[14px] lg:text-lg text-base"
                        : "bg-neutral-900 text-neutral-50 py-[14px] px-8 rounded-full h-[54px] w-full mt-8"
                    }
                    onClick={createInvoice}
                  >
                    {isLoading ? (
                      <div className="flex justify-center items-center ">
                        <Image
                          src={fi_loader}
                          alt="loader"
                          className="animate-spin"
                        />
                        Sending...
                      </div>
                    ) : (
                      "Send now"
                    )}
                  </button>
                </div>
              </section>
            </div>
          </DialogBody>
        </Dialog>
      </div>
    </main>
  );
};

export default InvoicesComponent;
