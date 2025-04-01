"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { JobPost } from "../types/jobpost";
import { jobPostService } from "../services/job-post-service";

interface FormData {
  title: string;
  location: string;
  description: string;
  salaryFrom: string;
  salaryTo: string;
  isUrgent: boolean;
  applicationDeadline: string;
  visibility: string;
  companyId: string;
}

const JobPostForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const formattedData: JobPost = {
        ...data,
        salaryFrom: Number(data.salaryFrom),
        salaryTo: Number(data.salaryTo),
        isUrgent: Boolean(data.isUrgent),
        applicationDeadline: new Date(data.applicationDeadline).toISOString(),
        recruiterId: "00", // fill this dynamically later
        companyId: Number(data.companyId),
        visibility: data.visibility as "public" | "unlisted",
      };

      const response = await jobPostService.createJob(formattedData);
      console.log("API Response:", response);
      toast.success("Job posted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Job post error:", error);
      toast.error("Failed to post job. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 mt-10">
      <h2 className="text-2xl font-bold text-center mb-4 text-indigo-600">
        Post a New Job
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Job Title
            </label>
            <input
              {...register("title", { required: "Job title is required" })}
              className={`w-full px-4 py-2 border rounded-md ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g. Electrician"
            />
            {errors.title && (
              <p className="text-sm text-red-600 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Location
            </label>
            <input
              {...register("location", { required: "Location is required" })}
              className={`w-full px-4 py-2 border rounded-md ${
                errors.location ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g. Hyderabad"
            />
            {errors.location && (
              <p className="text-sm text-red-600 mt-1">
                {errors.location.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Salary From
            </label>
            <input
              type="number"
              {...register("salaryFrom", { required: "Required" })}
              className={`w-full px-4 py-2 border rounded-md ${
                errors.salaryFrom ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Salary To
            </label>
            <input
              type="number"
              {...register("salaryTo", { required: "Required" })}
              className={`w-full px-4 py-2 border rounded-md ${
                errors.salaryTo ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Application Deadline
            </label>
            <input
              type="date"
              {...register("applicationDeadline", {
                required: "Application deadline is required",
              })}
              className={`w-full px-4 py-2 border rounded-md ${
                errors.applicationDeadline
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Company ID
            </label>
            <input
              {...register("companyId", { required: "Company ID is required" })}
              className={`w-full px-4 py-2 border rounded-md ${
                errors.companyId ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Job Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className={`w-full px-4 py-2 border rounded-md ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            rows={4}
            placeholder="Describe the job responsibilities, qualifications, and benefits"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label className="font-medium text-gray-700">Is Urgent?</label>
          <input type="checkbox" {...register("isUrgent")} />

          <label className="font-medium text-gray-700">Visibility</label>
          <select
            {...register("visibility", { required: "Visibility is required" })}
            className={`px-4 py-2 border rounded-md ${
              errors.visibility ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="public">Public</option>
            <option value="unlisted">Unlisted</option>
          </select>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition"
          >
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobPostForm;
