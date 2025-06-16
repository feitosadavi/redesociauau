"use client";

import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useColorMode = (): [string, (value: string) => void] => {
  const [colorMode, setColorMode] = useLocalStorage("color-theme", "dark");

  useEffect(() => {
    const className = "dark";
    if (window !== undefined) {
      const bodyClass = window?.document.documentElement.classList;
      colorMode === "dark"
        ? bodyClass.add(className)
        : bodyClass.remove(className);
    }
  }, [colorMode]);

  return [colorMode ?? "dark", setColorMode];
};

export default useColorMode;
