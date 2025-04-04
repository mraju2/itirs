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
    if (sortField !== field) return <span className="ml-1">↕</span>;
    return <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>;
  };

  const SortableHeader = ({
    field,
    children,
  }: {
    field: keyof Company;
    children: React.ReactNode;
  }) => (
    <TableHead>
      <button
        className="flex items-center w-full text-left hover:bg-gray-50"
        onClick={() => onSort(field)}
      >
        {children}
        <SortIcon field={field} />
      </button>
    </TableHead>
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <SortableHeader field="id">ID</SortableHeader>
          <SortableHeader field="name">Name</SortableHeader>
          <SortableHeader field="contactEmail">Email</SortableHeader>
          <SortableHeader field="contactPhone">Phone</SortableHeader>
          <SortableHeader field="city">City</SortableHeader>
          <SortableHeader field="state">State</SortableHeader>
          <SortableHeader field="district">District</SortableHeader>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {companies.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8}>No companies found.</TableCell>
          </TableRow>
        ) : (
          companies.map((company) => (
            <TableRow key={company.contactPhone}>
              <TableCell>{company.id}</TableCell>
              <TableCell title={company.name}>{company.name}</TableCell>
              <TableCell title={company.contactEmail}>
                {company.contactEmail}
              </TableCell>
              <TableCell title={company.contactPhone}>
                {company.contactPhone}
              </TableCell>
              <TableCell>{company.city}</TableCell>
              <TableCell>{company.state}</TableCell>
              <TableCell>{company.district}</TableCell>
              <TableCell>
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
