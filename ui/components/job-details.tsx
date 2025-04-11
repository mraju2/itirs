"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // or `useParams()` from react-router-dom
import { jobPostService } from "../services/job-post-service"; // Adjust the import path as necessary
import { JobPost } from "../types/jobPost"; // Adjust the import path as necessary

const JobDetailsPage: React.FC = () => {
  const { id } = useParams(); // e.g., /jobs/:id
  const [job, setJob] = useState<JobPost | null>(null);

  useEffect(() => {
    if (id) {
      jobPostService.getJobById(Number(id)).then(setJob);
    }
  }, [id]);

  if (!job) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-md mt-6">
      <h1 className="text-2xl font-bold text-gray-800">{job.title}</h1>
      <p className="text-gray-600 mt-2">{job.location}</p>

      <div className="mt-4">
        <p className="text-sm text-gray-700 whitespace-pre-wrap">
          {job.description}
        </p>
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

      <div className="mt-6">
        <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Proceed to Apply
        </button>
      </div>
    </div>
  );
};

export default JobDetailsPage;
