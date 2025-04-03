"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import { CompaniesTable } from "../../../components/company-table";
import { companyService } from "../../../services/company-service";
import { Company } from "../../../types/company";
import { PlusIcon } from "../../../icons/plus-icon";
import { SmartSearchInput } from "../../../components/smart-search";

const COMPANIES_PER_PAGE = 5;

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

const CompaniesPage = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sortField, setSortField] = useState<keyof Company | "">("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const parsedFilters = parseAdvancedSearch(searchTerm);
    setFilters(parsedFilters);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm]);

  useEffect(() => {
    const fetchPaginatedCompanies = async () => {
      setLoading(true);
      try {
        const res = await companyService.getPaginatedCompanies(
          currentPage,
          COMPANIES_PER_PAGE,
          searchTerm,
          sortField,
          sortDirection === "desc",
          filters
        );
        setCompanies(res.items);
        setTotalCount(res.totalCount);
        setError(null);
      } catch (error: unknown) {
        const typedError = error as Error & {
          status?: number;
          body?: { title?: string; message?: string };
        };
      
        const title = typedError.body?.title || "Error";
        const message =
          typedError.body?.message || typedError.message || "Something went wrong";
      
        if (process.env.NODE_ENV === "development") {
          console.error(`[API Error] ${title}: ${message}`);
        }
      
        setError(message);
      }
       finally {
        setLoading(false);
      }
    };

    fetchPaginatedCompanies();
  }, [currentPage, searchTerm, sortField, sortDirection, filters]);

  const handleSort = (field: keyof Company) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const totalPages = Math.ceil(totalCount / COMPANIES_PER_PAGE);

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
                setCurrentPage(1);
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
            {loading ? (
              <p className="text-blue-600 text-sm animate-pulse">
                Loading companies...
              </p>
            ) : error ? (
              <div className="text-red-600 text-sm bg-red-100 px-4 py-2 rounded">
                {error}
              </div>
            ) : companies.length === 0 ? (
              <p className="text-gray-600">No companies found.</p>
            ) : (
              <CompaniesTable
                companies={companies}
                onSort={handleSort}
                sortField={sortField}
                sortDirection={sortDirection}
              />
            )}
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
