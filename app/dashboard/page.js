"use client";
import React, { useEffect } from "react";
import MainSectionDashboard from "./MainSectionDashboard";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const token = useSelector((state) => state.user.accessToken);

  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push("/auth/login");
      localStorage.clear();
    }
  }, [token, router]);

  return (
    <div>
      {" "}
      <MainSectionDashboard />
    </div>
  );
}
