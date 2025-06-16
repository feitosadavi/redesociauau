"use client";

import { ClosedEyeIcon, OpenEyeIcon, LockIcon } from "@/icons";
import React, { forwardRef, useState } from "react";

export interface InputProps {
  label: string;
  id: string;
  placeholder: string;
  value?: string;
  iconRight?: boolean;
  className?: string;
  error?: string;
  viewPwd?: boolean;
}

const PwdInput: React.FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ label, iconRight, className, error, viewPwd, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const togglePassword = () => setShowPassword(!showPassword);

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
                <LockIcon />
              </span>
              {viewPwd ? (
                <span
                  onClick={togglePassword}
                  className="absolute right-4.5 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <OpenEyeIcon /> : <ClosedEyeIcon />}
                </span>
              ) : (
                ""
              )}
            </>
          )}
          <input
            type={showPassword ? "text" : "password"}
            className={`w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-3 ${iconRight ? `pl-7.5` : `pl-12.5`} pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary`}
            ref={ref}
            {...props}
          />

          {iconRight && (
            <>
              <span className="absolute right-4.5 top-1/2 -translate-y-1/2">
                <LockIcon />
              </span>
              {viewPwd ? (
                <span
                  onClick={togglePassword}
                  className="absolute left-4.5 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <ClosedEyeIcon /> : <OpenEyeIcon />}
                </span>
              ) : (
                ""
              )}
            </>
          )}
        </div>
        {error ? <span className="text-red">{error}</span> : ""}
      </div>
    );
  },
);

export default PwdInput;
