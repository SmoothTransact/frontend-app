"use client";
import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import MainSectionDashboard from "./MainSectionDashboard";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function MainDashboardComponent() {
  const token = useSelector((state) => state.user.accessToken);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("auth/login");
    }
  }, [token, router]);

  return (
    <main className="relative">
      <section className="grid grid-cols-12">
        <aside className="xl:col-span-2 lg:col-span-3 md:hidden sm:hidden lg:block hidden">
          <Sidebar />
        </aside>
        <section className="xl:col-span-10 lg:col-span-9 col-span-12">
          <MainSectionDashboard />
        </section>
      </section>
    </main>
  );
}
