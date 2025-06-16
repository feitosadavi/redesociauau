import React, { forwardRef, HTMLInputTypeAttribute } from "react";

interface Props {
  label: string;
  id: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  value?: string;
  error?: string;
}

const TextInput: React.FC<Props> = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="mb-5 w-full">
        <label
          className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
          htmlFor="fullName"
        >
          {label}
        </label>
        <div className="relative">
          <textarea
            ref={ref}
            rows={10}
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-6 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            {...props}
          />
        </div>
        {error ? <span className="text-red">{error}</span> : ""}
      </div>
    );
  },
);

export default TextInput;
