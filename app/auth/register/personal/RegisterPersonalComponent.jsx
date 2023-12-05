"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Custom Component Import
import { useSignupPersonalMutation } from "@/app/utils/rtk/apiSlice";
import brandImg from "@/public/brand_mobile.svg";
import brand from "@/public/brand.svg";

import open_eye from "@/public/open_eye.svg";
import fi_eyeoff from "@/public/fi_eyeoff.svg";
import error_outline from "@/public/error_outline.svg";
import fi_check from "@/public/fi_check.svg";
import { Typography, Input, Card } from "@material-tailwind/react";
export { Typography, Input, Card };
import Button from "@/app/components/Button";
import google_logo from "@/public/assets/google_logo.svg";

export default function RegisterPersonalComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Loading State
  const [isPending, setIsPending] = useState(false);

  // Messages
  const [fullNameMessage, setFullNameMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [generalMessage, setGeneralMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  const [signupPersonal, { isLoading, error, data }] =
    useSignupPersonalMutation();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    const userData = {
      fullName,
      email,
      password,
    };

    if (!fullName || !email || !password) {
      setGeneralMessage("All inputs are required to signup");
      setEmailMessage("");
      setSuccessMessage("");
      setPasswordMessage("");
      setFullNameMessage("");
      setIsPending(false);
      return false;
    } else if (fullName.length < 3) {
      setFullNameMessage("Full Name must be more than 3 characters");
      setEmailMessage("");
      setSuccessMessage("");
      setPasswordMessage("");
      setGeneralMessage("");
      setIsPending(false);
      return false;
    } else if (password.length < 6) {
      setPasswordMessage("Password must be more than 6 characters");
      setFullNameMessage("");
      setEmailMessage("");
      setSuccessMessage("");
      setGeneralMessage("");
      setIsPending(false);
      return false;
    }

    if (
      error &&
      error.data.message.includes("User already exists") &&
      fullName.length > 3 &&
      password.length > 6
    ) {
      setEmailMessage(error.data.message);
      setPasswordMessage("");
      setSuccessMessage("");
      setFullNameMessage("");
      setGeneralMessage("");
      setIsPending(false);
    }
    if (error && error.data.message.includes("Internal server error")) {
      setGeneralMessage(error.data.message);
      setEmailMessage("");
      setFullNameMessage("");
      setPasswordMessage("");
      setSuccessMessage("");
      setIsPending(false);
    }

    try {
      const result = await signupPersonal(userData);
      if (await data) {
        setSuccessMessage(data.message);
        setEmailMessage("");
        setGeneralMessage("");
        setIsPending(false);
      }

      setSuccessMessage(result.data.message);

      setIsPending(false);
      setFullName("");
      setEmail("");
      setPassword("");
      router.push("/auth/login");
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
        <div className="lg:hidden">
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
            <p className="underline ">Personal User</p>
            <h2 className="lg:text-[40px] text-[32px] font-bold text-left text-gray-900">
              Crerate an account
            </h2>
            <span className="flex gap-1 items-center">
              {" "}
              <p className="my-3 text-neutral-700  lg:text-lg text-base">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-gray-900 underline  hover:text-light-blue-600"
                >
                  Sign in here.
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
                    Full name
                  </Typography>
                  <Input
                    size="lg"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your first and last name"
                    className=" input_component focus:ring-blue-600/1"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <Typography
                    className={
                      fullNameMessage
                        ? "flex items-center text-left justify-start text-red-500 text-sm gap-2"
                        : "hidden"
                    }
                  >
                    <Image src={error_outline} alt="loader" className="" />
                    {fullNameMessage}
                  </Typography>
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
                  <p
                    className={
                      emailMessage
                        ? "mt-3 flex items-center text-left justify-start text-red-500 text-sm gap-2"
                        : "mt-3 hidden"
                    }
                  >
                    <Image src={error_outline} alt="loader" className="" />{" "}
                    {emailMessage}
                  </p>
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
                      placeholder="Enter your preferred password"
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

                <span className="mb-2">
                  <p
                    className={
                      passwordMessage
                        ? "mt-3 flex items-center text-left justify-start text-red-500 text-sm gap-2"
                        : "mt-3 hidden"
                    }
                  >
                    <Image src={error_outline} alt="loader" className="" />
                    {passwordMessage}
                  </p>
                </span>
                <p
                  className={
                    successMessage
                      ? "mt-3 flex items-center text-left justify-start text-green-500 text-sm gap-2"
                      : "mt-3 hidden"
                  }
                >
                  <Image src={fi_check} alt="loader" className="" />
                  {successMessage}
                </p>
                <p
                  className={
                    generalMessage
                      ? " mt-3 flex items-center text-left justify-start text-red-500 text-sm gap-2"
                      : " mt-3 hidden"
                  }
                >
                  <Image src={error_outline} alt="loader" className="" />{" "}
                  {generalMessage}
                </p>
                <Button
                  label={isPending ? "Creating account..." : "Create account"}
                  onClick={handleRegisterSubmit}
                  variant="primary"
                  isLoading={isLoading || isPending}
                />

                <div className="flex justify-center flex-col items-center text-center">
                  {" "}
                  <p className="lg:my-8 my-2 text-base uppercase">OR</p>
                  <span className="flex items-center gap-1">
                    <Image src={google_logo} alt="google logo" />
                    <p className="text-lg text-gray-900 hover:text-light-blue-600 cursor-pointer">
                      Continue with Google
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
