import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { menu } from "./menu";
import { LuChevronDown, LuChevronUp, LuMenu, LuX } from "react-icons/lu";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
    const [open, setOpen] = useState({});
  const { pathname } = useLocation();

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  const isActive = (path) => {
    return pathname === path;
  };
  const toggle = (label) => {
    setOpen((prev) => ({ ...prev, [label]: !prev[label] }));
  };
  return (
   <aside
        className={`
           top-0 left-0 h-screen bg-backGround dark:bg-gray-800 flex flex-col transition-all duration-300 z-[49]
           ${collapsed ? "w-16" : "w-52"}
           sticky
           md:translate-x-0 
           md:flex max-md:hidden
        `}
      >
      {/* Header */}
      <div className="flex space-x-4 h-16 bg-white items-center text-nowrap">
          <button onClick={handleToggle} className="flex ml-6 md:block">
            <LuMenu className="text-2xl text-dark dark:text-white" />
          </button>
          {/* Logo */}
          <div className="text-xl font-bold text-dark dark:text-white  relative">
            SAMVAD 2.0
          </div>
        </div>

      {/* Menu */}
        <nav className="flex-1 overflow-auto custom-scrollbar px-2 py-4 space-y-2 text-nowrap shadow-lg dark:bg-gray-800">
        {menu.map((item) => {
            return item.children ? (
              <div key={item.label}>
                  <button
                    className={`flex items-center w-full px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700  focus:outline-none text-gray-700 dark:text-gray-200 ${collapsed ? "justify-center" : ""}`}
                    onClick={() => {
                      toggle(item.label);
                      setCollapsed(false);
                    }}
                    aria-expanded={open[item.label] ? "true" : "false"}
                    aria-controls={`${item.label}-submenu`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left ml-3">
                          {item.label}
                        </span>
                        <span
                          className={`${open[item.label] ? "expand_less" : "expand_more"}`}
                        >
                          {open[item.label] ? (
                            <LuChevronUp className="text-xl" />
                          ) : (
                            <LuChevronDown className="text-xl" />
                          )}
                        </span>
                      </>
                    )}
                  </button>
                  {!collapsed && open[item.label] && (
                    <div
                      id={`${item.label}-submenu`}
                      className="ml-10 mt-1 space-y-1"
                    >
                      {item.children.map((child) => {
            
                        return (
                          <Link
                            key={child.label}
                            to={child.to}
                            className={`block px-2 text-wrap py-1 rounded text-sm hover:bg-primary-50 dark:hover:bg-primary-900 text-gray-700 dark:text-gray-200 ${isActive(child.to) ? "bg-blue-100 text-blue-600 font-medium" : ""}`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
            ) : (                       
          <Link
            key={item.label}
            to={item.to}
            title={collapsed ? item.label : ""}
            // className={`flex items-center px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700  text-gray-700 dark:text-gray-200 ${collapsed ? "justify-center" : ""} ${isActive(item.to || "") ? "bg-primary-50 dark:bg-primary-900 border-primary-600  dark:border-primary-400  text-primary-500 dark:text-white font-medium" : ""}`}

            className={`
              flex items-center px-4 py-2 rounded-lg
              transition-all duration-200
              hover:bg-gray-100 dark:hover:bg-gray-700
              ${collapsed ? "justify-center" : ""}
              ${
                isActive(item.to)
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-white font-medium"
                  : "text-gray-700 dark:text-gray-200"
              }
            `}
          >
            <span className="text-xl">{item.icon}</span>

            {!collapsed && (
              <span className="ml-3">{item.label}</span>
            )}
          </Link>)
        })} 
      </nav>
    </aside>
  );
}
