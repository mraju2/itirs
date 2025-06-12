"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/auth-context";
import { AdminSidebar } from "../../components/admin-side-bar";
import { AdminHeader } from "../../components/admin-header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.user_metadata.role !== "admin")) {
      router.replace("/unauthorized");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user || user.user_metadata.role !== "admin") {
    return null;
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Fixed height header */}
      <div className="h-16 shrink-0 sticky top-0 z-10">
        <AdminHeader />
      </div>

      {/* Sidebar + main layout below */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar with fixed width and full height */}
        <div className="hidden lg:block w-64 shrink-0 overflow-y-auto bg-white border-r">
          <AdminSidebar />
        </div>

        {/* Main scrollable content area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
