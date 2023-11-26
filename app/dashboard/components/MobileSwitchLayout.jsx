import React, { useState } from "react";
import mobiile_logo from "../../../public/dashboard/mobile_logo.svg";
import Image from "next/image";
import MobileView from "../../components/MobileView";

const MobileSwitchLayout = () => {
  const [navbar, setNavbar] = useState(false);

  return (
    <div>
      <nav className="lg:hidden xl:hidden flex justify-between items-ceneter px-6 py-7 bg-white border-b-2 border-neutral-100">
        <div>
          <Image src={mobiile_logo} alt="Mobile Loogo" />
        </div>
        <div className="text-lg font-bold">Dashboard</div>
        <button onClick={() => setNavbar(!navbar)}>
          <svg
            width="32"
            height="33"
            viewBox="0 0 32 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 24.6953H28"
              stroke="#0F0F0F"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 16.6953H28"
              stroke="#0F0F0F"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 8.69531H28"
              stroke="#0F0F0F"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        {navbar && <MobileView navbar={navbar} setNavbar={setNavbar} />}
      </nav>
    </div>
  );
};

export default MobileSwitchLayout;
