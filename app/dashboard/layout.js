"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import DashboardNavbar from "./components/DashboardNavbar";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
  const token = useSelector((state) => state.user.accessToken);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/auth/login");
      localStorage.clear();
    }
  }, [router, token]);

  return (
    <main className="relative">
      <section className="grid grid-cols-12">
        <aside className="xl:col-span-2 lg:col-span-3 md:hidden sm:hidden lg:block hidden">
          <Sidebar />
        </aside>
        <section className="xl:col-span-10 lg:col-span-9 col-span-12">
          <DashboardNavbar />
          {children}
        </section>
      </section>
    </main>
  );
}
