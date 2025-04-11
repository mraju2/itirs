"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { JobPost } from "@/types/jobPost";
import { jobPostService } from "@/services/job-post-service";

interface JobPostEditFormProps {
  job: JobPost;
  onSuccess?: () => void;
}

export const JobPostEditForm = ({ job, onSuccess }: JobPostEditFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<JobPost>({
    defaultValues: job,
  });

  const onSubmit = async (data: JobPost) => {
    try {
      await jobPostService.updateJob(job.id!, data);
      onSuccess?.();
    } catch (err) {
      console.error("Failed to update job post:", err);
      alert("Failed to update job. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow p-6 rounded space-y-4"
    >
      <div>
        <label className="block text-sm font-medium">Job Title</label>
        <input
          type="text"
          {...register("jobTitle", { required: true })}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.jobTitle && (
          <p className="text-sm text-red-600">Job title is required.</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Location</label>
        <input
          type="text"
          {...register("jobLocation", { required: true })}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          Salary Range (Min - Max)
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            {...register("salaryMin", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="number"
            {...register("salaryMax", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">
          Experience (Min - Max)
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            {...register("experienceMin")}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="number"
            {...register("experienceMax")}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          {...register("jobDescription")}
          className="w-full border px-3 py-2 rounded"
          rows={4}
        />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          {isSubmitting ? "Updating..." : "Update Job"}
        </button>
      </div>
    </form>
  );
};
