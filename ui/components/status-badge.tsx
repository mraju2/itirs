import React from "react";
import { JobPostStatus } from "../types/jobpost";

const statusLabelMap: Record<
  JobPostStatus,
  { label: string; bgClass: string; textClass: string }
> = {
  [JobPostStatus.Created]: {
    label: "Created",
    bgClass: "bg-orange-100",
    textClass: "text-orange-800",
  },
  [JobPostStatus.Active]: {
    label: "Active",
    bgClass: "bg-green-100",
    textClass: "text-green-800",
  },
  [JobPostStatus.Deactivated]: {
    label: "Deactivated",
    bgClass: "bg-red-100",
    textClass: "text-red-800",
  },
};

interface StatusBadgeProps {
  status: JobPostStatus;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className = "",
}) => {
  const statusInfo = statusLabelMap[status] || {
    label: "Unknown",
    bgClass: "bg-slate-100",
    textClass: "text-slate-800",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.bgClass} ${statusInfo.textClass} ${className}`}
    >
      {statusInfo.label}
    </span>
  );
};
