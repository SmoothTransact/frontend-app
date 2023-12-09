"use client";

import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";

import { useSelector } from "react-redux";

import { Typography, Option } from "@material-tailwind/react";
export { Typography, Option };
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";

import dummyData from "../dummyData.json";

import trans_empty_icon from "@/public/dashboard/trans_empty_icon.svg";
import access_logo from "@/public/dashboard/access_logo.svg";
import fi_check from "@/public/fi_check.svg";
import fi_plus from "@/public/dashboard/fi_plus.svg";
import fi_x from "@/public/dashboard/fi_x.svg";
import error_outline from "@/public/error_outline.svg";
import fi_loader from "@/public/fi_loader.svg";

const AccountsComponent = () => {
  const data = dummyData.dummyData;
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [openAccountModal, setOpenAccountModal] = useState(false);
  const handleAccountModal = () => setOpenAccountModal(!openAccountModal);

  const [successMessage, setSuccessMessage] = useState("");
  const [generalMessage, setGeneralMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleBankChange = (event) => {
    setBankName(event.target.value);
  };

  const token = useSelector((state) => state.user.accessToken);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 2,
    minWidth: "360px",
    bgcolor: "background.paper",
    border: ".5px solid #f2f2f2",
    boxShadow: 24,
    p: 4,
  };

  const BANK_OPTIONS = [
    {
      label: "Select an option",
    },
    {
      value: "Access Bank",
      label: "Access Bank",
    },
    {
      value: "Zenith Bank",
      label: "Zenith Bank",
    },
    {
      value: "GTB",
      label: "GTB",
    },
  ];

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
    if (error.message === "Request failed with status code 401") {
      setGeneralMessage("Unauthorized! User not logged in");
      localStorage.clear();
      // Redirect to login page or handle authentication logic
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
    setTimeout(() => {
      setOpenAccountModal(false);
    }, 2000);
  };

  const handleCreateAccount = async (e) => {
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

      await makeApiRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}accounts`,
        userData
      );

      setSuccessMessage("Account added successfully");
      setGeneralMessage("");
      resetForm();
    } catch (error) {
      handleApiError(error);
    }
  };

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
        <span className="flex justify-between items-center px-6 py-3  bg-white border-neutral-100 border-b-[1px]">
          <p className="text-lg font-bold">Overview</p>

          <button
            onClick={handleAccountModal}
            className="flex gap-2 items-center justify-center py-[10px] px-5 bg-neutral-900 text-neutral-50 rounded-full text-sm"
          >
            {" "}
            <Image src={fi_plus} alt="Add Button" width={20} height={20} />
            <span>Add new</span>
          </button>
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
                            {BANK_OPTIONS.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
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
                          ? " disabled w-full mt-3  bg-gray-200 text-gray-900 rounded-full px-8 py-[14px] lg:text-lg text-base"
                          : "bg-neutral-900 text-neutral-50 py-[14px] px-8 rounded-full h-[54px] w-full mt-3"
                      }
                      onClick={handleCreateAccount}
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
