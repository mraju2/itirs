import React from "react";

export const BookmarkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    {...props}
  >
    <path d="M5 5v16l7 -5l7 5v-16a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2z" />
  </svg>
);
