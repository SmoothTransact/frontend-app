"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MainSectionDashboard from "./MainSectionDashboard";

const DashboardComponent = () => {
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
};

export default DashboardComponent;
