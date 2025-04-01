import React from "react";
import { useRouter } from "next/navigation"; // or use `useNavigate` from react-router-dom if not using Next.js
import { JobPost } from "../types/jobpost"; // Adjust the import path as necessary  

interface JobCardProps {
  job: JobPost;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const router = useRouter();

  const handleApplyClick = () => {
    router.push(`/jobs/${job.id}`);
  };

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-md p-4 hover:shadow-md transition-all">
      <h2 className="text-lg font-semibold text-gray-800">{job.title}</h2>
      <p className="text-sm text-gray-600">{job.location}</p>
      <p className="text-sm text-gray-500 mt-1">Salary: ₹{job.salaryFrom} - ₹{job.salaryTo}</p>
      {job.isUrgent && (
        <span className="inline-block text-xs font-medium text-red-600 mt-2">
          🚨 Urgent Hiring
        </span>
      )}

      <div className="mt-4">
        <button
          onClick={handleApplyClick}
          className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default JobCard;
