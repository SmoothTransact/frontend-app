"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Typography } from "@material-tailwind/react";
export { Typography };

import { useLoginMutation } from "@/app/utils/rtk/apiSlice";
import { useDispatch } from "react-redux";
import {
  dispatchIsLogged,
  dispatchUserRefreshToken,
  dispatchUserToken,
} from "@/app/utils/redux/userSlice";

import RightOnboard from "@/app/components/auth/RightOnboard";
import brandImg from "../../../public/brand_mobile.svg";
import open_eye from "../../../public/open_eye.svg";
import fi_eyeoff from "../../../public/fi_eyeoff.svg";
import fi_check from "../../../public/fi_check.svg";
import error_outline from "../../../public/error_outline.svg";
import TextInput from "@/app/components/Input";
import Button from "@/app/components/Button";

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

      dispatch(dispatchIsLogged());
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
          <div className="px-6 flex justify-center flex-col lg:items-start items-center lg:min-h-screen mt-6 lg:py-0 py-16 w-auto ">
            <h2 className="lg:text-[40px] text-[32px] font-bold text-left text-gray-900">
              Sign in
            </h2>
            <span className="flex gap-1 items-center">
              {" "}
              <p className="my-3 text-neutral-700  lg:text-lg text-base">
                New user?{" "}
                <Link href="/auth/register" className="text-gray-900 underline">
                  Create an account here
                </Link>{" "}
              </p>
            </span>

            <div className="flex lg:items-start items-start flex-col">
              <Typography
                variant="h5"
                className="text-neutral-600 text-sm text-left w-full my-5"
              >
                Email address
                <TextInput
                  variant="outlined"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                />
              </Typography>

              <Typography
                variant="h5"
                className="text-neutral-600 text-sm text-left w-full my-5 relative"
              >
                Password
                <TextInput
                  variant="outlined"
                  required
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
              </Typography>

              <div className="mb-3 mt-6 flex items-start text-left ">
                <Link href="/auth/forgotpassword">Forgot password?</Link>
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
            </div>
          </div>
        </div>
      </section>
      <RightOnboard />
    </main>
  );
}
