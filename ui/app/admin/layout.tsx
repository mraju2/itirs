import { AdminSidebar } from "../../components/admin-side-bar";
import { AdminHeader } from "../../components/admin-header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
