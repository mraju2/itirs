// components/Nav.tsx
"use client";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/superbase-clinet";

export const Nav = () => {
  const { user } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <header className="bg-slate-950 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          SkillsConnect
        </Link>

        <div className="flex gap-4 items-center">
          <Link href="/jobs" className="hover:text-blue-400 transition">
            Jobs
          </Link>
          {user ? (
            <>
              <Link
                href="/user/dashboard"
                className="hover:text-blue-400 transition"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
