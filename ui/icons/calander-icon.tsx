import React from "react";

export const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-calendar"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M4 7h16" />
    <path d="M10 11h1v1h-1z" />
    <path d="M4 19a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-11a2 2 0 0 0 -2 -2h-12a2 2 0 0 0 -2 2z" />
    <path d="M16 3v4" />
    <path d="M8 3v4" />
  </svg>
);
