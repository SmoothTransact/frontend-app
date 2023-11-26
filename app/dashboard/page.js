"use client";
import React, { useEffect } from "react";
import MainSectionDashboard from "./MainSectionDashboard";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const accessToken = useSelector((state) => state.user.accessToken);

  const router = useRouter();
  useEffect(() => {
    if (!accessToken) {
      router.push("/auth/login");
    }
  }, [accessToken, router]);

  return (
    <div>
      {" "}
      <MainSectionDashboard />
    </div>
  );
}
