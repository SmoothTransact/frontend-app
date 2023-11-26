"use client";

import React, { useState, useEffect } from "react";
import MobileSwitchLayout from "./MobileSwitchLayout";
import { usePathname } from "next/navigation";

const DashboardNavbar = () => {
  const pathname = usePathname();
  const [active, setActive] = useState(null);

  useEffect(() => {
    const handleActive = () => {
      let checker = pathname.replace("/dashboard/", "");
      setActive(checker);
    };
    handleActive();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <header className="border-neutral-100 bg-neutral-50">
      <MobileSwitchLayout />
      <nav className="xl:flex lg:flex pt-12 pb-5 md:hidden hidden px-6 border-b-[1px] gap-8 justify-between items-center">
        <div className="w-1/4">
          <p className="text-2xl text-neutral-900 font-semibold capitalize">
            {pathname === "/dashboard" ? "dashboard" : active}
          </p>
        </div>
        <div className="relative w-3/4">
          <input
            type="search"
            placeholder="Search"
            className="rounded-full w-full border-[1.5px] outline-none !border-neutral-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent text-base placeholder:text-neutral-600 focus:!border-blue-600 mt-2 focus:!border-t-blue-600 focus:bg-white focus:ring-blue-600/10  px-12 py-[14px] h-[44px]"
          />
          <span className="absolute left-4 top-6">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
                stroke="#72768F"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.5 17.5L13.875 13.875"
                stroke="#72768F"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </div>
      </nav>
    </header>
  );
};

export default DashboardNavbar;
