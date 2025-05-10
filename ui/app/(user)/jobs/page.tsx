// pages/jobs.tsx

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { JobsHeader } from "@/components/jobs-header";
import { JobsSearchForm } from "@/components/job-search-form";
import { FiltersLayout } from "@/components/filters-layout";
import { JobCard } from "@/components/job-card";
import { JobCallToAction } from "@/components/job-message";
import { Pagination } from "@/components/pagination";
import { jobPostService } from "@/services/job-post-service";
import { JobPost } from "@/types/jobpost";

export default function Jobs() {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const pageSize = 10; // Number of jobs per page

  // Fetch jobs from the API
  const fetchJobs = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await jobPostService.getPaginatedJobs(page, pageSize);
      setJobs(response.items);
      setTotalPages(Math.ceil(response.totalCount / pageSize));
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchJobs(page);
  };

  // Fetch jobs on initial render
  useEffect(() => {
    fetchJobs(currentPage);
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <section className="bg-gradient-to-br from-sky-500 to-indigo-600 text-white pb-4 rounded-b-2xl shadow-xl">
        <div className="max-w-6xl mx-auto px-4">
          <JobsHeader />
          <JobsSearchForm />
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters - Desktop */}
          <FiltersLayout />

          {/* Job Listings */}
          <div className="w-full lg:w-3/4">
            <div className="mb-5 flex justify-between items-center">
              <p className="text-slate-700">
                {isLoading ? "Loading jobs..." : `${jobs.length} jobs found`}
              </p>
              <div className="flex items-center">
                <span className="text-sm text-slate-700 mr-2">Sort by:</span>
                <select className="border border-slate-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <option>Most Relevant</option>
                  <option>Newest First</option>
                  <option>Salary (High to Low)</option>
                  <option>Salary (Low to High)</option>
                </select>
              </div>
            </div>

            {/* Job Cards */}
            <div className="space-y-4">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            {/* Pagination */}
            {/* Stable Pagination */}
            <div className="min-h-[64px] mt-8 flex justify-center items-center">
              {!isLoading && jobs.length === 0 ? (
                <p className="text-slate-500 text-sm">No jobs found.</p>
              ) : (
                totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <JobCallToAction />

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="bg-blue-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">
                  SC
                </div>
                <span className="text-white font-bold text-xl">
                  SkillsConnect
                </span>
              </Link>
              <p className="text-slate-400">
                Bridging the gap between ITI talent and industry requirements.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-slate-400 hover:text-white transition"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-slate-400 hover:text-white transition"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-slate-400 hover:text-white transition"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-slate-400 hover:text-white transition"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">For Candidates</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/jobs"
                    className="text-slate-400 hover:text-white transition"
                  >
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/companies"
                    className="text-slate-400 hover:text-white transition"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resources"
                    className="text-slate-400 hover:text-white transition"
                  >
                    Career Resources
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className="text-slate-400 hover:text-white transition"
                  >
                    My Profile
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">For Employers</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/post-job"
                    className="text-slate-400 hover:text-white transition"
                  >
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-slate-400 hover:text-white transition"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resources/employer"
                    className="text-slate-400 hover:text-white transition"
                  >
                    Resources
                  </Link>
                </li>
                <li>
                  <Link
                    href="/employer-login"
                    className="text-slate-400 hover:text-white transition"
                  >
                    Employer Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-400">
            <p>
              © {new Date().getFullYear()} SkillsConnect. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
