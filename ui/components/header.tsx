// components/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import ProfileDropdown from "./ProfileDropdown";
import { supabase } from "@/lib/superbase-clinet";

const Header = () => {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const isRegistrationPage = pathname === "/register";
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    document.cookie = "sb-access-token=; path=/; max-age=0";
  };

  return (
    <header className="bg-white shadow border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left Section: Logo + Nav */}
        <div className="flex items-center gap-4 md:gap-8">
          {/* Logo + Brand */}
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-blue-600 h-9 w-9 flex items-center justify-center text-white font-bold text-base">
              SC
            </div>
            <Link href="/" className="text-xl font-bold text-blue-700 tracking-tight">
              SkillsConnect
            </Link>
          </div>

          {/* Navigation: Jobs, Companies */}
          <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-800">
            <Link href="/jobs" className="hover:text-blue-600 leading-tight">
              <div className="flex flex-col items-start">
                <span className="text-sm">Jobs</span>
                <span className="text-xs text-slate-400">ఉద్యోగాలు</span>
              </div>
            </Link>
            <Link href="/companies" className="hover:text-blue-600 leading-tight">
              <div className="flex flex-col items-start">
                <span className="text-sm">Companies</span>
                <span className="text-xs text-slate-400">కంపెనీలు</span>
              </div>
            </Link>
          </nav>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-slate-600"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Right-side actions */}
        {!isRegistrationPage && (
          <div className="hidden md:flex items-center gap-3">
            {!user && !loading ? (
              <>
                <Link
                  href="/login"
                  className="px-4 py-1.5 border border-blue-600 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-50 transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-1.5 bg-red-500 text-white rounded-full text-sm font-medium hover:bg-red-600 transition"
                >
                  Register
                </Link>
              </>
            ) : user ? (
              <ProfileDropdown
                userName={user.user_metadata?.full_name || "User"}
                onLogout={handleLogout}
              />
            ) : null}
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4">
          <nav className="pt-3 pb-2 border-t flex flex-col gap-2 text-sm font-medium text-slate-800">
            <Link href="/jobs" className="hover:text-blue-600" onClick={() => setMobileOpen(false)}>
              Jobs
            </Link>
            <Link href="/companies" className="hover:text-blue-600" onClick={() => setMobileOpen(false)}>
              Companies
            </Link>
          </nav>
          {!isRegistrationPage && (
            <div className="flex flex-col gap-2">
              {!user && !loading ? (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full text-sm font-medium text-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 bg-red-500 text-white rounded-full text-sm font-medium text-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    Register
                  </Link>
                </>
              ) : user ? (
                <>
                  <Link
                    href="/profile"
                    className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full text-sm font-medium text-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileOpen(false);
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded-full text-sm font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : null}
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
