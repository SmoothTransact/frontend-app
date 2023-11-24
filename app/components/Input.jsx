"use client";

import React from "react";
import { Input } from "@material-tailwind/react";
export { Input };

const TextInput = ({
  variant,
  type,
  onChange,
  placeholder,
  value,
  required,
}) => {
  return (
    <Input
      variant={variant}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="border-[1.5px] !border-neutral-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent text-base placeholder:text-neutral-600 focus:!border-blue-600 mt-2 focus:!border-t-blue-600 focus:bg-white focus:ring-blue-600/10 px-5 py-[14px] h-[50px]"
      labelProps={{
        className: "hidden",
      }}
    />
  );
};

export default TextInput;
