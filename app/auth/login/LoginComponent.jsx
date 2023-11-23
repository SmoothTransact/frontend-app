"use client";

import Image from "next/image";
import RightOnboard from "../../components/auth/RightOnboard";
import brandImg from "../../../public/brand_mobile.svg";
import Link from "next/link";
import open_eye from "../../../public/open_eye.svg";
import { Input, Typography } from "@material-tailwind/react";
import { useState } from "react";
import fi_eyeoff from "../../../public/fi_eyeoff.svg";
import error_outline from "../../../public/error_outline.svg";

export { Input, Typography };

export default function LoginComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState(false);
  const [message, setmessage] = useState("");

  return (
    <main className="onboardScreen">
      <section className="onboardScreenLeft">
        <div className="lg:max-w-[440px] mb-4 mt-0">
          <div className="lg:hidden md:hidden px-0 top-0 ">
            <Image
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
          <div className="px-6 flex justify-center flex-col items-center lg:min-h-screen mt-6 lg:py-0 py-16 w-auto ">
            <h2 className="lg:text-[40px] text-[32px] font-bold text-center text-gray-900">
              Sign in
            </h2>
            <span className="flex gap-1 items-center">
              {" "}
              <p className="my-3 text-gray-700  lg:text-lg text-base">
                New user?{" "}
                <Link href="/auth/register" className="text-gray-900 underline">
                  Create an account here
                </Link>{" "}
              </p>
            </span>

            <div className="flex justify-center items-center text-center flex-col">
              <Typography
                variant="h5"
                className="text-gray-600 text-sm text-left w-full my-3"
              >
                Email address
                <Input
                  variant="outlined"
                  type="text"
                  placeholder="Enter your email address"
                  className="border-[1.5px] !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-blue-600 mt-2 focus:!border-t-blue-600 focus:ring-blue-600/10"
                  labelProps={{
                    className: "hidden",
                  }}
                />
              </Typography>
              <Typography
                variant="h5"
                className="text-gray-600 text-sm text-left w-full my-3 relative"
              >
                New Password
                <Input
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter  new password"
                  className="border-[1.5px] !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-blue-600 mt-2 focus:!border-t-blue-600 focus:ring-blue-600/10"
                  labelProps={{
                    className: "hidden",
                  }}
                />
                <span
                  className="absolute right-3 top-[25px] cursor-pointer"
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
                      ? "flex items-center justify-start text-red-500 text-sm gap-2 my-2"
                      : "hidden my-2"
                  }
                >
                  <Image src={error_outline} alt="loader" className="" />{" "}
                  {message}
                </p>
              </Typography>
              <div className="flex justify-start items-start my-3 text-left w-auto">
                <Link href="/auth/resetpassword" className="text-left">
                  Forgot password?
                </Link>
              </div>

              <button className="onboardCreateButton">Sign in</button>
            </div>
          </div>
        </div>
      </section>
      <RightOnboard />
    </main>
  );
}
