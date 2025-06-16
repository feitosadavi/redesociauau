"use client";

import React, { ButtonHTMLAttributes } from "react";
import Spinner from "../Spinner";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: any;
  overrideClass?: boolean;
  isLoading?: boolean;
}

const Button: React.FC<Props> = ({
  children,
  onClick,
  className,
  overrideClass,
  label,
  isLoading,
  ...props
}) => {
  return (
    <button
      className={
        overrideClass
          ? className
          : `rounded-[5px] bg-primary px-10 py-3.5 font-bold text-white transition transition hover:bg-green-600 lg:px-8 xl:px-10 ${className}`
      }
      onClick={onClick}
      {...props}
    >
      {isLoading ? <Spinner /> : (label ?? children)}
    </button>
  );
};

export default Button;
