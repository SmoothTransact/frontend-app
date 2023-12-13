"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import Image from "next/image";
import fi_loader from "@/public/fi_loader.svg";
import fi_check from "@/public/fi_check.svg";
import error_outline from "@/public/error_outline.svg";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ClientDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [generalMessage, setGeneralMessage] = useState(null);

  const pathname = usePathname();
  const parts = pathname.split("/");
  const clientId = parts[parts.length - 1];

  const clientDetails = useSelector((state) =>
    state.clients.clients.find((client) => client.id === clientId)
  );
  const token = useSelector((state) => state.user.accessToken);

  const [fullName, setFullName] = useState(clientDetails?.fullName || "");
  const [email, setEmail] = useState(clientDetails?.email || "");
  const [phone, setPhone] = useState(clientDetails?.phone || "");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      fullName,
      email,
      phone,
    };

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}clients/${clientId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setSuccessMessage("Client info updated successfully");
        setGeneralMessage(null);
        setIsLoading(false);
      }
      router.push("/dashboard/clients");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <main className="px-6 py-6 bg-neutral-50 min-h-screen flex justify-center">
      <section>
        <form className="my-3 max-w-2xl  bg-white shadow p-5 rounded-xl">
          <>
            <p className="text-neutral-900 uppercase text-sm font-bold mb-3">
              EDIT CLIENT INFO
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
                  ? " disabled w-full mt-3  bg-gray-200 text-gray-900 rounded-full px-8 py-[14px] lg:text-lg text-base"
                  : "bg-neutral-900 text-neutral-50 py-[14px] px-8 rounded-full h-[54px] w-full mt-3"
              }
              onClick={handleSubmit}
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
    </main>
  );
}
