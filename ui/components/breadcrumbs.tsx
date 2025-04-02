"use client";
import Link from "next/link";

type Breadcrumb = {
  label: string;
  href?: string; // Optional: if not provided, it's the current page
};

interface BreadcrumbsProps {
  items: Breadcrumb[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav className="text-sm text-gray-600 mb-2" aria-label="Breadcrumb">
      <ol className="list-reset flex items-center space-x-1">
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-1">
            {item.href ? (
              <Link
                href={item.href}
                className="text-indigo-600 hover:underline font-medium"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-500">{item.label}</span>
            )}
            {index < items.length - 1 && <span>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};
