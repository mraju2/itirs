import React from "react";
import { useRouter } from "next/navigation";
import { JobPost } from "../types/jobpost";
import { BriefcaseIcon, MapPinIcon, RupeeIcon, BookmarkIcon } from "../icons";

interface JobCardProps {
  job: JobPost;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/jobs/${job.id}`);
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between h-[320px]"
      onClick={handleClick}
    >
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{job.title}</h2>
        <p className="text-sm text-gray-600">
          {job.company?.name || "Company Name"}{" "}
          <span className="text-yellow-500">★ 3.4</span>{" "}
          <span className="text-gray-400">| 560 Reviews</span>
        </p>

        {/* Meta */}
        <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-700">
          <div className="flex items-center gap-1">
            <BriefcaseIcon/>
            <span>{job.experienceRequired ?? "0"} Yrs</span>
          </div>
          <div className="flex items-center gap-1">
            <RupeeIcon/>
            <span>
              {job.salaryFrom && job.salaryTo
                ? `₹${job.salaryFrom} - ₹${job.salaryTo}`
                : "Not disclosed"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <MapPinIcon/>
            <span>{job.location || "Location"}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-3 line-clamp-2">
          Notice Period: Immediate or up to 15 days preferred.{" "}
          {job.description?.slice(0, 100)}...
        </p>

        {/* Tags */}
        <div className="flex flex-wrap mt-2 gap-2 text-xs text-gray-500 overflow-hidden max-h-[48px]">
          {(
            job.itiCertifications?.split(",") || ["HTML", "CSS", "React.Js"]
          ).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 rounded-full whitespace-nowrap"
            >
              {tag.trim()}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4 text-xs text-gray-400">
        <span>1 day ago</span>
        <div className="flex items-center gap-1">
          <BookmarkIcon className="text-gray-500" />
          <span>Save</span>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
