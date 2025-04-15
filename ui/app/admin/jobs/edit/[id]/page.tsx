"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { jobPostService } from "@/services/job-post-service";
import { JobPostEditForm } from "@/components/job-post-edit";
import { JobPost } from "../../../../../types/jobpost";
const JobPostEditPage = () => {
  const { id } = useParams();

  const [jobPost, setJobPost] = useState<JobPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchJobPost = async () => {
      try {
        const result = await jobPostService.getJobById(id as string);
        setJobPost(result);
      } catch (err) {
        console.error("Failed to fetch job post:", err);
        setError("Unable to load job post.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobPost();
  }, [id]);

  // const disabledFields: (keyof JobPost)[] = ["companyId", "createdAtUnix"];

  return (
    <div className="min-h-screen bg-blue-50 py-6 px-4">
      <div className="max-w-5xl mx-auto">
        <Breadcrumbs
          items={[
            { label: "Admin", href: "/admin" },
            { label: "Jobs", href: "/admin/jobs" },
            { label: "Edit Job" },
          ]}
        />

        {loading ? (
          <p className="text-blue-600 text-sm animate-pulse">
            Loading job post...
          </p>
        ) : error ? (
          <p className="text-red-600 bg-red-100 px-4 py-2 rounded">{error}</p>
        ) : jobPost ? (
          <JobPostEditForm initialValues={jobPost} />
        ) : (
          <p className="text-gray-600">Job post not found.</p>
        )}
      </div>
    </div>
  );
};

export default JobPostEditPage;
