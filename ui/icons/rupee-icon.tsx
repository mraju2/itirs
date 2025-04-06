import React from "react";

export const RupeeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    {...props}
  >
    <path d="M18 5h-11h3a4 4 0 0 1 0 8h-3l6 6" />
    <path d="M7 9l11 0" />
  </svg>
);
