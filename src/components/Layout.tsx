// src/components/Layout.tsx
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  // Load saved sidebar state
  const [open, setOpen] = useState(() => {
    const saved = localStorage.getItem("sidebar-open");
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Save sidebar state whenever it changes!
  useEffect(() => {
    localStorage.setItem("sidebar-open", JSON.stringify(open));
  }, [open]);

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-100">
      <Sidebar open={open} setOpen={setOpen} />

      <main className="flex-1 overflow-y-auto transition-all duration-300">
        <Outlet />
      </main>
    </div> 
  );
};

export default Layout;