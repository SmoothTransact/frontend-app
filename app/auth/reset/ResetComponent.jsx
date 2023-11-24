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

export default function ResetComponent() {
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [err, setErr] = useState(""); //
  const [notifyMessage, setNotifyMessage] = useState("");

  const [resetpassword, { isLoading, error, data }] =
    useResetpasswordMutation();

  const handleResetPassword = async () => {
    setIsPending(true);

    if (error) {
      setErr(error.data.message);
      console.log(error);
      setNotifyMessage("");
    }

    const userData = {
      email,
      otp,
      newPassword,
    };
    try {
      const result = await resetpassword(userData);
      if (await data) {
        setNotifyMessage(data.message);
        setErr("");
      }

      setNotifyMessage(result.data.message);

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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </Typography>
              <Typography
                variant="h5"
                className="text-neutral-600 text-sm text-left w-full my-5"
              >
                OTP
                <TextInput
                  variant="outlined"
                  type="number"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter your otp"
                />
              </Typography>
              <Typography
                variant="h5"
                className="text-neutral-600 text-sm text-left w-full my-5 relative"
              >
                New Password
                <TextInput
                  variant="outlined"
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

              <p
                className={
                  notifyMessage
                    ? "flex items-start text-left justify-start text-green-500 text-sm gap-2 mt-3"
                    : "hidden my-2"
                }
              >
                <Image src={fi_check} alt="loader" className="" />
                {notifyMessage}
              </p>
              <p
                className={
                  err
                    ? "flex items-start text-left justify-start text-red-500 text-sm gap-2 mt-3"
                    : "hidden my-2"
                }
              >
                <Image src={error_outline} alt="loader" className="" /> {err}
              </p>

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
