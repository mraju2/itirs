import React from "react";
import { notFound } from "next/navigation";
import { jobPostService } from "../../../../services/job-post-service"; // Adjust the import path as necessary
import { JobPost } from "../../../../types/jobPost"; // Adjust the import path as necessaryimport { JobPostDto } from "../../../types/jobpost"; // Adjust the import path as necessary

type Params = {
  params: {
    id: string;
  };
};

const JobDetailsPage = async ({ params }: Params) => {
  const job: JobPost | null = await jobPostService
    .getJobById(Number(params.id))
    .catch(() => null);

  if (!job) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-800">{job.title}</h1>
      <p className="text-slate-600 mt-2">{job.location}</p>

      <div className="mt-6 text-slate-700">
        <p className="whitespace-pre-wrap">{job.description}</p>
        <div className="mt-4">
          <p>
            <strong>Salary:</strong> ₹{job.salaryFrom} – ₹{job.salaryTo}
          </p>
          <p>
            <strong>Urgent:</strong> {job.isUrgent ? "Yes" : "No"}
          </p>
          <p>
            <strong>Deadline:</strong>{" "}
            {new Date(job.applicationDeadline).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobDetailsPage;
