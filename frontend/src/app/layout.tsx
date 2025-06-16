// "use client";
// import "jsvectormap/dist/css/jsvectormap.css";
// import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React from "react";
import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }: any) {
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [loading, setLoading] = useState<boolean>(false);

  // const pathname = usePathname();

  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 1000);
  // }, []);

  return (
    <html lang="en" className="dark">
      <body suppressHydrationWarning={true}>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
