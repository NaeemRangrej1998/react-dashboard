import React from 'react';
import { LuBell, LuLogOut, LuUser } from "react-icons/lu";
export default function Header() {
  return (
    <header className="flex items-center z-[48] h-16 bg-white shadow px-4 justify-end">
      <div className="flex items-center space-x-4">
        
         <button>
            EN
         </button>

<LuUser className="text-xl" />
        {/* Add any header content here, e.g., user profile, notifications */}
      </div>
    </header>
  );
}
