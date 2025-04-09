"use client";

import React from "react";
import { JobPostCreateForm } from "../../../../components/job-post-registration";
import { Breadcrumbs } from "@/components/breadcrumbs";

const JobPostCreatePage = () => {
  return (
    <div className="min-h-screen bg-blue-50 py-6 px-4">
      <div className="max-w-5xl mx-auto">
        <Breadcrumbs
          items={[
            { label: "Admin", href: "/admin" },
            { label: "Jobs", href: "/admin/jobs" },
            { label: "Create Job" },
          ]}
        />
        <JobPostCreateForm />
      </div>
    </div>
  );
};

export default JobPostCreatePage;
