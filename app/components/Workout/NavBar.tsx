"use client";

import { signOut } from "next-auth/react";

interface NavBar {
  name: string;
}

const NavBar: React.FC<NavBar> = ({ name }) => {
  return (
    <nav className="flex items-center gap-12 justify-between p-4 bg-[#FAFAFA]">
      <div className="text-xl font-bold text-[#1E1E1E]">WORKOUTTODO</div>
      <div className="text-[#1E1E1E] flex sm:flex-row flex-col justify-center items-center">
        <span className="text-center text-[#1E1E1E]">Welcome, {name}</span>
        <button
          onClick={() => signOut()}
          className="px-4 py-1 text-white bg-red-500 rounded-md hover:bg-red-400"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
