import { AdminSidebar } from "../../components/admin-side-bar";
import { AdminHeader } from "../../components/admin-header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ✅ Full-width header at the top */}
      <AdminHeader />

      {/* ✅ Sidebar + main content in horizontal layout below */}
      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1 bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}