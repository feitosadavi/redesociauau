import React, { useEffect, useRef } from "react";

interface Props {
  active: boolean;
  setActive: (active: boolean) => void;
  children: React.ReactNode; // can be any component or JSX.Element
  left?: boolean;
  className?: string;
}

const Sidebar: React.FC<Props> = ({
  active,
  setActive,
  children,
  left,
  className,
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = ({ target }: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(target as Node)) {
      setActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={sidebarRef}
      className={`absolute ${left ? "left-0" : "right-0"} top-0 z-20 flex h-[99%] flex-col items-center overflow-y-auto overflow-x-hidden shadow-lg transition-all duration-300 ease-in-out ${
        active ? "w-[55%] max-w-[50rem] opacity-100" : "w-0 opacity-0"
      } rounded-br-lg rounded-tr-lg md:w-[75%] ${className}`}
    >
      {children}
    </div>
  );
};

export default Sidebar;
