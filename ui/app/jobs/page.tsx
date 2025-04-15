import React, { useEffect, useState } from "react";
import { JobPost } from "../../types/jobPost"; // Adjust the import path as necessary
import JobCard from "../../components/job-card"; // Adjust the import path as necessary
import { jobPostService } from "../../services/job-post-service"; // Adjust the import path as necessary
import { ToastProvider } from "@/components/toast-provider";

const JobListPage: React.FC = () => {
  const [jobs, setJobs] = useState<JobPost[]>([]);

  useEffect(() => {
    jobPostService.getAllJobs().then(setJobs).catch(console.error);
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Available Jobs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      <ToastProvider />
    </main>
  );
};

export default JobListPage;
