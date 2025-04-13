import React from "react";
import { JobPost } from "../types/jobpost";

interface JobStatusJobDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  job: JobPost | null;
  actionLabel: string; // e.g., 'Activate', 'Deactivate'
}

export const JobStatusJobDialog: React.FC<JobStatusJobDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  job,
  actionLabel,
}) => {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Confirm {actionLabel} Job
        </h2>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-6">
          <div>
            <strong>Job Title:</strong> {job.jobTitle}
          </div>
          <div>
            <strong>Company:</strong> {job.companyName}
          </div>
          <div>
            <strong>State:</strong> {job.stateName}
          </div>
          <div>
            <strong>District:</strong> {job.districtName}
          </div>
          <div>
            <strong>Location:</strong> {job.jobLocation}
          </div>
          <div>
            <strong>Gender:</strong> {job.genderRequirement}
          </div>
          <div>
            <strong>Min Age:</strong> {job.minAge}
          </div>
          <div>
            <strong>Max Age:</strong> {job.maxAge ?? "-"}
          </div>
          <div>
            <strong>Salary:</strong> ₹{job.salaryMin} - ₹{job.salaryMax}
          </div>
          <div>
            <strong>Experience:</strong> {job.experienceMin} -{" "}
            {job.experienceMax ?? "Any"} yrs
          </div>
          <div>
            <strong>Working Hours:</strong> {job.workingHoursMin} -{" "}
            {job.workingHoursMax}
          </div>
          <div>
            <strong>Accommodation:</strong>{" "}
            {job.accommodationProvided ? "Yes" : "No"}
          </div>
          <div>
            <strong>Urgent Requirement:</strong> {job.urgent ? "Yes" : "No"}
          </div>
          <div className="col-span-2">
            <strong>Description:</strong>
            <p className="text-gray-600 mt-1">{job.jobDescription}</p>
          </div>

          {actionLabel === "Activate" && (
            <div className="col-span-2 bg-yellow-100 border border-yellow-300 text-yellow-800 text-sm rounded px-4 py-3 mb-4">
              ⚠️ <strong>Important:</strong> Activating this job will make it
              publicly visible. Please verify job title, location, salary, and
              other key details before proceeding.
            </div>
          )}

          {job.additionalBenefits && (
            <div className="col-span-2">
              <strong>Additional Benefits:</strong>
              <p className="text-gray-600 mt-1">{job.additionalBenefits}</p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
