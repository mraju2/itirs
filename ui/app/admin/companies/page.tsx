"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import { CompaniesTable } from "../../../components/company-table";
import { companyService } from "../../../services/company-service";
import { Company } from "../../../types/company";
import { PlusIcon } from "../../../icons/plus-icon";
import { SmartSearchInput } from "../../../components/smart-search";

const COMPANIES_PER_PAGE = 5;

const CompaniesPage = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Company | "">("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const router = useRouter();

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

  // --- Smart search logic ---
  const parseAdvancedSearch = (search: string): Record<string, string> => {
    const result: Record<string, string> = {};
    const parts = search
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    for (const part of parts) {
      const [key, ...rest] = part.split(":");
      if (key && rest.length > 0) {
        result[key.trim().toLowerCase()] = rest.join(":").trim().toLowerCase();
      }
    }
    return result;
  };

  const matchesAdvancedSearch = (
    company: Company,
    filters: Record<string, string>
  ): boolean => {
    return Object.entries(filters).every(([key, value]) => {
      const field = company[key as keyof Company];
      if (!field) return false;
      return field.toString().toLowerCase().includes(value);
    });
  };

  const filteredAndSortedCompanies = companies
    .filter((company) => {
      const filters = parseAdvancedSearch(searchTerm.trim());
      const matchesSearch =
        Object.keys(filters).length > 0
          ? matchesAdvancedSearch(company, filters)
          : Object.values(company).some((value) =>
              value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
            );
      return matchesSearch;
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
            <SmartSearchInput
              value={searchTerm}
              onChange={(val) => setSearchTerm(val)}
              keys={[
                "name",
                "email",
                "city",
                "state",
                "pincode",
                "country",
                "contactPhone",
              ]}
              examples={[
                "name:tata",
                "city:mumbai",
                "email:info@tata.com",
                "pincode:400001",
              ]}
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

            <button
              onClick={() => router.push("/admin/companies/new")}
              className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md"
            >
              <PlusIcon />
              Add Company
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
