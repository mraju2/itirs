import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./table";
import { Company } from "../types/company";
import { useRouter } from "next/navigation";
import { Tooltip } from "./tool-tip";

interface CompaniesTableProps {
  companies: Company[];
  onSort: (field: keyof Company) => void;
  sortField: keyof Company | "";
  sortDirection: "asc" | "desc";
}

export const CompaniesTable = ({
  companies,
  onSort,
  sortField,
  sortDirection,
}: CompaniesTableProps) => {
  const router = useRouter();

  const SortIcon = ({ field }: { field: keyof Company }) => {
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
    field: keyof Company;
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
    value: string | null | undefined;
    className?: string;
  }) => (
    <TableCell
      title={value || ""}
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
          <SortableHeader field="id">ID</SortableHeader>
          <SortableHeader field="name">Name</SortableHeader>
          <SortableHeader field="contactEmail">Email</SortableHeader>
          <SortableHeader field="primaryContactPhone">Phone</SortableHeader>
          <SortableHeader field="address">City</SortableHeader>
          <SortableHeader field="stateName">State</SortableHeader>
          <SortableHeader field="districtName">District</SortableHeader>
          <TableHead className="text-sm px-2 py-2 font-semibold bg-slate-200">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {companies.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center text-sm py-2">
              No companies found.
            </TableCell>
          </TableRow>
        ) : (
          companies.map((company) => (
            <TableRow key={company.id} className="text-sm hover:bg-slate-100">
              <TruncatedCell value={company.id} className="max-w-[120px]" />
              <TruncatedCell value={company.name} className="max-w-[180px]" />
              <TruncatedCell
                value={company.contactEmail}
                className="max-w-[160px]"
              />
              <TruncatedCell
                value={company.primaryContactPhone}
                className="max-w-[120px]"
              />
              <TruncatedCell
                value={company.pincode}
                className="max-w-[100px]"
              />
              <TruncatedCell
                value={company.stateName}
                className="max-w-[100px]"
              />
              <TruncatedCell
                value={company.districtName}
                className="max-w-[100px]"
              />
              <TableCell className="text-sm px-2 py-2 whitespace-nowrap">
                <div className="flex gap-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() =>
                      router.push(`/admin/companies/edit/${company.id}`)
                    }
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
