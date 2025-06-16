import React from "react";
import Spinner from "./Spinner";

const LoadingScreen: React.FC = () => {
  return (
    <div
      className={`absolute z-20 flex h-full w-full items-center justify-center rounded-[10px] border border-stroke shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card`}
    >
      {<Spinner />}
    </div>
  );
};

export default LoadingScreen;
