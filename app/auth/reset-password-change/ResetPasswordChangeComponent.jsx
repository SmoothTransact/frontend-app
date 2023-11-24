"use client";

import Image from "next/image";
import { useState } from "react";
import RightOnboard from "../../components/auth/RightOnboard";
import brandImg from "../../../public/brand_mobile.svg";
import Link from "next/link";
import fi_loader from "../../../public/fi_loader.svg";
import fi_check from "../../../public/fi_check.svg";
import open_eye from "../../../public/open_eye.svg";
import fi_eyeoff from "../../../public/fi_eyeoff.svg";
import { Typography } from "@material-tailwind/react";
export { Typography };
import TextInput from "@/app/components/Input";
import Button from "@/app/components/Button";
import error_outline from "../../../public/error_outline.svg";

export default function ResetPasswordChangeComponent() {
  const [isPending, setIsPending] = useState(false);
  const [verified, setVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setmessage] = useState("");
  const [matchPassword, setMatchPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleResetPasswordChange = (e) => {
    e.preventDefault();
    setIsPending(true);
    if (password !== confirmPassword) {
      setTimeout(() => {
        setMatchPassword("Password Does Not Match");
        setIsPending(false);
      }, 1000);
    } else {
      setTimeout(() => {
        console.log("verified");
        setIsPending(false);
        setVerified(true);
        setmessage("");
        setConfirmPassword("");
        setPassword("");
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
          <div className="px-6 flex justify-center flex-col lg:items-start items-center lg:min-h-screen mt-6 lg:py-0 py-16 w-auto ">
            <h2 className="lg:text-[40px] text-[32px] font-bold text-center text-gray-900">
              Reset your password
            </h2>

            <p className="my-3 text-gray-700  lg:text-lg text-base">
              Create a new password
            </p>

            <div className="flex lg:items-start items-start flex-col">
              <Typography
                variant="h5"
                className="text-neutral-600 text-sm text-left w-full my-5 relative"
              >
                Password
                <TextInput
                  variant="outlined"
                  value={password}
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                />
                <span
                  className="absolute right-3 top-[30px] cursor-pointer"
                  aria-label="toggle password visibility "
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Image
                      src={fi_eyeoff}
                      alt="Eye Icon"
                      className="w-[20px] h-[20px] my-3 "
                    />
                  ) : (
                    <Image
                      src={open_eye}
                      alt="Eye Icon"
                      className="w-[20px] h-[20px] my-3 "
                    />
                  )}
                </span>
                <p
                  className={
                    message
                      ? "flex items-start justify-start text-red-500 text-sm gap-2 mt-5"
                      : "hidden my-2"
                  }
                >
                  <Image src={error_outline} alt="loader" className="" />{" "}
                  {message}
                </p>
              </Typography>
              <Typography
                variant="h5"
                className="text-gray-600 text-sm text-left w-full my-5 relative"
              >
                Confirm password
                <TextInput
                  variant="outlined"
                  value={confirmPassword}
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter your new password"
                />
                <span
                  className="absolute right-3 top-[30px] cursor-pointer"
                  aria-label="toggle password visibility "
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Image
                      src={fi_eyeoff}
                      alt="Eye Icon"
                      className="w-[20px] h-[20px] my-3 "
                    />
                  ) : (
                    <Image
                      src={open_eye}
                      alt="Eye Icon"
                      className="w-[20px] h-[20px] my-3 "
                    />
                  )}
                </span>
              </Typography>
              <span>
                <p
                  className={
                    message
                      ? "flex items-center justify-start text-red-500 text-sm gap-2 mt-5"
                      : "hidden my-2"
                  }
                >
                  <Image src={error_outline} alt="loader" className="" />{" "}
                  {message}
                </p>
                {verified ? null : (
                  <p
                    className={
                      matchPassword
                        ? "flex items-center justify-start text-red-500 text-sm gap-2 mt-5"
                        : "hidden my-2"
                    }
                  >
                    <Image src={error_outline} alt="loader" className="" />{" "}
                    {matchPassword}
                  </p>
                )}
              </span>

              {verified ? (
                <span className="my-8">
                  <p className="text-green-500 flex text-left gap-2 items-start justify-start">
                    {" "}
                    <Image src={fi_check} alt="loader" className="" />
                    Password changed
                  </p>
                </span>
              ) : (
                <>
                  <Button
                    label={isPending ? "Resetting password..." : "Submit"}
                    onClick={handleResetPasswordChange}
                    variant="primary"
                    isLoading={isPending}
                  />
                </>
              )}

              {verified && (
                <Button
                  label="Proceed to log in"
                  // onClick={handleReset}
                  variant="secondary"
                  // isLoading={isPending}
                />
              )}
            </div>
          </div>
        </div>
      </section>
      <RightOnboard />
    </main>
  );
}
