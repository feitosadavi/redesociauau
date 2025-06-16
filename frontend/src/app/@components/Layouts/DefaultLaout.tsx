import Sidebar from "@/app/@components/Sidebar";
import Header from "@/app/@components/Header";

export default function DefaultLayout({
  children,
  ref,
}: {
  children: React.ReactNode;
  ref?: any;
}) {
  return (
    <>
      {/* <!-- ===== Page Wrapper Star ===== --> */}
      <div className="flex h-screen overflow-hidden" ref={ref}>
        {/* <!-- ===== Sidebar Star ===== --> */}
        <Sidebar />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Star ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Star ===== --> */}
          <Header />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Star ===== --> */}
          <main>
            <div className="z-0 mx-auto max-w-screen-2xl p-2 md:p-6 lg:p-4 2xl:px-5 2xl:py-10">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}
