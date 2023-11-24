"use client";

import Image from "next/image";
import RightOnboard from "../../components/auth/RightOnboard";
import brandImg from "../../../public/brand_mobile.svg";
import Link from "next/link";
import open_eye from "../../../public/open_eye.svg";
import fi_eyeoff from "../../../public/fi_eyeoff.svg";
import error_outline from "../../../public/error_outline.svg";
import fi_check from "../../../public/fi_check.svg";
import { useState } from "react";
import { Typography } from "@material-tailwind/react";
export { Typography };
import TextInput from "@/app/components/Input";
import Button from "@/app/components/Button";
import { useSignupMutation } from "../../utils/rtk/apiSlice";
import { useRouter } from "next/navigation";

export default function RegisterComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [otherError, setOtherError] = useState("");
  const [notifyMessage, setNotifyMessage] = useState("");
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  const [signup, { isLoading, error, data }] = useSignupMutation();

  const handleRegister = async () => {
    setIsPending(true);

    const userData = {
      fullName,
      email,
      password,
    };

    if (error && error.data.message.includes("User already exists")) {
      setErr(error.data.message);
      setNotifyMessage("");
      setOtherError("");
    }
    if (error && error.data.message.includes("Internal server error")) {
      setOtherError(error.data.message);
      setErr("");
      setNotifyMessage("");
    }

    try {
      const result = await signup(userData);
      if (await data) {
        setNotifyMessage(data.message);
        setErr("");
        setOtherError("");
      }

      // console.log(result);
      setNotifyMessage(result.data.message);

      setIsPending(false);
      setFullName("");
      setEmail("");
      setPassword("");
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
        <div className="lg:max-w-[440px] mb-4 mt-0">
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
              }}
              priority
            />
          </div>
          <div className="px-6 flex justify-center flex-col lg:items-start items-center lg:min-h-screen mt-6 lg:py-0 py-16 w-auto ">
            <h2 className="lg:text-[40px] text-[32px] font-bold text-center text-gray-900">
              Create an account
            </h2>
            <span className="flex gap-1 items-center">
              {" "}
              <p className="my-3 text-gray-700  lg:text-lg text-base">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-gray-900 underline">
                  Sign in here
                </Link>{" "}
              </p>
            </span>

            <form
              className="flex lg:items-start items-start flex-col"
              onSubmit={handleRegister}
            >
              <Typography
                variant="h5"
                className="text-neutral-600 text-sm text-left w-full my-5"
              >
                Full name
                <TextInput
                  variant="outlined"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your first and last name"
                />
              </Typography>
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
                  err
                    ? "flex items-center text-left justify-start text-red-500 text-sm gap-2 mt-3"
                    : "hidden my-2"
                }
              >
                <Image src={error_outline} alt="loader" className="" /> {err}
              </p>
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
                  placeholder="Enter your preferred password"
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
                  otherError
                    ? "flex items-center text-left justify-start text-red-500 text-sm gap-2 mt-3"
                    : "hidden my-2"
                }
              >
                <Image src={error_outline} alt="loader" className="" />{" "}
                {otherError}
              </p>
              <Button
                label={isPending ? "Creating account..." : "Create account"}
                onClick={handleRegister}
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
