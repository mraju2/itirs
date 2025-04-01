// components/AdminHeader.tsx
"use client";
import Link from "next/link";
import { useState } from "react";

export const AdminHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Toggle this based on actual auth

  return (
    <header className="bg-white border-b shadow-sm px-6 py-4 flex justify-between items-center">
      {/* Left: Logo + Label */}
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 text-white font-bold w-9 h-9 flex items-center justify-center rounded-full">
          SC
        </div>
        <span className="text-xl font-bold text-blue-700 tracking-tight">
          SkillsConnect <span className="text-gray-500">(Admin)</span>
        </span>
      </div>

      {/* Right: Profile / Login */}
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            <span className="text-sm font-medium text-gray-700">Admin</span>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="text-red-600 hover:underline text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};