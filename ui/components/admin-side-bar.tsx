"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx"; // ✅ using clsx

const adminLinks = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "📊" },
  { label: "Register Company", href: "/admin/companies/register", icon: "🏢" },
  { label: "Companies", href: "/admin/companies", icon: "🏭" },
  { label: "Users", href: "/admin/users", icon: "👥" },
  { label: "Applications", href: "/admin/applications", icon: "📄" },
];

export const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen hidden lg:block">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-2xl font-bold text-indigo-400">Admin Panel</h2>
      </div>
      <nav className="p-4 space-y-2">
        {adminLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "flex items-center px-4 py-2 rounded-md transition hover:bg-indigo-600",
                {
                  "bg-indigo-700": isActive,
                  "text-gray-200": !isActive,
                }
              )}
            >
              <span className="mr-2 text-lg">{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside> // ✅ This is the correct closing tag
  );
};
