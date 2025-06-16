"use client";

import React, { useEffect } from "react";
import { ToastContainer as Toast } from "react-toastify";
import toast from "@/lib/toast";

const ToastContainer = () => {
  useEffect(() => {
    const toastMessage = document.cookie
      .split("; ")
      .find((row) => row.startsWith("toastMessage="))
      ?.split("=")[1];

    if (toastMessage) {
      const { msg, type } = JSON.parse(toastMessage);
      toast(msg, { type });
    }
  }, []);

  return <Toast />;
};

export default ToastContainer;
