"use client";

import React, { useState } from "react";

const SettingsComponent = () => {
  const [tabs, setTabs] = useState(1);

  return (
    <main className="bg-neutral-100 min-h-screen pb-8">
      <header className="  border-neutral-100 bg-neutral-50 px-6 py-3 ">
        <span className="flex items-center gap-8">
          <button
            onClick={() => setTabs(1)}
            className={
              tabs === 1
                ? "text-lg font-bold underline underline-offset-[20px]"
                : "text-lg font-bold"
            }
          >
            Profile
          </button>
          <button
            onClick={() => setTabs(2)}
            className={
              tabs === 2
                ? "text-lg font-bold underline underline-offset-[20px]"
                : "text-lg font-bold"
            }
          >
            Security
          </button>
          <button
            onClick={() => setTabs(3)}
            className={
              tabs === 3
                ? "text-lg font-bold underline underline-offset-[20px]"
                : "text-lg font-bold"
            }
          >
            Notifications
          </button>
        </span>
      </header>
      <section className="px-6 py-3">
        {/* Tabs Sections */}
        {tabs === 1 && <section>Profile</section>}
        {tabs === 2 && <section>Security</section>}
        {tabs === 3 && <section>Notifications</section>}
      </section>
    </main>
  );
};

export default SettingsComponent;
