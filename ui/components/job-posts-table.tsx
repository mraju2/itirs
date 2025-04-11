import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./table";
import { JobPost } from "../types/jobPost";
import { useRouter } from "next/navigation";
import { Tooltip } from "./tool-tip";

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
    <Table>
      <TableHeader>
        <TableRow>
          <SortableHeader field="jobTitle">Job Title</SortableHeader>
          <SortableHeader field="companyName">Company</SortableHeader>
          <SortableHeader field="jobLocation">Location</SortableHeader>
          <SortableHeader field="salaryMin">Salary</SortableHeader>
          <SortableHeader field="experienceMin">Experience</SortableHeader>
          <TableHead className="text-sm px-2 py-2 font-semibold bg-slate-200">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobPosts.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center text-sm py-2">
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
                <div className="flex gap-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => router.push(`/admin/jobs/edit/${job.id}`)}
                  >
                    Edit
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
  );
};
