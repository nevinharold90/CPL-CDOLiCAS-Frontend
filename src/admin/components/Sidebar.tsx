// src/components/Sidebar.tsx
import { useState, type JSX, useRef, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { FaGears } from "react-icons/fa6";
import LogoutIcon from "../assets/logout.png";
import logo from "../assets/logo.png";

// Dashboard
import DashboardIcon from "../assets/dashboard-panel-1.png";
import DashboardActiveIcon from "../assets/dashboard-panel-2.png";

// Book Information
import BookUserIcon from "../assets/book-user-1.png";
import BookUserActiveIcon from "../assets/book-user-2.png";

// Book List
import BookListIcon from "../assets/book-list-1.png";
import BookListActiveIcon from "../assets/book-list-2.png";

// Members
import MembersIcon from "../assets/membership-2.png";
import MembersActiveIcon from "../assets/membership.png";

// Maintenance
import MaintenanceIcon from "../assets/maintenance-1.png";
import MaintenanceActiveIcon from "../assets/maintenance-2.png";


import axios from 'axios';
import api from '../../_api/axios'; // 👈 This is the centralized call for Axios


import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
} from "react-icons/tb";

type SubMenuKey = "inbox" | "settings";

interface SidebarProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

interface MenuType {
  title: string;
  icon?: JSX.Element;
  iconNormal?: string;
  iconActive?: string;
  path?: string;
  gap?: boolean;
  subMenu?: string[];
  key?: SubMenuKey;
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [loading, setLoading] = useState(false);

  const [subMenus, setSubMenus] = useState<{ [key in SubMenuKey]: boolean }>({
    inbox: false,
    settings: false,
  });

  const handleLogout = async () => {
    setLoading(true);

    try {
      // Step 1: Get the token you saved during login
      const token = localStorage.getItem('auth_token');

      // Step 2: Tell Laravel to revoke/invalidate this token
      await api.post('/user/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}` // Pass the token in the header
        }
      });
      
    } catch (error) {
      // Even if server fails or is offline, log the error and move on
      console.error('Server error during logout:', error);
    } finally {
      // Step 3: ALWAYS clean up the browser and redirect!
      // (The 'finally' block runs no matter if the API call succeeded or failed)
      
      localStorage.removeItem('auth_token'); // Delete token from browser
      localStorage.removeItem('user');       // Delete user details if you stored any
      
      setLoading(false);
      navigate('/');                    // Kick user back to Login screen
    }
  };

  // Collapse all submenus whenever sidebar is minimized
  useEffect(() => {
    if (!open) {
      setSubMenus({ inbox: false, settings: false });
    }
  }, [open]);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipStyle, setTooltipStyle] = useState<{ top: string; opacity: number }>({
    top: "0px",
    opacity: 0,
  });

  const menuRefs = useRef<(HTMLLIElement | null)[]>([]);
  const logoutRef = useRef<HTMLButtonElement>(null);

  const toggleSubMenu = (menu: SubMenuKey) => {
    setSubMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const Menus: MenuType[] = [
  {
    title: "Dashboard",
    iconNormal: DashboardIcon,
    iconActive: DashboardActiveIcon,
    path: "/dashboard",
  },
  {
    title: "Book Information",
    iconNormal: BookUserIcon,
    iconActive: BookUserActiveIcon,
    path: "/book-information",
  },
  {
    title: "Book List",
    iconNormal: BookListIcon,
    iconActive: BookListActiveIcon,
    path: "/book-list",
  },
  {
    title: "Members",
    iconNormal: MembersIcon,
    iconActive: MembersActiveIcon,
    path: "/members",
  },
  {
    title: "Setting",
    icon: <FaGears />,
    subMenu: ["General", "Security", "Notifications"],
    key: "settings",
  },
  {
    title: "Maintenance",
    iconNormal: MaintenanceIcon,
    iconActive: MaintenanceActiveIcon,
    path: "/maintenance",
    gap: true,
  },
];


  

  useEffect(() => {
    const updatePosition = () => {
      if (hoveredIndex === null) {
        setTooltipStyle({ top: "0px", opacity: 0 });
        return;
      }
      const ref = hoveredIndex < Menus.length ? menuRefs.current[hoveredIndex] : logoutRef.current;
      if (ref) {
        const rect = ref.getBoundingClientRect();
        setTooltipStyle({ top: `${rect.top + rect.height / 2}px`, opacity: 1 });
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [hoveredIndex, Menus.length]);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`
          fixed top-9 z-40 w-9 h-9 flex items-center justify-center
          bg-zinc-100 border-2 border-zinc-300 shadow-md rounded-full text-zinc-700
          transition-all duration-300 cursor-pointer
          ${open ? "left-70 md:left-72 -translate-x-1/2" : "left-16 md:left-20 -translate-x-1/2"}
        `}
      >
        {open ? <TbLayoutSidebarLeftExpand className="text-xl" /> : <TbLayoutSidebarLeftCollapse className="text-xl" />}
      </button>

      {/* Tooltip only when collapsed */}
      {!open && hoveredIndex !== null && (
        <div
          className="fixed left-22 z-50 pointer-events-none px-3 py-1.5 rounded-md bg-zinc-800/95 text-white text-sm font-medium shadow-xl border border-zinc-700 backdrop-blur-sm whitespace-nowrap transition-all duration-150"
          style={{ top: tooltipStyle.top, transform: "translateY(-50%)", opacity: tooltipStyle.opacity }}
        >
          {hoveredIndex < Menus.length ? Menus[hoveredIndex].title : "Logout"}
        </div>
      )}

      <div className={`bg-zinc-900 h-screen flex flex-col transition-[width] duration-300 ease-in-out font-[Poppins] ${open ? "w-72 px-4" : "w-20 px-3"} pt-8 pb-6 overflow-hidden border-r border-zinc-800`}>
        {/* Logo */}
        <div className="flex items-center gap-x-3 px-1 mb-10">
          <img
            src={logo}
            alt="logo"
            className={`w-10 h-10 rounded-xl object-cover shrink-0 transition-all duration-500 ${open ? "rotate-360" : "rotate-0"}`}
          />
          <h1 className={`text-zinc-100 font-semibold text-xl tracking-tight transition-all duration-300 whitespace-nowrap ${open ? "opacity-100" : "opacity-0 w-0"}`}>
            CDO LiCAS Admin
          </h1>
        </div>

        <ul className="flex-1 space-y-2 px-1">
          {Menus.map((menu, index) => {
            const isActive = menu.path && currentPath === menu.path;

            return (
              <li
                key={index}
                ref={(el) => {
                  menuRefs.current[index] = el;
                }}
                className={`group relative rounded-lg text-zinc-300 transition-all duration-200 ${menu.gap ? "mt-6" : ""} ${isActive ? "bg-zinc-800/60 text-white" : ""} ${open ? "hover:bg-zinc-800/60 hover:text-white" : "hover:bg-zinc-800/40"}`}
                onMouseEnter={!open ? () => setHoveredIndex(index) : undefined}
                onMouseLeave={!open ? () => setHoveredIndex(null) : undefined}
              >
                <div
                  className="flex items-center justify-between gap-x-3 px-3 py-2.5 rounded-lg transition-colors duration-200 cursor-pointer"
                  onClick={() => {
                      // Sidebar minimized → only navigate
                      if (!open) {
                        if (menu.path) navigate(menu.path);
                        return;
                      }

                      // Sidebar expanded
                      if (menu.key) {
                        toggleSubMenu(menu.key);
                      }

                      if (menu.path) {
                        navigate(menu.path);
                      }
                    }}
                  >
                  <div className="flex items-center gap-3 min-w-0">
                    {menu.iconNormal && menu.iconActive ? (
                      <img
                        src={isActive ? menu.iconActive : menu.iconNormal}
                        alt={menu.title}
                        className="w-5 h-5 object-contain shrink-0 invert-[0.75] group-hover:invert"
                      />
                    ) : (
                      <span className={`text-2xl shrink-0 ${isActive ? "text-indigo-400" : "text-zinc-400 group-hover:text-zinc-200"}`}>
                        {menu.icon}
                      </span>
                    )}
                    <span className={`text-[0.94rem] whitespace-nowrap transition-all duration-300 ${open ? "opacity-100" : "opacity-0 w-0"} ${isActive ? "font-bold" : "font-medium"}`}>
                      {menu.title}
                    </span>
                  </div>

                  {menu.subMenu && menu.key && (
                    <span className={`transition-opacity duration-200 shrink-0 ${open ? "opacity-100" : "opacity-0 w-0"}`}>
                      {subMenus[menu.key] ? <FaChevronDown size={14} /> : <FaChevronRight size={14} />}
                    </span>
                  )}
                </div>

                {isActive && (
                  <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-linear-to-b from-indigo-500 to-violet-500 rounded-r" />
                )}

                {menu.subMenu && menu.key && subMenus[menu.key] && open && (
                  <ul className="pl-12 pr-4 pb-2 pt-1 space-y-1 text-sm text-zinc-300">
                    {menu.subMenu.map((sub, i) => (
                      <li key={i} className="py-1.5 px-3 hover:bg-zinc-800/70 rounded-md cursor-pointer transition-colors">
                        {sub}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-auto border-t border-zinc-800 pt-5 px-1">
          <button
            ref={logoutRef}
            onClick={handleLogout}
            disabled={loading}
            className="flex items-center gap-x-3 w-full px-3 py-2.5 rounded-lg text-zinc-300 hover:bg-zinc-800/60 hover:text-white transition-all duration-200 group"
            onMouseEnter={!open ? () => setHoveredIndex(Menus.length) : undefined}
            onMouseLeave={!open ? () => setHoveredIndex(null) : undefined}
          >
            <img
              src={LogoutIcon}
              alt="Logout"
              className="w-5 h-5 object-contain shrink-0 invert-[0.75] group-hover:invert"
            />
            <span className={`text-[0.94rem] whitespace-nowrap transition-all duration-300 ${open ? "opacity-100" : "opacity-0 w-0"} font-medium`}>
              Logout
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;