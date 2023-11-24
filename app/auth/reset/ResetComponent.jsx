"use client";

import Image from "next/image";
import { useState } from "react";
import RightOnboard from "../../components/auth/RightOnboard";
import brandImg from "../../../public/brand_mobile.svg";
import Link from "next/link";
import { Typography } from "@material-tailwind/react";
export { Typography };
import TextInput from "@/app/components/Input";
import fi_check from "../../../public/fi_check.svg";
import error_outline from "../../../public/error_outline.svg";
import Button from "@/app/components/Button";

export default function ResetComponent() {
  const [isPending, setIsPending] = useState(false);
  const [verified, setVerified] = useState(false);
  const [pin, setPin] = useState("");
  const [message, setmessage] = useState("");
  const handleReset = (e) => {
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
          <div className="lg:hidden md:hidden px-0 top-0 ">
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
          <div className="px-6 flex justify-center text-left flex-col lg:items-start items-center lg:min-h-screen mt-6 lg:py-0 py-16 w-auto ">
            <h2 className="lg:text-[40px] text-[32px] font-bold text-left text-gray-900">
              Reset your password
            </h2>

            <p className="my-3 text-gray-700 lg:text-left text-center max-w-[440px] lg:text-lg text-base">
              We have sent a link to jo*****@gmail.com with a link to reset
              password.
            </p>

            {/* <div className="flex lg:justify-center lg:items-center lg:text-center justify-start items-start text-left flex-col"> */}
            <div className="flex lg:items-start items-start flex-col">
              <Typography
                variant="h5"
                className="text-gray-600 text-sm text-left w-full my-3"
              >
                Email address
                <TextInput
                  variant="outlined"
                  type="email"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="johnjoe@gmail.com"
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
                {verified ? (
                  <span className="my-8">
                    <p className="text-green-500 flex gap-2 items-center justify-center">
                      {" "}
                      <Image src={fi_check} alt="loader" className="" />
                      Verified
                    </p>
                  </span>
                ) : (
                  <>
                    <Button
                      label={isPending ? "Resending link..." : "Resend link"}
                      onClick={handleReset}
                      variant="primary"
                      isLoading={isPending}
                    />
                  </>
                )}
              </div>
              <Button
                label="Change email"
                // onClick={handleReset}
                variant="secondary"
                // isLoading={isPending}
              />
            </div>
          </div>
        </div>
      </section>
      <RightOnboard />
    </main>
  );
}
