"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Typography, Input, Card } from "@material-tailwind/react";
export { Typography, Input, Card };
import Button from "@/app/components/Button";

import { useLoginMutation } from "@/app/utils/rtk/apiSlice";
import { useDispatch } from "react-redux";
import {
  dispatchIsLogged,
  // dispatchUser,
  dispatchUserRefreshToken,
  dispatchUserToken,
} from "@/app/utils/redux/userSlice";
import { useRouter } from "next/navigation";

import open_eye from "@/public/open_eye.svg";
import fi_eyeoff from "@/public/fi_eyeoff.svg";
import brand from "@/public/brand.svg";
import brandImg from "@/public/mobile_screen_brand.svg";
import google_logo from "@/public/assets/google_logo.svg";
import fi_check from "@/public/fi_check.svg";
import error_outline from "@/public/error_outline.svg";

export default function LoginComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [generalMessage, setGeneralMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const [login, { isLoading, error, data }] = useLoginMutation();

  const handleLogin = async () => {
    setIsPending(true);

    if (!email || !password) {
      setGeneralMessage("All inputs are required to signin");
      setSuccessMessage("");
      setIsPending(false);
      return false;
    }

    if (data) {
      console.log("Status", data);
    }

    if (error) {
      setGeneralMessage(error.data.message);
      setSuccessMessage("");
      setIsPending(false);
    }

    const userData = {
      email,
      password,
    };
    try {
      const result = await login(userData);
      if (await data) {
        setSuccessMessage(data.message);
        setGeneralMessage("");
        setIsPending(false);
      }

      setSuccessMessage(result.data.message);
      setGeneralMessage("");
      localStorage.setItem(
        "token",
        JSON.stringify(result.data.data.accessToken)
      );
      // console.log("User data", result.data);
      dispatch(dispatchIsLogged());
      // dispatch(dispatchUser(result.data.data.wallet));
      dispatch(dispatchUserToken(result.data.data.accessToken));
      dispatch(dispatchUserRefreshToken(result.data.data.refreshToken));

      setIsPending(false);
      setEmail("");
      setPassword("");
      router.push("/dashboard");
    } catch (error) {
      console.error(error.message);
      setIsPending(false);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <main className="grid grid-cols-12 gap-2 min-h-screen box-border">
      <section className="col-span-12  lg:col-span-6">
        <div className="lg:hidden ">
          {" "}
          <Image
            src={brandImg}
            alt="brand"
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            priority
            className="w-full"
          />
        </div>
        {/* Main left section */}
        <div className="flex justify-center items-start px-3">
          <div className="flex justify-center box-border flex-col lg:items-start items-center lg:min-h-screen mt-6 lg:py-0 py-16 w-auto">
            <h2 className="lg:text-[40px] text-[32px] font-bold text-left text-gray-900">
              Sign in
            </h2>
            <span className="flex gap-1 items-center">
              {" "}
              <p className="my-3 text-neutral-700  lg:text-lg text-base">
                New user?{" "}
                <Link
                  href="/"
                  className="text-gray-900 underline hover:text-light-blue-600"
                >
                  Create an account here.
                </Link>{" "}
              </p>
            </span>
            <Card color="transparent" shadow={false}>
              <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-1 flex flex-col gap-6">
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="-mb-3 text-neutral-600 text-sm text-left "
                  >
                    Email address
                  </Typography>
                  <Input
                    size="lg"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className=" input_component focus:ring-blue-600/1"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="-mb-3 text-neutral-600 text-sm text-left"
                  >
                    Password
                  </Typography>
                  <span className="relative">
                    <Input
                      size="lg"
                      placeholder="Enter your password"
                      value={password}
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => setPassword(e.target.value)}
                      className=" input_component focus:ring-blue-600/1"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                    <span
                      className="absolute right-3 top-[4px] cursor-pointer"
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
                  </span>
                </div>
                <div className="mb-3 mt-6 flex items-start text-left ">
                  <Link
                    href="/auth/forgotpassword"
                    className="text-neutral-900 hover:text-neutral-700 hover:underline"
                  >
                    Forgot password?
                  </Link>
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
                      ? "flex items-center justify-start text-red-500 text-sm gap-2 my-2"
                      : "hidden my-2"
                  }
                >
                  <Image src={error_outline} alt="loader" className="" />{" "}
                  {generalMessage}
                </p>

                <Button
                  label={isPending ? "Signing in..." : "Sign in"}
                  onClick={handleLogin}
                  variant="primary"
                  isLoading={isLoading || isPending}
                />
                <div className="flex justify-center flex-col items-center text-center">
                  {" "}
                  <p className="lg:my-8 my-2 text-base uppercase">OR</p>
                  <span className="flex items-center gap-1">
                    <Image src={google_logo} alt="google logo" />
                    <p className="text-lg text-gray-900 cursor-pointer hover:text-light-blue-600">
                      I already have an account
                    </p>
                  </span>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </section>
      {/* Rigtht Brand */}
      <section className="hidden bg-gray-100 lg:flex lg:col-span-6 sticky right-0">
        <Image src={brand} alt="brand" />
      </section>
    </main>
  );
}
