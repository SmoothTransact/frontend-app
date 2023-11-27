"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Custom Component Import
import { useSignupPersonalMutation } from "../../../utils/rtk/apiSlice";
import brandImg from "../../../../public/brand_mobile.svg";
import open_eye from "../../../../public/open_eye.svg";
import fi_eyeoff from "../../../../public/fi_eyeoff.svg";
import error_outline from "../../../../public/error_outline.svg";
import fi_check from "../../../../public/fi_check.svg";
import { Typography } from "@material-tailwind/react";
export { Typography };
import TextInput from "@/app/components/Input";
import Button from "@/app/components/Button";
import RightOnboard from "../../../components/auth/RightOnboard";

export default function RegisterPersonalComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Loading State
  const [isPending, setIsPending] = useState(false);

  // Messages
  const [emailMessage, setEmailMessage] = useState("");
  const [generalMessage, setGeneralMessage] = useState("");
  const [fullNameMessage, setFullNameMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

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
    <main className="onboardScreen">
      <section className="onboardScreenLeft">
        <div className="lg:max-w-[440px] mb-4 mt-0">
          <div className="lg:hidden md:hidden  px-0 top-0 ">
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
            <p className="underline">Personal User</p>
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
              onSubmit={handleRegisterSubmit}
            >
              <Typography
                variant="h5"
                className="text-neutral-600 text-sm text-left w-full my-5"
              >
                Full name
                <TextInput
                  variant="outlined"
                  required
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your first and last name"
                />
              </Typography>
              <p
                className={
                  fullNameMessage
                    ? "flex items-center text-left justify-start text-red-500 text-sm gap-2 mt-3"
                    : "hidden my-2"
                }
              >
                <Image src={error_outline} alt="loader" className="" />
                {fullNameMessage}
              </p>
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
                className="text-neutral-600 text-sm text-left w-full my-5 relative"
              >
                Password
                <TextInput
                  required
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
                    ? "flex items-center text-left justify-start text-red-500 text-sm gap-2 mt-3"
                    : "hidden my-2"
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
              <div className="flex justify-center flex-col items-center text-center min-w-[460px]">
                {" "}
                <p className="lg:my-8 my-2 text-base uppercase">OR</p>
                <span className="flex items-center gap-1">
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 20 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.1933 11.4866L16.2896 10.9049H15.7H10.6957V8.63932H18.9225C18.9744 9.01578 19 9.37679 19 9.72266C19 11.4386 18.6335 12.9524 17.9121 14.2768C17.192 15.5986 16.1683 16.6296 14.8314 17.3759C13.4969 18.1208 11.9564 18.5 10.1957 18.5C8.93906 18.5 7.7464 18.2631 6.61355 17.7902C5.47303 17.3141 4.49641 16.6741 3.67784 15.872C2.85935 15.0701 2.20717 14.1142 1.72231 12.9992C1.24087 11.892 1 10.7271 1 9.5C1 8.27291 1.24087 7.10801 1.72231 6.00081C2.20717 4.88577 2.85935 3.92994 3.67784 3.12797C4.49641 2.32592 5.47303 1.6859 6.61355 1.20978C7.7464 0.736865 8.93906 0.5 10.1957 0.5C12.4119 0.5 14.3236 1.16688 15.952 2.50161L14.0465 4.29723C12.9758 3.42992 11.6837 3.00065 10.1957 3.00065C9.02336 3.00065 7.93272 3.29121 6.93333 3.87248C5.9373 4.4518 5.14515 5.24136 4.56293 6.23522C3.97837 7.23308 3.68638 8.32462 3.68638 9.5C3.68638 10.6754 3.97837 11.7669 4.56293 12.7648C5.14515 13.7586 5.9373 14.5482 6.93333 15.1275C7.93272 15.7088 9.02336 15.9993 10.1957 15.9993C10.9731 15.9993 11.6988 15.8942 12.3689 15.6784C13.0209 15.4684 13.5795 15.1988 14.0307 14.8602C14.4608 14.5374 14.838 14.1682 15.1607 13.7526C15.4748 13.3481 15.718 12.9504 15.8785 12.5598C16.0291 12.1929 16.1357 11.8349 16.1933 11.4866Z"
                      fill="black"
                      stroke="#0F0F0F"
                    />
                  </svg>
                  <p className="text-lg text-gray-900">Continue with Google</p>
                </span>
              </div>
            </form>
          </div>
        </div>
      </section>
      <RightOnboard />
    </main>
  );
}
