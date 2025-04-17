import React from "react";

export const GraduationCap: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-school"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M22 12l-10 -6l-10 6l10 6z" />
    <path d="M6 18v-6" />
    <path d="M18 18v-6" />
    <path d="M12 15v6" />
  </svg>
);
