import React from "react";
import { JobPostStatus } from "../types/jobpost";

const statusLabelMap: Record<JobPostStatus, { label: string; color: string }> =
  {
    [JobPostStatus.Created]: { label: "Created", color: "orange" },
    [JobPostStatus.Active]: { label: "Active", color: "green" },
    [JobPostStatus.Deactivated]: { label: "Deactivated", color: "red" },
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
    color: "slate",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium bg-${statusInfo.color}-100 text-${statusInfo.color}-800 ${className}`}
    >
      {statusInfo.label}
    </span>
  );
};
