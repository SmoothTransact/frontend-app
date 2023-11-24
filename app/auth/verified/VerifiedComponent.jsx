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
import Button from "@/app/components/Button";
import TextInput from "@/app/components/Input";

export default function VerifiedComponent() {
  const [isPending, setIsPending] = useState(false);
  const [verified, setVerified] = useState(false);
  const [pin, setPin] = useState("");
  const [message, setmessage] = useState("");
  const handleVerified = (e) => {
    e.preventDefault();
    setIsPending(true);
    if (pin.length !== 6) {
      setTimeout(() => {
        setmessage("Incorrect pin");
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
        <div className="lg:max-w-[440px] mb-4 mt-0">
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
          <div className="px-6 flex justify-center flex-col lg:items-start items-center lg:min-h-screen mt-6 lg:py-0 py-16 w-auto ">
            <h2 className="lg:text-[40px] text-[32px] font-bold text-center text-gray-900">
              Verify your email
            </h2>

            <p className="my-3 text-gray-700  lg:text-lg text-base">
              We have sent a pin to jo*******@gmail.com
            </p>

            <div className="flex lg:items-start items-start flex-col">
              <Typography
                variant="h5"
                className="text-neutral-600 text-sm text-left w-full my-3"
              >
                Pin number
                <TextInput
                  variant="outlined"
                  type="number"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter pin here"
                />
              </Typography>

              <section>
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
                        label={isPending ? "Submitting ..." : "Submit"}
                        onClick={handleVerified}
                        variant="primary"
                        isLoading={isPending}
                      />
                    </>
                  )}
                </div>
                <Button
                  label="Send another pin"
                  // onClick={handleReset}
                  variant="secondary"
                  // isLoading={isPending}
                />
                <div className="my-10">
                  <p className="text-neutral-700 my-[10px]">Wrong email?</p>
                  <Link href="/auth/email" className="text-gray-900  my-[10px]">
                    Change your email here
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
      <RightOnboard />
    </main>
  );
}
