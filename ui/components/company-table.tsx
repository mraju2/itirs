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
          <SortableHeader field="name">Company Name</SortableHeader>
          <SortableHeader field="contactEmail">Email</SortableHeader>
          <SortableHeader field="contactPhone">Phone</SortableHeader>
          <SortableHeader field="city">City</SortableHeader>
          <SortableHeader field="state">State</SortableHeader>
          <SortableHeader field="country">Country</SortableHeader>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {companies.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7}>No companies found.</TableCell>
          </TableRow>
        ) : (
          companies.map((company) => (
            <TableRow key={company.contactPhone}>
              <TableCell>{company.name}</TableCell>
              <TableCell>{company.contactEmail}</TableCell>
              <TableCell>{company.contactPhone}</TableCell>
              <TableCell>{company.city}</TableCell>
              <TableCell>{company.state}</TableCell>
              <TableCell>{company.country}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:underline">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
