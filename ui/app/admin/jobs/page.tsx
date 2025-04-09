"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import { JobCard } from "../../../components/job-card";
import { jobPostService } from "../../../services/job-post-service";
import { parseAdvancedSearch } from "@/utils/util";
import { JobPost } from "../../../types/jobpost";
import { CompanyAsyncSelect } from "../../../components/company-select";
import Link from "next/link"; // add this import at the top

const JOBS_PER_PAGE = 9;

const AdminJobListPage = () => {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sortField, setSortField] = useState<keyof JobPost | "createdDate">(
    "createdDate"
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(
    null
  );

  const router = useRouter();

  const handleSearch = () => {
    const parsedFilters = parseAdvancedSearch(searchTerm);
    if (selectedCompanyId) {
      parsedFilters.companyId = selectedCompanyId;
    }
    setFilters(parsedFilters);
    setCurrentPage(1); // Reset to first page
  };

  useEffect(() => {
    const fetchPaginatedJobs = async () => {
      setLoading(true);
      try {
        const res = await jobPostService.getPaginatedJobs(
          currentPage,
          JOBS_PER_PAGE,
          "",
          filters,
          sortField,
          sortDirection === "desc"
        );
        setJobs(res.items);
        setTotalCount(res.totalCount);
        setError(null);
      } catch (err) {
        console.error("[Fetch Jobs Error]", err);
        setError("Failed to load job posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPaginatedJobs();
  }, [currentPage, filters, sortField, sortDirection]);

  const totalPages = Math.ceil(totalCount / JOBS_PER_PAGE);

  const handleJobClick = (id: number) => {
    router.push(`/admin/jobs/${id}`);
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-2">
        <Breadcrumbs
          items={[{ label: "Admin", href: "/admin" }, { label: "Jobs" }]}
        />

        {/* Search + Filters */}
        <div className="flex flex-wrap items-end gap-3 mb-4">
          {/* Company Select */}
          <div className="w-64">
            <CompanyAsyncSelect
              value={selectedCompanyId}
              onChange={(val) => setSelectedCompanyId(val)}
            />
          </div>

          {/* Search Button */}
          <div className="mt-[22px]">
            <button
              type="button"
              onClick={handleSearch}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 h-10 rounded-md"
            >
              Search
            </button>
          </div>

          {/* Reset Button */}
          <div className="mt-[22px]">
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setSortField("createdDate");
                setSortDirection("desc");
                setSelectedCompanyId(null);
                setFilters({});
                setCurrentPage(1);
              }}
              className="bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white text-sm px-4 h-10 rounded-md"
            >
              Reset
            </button>
          </div>
          <div className="mt-[22px]">
            <Link
              href="/admin/jobs/new"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 h-10 rounded-md shadow flex items-center"
            >
              + Add Job
            </Link>
          </div>
        </div>

        {/* Jobs List */}
        <div className="bg-white rounded-lg shadow p-4">
          {loading ? (
            <p className="text-blue-600 text-sm animate-pulse">
              Loading jobs...
            </p>
          ) : error ? (
            <div className="text-red-600 text-sm bg-red-100 px-4 py-2 rounded">
              {error}
            </div>
          ) : jobs.length === 0 ? (
            <p className="text-gray-600">No job posts found.</p>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => handleJobClick(0)}
                  className="cursor-pointer w-full"
                >
                  <JobCard job={job} />
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="bg-gray-50 px-4 py-3 border-t flex justify-between items-center text-sm mt-4">
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

export default AdminJobListPage;
