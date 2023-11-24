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
import open_eye from "../../../public/open_eye.svg";
import fi_eyeoff from "../../../public/fi_eyeoff.svg";
import error_outline from "../../../public/error_outline.svg";
import Button from "@/app/components/Button";
import { useResetpasswordMutation } from "@/app/utils/rtk/apiSlice";
import { number } from "prop-types";

export default function ResetComponent() {
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [passwordMessage, setPasswordMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [generalMessage, setGeneralMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [otpMessage, setOtpMessage] = useState("");

  const [resetpassword, { isLoading, error, data }] =
    useResetpasswordMutation();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsPending(true);

    if (error && error.data.message.includes("Internal server error")) {
      setGeneralMessage(error.data.message);
      setEmailMessage("");
      setPasswordMessage("");
      setOtpMessage("");
      setPasswordMessage("");
      setSuccessMessage("");
      setIsPending(false);
    }

    let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    setIsPending(true);
    if (!emailRegex.test(email)) {
      setEmailMessage("Kindly enter the right email");
      setIsPending(false);
    }

    if (!newPassword || !email || !otp) {
      setGeneralMessage("All inputs are required to Reset Password");
      setEmailMessage("");
      setSuccessMessage("");
      setPasswordMessage("");
      setIsPending(false);
      return false;
    }

    if (otp.length < 6) {
      setOtpMessage("OTP must be 6 digits numbers only");
      setPasswordMessage("");
      setGeneralMessage("");
      setEmailMessage("");
      setSuccessMessage("");
      setErrorMessage("");
      setIsPending(false);
      return false;
    }
    if (newPassword.length < 6) {
      setPasswordMessage("Password must be more than 6 characters");
      setEmailMessage("");
      setOtpMessage("");
      setSuccessMessage("");
      setErrorMessage("");
      setIsPending(false);
      return false;
    }

    const userData = {
      email,
      otp,
      newPassword,
    };
    try {
      const result = await resetpassword(userData);
      if (await data) {
        setSuccessMessage(data.message);
        setErrorMessage("");
        setEmailMessage("");
        setOtpMessage("");
        setPasswordMessage("");
        setGeneralMessage("");
      }

      setSuccessMessage(result.data.message);

      setIsPending(false);
      setEmail("");
      setOtp("");
      setNewPassword("");
      router.push("/auth/login");
    } catch (er) {
      console.error(`${er.message}`);
      setIsPending(false);
    } finally {
      setIsPending(false);
    }
  };
  return (
    <main className="onboardScreen">
      <section className="onboardScreenLeft">
        <div className="lg:max-w-[470px] mb-4 mt-0">
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
          <div className="px-6 flex justify-center text-left flex-col lg:items-start items-center lg:min-h-screen mt-6 lg:py-0 py-16 w-auto ">
            <h2 className="lg:text-[40px] text-[32px] font-bold text-left text-gray-900">
              Reset your password
            </h2>

            <p className="my-3 text-gray-700 lg:text-left text-center max-w-[440px] lg:text-lg text-base">
              We have sent an OTP to your email address. Enter the OTP to reset.
            </p>

            <form className="flex lg:items-start items-start flex-col">
              <Typography
                variant="h5"
                className="text-gray-600 text-sm text-left w-full my-3"
              >
                Email address
                <TextInput
                  variant="outlined"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </Typography>
              <p
                className={
                  emailMessage
                    ? "flex items-center text-left justify-start text-red-500 text-sm gap-2 mt-3"
                    : "hidden my-2"
                }
              >
                <Image src={error_outline} alt="loader" className="" />{" "}
                {emailMessage}
              </p>
              <Typography
                variant="h5"
                className="text-neutral-600 text-sm text-left w-full my-5"
              >
                OTP
                <TextInput
                  variant="outlined"
                  type="number"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter your otp"
                />
              </Typography>
              <p
                className={
                  otpMessage
                    ? "flex items-center text-left justify-start text-red-500 text-sm gap-2 mt-3"
                    : "hidden my-2"
                }
              >
                <Image src={error_outline} alt="loader" className="" />{" "}
                {otpMessage}
              </p>
              <Typography
                variant="h5"
                className="text-neutral-600 text-sm text-left w-full my-5 relative"
              >
                New Password
                <TextInput
                  variant="outlined"
                  required
                  value={newPassword}
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setNewPassword(e.target.value)}
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
              <span className="mb-2">
                <p
                  className={
                    passwordMessage
                      ? "flex items-center text-left justify-start text-red-500 text-sm gap-2 mt-3"
                      : "hidden my-2"
                  }
                >
                  <Image src={error_outline} alt="loader" className="" />
                  {passwordMessage}
                </p>
              </span>

              <p
                className={
                  successMessage
                    ? "flex items-start text-left justify-start text-green-500 text-sm gap-2 mt-3"
                    : "hidden my-2"
                }
              >
                <Image src={fi_check} alt="loader" className="" />
                {successMessage}
              </p>
              <span className="mb-2">
                <p
                  className={
                    errorMessage
                      ? "flex items-center text-left justify-start text-red-500 text-sm gap-2 mt-3"
                      : "hidden my-2"
                  }
                >
                  <Image src={error_outline} alt="loader" className="" />
                  {errorMessage}
                </p>
              </span>
              <span className="mb-2">
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
              </span>

              <Button
                label={isPending ? "Resetting..." : "Reset Password"}
                onClick={handleResetPassword}
                variant="primary"
                isLoading={isLoading || isPending}
              />
            </form>
          </div>
        </div>
      </section>
      <RightOnboard />
    </main>
  );
}
