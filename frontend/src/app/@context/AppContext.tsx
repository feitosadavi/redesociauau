'use client'

import { IUser } from "@/types";
import React, { useContext, useState, useEffect } from "react";

interface Props {
  user: IUser;
  setUser: (user: IUser) => void;
}

const AppContext = React.createContext<Props>({
  user: {} as IUser,
  setUser: () => {},
});

export const AppProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<IUser>({} as IUser);

  // Effect to refresh token periodically
  useEffect(() => {
    const _user = localStorage.getItem("user");
    console.log(_user);

    if (_user) setUser(JSON.parse(_user));

    // if (!window.location.href.includes("/login")) {
    //   USERS_API.me().then((_user) => {
    //     setUser(_user);
    //   });
    // }
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
