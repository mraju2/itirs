import React from "react";
import { notFound } from "next/navigation";
import { jobPostService } from "../../../../services/job-post-service"; // Adjust the import path if necessary
import { JobPost } from "../../../../types/jobpost"; // Adjust the import path if necessary

type Params = {
  params: {
    id: string;
  };
};

const AdminJobDetailsPage = async ({ params }: Params) => {
  const job: JobPost | null = await jobPostService
    .getJobById(Number(params.id))
    .catch(() => null);

  if (!job) return notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold text-slate-800">{job.title}</h1>
      <p className="text-slate-600 mt-2">{job.location}</p>

      <div className="mt-6 text-slate-700">
        <p className="whitespace-pre-wrap">{job.description}</p>
      </div>

      <div className="mt-6">
        <p className="text-sm text-gray-600">
          Salary: ₹{job.salaryFrom} - ₹{job.salaryTo}
        </p>
        <p className="text-sm text-gray-600">
          Deadline: {new Date(job.applicationDeadline).toDateString()}
        </p>
        <p className="text-sm text-gray-600">Visibility: {job.visibility}</p>
        <p className="text-sm text-gray-600">
          Urgent: {job.isUrgent ? "Yes" : "No"}
        </p>
      </div>
    </div>
  );
};

export default AdminJobDetailsPage;
