import React from "react";
import Spinner from "../Spinner";

interface Props {
  label: string;
  isLoading: boolean;
  className?: string;
}

const LoadingButton: React.FC<Props> = ({ label, isLoading, className }) => {
  return (
    <button
      disabled={isLoading}
      className={`flex h-10 items-center justify-center rounded-[7px] bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90 ${className}`}
      type="submit"
    >
      {isLoading ? <Spinner /> : label}
    </button>
  );
};

export default LoadingButton;
