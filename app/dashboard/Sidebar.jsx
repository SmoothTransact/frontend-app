"use client";

/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import black_logo from "@/public/black_logo.svg";
import { usePathname } from "next/navigation";
// import { useLogoutMutation } from "@/app/utils/rtk/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { dispatchLogout } from "@/app/utils/redux/userSlice";
import { useRouter } from "next/navigation";
import axios from "axios";

const Sidebar = () => {
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const token = useSelector((state) => state.user.accessToken);

  // const [logout] = useLogoutMutation();

  useEffect(() => {
    if (!token) {
      router.push("/auth/login");
      dispatch(dispatchLogout());
      localStorage.clear();
    }
  }, [token, router, dispatch]);

  const handleLogout = async () => {
    setIsPending(true);

    try {
      await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}auth/signout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(dispatchLogout());
      localStorage.clear();
      router.push("/auth/login");
      setIsPending(false);
    } catch (error) {
      console.log(`error is: ${error.message}`);
      if (error === "Request failed with status code 401") {
        dispatch(dispatchLogout());
        localStorage.clear();
        router.push("/auth/login");
        setIsPending(false);
      }
    }
  };

  // const handleLogout = async () => {
  //   setIsPending(true);
  //   try {
  //     await logout();
  //     dispatch(dispatchLogout());
  //     localStorage.clear();
  //     router.push("/auth/login");
  //     redirect("/auth/login");
  //   } catch (er) {
  //     console.error(`${er.message}`);
  //     setIsPending(false);
  //   } finally {
  //     setIsPending(false);
  //   }
  // };
  return (
    <aside className="  bg-neutral-50  text-gray-900 h-auto md:h-auto lg:h-screen xl:h-screen lg:mb-0 mb-6 px-4 py-12 sticky left-0 top-0 border-r-[1px] border-neutral-100">
      <section className="lg:block hidden">
        <div href="/" className="">
          <Image
            src={black_logo}
            alt="Smmoth Contract Logo"
            width={146}
            height={60}
            className="w-[146px] h-[60px]"
          />
        </div>

        <nav className="mt-4 space-y-2 p-5">
          <Link
            href="/dashboard"
            className={
              pathname == "/dashboard"
                ? " py-3 px-4  bg-neutral-900 text-neutral-50 group rounded-[9px] flex items-center justify-start gap-2"
                : " text-neutral-900  py-3 px-4 hover:text-neutral-50 hover:rounded-[9px] hover:bg-neutral-900 flex items-center group justify-start gap-2"
            }
          >
            <span
              className={pathname == "/dashboard" && " block group-hover:block"}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.75 10.5H10.5V15.75H15.75V10.5Z"
                  stroke={pathname == "/dashboard" ? "#ffffff" : "#56586B"}
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.5 10.5H2.25V15.75H7.5V10.5Z"
                  stroke={pathname == "/dashboard" ? "#ffffff" : "#56586B"}
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.75 2.25H10.5V7.5H15.75V2.25Z"
                  stroke={pathname == "/dashboard" ? "#ffffff" : "#56586B"}
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.5 2.25H2.25V7.5H7.5V2.25Z"
                  stroke={pathname == "/dashboard" ? "#ffffff" : "#56586B"}
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>

            <span className="">Dashboard</span>
          </Link>
          <Link
            href="/dashboard/transactions"
            className={
              pathname == "/dashboard/transactions"
                ? " py-3 px-4  bg-neutral-900 text-neutral-50 group rounded-[9px] flex items-center justify-start gap-2"
                : " text-neutral-900  py-3 px-4 hover:text-neutral-50 hover:rounded-[9px] hover:bg-neutral-900 flex items-center group justify-start gap-2"
            }
          >
            {" "}
            <span
              className={
                pathname == "/dashboard/transactions" &&
                " block group-hover:block"
              }
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.5 15V12"
                  stroke={
                    pathname == "/dashboard/transactions"
                      ? "#ffffff"
                      : "#56586B"
                  }
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 15V7.5"
                  stroke={
                    pathname == "/dashboard/transactions"
                      ? "#ffffff"
                      : "#56586B"
                  }
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M13.5 15V3"
                  stroke={
                    pathname == "/dashboard/transactions" ? "white" : "black"
                  }
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <span className="">Transactions</span>
          </Link>
          <Link
            href="/dashboard/notifications"
            className={
              pathname == "/dashboard/notifications"
                ? " py-3 px-4  bg-neutral-900 text-neutral-50  rounded-[9px] flex items-center justify-start gap-2 group"
                : " text-neutral-900  py-3 px-4 hover:text-neutral-50 hover:rounded-[9px] hover:bg-neutral-900 flex items-center group justify-start gap-2"
            }
          >
            {" "}
            <span
              className={
                pathname == "/dashboard/notifications" &&
                " block group-hover:block"
              }
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.5 6C13.5 4.80653 13.0259 3.66193 12.182 2.81802C11.3381 1.97411 10.1935 1.5 9 1.5C7.80653 1.5 6.66193 1.97411 5.81802 2.81802C4.97411 3.66193 4.5 4.80653 4.5 6C4.5 11.25 2.25 12.75 2.25 12.75H15.75C15.75 12.75 13.5 11.25 13.5 6Z"
                  stroke={
                    pathname == "/dashboard/notifications"
                      ? "#ffffff"
                      : "#56586B"
                  }
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.2975 15.75C10.1657 15.9773 9.9764 16.166 9.74868 16.2971C9.52097 16.4283 9.2628 16.4973 9.00001 16.4973C8.73723 16.4973 8.47906 16.4283 8.25134 16.2971C8.02363 16.166 7.83437 15.9773 7.70251 15.75"
                  stroke={
                    pathname == "/dashboard/notifications"
                      ? "#ffffff"
                      : "#56586B"
                  }
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <span className="">Notifications</span>
          </Link>
          <Link
            href="/dashboard/accounts"
            className={
              pathname == "/dashboard/accounts"
                ? " py-3 px-4  bg-neutral-900 text-neutral-50  rounded-[9px] flex items-center justify-start gap-2 group"
                : " text-neutral-900  py-3 px-4 hover:text-neutral-50 hover:rounded-[9px] hover:bg-neutral-900 flex items-center group justify-start gap-2"
            }
          >
            <span
              className={
                pathname == "/dashboard/accounts" && " block group-hover:block"
              }
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_203_527)">
                  <path
                    d="M1.5 12.75L9 16.5L16.5 12.75"
                    stroke={
                      pathname == "/dashboard/accounts" ? "#ffffff" : "#56586B"
                    }
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1.5 9L9 12.75L16.5 9"
                    stroke={
                      pathname == "/dashboard/accounts" ? "#ffffff" : "#56586B"
                    }
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9 1.5L1.5 5.25L9 9L16.5 5.25L9 1.5Z"
                    stroke={
                      pathname == "/dashboard/accounts" ? "#ffffff" : "#56586B"
                    }
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_203_527">
                    <rect
                      width="18"
                      height="18"
                      fill={
                        pathname == "/dashboard/accounts" ? "white" : "black"
                      }
                    />
                  </clipPath>
                </defs>
              </svg>
            </span>{" "}
            <span className="">Accounts</span>
          </Link>
          <Link
            href="/dashboard/clients"
            className={
              pathname == "/dashboard/clients"
                ? " py-3 px-4  bg-neutral-900 text-neutral-50  rounded-[9px] flex items-center justify-start gap-2 group"
                : " text-neutral-900  py-3 px-4 hover:text-neutral-50 hover:rounded-[9px] hover:bg-neutral-900 flex group items-center justify-start gap-2"
            }
          >
            <span
              className={
                pathname == "/dashboard/clients" && " block group-hover:block"
              }
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 15.75V14.25C15 13.4544 14.6839 12.6913 14.1213 12.1287C13.5587 11.5661 12.7956 11.25 12 11.25H6C5.20435 11.25 4.44129 11.5661 3.87868 12.1287C3.31607 12.6913 3 13.4544 3 14.25V15.75"
                  stroke={
                    pathname == "/dashboard/clients" ? "#ffffff" : "#56586B"
                  }
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 8.25C10.6569 8.25 12 6.90685 12 5.25C12 3.59315 10.6569 2.25 9 2.25C7.34315 2.25 6 3.59315 6 5.25C6 6.90685 7.34315 8.25 9 8.25Z"
                  stroke={
                    pathname == "/dashboard/clients" ? "#ffffff" : "#56586B"
                  }
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>

            <span className="">Clients</span>
          </Link>
          <Link
            href="/dashboard/invoices"
            className={
              pathname == "/dashboard/invoices"
                ? " py-3 px-4  bg-neutral-900 text-neutral-50  rounded-[9px] flex items-center justify-start gap-2 group"
                : " text-neutral-900  py-3 px-4 hover:text-neutral-50 hover:rounded-[9px] hover:bg-neutral-900 group flex items-center justify-start gap-2"
            }
          >
            <span
              className={
                pathname == "/dashboard/invoices" && " block group-hover:block"
              }
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.75 1.5H4.5C4.10218 1.5 3.72064 1.65804 3.43934 1.93934C3.15804 2.22064 3 2.60218 3 3V15C3 15.3978 3.15804 15.7794 3.43934 16.0607C3.72064 16.342 4.10218 16.5 4.5 16.5H13.5C13.8978 16.5 14.2794 16.342 14.5607 16.0607C14.842 15.7794 15 15.3978 15 15V6.75L9.75 1.5Z"
                  stroke={
                    pathname == "/dashboard/invoices" ? "#ffffff" : "#56586B"
                  }
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.75 1.5V6.75H15"
                  stroke={
                    pathname == "/dashboard/invoices" ? "#ffffff" : "#56586B"
                  }
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>

            <span className="">Invoices</span>
          </Link>
          <Link
            href="/dashboard/learn"
            className={
              pathname == "/dashboard/learn"
                ? " py-3 px-4  bg-neutral-900 text-neutral-50  rounded-[9px] flex items-center justify-start gap-2 group"
                : " text-neutral-900  py-3 px-4 hover:text-neutral-50 hover:rounded-[9px] hover:bg-neutral-900 group flex items-center justify-start gap-2"
            }
          >
            <span
              className={
                pathname == "/dashboard/learn" && " block group-hover:block"
              }
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.5 2.25H12C11.2044 2.25 10.4413 2.56607 9.87868 3.12868C9.31607 3.69129 9 4.45435 9 5.25V15.75C9 15.1533 9.23705 14.581 9.65901 14.159C10.081 13.7371 10.6533 13.5 11.25 13.5H16.5V2.25Z"
                  stroke={
                    pathname == "/dashboard/learn" ? "#ffffff" : "#56586B"
                  }
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1.5 2.25H6C6.79565 2.25 7.55871 2.56607 8.12132 3.12868C8.68393 3.69129 9 4.45435 9 5.25V15.75C9 15.1533 8.76295 14.581 8.34099 14.159C7.91903 13.7371 7.34674 13.5 6.75 13.5H1.5V2.25Z"
                  stroke={
                    pathname == "/dashboard/learn" ? "#ffffff" : "#56586B"
                  }
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>

            <span className="">Learn</span>
          </Link>
          <Link
            href="/dashboard/settings"
            className={
              pathname == "/dashboard/settings"
                ? " py-3 px-4  bg-neutral-900 text-neutral-50  rounded-[9px] flex items-center justify-start gap-2"
                : " text-neutral-900  py-3 px-4 hover:text-neutral-50 hover:rounded-[9px] hover:bg-neutral-900 flex items-center justify-start gap-2"
            }
          >
            <span
              className={
                pathname == "/dashboard/settings" && " block group-hover:block"
              }
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_203_543)">
                  <path
                    d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z"
                    stroke={
                      pathname == "/dashboard/settings" ? "#ffffff" : "#56586B"
                    }
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14.55 11.25C14.4502 11.4762 14.4204 11.7271 14.4645 11.9704C14.5086 12.2137 14.6246 12.4382 14.7975 12.615L14.8425 12.66C14.982 12.7993 15.0926 12.9647 15.1681 13.1468C15.2436 13.3289 15.2824 13.5241 15.2824 13.7213C15.2824 13.9184 15.2436 14.1136 15.1681 14.2957C15.0926 14.4778 14.982 14.6432 14.8425 14.7825C14.7032 14.922 14.5378 15.0326 14.3557 15.1081C14.1736 15.1836 13.9784 15.2224 13.7812 15.2224C13.5841 15.2224 13.3889 15.1836 13.2068 15.1081C13.0247 15.0326 12.8593 14.922 12.72 14.7825L12.675 14.7375C12.4982 14.5646 12.2737 14.4486 12.0304 14.4045C11.7871 14.3604 11.5362 14.3902 11.31 14.49C11.0882 14.5851 10.899 14.7429 10.7657 14.9442C10.6325 15.1454 10.561 15.3812 10.56 15.6225V15.75C10.56 16.1478 10.402 16.5294 10.1207 16.8107C9.83936 17.092 9.45782 17.25 9.06 17.25C8.66218 17.25 8.28064 17.092 7.99934 16.8107C7.71804 16.5294 7.56 16.1478 7.56 15.75V15.6825C7.55419 15.4343 7.47384 15.1935 7.32938 14.9915C7.18493 14.7896 6.98305 14.6357 6.75 14.55C6.52379 14.4502 6.27286 14.4204 6.02956 14.4645C5.78626 14.5086 5.56176 14.6246 5.385 14.7975L5.34 14.8425C5.20069 14.982 5.03526 15.0926 4.85316 15.1681C4.67106 15.2436 4.47587 15.2824 4.27875 15.2824C4.08163 15.2824 3.88644 15.2436 3.70434 15.1681C3.52224 15.0926 3.35681 14.982 3.2175 14.8425C3.07804 14.7032 2.9674 14.5378 2.89191 14.3557C2.81642 14.1736 2.77757 13.9784 2.77757 13.7812C2.77757 13.5841 2.81642 13.3889 2.89191 13.2068C2.9674 13.0247 3.07804 12.8593 3.2175 12.72L3.2625 12.675C3.4354 12.4982 3.55139 12.2737 3.5955 12.0304C3.63962 11.7871 3.60984 11.5362 3.51 11.31C3.41493 11.0882 3.25707 10.899 3.05585 10.7657C2.85463 10.6325 2.61884 10.561 2.3775 10.56H2.25C1.85218 10.56 1.47064 10.402 1.18934 10.1207C0.908035 9.83936 0.75 9.45782 0.75 9.06C0.75 8.66218 0.908035 8.28064 1.18934 7.99934C1.47064 7.71804 1.85218 7.56 2.25 7.56H2.3175C2.56575 7.55419 2.8065 7.47384 3.00847 7.32938C3.21045 7.18493 3.36429 6.98305 3.45 6.75C3.54984 6.52379 3.57962 6.27286 3.5355 6.02956C3.49139 5.78626 3.3754 5.56176 3.2025 5.385L3.1575 5.34C3.01804 5.20069 2.9074 5.03526 2.83191 4.85316C2.75642 4.67106 2.71757 4.47587 2.71757 4.27875C2.71757 4.08163 2.75642 3.88644 2.83191 3.70434C2.9074 3.52224 3.01804 3.35681 3.1575 3.2175C3.29681 3.07804 3.46224 2.9674 3.64434 2.89191C3.82644 2.81642 4.02163 2.77757 4.21875 2.77757C4.41587 2.77757 4.61106 2.81642 4.79316 2.89191C4.97526 2.9674 5.14069 3.07804 5.28 3.2175L5.325 3.2625C5.50176 3.4354 5.72626 3.55139 5.96956 3.5955C6.21285 3.63962 6.46379 3.60984 6.69 3.51H6.75C6.97183 3.41493 7.16101 3.25707 7.29427 3.05585C7.42753 2.85463 7.49904 2.61884 7.5 2.3775V2.25C7.5 1.85218 7.65804 1.47064 7.93934 1.18934C8.22064 0.908035 8.60218 0.75 9 0.75C9.39782 0.75 9.77936 0.908035 10.0607 1.18934C10.342 1.47064 10.5 1.85218 10.5 2.25V2.3175C10.501 2.55884 10.5725 2.79463 10.7057 2.99585C10.839 3.19707 11.0282 3.35493 11.25 3.45C11.4762 3.54984 11.7271 3.57962 11.9704 3.5355C12.2137 3.49139 12.4382 3.3754 12.615 3.2025L12.66 3.1575C12.7993 3.01804 12.9647 2.9074 13.1468 2.83191C13.3289 2.75642 13.5241 2.71757 13.7213 2.71757C13.9184 2.71757 14.1136 2.75642 14.2957 2.83191C14.4778 2.9074 14.6432 3.01804 14.7825 3.1575C14.922 3.29681 15.0326 3.46224 15.1081 3.64434C15.1836 3.82644 15.2224 4.02163 15.2224 4.21875C15.2224 4.41587 15.1836 4.61106 15.1081 4.79316C15.0326 4.97526 14.922 5.14069 14.7825 5.28L14.7375 5.325C14.5646 5.50176 14.4486 5.72626 14.4045 5.96956C14.3604 6.21285 14.3902 6.46379 14.49 6.69V6.75C14.5851 6.97183 14.7429 7.16101 14.9442 7.29427C15.1454 7.42753 15.3812 7.49904 15.6225 7.5H15.75C16.1478 7.5 16.5294 7.65804 16.8107 7.93934C17.092 8.22064 17.25 8.60218 17.25 9C17.25 9.39782 17.092 9.77936 16.8107 10.0607C16.5294 10.342 16.1478 10.5 15.75 10.5H15.6825C15.4412 10.501 15.2054 10.5725 15.0042 10.7057C14.8029 10.839 14.6451 11.0282 14.55 11.25V11.25Z"
                    stroke={
                      pathname == "/dashboard/settings" ? "#ffffff" : "#56586B"
                    }
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_203_543">
                    <rect
                      width="18"
                      height="18"
                      fill={
                        pathname == "/dashboard/settings"
                          ? "#ffffff"
                          : "#56586B"
                      }
                    />
                  </clipPath>
                </defs>
              </svg>
            </span>

            <span className="">Settings</span>
          </Link>
          <button
            onClick={handleLogout}
            className="text-red-500  py-3 px-4 hover:text-neutral-50 hover:rounded-[9px] w-full hover:bg-red-500 flex group items-center justify-start gap-2"
          >
            <span className="block group-hover:hidden">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 12.75L15.75 9L12 5.25"
                  stroke="#DD2323"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.75 9H6.75"
                  stroke="#DD2323"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.75 15.75H3.75C3.35218 15.75 2.97064 15.592 2.68934 15.3107C2.40804 15.0294 2.25 14.6478 2.25 14.25V3.75C2.25 3.35218 2.40804 2.97064 2.68934 2.68934C2.97064 2.40804 3.35218 2.25 3.75 2.25H6.75"
                  stroke="#DD2323"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <span className="hidden group-hover:block">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 12.75L15.75 9L12 5.25"
                  stroke="#ffffff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.75 9H6.75"
                  stroke="#ffffff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.75 15.75H3.75C3.35218 15.75 2.97064 15.592 2.68934 15.3107C2.40804 15.0294 2.25 14.6478 2.25 14.25V3.75C2.25 3.35218 2.40804 2.97064 2.68934 2.68934C2.97064 2.40804 3.35218 2.25 3.75 2.25H6.75"
                  stroke="#ffffff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <span className="">{isPending ? "Logging out" : "Logout"}</span>
          </button>
        </nav>
      </section>
    </aside>
  );
};

export default Sidebar;
