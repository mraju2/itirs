import React from "react";
import { useRouter } from "next/navigation";
import {
  BriefcaseIcon,
  MapPinIcon,
  RupeeIcon,
  BookmarkIcon,
  BuildingIcon,
  GraduationCap,
  CalendarIcon,
} from "../icons";
import { JobPost } from "../types/jobpost";

interface JobCardProps {
  job: JobPost;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/jobs/${job.id}`);
  };

  const experience = job.experienceMin
    ? `${job.experienceMin}+ yrs`
    : "Fresher";
  const salary =
    job.salaryMin && job.salaryMax
      ? `₹${job.salaryMin} - ₹${job.salaryMax}`
      : "Not disclosed";
  const location = job.jobLocation || job.districtName || "Location";
  const companyName = job.companyName || "Company Name";
  const jobTitle = job.jobTitle || "Job Title";
  const qualification = job.jobDescription || "Qualification";
  const postedDate = job.createdAtUnix
    ? new Date(job.createdAtUnix * 1000).toLocaleDateString()
    : "N/A";

  return (
    <div
      className="bg-white rounded-xl border border-slate-200 hover:shadow-md transition p-4 cursor-pointer relative"
      onClick={handleClick}
    >
      {/* Title + Save Icon */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-base font-semibold text-slate-900 mb-1">
            {jobTitle}
          </h3>
          <div className="flex items-center text-sm text-slate-600">
            <BuildingIcon className="w-4 h-4 mr-1" />
            {companyName}
          </div>
        </div>
        <button
          className="text-slate-400 hover:text-blue-600"
          onClick={(e) => e.stopPropagation()}
        >
          <BookmarkIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Experience | Salary | Location */}
      <div className="flex flex-wrap text-sm text-slate-700 gap-x-3 mb-2">
        <span className="flex items-center">
          <BriefcaseIcon className="w-4 h-4 mr-1" />
          {experience}
        </span>
        <span>|</span>
        <span className="flex items-center">
          <RupeeIcon className="w-4 h-4 mr-1" />
          {salary}
        </span>
        <span>|</span>
        <span className="flex items-center">
          <MapPinIcon className="w-4 h-4 mr-1" />
          {location}
        </span>
      </div>

      {/* Qualification */}
      <p className="text-sm text-slate-600 truncate mb-2">{qualification}</p>

      {/* Employment Type */}
      <div className="flex items-center text-xs text-slate-500 mb-2">
        <GraduationCap className="w-4 h-4 mr-1" />
        {job.employmentType ?? "Full-time"}
      </div>

      {/* Footer */}
      <div className="flex justify-between text-xs text-slate-500">
        <span className="flex items-center">
          <CalendarIcon className="w-3.5 h-3.5 mr-1" />
          Posted: {postedDate}
        </span>
        <button
          className="text-blue-600 font-medium hover:underline text-sm"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default JobCard;
