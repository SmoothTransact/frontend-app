import Image from "next/image";
import React from "react";

import fi_check from "@/public/fi_check.svg";
import fi_x from "@/public/dashboard/fi_x.svg";
import error_outline from "@/public/error_outline.svg";
import fi_loader from "@/public/fi_loader.svg";

const ClientModalContent = ({
  handleCreateClient = { handleCreateClient },
  setFullName = { setFullName },
  fullName = { fullName },
  email = { email },
  setEmail = { setEmail },
  phone = { phone },
  setPhone = { setPhone },
  successMessage = { successMessage },
  generalMessage = { generalMessage },
  isLoading = { isLoading },
  onClick = { handleOpenModal },
}) => {
  return (
    <div>
      <span className="flex justify-between items-center">
        <p className="text-xl text-gray-900">Add new client</p>
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
    </div>
  );
};

export default ClientModalContent;
