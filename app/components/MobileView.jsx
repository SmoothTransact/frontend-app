"use client";

/* eslint-disable react/prop-types */
import Link from "next/link";
// import logo from "../assets/evaactive_logo.png";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { useLogoutMutation } from "@/app/utils/rtk/apiSlice";
import { useDispatch } from "react-redux";
import { dispatchLogout } from "@/app/utils/redux/userSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MobileView = ({ navbar, setNavbar }) => {
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    setIsPending(true);
    try {
      await logout();
      setNavbar(!navbar);
      dispatch(dispatchLogout());
      router.push("auth/login");
    } catch (er) {
      console.error(`${er.message}`);
      setIsPending(false);
    } finally {
      setIsPending(false);
    }
  };
  return (
    <div className="fixed top-0 left-0 z-50 h-[100vh] w-full lg:hidden block">
      <div className="relative">
        <div className="flex gap-6 items-center flex-col justify-center text-center bg-neutral-50 h-[100vh] ">
          <Link
            href="/dashboard"
            className={
              pathname == "/dashboard"
                ? " py-3 px-4  bg-neutral-900 text-neutral-50  rounded-[9px] flex items-center justify-start gap-2"
                : " text-neutral-900  py-3 px-4 hover:text-neutral-50 hover:rounded-[9px] hover:bg-neutral-900 flex items-center justify-start gap-2"
            }
          >
            {" "}
            Dashboard
          </Link>
          <Link
            href="/transactions"
            className={
              pathname == "/transactions"
                ? " py-3 px-4  bg-neutral-900 text-neutral-50 group rounded-[9px] flex items-center justify-start gap-2"
                : " text-neutral-900  py-3 px-4 hover:text-neutral-50 hover:rounded-[9px] hover:bg-neutral-900 flex items-center group justify-start gap-2"
            }
          >
            {" "}
            Transactions
          </Link>
          <Link
            href="/notifications"
            className={
              pathname == "/Notifications"
                ? " py-3 px-4  bg-neutral-900 text-neutral-50  rounded-[9px] flex items-center justify-start gap-2 group"
                : " text-neutral-900  py-3 px-4 hover:text-neutral-50 hover:rounded-[9px] hover:bg-neutral-900 flex items-center group justify-start gap-2"
            }
          >
            {" "}
            Notifications
          </Link>
          <Link
            href="/accounts"
            className={
              pathname == "/accounts"
                ? " py-3 px-4  bg-neutral-900 text-neutral-50  rounded-[9px] flex items-center justify-start gap-2 group"
                : " text-neutral-900  py-3 px-4 hover:text-neutral-50 hover:rounded-[9px] hover:bg-neutral-900 flex items-center group justify-start gap-2"
            }
          >
            {" "}
            Accounts
          </Link>
          <Link
            href="/clients"
            className={
              pathname == "/clients"
                ? " py-3 px-4  bg-neutral-900 text-neutral-50  rounded-[9px] flex items-center justify-start gap-2 group"
                : " text-neutral-900  py-3 px-4 hover:text-neutral-50 hover:rounded-[9px] hover:bg-neutral-900 flex group items-center justify-start gap-2"
            }
          >
            {" "}
            Clients
          </Link>
          <Link
            href="/invoices"
            className={
              pathname == "/invoices"
                ? " py-3 px-4  bg-neutral-900 text-neutral-50  rounded-[9px] flex items-center justify-start gap-2 group"
                : " text-neutral-900  py-3 px-4 hover:text-neutral-50 hover:rounded-[9px] hover:bg-neutral-900 group flex items-center justify-start gap-2"
            }
          >
            {" "}
            Invoices
          </Link>
          <Link
            href="/settings"
            className={
              pathname == "/settings"
                ? " py-3 px-4  bg-neutral-900 text-neutral-50  rounded-[9px] flex items-center justify-start gap-2"
                : " text-neutral-900  py-3 px-4 hover:text-neutral-50 hover:rounded-[9px] hover:bg-neutral-900 flex items-center justify-start gap-2"
            }
          >
            {" "}
            Settings
          </Link>
          <button
            onClick={handleLogout}
            className=" text-red-500  py-3 px-4 hover:text-neutral-50 hover:rounded-[9px] hover:bg-red-500 flex group items-center justify-start gap-2"
          >
            {" "}
            {isPending ? "Logging out" : "Logout"}
          </button>
        </div>
        {/* Mobile Nav */}
        <section className="text-center flex justify-center w-full">
          <div className="absolute top-2 right-1 p-4 cursor-pointer">
            <AiOutlineCloseCircle
              className="text-neutral-900 text-5xl hover:text-neutral-500 hover:scale-90"
              onClick={() => setNavbar(!navbar)}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default MobileView;
