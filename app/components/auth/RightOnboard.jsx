import Image from "next/image";

import React from "react";

const RightOnboard = () => {
  return (
    <section className="min-h-screen col-span-6 bg-gray-100 w-1/2 md:w-1/2 fixed right-0 hidden  lg:flex md:flex">
      <Image
        src="/brand.svg"
        alt="Brand Image"
        className="dark:invert"
        width={1200}
        height={1200}
        priority
      />
    </section>
  );
};

export default RightOnboard;
