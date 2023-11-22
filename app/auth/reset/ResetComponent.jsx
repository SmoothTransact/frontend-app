"use client";

import Image from "next/image";
import { useState } from "react";
import RightOnboard from "../../components/auth/RightOnboard";
import brandImg from "../../../public/brand_mobile.svg";
import Link from "next/link";
import { Input, Typography } from "@material-tailwind/react";
export { Input, Typography };
import fi_loader from "../../../public/fi_loader.svg";
import fi_check from "../../../public/fi_check.svg";
import error_outline from "../../../public/error_outline.svg";

export default function ResetComponent() {
  const [isPending, setIsPending] = useState(false);
  const [verified, setVerified] = useState(false);
  const [pin, setPin] = useState("");
  const [message, setmessage] = useState("");
  const handleVerified = (e) => {
    e.preventDefault();
    setIsPending(true);
    if (pin.length !== 6) {
      setTimeout(() => {
        setmessage("Incorrect email");
        setIsPending(false);
      }, 1000);
    } else {
      setTimeout(() => {
        console.log("verified");
        setIsPending(false);
        setVerified(true);
        setmessage("");
      }, 3000);
    }
  };
  return (
    <main className="onboardScreen">
      <section className="onboardScreenLeft">
        <div className="lg:max-w-[470px] mb-4 mt-0">
          <div className="lg:hidden md:hidden sm:hidden px-0 top-0 ">
            <Image
              // src="/brand_mobile.svg"
              src={brandImg}
              alt="Brand Image"
              className="dark:invert"
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
              }}
              priority
            />
          </div>
          {/* <div className="px-6 flex justify-center flex-col items-center lg:min-h-screen w-auto "> */}
          <div className="px-6 flex justify-center flex-col items-center lg:min-h-screen mt-8 lg:py-0 py-20 w-auto ">
            <h2 className="lg:text-[40px] text-[32px] font-bold text-center text-gray-900">
              Reset your password
            </h2>

            <p className="my-3 text-gray-700  lg:text-lg text-base">
              We have sent a link to jo*****@gmail.com with a link to reset
              password.
            </p>

            <div className="flex justify-center items-center text-center flex-col">
              <Typography
                variant="h5"
                className="text-gray-600 text-sm text-left w-full my-3"
              >
                Email address
                <Input
                  variant="outlined"
                  type="email"
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="johnjoe@gmail.com"
                  className="border-[1.5px] !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-blue-600 mt-2 focus:!border-t-blue-600 focus:ring-blue-600/10"
                  labelProps={{
                    className: "hidden",
                  }}
                />
                <p
                  className={
                    message
                      ? "flex items-center justify-start text-red-500 text-sm gap-2 my-2"
                      : "hidden my-2"
                  }
                >
                  <Image src={error_outline} alt="loader" className="" />{" "}
                  {message}
                </p>
              </Typography>

              {verified ? (
                <span className="my-8">
                  <p className="text-green-500 flex gap-2 items-center justify-center">
                    {" "}
                    <Image src={fi_check} alt="loader" className="" />
                    Verified
                  </p>
                </span>
              ) : (
                <button
                  className={
                    isPending
                      ? "bg-[#A5A9C2] text-gray-100 lg:w-[440px] w-[294px] my-2 rounded-full px-8 py-[14px] lg:text-lg text-base "
                      : "onboardCreateButton"
                  }
                  onClick={handleVerified}
                >
                  {isPending ? (
                    <span className="flex items-center justify-center">
                      <Image
                        src={fi_loader}
                        alt="loader"
                        className="animate-spin"
                      />
                      Verifying...
                    </span>
                  ) : (
                    "Resend link"
                  )}
                </button>
              )}
              <button className="onboardSignInButton">Change email</button>
            </div>
          </div>
        </div>
      </section>
      <RightOnboard />
    </main>
  );
}
