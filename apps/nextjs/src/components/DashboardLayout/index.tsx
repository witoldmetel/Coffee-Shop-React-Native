import { useState } from "react";

import Footer from "../Footer";
import Header from "../Header";
import Sidebar from "../Sidebar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isOpened, setOpened] = useState(false);

  const toggleDrawer = () => setOpened((prev) => !prev);

  return (
    <div className="flex min-h-screen flex-col text-center">
      <Header isOpened={isOpened} toggleDrawer={toggleDrawer} />
      <div className="flex flex-1 bg-gradient-to-b from-[#ddb892] to-[#fff]">
        <Sidebar isOpened={isOpened} />
        <div className="w-5/6 p-5">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
