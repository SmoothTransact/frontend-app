"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter, redirect } from "next/navigation";
import { useSelector } from "react-redux";
import axios from "axios";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import trans_empty_icon from "@/public/dashboard/trans_empty_icon.svg";
import fi_plus from "@/public/dashboard/fi_plus.svg";

import fi_loader from "@/public/fi_loader.svg";
import fi_check from "@/public/fi_check.svg";
import error_outline from "@/public/error_outline.svg";
import {
  dispatchClients,
  addClient,
  deleteClient,
} from "@/app/utils/redux/clientSlice";
import { useDispatch } from "react-redux";

function ClientsComponent({ user }) {
  const [getClients, setGetClients] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [generalMessage, setGeneralMessage] = useState(null);
  // const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpen(!open);
  const router = useRouter();
  const dispatch = useDispatch();

  const MySwal = withReactContent(Swal);

  // Users
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const token = useSelector((state) => state.user.accessToken);

  useEffect(() => {
    if (!token) {
      return redirect("/auth/login");
    }
  }, [token, router]);

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
      handleGetAllClients();
      setSuccessMessage("Client added successfully");
      // console.log("creating client", response.data);
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

  const handleDeleteClient = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${process.env.NEXT_PUBLIC_BASE_URL}clients/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          dispatch(deleteClient(id));
          handleGetAllClients();
          Swal.fire({
            title: "Deleted!",
            text: ` Deleted successfully.`,
            icon: "success",
          });

          // Refresh the client list after deletion
        } catch (error) {
          // Handle errors
          console.error(error);
        }
      }
    });
  };

  const handleClientEdit = (id) => {
    router.push(`/dashboard/clients/${id}`);
  };

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
    <main className="">
      <header className="  border-neutral-100 bg-neutral-50 z-50">
        <span className="flex justify-between items-center px-6 py-3  bg-white border-neutral-100 border-b-[1px]">
          <p className="text-lg font-bold">Overview</p>

          <button
            className="flex gap-2 items-center justify-center py-[10px] px-5 bg-neutral-900 text-neutral-50 rounded-full text-sm"
            onClick={handleOpen}
          >
            <Image src={fi_plus} alt="add button" width={20} height={20} />

            <span>Add new</span>
          </button>
        </span>
      </header>
      <section className="grid grid-cols-12 gap-5 justify-center px-6 py-12">
        {getClients?.length > 0 ? (
          [...getClients].reverse().map((user) => (
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

                <Menu
                  animate={{
                    mount: { y: 0 },
                    unmount: { y: 25 },
                  }}
                >
                  <MenuHandler>
                    <span className="cursor-pointer h-6">
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
                  </MenuHandler>
                  <MenuList>
                    <MenuItem
                      className="flex items-center gap-1 text-neutral-900 font-medium"
                      onClick={() => handleClientEdit(user.id)}
                    >
                      <svg
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.5 2.5009C14.7189 2.28203 14.9787 2.10842 15.2647 1.98996C15.5506 1.87151 15.8571 1.81055 16.1667 1.81055C16.4762 1.81055 16.7827 1.87151 17.0687 1.98996C17.3546 2.10842 17.6145 2.28203 17.8333 2.5009C18.0522 2.71977 18.2258 2.97961 18.3443 3.26558C18.4627 3.55154 18.5237 3.85804 18.5237 4.16757C18.5237 4.4771 18.4627 4.7836 18.3443 5.06956C18.2258 5.35553 18.0522 5.61537 17.8333 5.83424L6.58333 17.0842L2 18.3342L3.25 13.7509L14.5 2.5009Z"
                          stroke="#1D1D24"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>{" "}
                      Edit
                    </MenuItem>
                    <MenuItem
                      className="text-[#B11C1C] flex items-center gap-1 font-medium"
                      // onClick={() => handleDeleteClient(user.id)}
                      onClick={() => handleDeleteClient(user.id)}
                    >
                      <svg
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.8335 5H4.50016H17.8335"
                          stroke="#B11C1C"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M7 4.99935V3.33268C7 2.89065 7.17559 2.46673 7.48816 2.15417C7.80072 1.84161 8.22464 1.66602 8.66667 1.66602H12C12.442 1.66602 12.866 1.84161 13.1785 2.15417C13.4911 2.46673 13.6667 2.89065 13.6667 3.33268V4.99935M16.1667 4.99935V16.666C16.1667 17.108 15.9911 17.532 15.6785 17.8445C15.366 18.1571 14.942 18.3327 14.5 18.3327H6.16667C5.72464 18.3327 5.30072 18.1571 4.98816 17.8445C4.67559 17.532 4.5 17.108 4.5 16.666V4.99935H16.1667Z"
                          stroke="#B11C1C"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      Delete
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
              <p className="text-xs uppercase text-neutral-700 font-bold my-2">
                invoices
              </p>
              <div className="bg-neutral-100 mt-3 rounded-md flex flex-col"></div>
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
        </DialogBody>
      </Dialog>
    </main>
  );
}

export default ClientsComponent;
