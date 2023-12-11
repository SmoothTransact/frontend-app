"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Input, Typography } from "@material-tailwind/react";
export { Card, Input, Typography };

import { useForgotpasswordMutation } from "@/app/utils/rtk/apiSlice";
import RightOnboard from "@/app/components/auth/RightOnboard";
import brandImg from "@/public/brand_mobile.svg";
import fi_check from "@/public/fi_check.svg";
import error_outline from "@/public/error_outline.svg";
import TextInput from "@/app/components/Input";
import Button from "@/app/components/Button";
import google_logo from "@/public/assets/google_logo.svg";
import brand from "@/public/brand.svg";

export default function ForgotPasswordComponent() {
  const [isPending, setIsPending] = useState(false);
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [generalMessage, setGeneralMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  const [forgotpassword, { isLoading, error, data }] =
    useForgotpasswordMutation();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsPending(true);

    let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    setIsPending(true);

    if (!emailRegex.test(email) && email !== "") {
      setGeneralMessage("Kindly enter the right email");
      setIsPending(false);
      return;
    }

    if (email === "") {
      setGeneralMessage("Email input cannot be empty");
      setIsPending(false);
    }

    if (error) {
      setEmailMessage(error.data.message);
      setGeneralMessage("");
      setIsPending(false);
    }

    const userData = {
      email,
    };
    try {
      const result = await forgotpassword(userData);
      if (await data) {
        setSuccessMessage(`${data.message}, and has been sent to your email`);
        setEmailMessage("");
        setGeneralMessage("");
        setIsPending(false);
      }

      setSuccessMessage(
        `${result.data.message}, and has been sent to your email`
      );
      setEmailMessage("");
      setGeneralMessage("");

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
              Reset your password
            </h2>
            <span className="flex gap-1 items-center"> </span>
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
                </div>
                <div className=" mt-2 flex items-start text-left "></div>
                <p
                  className={
                    successMessage
                      ? "flex items-center text-left justify-start text-green-500 text-sm gap-2"
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
                  label={isPending ? "Submtting..." : "Submit"}
                  onClick={handleForgotPassword}
                  variant="primary"
                  isLoading={isLoading || isPending}
                />
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
    // <main className="onboardScreen">
    //   <section className="onboardScreenLeft">
    //     <div className=" mb-4 mt-0">
    //       <div className="lg:hidden md:hidden  px-0 top-0 ">
    //         <Image
    //           // src="/brand_mobile.svg"
    //           src={brandImg}
    //           alt="Brand Image"
    //           className="dark:invert"
    //           sizes="100vw"
    //           style={{
    //             width: "100%",
    //             height: "auto",
    //             top: "0",
    //           }}
    //           priority
    //         />
    //       </div>
    //       <div className="px-6 flex justify-center flex-col lg:items-start items-center lg:min-h-screen mt-6 lg:py-0 py-16 w-auto ">
    //         <h2 className="lg:text-[40px] text-[32px] font-bold text-center text-gray-900">
    //           Reset your password
    //         </h2>

    //         <p className="my-3 text-gray-700  lg:text-lg text-base">
    //           Enter your email to reset your password
    //         </p>

    //         <Card color="transparent" shadow={false}>
    //           <Typography
    //             variant="h6"
    //             color="blue-gray"
    //             className="-mb-3 text-neutral-600 text-sm text-left "
    //           >
    //             Email address
    //           </Typography>
    //           <Input
    //             size="lg"
    //             type="email"
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}
    //             placeholder="Enter your email address"
    //             className=" input_component focus:ring-blue-600/1"
    //             labelProps={{
    //               className: "before:content-none after:content-none",
    //             }}
    //           />
    //         </Card>

    //         <div className="flex lg:items-start items-start flex-col">
    //           <Typography
    //             variant="h5"
    //             className="text-neutral-600 text-sm text-left w-full my-5"
    //           >
    //             Email address
    //             <TextInput
    //               variant="outlined"
    //               type="email"
    //               required
    //               value={email}
    //               onChange={(e) => setEmail(e.target.value)}
    //               placeholder="Enter your email address"
    //             />
    //           </Typography>

    //           <p
    //             className={
    //               generalMessage
    //                 ? "flex items-center text-left justify-start text-green-500 text-sm gap-2 mt-3"
    //                 : "hidden my-2"
    //             }
    //           >
    //             <Image src={fi_check} alt="loader" className="" />
    //             {generalMessage}
    //           </p>
    //           <p
    //             className={
    //               emailMessage
    //                 ? "flex items-center text-left justify-start text-red-500 text-sm gap-2 mt-3"
    //                 : "hidden my-2"
    //             }
    //           >
    //             <Image src={error_outline} alt="loader" className="" />{" "}
    //             {emailMessage}
    //           </p>

    //           <Button
    //             label={isPending ? "Submiitting..." : "Submit"}
    //             onClick={handleForgotPassword}
    //             variant="primary"
    //             isLoading={isLoading || isPending}
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    //   <RightOnboard />
    // </main>
  );
}
