"use client";

import Image from "next/image";
import { useState } from "react";
import RightOnboard from "../../components/auth/RightOnboard";
import brandImg from "../../../public/brand_mobile.svg";
import Link from "next/link";
import { Typography } from "@material-tailwind/react";
export { Typography };
import fi_loader from "../../../public/fi_loader.svg";
import fi_check from "../../../public/fi_check.svg";
import error_outline from "../../../public/error_outline.svg";
import TextInput from "@/app/components/Input";
import Button from "@/app/components/Button";

export default function ResetPasswordComponent() {
  const [isPending, setIsPending] = useState(false);
  const [verified, setVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setmessage] = useState("");
  const handleResetPassword = (e) => {
    e.preventDefault();

    let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    setIsPending(true);
    if (!emailRegex.test(email)) {
      setTimeout(() => {
        setmessage("Incorrect Email");
        setIsPending(false);
      }, 1000);
    } else {
      setTimeout(() => {
        console.log("verified");
        setIsPending(false);
        setVerified(true);
        setEmail("");
        setmessage("");
      }, 3000);
    }
  };
  return (
    <main className="onboardScreen">
      <section className="onboardScreenLeft">
        <div className="lg:max-w-[470px] mb-4 mt-0">
          <div className="lg:hidden md:hidden  px-0 top-0 ">
            <Image
              // src="/brand_mobile.svg"
              src={brandImg}
              alt="Brand Image"
              className="dark:invert"
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
                top: "0",
              }}
              priority
            />
          </div>
          <div className="px-6 flex justify-center flex-col lg:items-start items-center lg:min-h-screen mt-6 lg:py-0 py-16 w-auto ">
            <h2 className="lg:text-[40px] text-[32px] font-bold text-center text-gray-900">
              Reset your password
            </h2>

            <p className="my-3 text-gray-700  lg:text-lg text-base">
              Enter your email to reset your password
            </p>

            <div className="flex lg:items-start items-start flex-col">
              <Typography
                variant="h5"
                className="text-neutral-600 text-sm text-left w-full my-5"
              >
                Email address
                <TextInput
                  variant="outlined"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                />
              </Typography>

              <p
                className={
                  message
                    ? "flex items-start text-left justify-start text-red-500 text-sm gap-2 mt-3"
                    : "hidden my-2"
                }
              >
                <Image src={error_outline} alt="loader" className="" />{" "}
                {message}
              </p>
              <div>
                {verified && (
                  <span className="">
                    <p className="text-green-500 mt-3 flex gap-2 items-start text-left justify-start text-sm">
                      {" "}
                      <Image src={fi_check} alt="loader" className="" />
                      Email link has been sent to your email address
                    </p>
                  </span>
                )}
              </div>
              <div className="flex items-center justify-center w-full">
                <Button
                  label={isPending ? "Submiitting..." : "Submit link"}
                  onClick={handleResetPassword}
                  variant="primary"
                  isLoading={isPending}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <RightOnboard />
    </main>
  );
}
