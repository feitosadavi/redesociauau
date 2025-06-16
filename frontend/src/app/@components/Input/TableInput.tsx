import { ArrowDown, ArrowUp } from "@/icons";
import React, { InputHTMLAttributes, useEffect, useState } from "react";

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange: (value: string | number) => void;
  defaultValue: number;
}

const TableInput: React.FC<Props> = ({
  className,
  onClick,
  onChange,
  disabled,
  defaultValue,
  ...props
}) => {
  const [value, setValue] = useState<number>(defaultValue as number);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const increase = () => {
    setValue((prev) => prev + 1);
    onChange(value + 1);
  };
  const decrease = () => {
    setValue((prev) => Math.max(0, prev - 1)); // Evita números negativos
    onChange(Math.max(0, value - 1));
  };

  return (
    <div className="flex w-full items-center justify-center">
      <div className="relative flex w-15 items-center justify-center">
        <input
          className={`h-5 w-[60px] appearance-none bg-none text-center [-moz-appearance:textfield]  focus:outline-none 
          dark:bg-gray-dark [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${className}`}
          disabled={disabled}
          value={value}
          onChange={(e) => {
            setValue(Number(e.target.value));
            if (onChange) onChange(e.target.value);
          }}
          {...props}
        />

        {!disabled ? (
          <div className="absolute left-13 flex flex-col items-center justify-center">
            <button
              onClick={increase}
              className="rounded-lg font-bold text-white active:scale-95"
            >
              <ArrowUp className="hover:text-primary" />
            </button>
            <button
              onClick={decrease}
              className="rounded-lg font-bold text-white active:scale-95"
            >
              <ArrowDown className="hover:text-red" />
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default TableInput;
