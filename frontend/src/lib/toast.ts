import { toast as t, ToastOptions } from "react-toastify";

const toast = (msg: string, options: ToastOptions) =>
  t(msg, {
    position: "top-center",
    style: { backgroundColor: "#020D1A", color: "#fff" },
    ...options,
  });

export default toast;
