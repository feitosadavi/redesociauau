"use client";

import { ClosedEyeIcon, OpenEyeIcon } from "@/icons";
import React, { forwardRef, HTMLInputTypeAttribute, useRef } from "react";

export interface InputProps {
  label: string;
  id: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  value?: string;
  icon: any;
  iconRight?: boolean;
  className?: string;
  error?: string;
}

const InputDefault: React.FC<InputProps> = forwardRef<
  HTMLInputElement,
  InputProps
>(({ label, icon, iconRight, className, error, type, ...props }, ref) => {
  return (
    <div className={`mb-5 w-full ${className}`}>
      <label
        className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
        htmlFor="fullName"
      >
        {label}
      </label>
      <div className="relative">
        {!iconRight && (
          <>
            <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
              {icon}
            </span>
          </>
        )}
        <input
          ref={ref}
          className={`w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-3 ${iconRight ? `pl-7.5` : `pl-12.5`} pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary`}
          type={type}
          {...props}
        />

        {iconRight && (
          <>
            <span className="absolute right-4.5 top-1/2 -translate-y-1/2">
              {icon}
            </span>
          </>
        )}
      </div>
      {error ? <span className="text-red">{error}</span> : ""}
    </div>
  );
});

export default InputDefault;
