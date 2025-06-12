"use client";

import React, { useRef, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./table";
import { JobPost, JobPostStatus } from "../types/jobpost";
import { useRouter } from "next/navigation";
import { Tooltip } from "./tool-tip";
import { StatusBadge } from "./status-badge";
import { JobStatusChangeDialog } from "./job-status-change-dialog";
import { jobPostService } from "../services/job-post-service";

interface JobPostsTableProps {
  jobPosts: JobPost[];
  onSort: (field: keyof JobPost) => void;
  sortField: keyof JobPost | "";
  sortDirection: "asc" | "desc";
}

export const JobPostsTable = ({
  jobPosts,
  onSort,
  sortField,
  sortDirection,
}: JobPostsTableProps) => {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobPost | null>(null);
  const actionRef = useRef<HTMLButtonElement>(null!);

  const handleStatusClick = (job: JobPost, buttonRef: HTMLButtonElement) => {
    setSelectedJob(job);
    actionRef.current = buttonRef;
    setShowConfirm(true);
  };

  const handleStatusConfirm = async () => {
    if (!selectedJob) return;
    const nextStatus =
      selectedJob.status === JobPostStatus.Deactivated
        ? JobPostStatus.Active
        : JobPostStatus.Deactivated;

    try {
      await jobPostService.updateJobPostStatus(
        selectedJob.id!,
        nextStatus,
        "AdminUser123" // Replace with actual user performing the action
      );
    } catch (error) {
      console.error("Failed to update job post status:", error);
    }

    setShowConfirm(false);
    setSelectedJob(null);
  };

  const SortIcon = ({ field }: { field: keyof JobPost }) => {
    if (sortField !== field)
      return <span className="ml-1 text-slate-400">⇅</span>;
    return (
      <span className="ml-1 text-slate-800">
        {sortDirection === "asc" ? "↑" : "↓"}
      </span>
    );
  };

  const SortableHeader = ({
    field,
    children,
  }: {
    field: keyof JobPost;
    children: React.ReactNode;
  }) => (
    <TableHead className="text-sm px-2 py-2 font-semibold bg-slate-200">
      <button
        className="flex items-center w-full text-left"
        onClick={() => onSort(field)}
      >
        {children}
        <SortIcon field={field} />
      </button>
    </TableHead>
  );

  const TruncatedCell = ({
    value,
    className = "",
  }: {
    value: string | number | null | undefined;
    className?: string;
  }) => (
    <TableCell
      title={String(value || "")}
      className={`truncate whitespace-nowrap max-w-[160px] text-sm px-2 py-2 ${className}`}
    >
      <Tooltip content={String(value)}>
        <span className="truncate max-w-[160px] inline-block whitespace-nowrap overflow-hidden">
          {value}
        </span>
      </Tooltip>
    </TableCell>
  );

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <SortableHeader field="jobTitle">Job Title</SortableHeader>
            <SortableHeader field="companyName">Company</SortableHeader>
            <SortableHeader field="jobLocation">Location</SortableHeader>
            <SortableHeader field="salaryMin">Salary</SortableHeader>
            <SortableHeader field="experienceMin">Experience</SortableHeader>
            <SortableHeader field="status">Status</SortableHeader>
            <TableHead className="text-sm px-2 py-2 font-semibold bg-slate-200">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobPosts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-sm py-2">
                No job posts found.
              </TableCell>
            </TableRow>
          ) : (
            jobPosts.map((job) => (
              <TableRow key={job.id} className="text-sm hover:bg-slate-100">
                <TruncatedCell value={job.jobTitle} className="max-w-[180px]" />
                <TruncatedCell value={job.companyName} />
                <TruncatedCell value={job.jobLocation} />
                <TruncatedCell
                  value={`₹${job.salaryMin.toLocaleString()} - ₹${job.salaryMax.toLocaleString()}`}
                />
                <TruncatedCell
                  value={
                    job.experienceMin !== undefined
                      ? `${job.experienceMin}${
                          job.experienceMax ? ` - ${job.experienceMax}` : ""
                        } yrs`
                      : "-"
                  }
                />
                <TableCell className="text-sm px-2 py-2 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={job.status} />
                    {(job.status === JobPostStatus.Active ||
                      job.status === JobPostStatus.Deactivated ||
                      job.status === JobPostStatus.Created) && (
                      <button
                        className="text-xs text-blue-600 underline"
                        ref={(el) => {
                          if (selectedJob?.id === job.id && el)
                            actionRef.current = el;
                        }}
                        onClick={(e) => handleStatusClick(job, e.currentTarget)}
                      >
                        {job.status === JobPostStatus.Active
                          ? "Deactivate"
                          : "Activate"}
                      </button>
                    )}
                  </div>
                </TableCell>

                <TableCell className="text-sm px-2 py-2 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => router.push(`/admin/jobs/edit/${job.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() =>
                        router.push(`/admin/jobs/applications/${job.id}`)
                      }
                    >
                      Applications
                    </button>
                    <button className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <JobStatusChangeDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleStatusConfirm}
        job={selectedJob}
        actionLabel={
          selectedJob?.status === JobPostStatus.Created
            ? "Activate"
            : "Deactivate"
        }
        newStatus={
          selectedJob?.status === JobPostStatus.Created
            ? JobPostStatus.Active
            : JobPostStatus.Deactivated
        }
        changedBy="AdminUser123" // Replace with actual user performing the action
      />
    </>
  );
};
