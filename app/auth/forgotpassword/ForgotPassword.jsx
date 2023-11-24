"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Typography } from "@material-tailwind/react";
export { Typography };

import { useForgotpasswordMutation } from "@/app/utils/rtk/apiSlice";
import RightOnboard from "../../components/auth/RightOnboard";
import brandImg from "../../../public/brand_mobile.svg";
import fi_check from "../../../public/fi_check.svg";
import error_outline from "../../../public/error_outline.svg";
import TextInput from "@/app/components/Input";
import Button from "@/app/components/Button";

export default function ForgotPasswordComponent() {
  const [isPending, setIsPending] = useState(false);
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [generalMessage, setGeneralMessage] = useState("");

  const router = useRouter();

  const [forgotpassword, { isLoading, error, data }] =
    useForgotpasswordMutation();

  const handleForgotPassword = async () => {
    setIsPending(true);

    if (error) {
      setEmailMessage(error.data.message);
      setGeneralMessage("");
    }

    let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    setIsPending(true);
    if (!emailRegex.test(email)) {
      setEmailMessage("Kindly enter the right email");
      setIsPending(false);
    }

    const userData = {
      email,
    };
    try {
      const result = await forgotpassword(userData);
      if (await data) {
        setGeneralMessage(`${data.message}, and has been sent to your email`);
        setEmailMessage("");
        setIsPending(false);
      }

      setGeneralMessage(
        `${result.data.message}, and has been sent to your email`
      );
      setEmailMessage("");
      setIsPending(false);
      setEmail("");

      router.push("/auth/reset");
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
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                />
              </Typography>

              <p
                className={
                  generalMessage
                    ? "flex items-center text-left justify-start text-green-500 text-sm gap-2 mt-3"
                    : "hidden my-2"
                }
              >
                <Image src={fi_check} alt="loader" className="" />
                {generalMessage}
              </p>
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

              <Button
                label={isPending ? "Submiitting..." : "Submit"}
                onClick={handleForgotPassword}
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
