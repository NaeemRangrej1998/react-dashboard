import React from 'react';
import { LuLogOut, LuUser } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext.jsx";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="flex items-center z-[48] h-16 bg-white shadow px-4 justify-end">
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="text-sm font-semibold text-slate-800">{user?.name}</p>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{user?.role}</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center">
          <LuUser className="text-xl" />
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          <LuLogOut />
          Logout
        </button>
      </div>
    </header>
  );
}
