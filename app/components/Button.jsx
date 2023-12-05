import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import fi_loader from "@/public/fi_loader.svg";

const Button = ({ label, onClick, variant, isLoading = false }) => {
  const getButtonClasses = () => {
    if (variant === "primary") {
      return isLoading
        ? "bg-[#A5A9C2] text-gray-100 mt-5 w-full rounded-full px-8 py-[14px] lg:text-lg text-base "
        : "onboardCreateButton";
    } else if (variant === "secondary") {
      // Add secondary button styles here
      return " lg:h-[54px] h-[52px] w-full my-2 bg-gray-200 text-gray-900 rounded-full px-8 py-[14px] lg:text-lg text-base";
    }
    return "";
  };

  return (
    <button
      className={getButtonClasses()}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Image src={fi_loader} alt="loader" className="animate-spin" />
          {label}
        </div>
      ) : (
        label
      )}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary"]).isRequired,
  isLoading: PropTypes.bool,
};

export default Button;
