import { ArrowDown } from "@/icons";
import React, { forwardRef, useState } from "react";

interface Props {
  id: string;
  options: string[] | number[];
  className?: string;
  label?: string;
  placeholder: string;
  value?: string | number;
  error?: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const DefaultSelectOption: React.FC<Props> = forwardRef<
  HTMLSelectElement,
  Props
>(
  (
    { options, value, id, label, error, placeholder, className, ...props },
    ref,
  ) => {
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

    return (
      <div className={`mb-4.5 ${className}`}>
        {label ? (
          <label className="mb-3 block text-body-sm text-dark dark:text-white">
            {label}
          </label>
        ) : (
          ""
        )}

        <div className="relative z-20 bg-transparent dark:bg-dark-2">
          <select
            className={`relative z-20 w-full appearance-none rounded-[7px] border border-stroke bg-white px-5.5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:bg-none dark:focus:border-primary ${
              isOptionSelected ? "text-dark dark:text-white" : ""
            }`}
            ref={ref}
            value={value}
            {...props}
          >
            <option value={placeholder} disabled className="text-dark-6">
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option} value={option} className="text-dark-6">
                {option}
              </option>
            ))}
          </select>

          <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
            <ArrowDown />
          </span>
        </div>
        {error ? <span className="text-red">{error}</span> : ""}
      </div>
    );
  },
);

export default DefaultSelectOption;
