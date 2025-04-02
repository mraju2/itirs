"use client";

import { useEffect, useState } from "react";
import { Breadcrumbs } from "../../components/breadcrumbs";
import { CompaniesTable } from "../../components/company-table";
import { companyService } from "../../services/company-service";
import { Company } from "../../types/company";

const COMPANIES_PER_PAGE = 5;

const CompaniesPage = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Company | "">("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await companyService.getAllCompanies();
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
        setCompanies([]);
      }
    };
    fetchCompanies();
  }, []);

  const filteredAndSortedCompanies = companies
    .filter((company) => {
      return (
        searchTerm === "" ||
        Object.values(company).some((value) =>
          value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    })
    .sort((a, b) => {
      if (!sortField) return 0;
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (aValue === bValue) return 0;
      if (!aValue) return 1;
      if (!bValue) return -1;
      const comparison = aValue < bValue ? -1 : 1;
      return sortDirection === "asc" ? comparison : -comparison;
    });

  const startIndex = (currentPage - 1) * COMPANIES_PER_PAGE;
  const currentCompanies = filteredAndSortedCompanies.slice(
    startIndex,
    startIndex + COMPANIES_PER_PAGE
  );
  const totalPages = Math.ceil(
    filteredAndSortedCompanies.length / COMPANIES_PER_PAGE
  );

  const handleSort = (field: keyof Company) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-2">
        <Breadcrumbs
          items={[{ label: "Admin", href: "/admin" }, { label: "Companies" }]}
        />

        <div className="bg-white rounded-lg shadow p-3 mb-3">
          <div className="flex flex-wrap gap-2 items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search companies..."
              className="flex-1 min-w-[220px] px-3 py-1.5 text-sm border border-gray-300 rounded-md text-black"
            />

            <button
              onClick={() => {
                setSearchTerm("");
                setSortField("");
                setSortDirection("asc");
              }}
              className="bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white text-sm px-4 py-2 rounded-md"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4">
            <CompaniesTable
              companies={currentCompanies}
              onSort={handleSort}
              sortField={sortField}
              sortDirection={sortDirection}
            />
          </div>

          <div className="bg-gray-50 px-4 py-3 border-t flex justify-between items-center text-sm">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-3 py-1 rounded bg-indigo-600 text-white disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-3 py-1 rounded bg-indigo-600 text-white disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompaniesPage;
