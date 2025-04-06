import React from "react";
import { useRouter } from "next/navigation";
import { BriefcaseIcon, MapPinIcon, RupeeIcon, BookmarkIcon } from "../icons";
import { JobPost } from "../types/jobpost"; // Updated DTO-based interface

interface JobCardProps {
  job: JobPost;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/jobs/${job.id}`);
  };

  const experience = job.experienceMin ?? 0;
  const salaryInfo =
    job.salaryMin && job.salaryMax
      ? `₹${job.salaryMin} - ₹${job.salaryMax}`
      : "Not disclosed";
  const tags = job.trades?.map((t) => t.name) ?? ["ITI", "Electrician"];
  const location = job.jobLocation || job.district || "Location";

  return (
    <div
      onClick={handleClick}
      className="group bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between min-h-[220px]"
    >
      {/* Header Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">
          {job.jobTitle}
        </h2>
        <p className="text-sm text-gray-600 mt-1 line-clamp-1">
          {job.companyName}
        </p>
      </div>

      {/* Meta Info */}
      <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-700">
        <div className="flex items-center gap-1">
          <BriefcaseIcon className="w-4 h-4" />
          <span>{experience} Yrs</span>
        </div>
        <div className="flex items-center gap-1">
          <RupeeIcon className="w-4 h-4" />
          <span>{salaryInfo}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPinIcon className="w-4 h-4" />
          <span>{location}</span>
        </div>
      </div>

      {/* Description Snippet */}
      <p className="text-sm text-gray-600 mt-3 line-clamp-2">
        {job.jobDescription.slice(0, 100)}...
      </p>

      {/* Tags */}
      <div className="flex flex-wrap mt-3 gap-2 text-xs text-gray-500 max-h-[48px] overflow-hidden">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-gray-100 rounded-full whitespace-nowrap"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4 text-xs text-gray-400">
        <span>1 day ago</span>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click
          }}
          className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
        >
          <BookmarkIcon className="w-4 h-4" />
          <span>Save</span>
        </button>
      </div>
    </div>
  );
};

export default JobCard;
