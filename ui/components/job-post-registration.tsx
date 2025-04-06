"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { jobPostService } from "@/services/job-post-service"; // You need to define this
import { TRADE_OPTIONS } from "@/app/constants/trades"; // { value: number, label: string }

interface JobPostFormData {
  companyId: string;
  jobTitle: string;
  district: string;
  jobLocation: string;
  jobDescription: string;
  employmentType: string;
  applicationProcess: string;
  applicationDeadline: string;
  additionalBenefits?: string;
  genderRequirement: string;
  minAge: number;
  maxAge?: number;
  salaryMin: number;
  salaryMax: number;
  accommodationProvided: boolean;
  workingHoursMin: number;
  workingHoursMax: number;
  experienceMin: number;
  experienceMax?: number;
  apprenticesConsidered: boolean;
  urgent: boolean;
  tradeIds: number[];
}

const JobPostCreateForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<JobPostFormData>({
    defaultValues: {
      urgent: false,
      accommodationProvided: false,
      apprenticesConsidered: false,
    },
  });

  const onSubmit: SubmitHandler<JobPostFormData> = async (data) => {
    try {
      const payload = {
        ...data,
        applicationDeadlineUnix: Math.floor(
          new Date(data.applicationDeadline).getTime() / 1000
        ),
      };

      console.log("Submitting job post:", payload);
      await jobPostService.createJob(payload);
      toast.success("Job posted successfully!");
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create job post.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Job Post Form
        <span className="block text-sm font-medium mt-1 text-indigo-500">
          ఉద్యోగ వివరాలు నమోదు చేయండి
        </span>
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Job Title */}
        <div>
          <label className="block font-medium text-sm text-gray-700">
            Job Title / ఉద్యోగ పేరు
          </label>
          <input
            {...register("jobTitle", { required: "Job title is required" })}
            className="input"
          />
          {errors.jobTitle && (
            <p className="text-red-500">{errors.jobTitle.message}</p>
          )}
        </div>

        {/* District and Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-sm text-gray-700">
              District
            </label>
            <input
              {...register("district", { required: true })}
              className="input"
            />
          </div>
          <div>
            <label className="block font-medium text-sm text-gray-700">
              Job Location
            </label>
            <input
              {...register("jobLocation", { required: true })}
              className="input"
            />
          </div>
        </div>

        {/* Job Description */}
        <div>
          <label className="block font-medium text-sm text-gray-700">
            Job Description
          </label>
          <textarea
            {...register("jobDescription", { required: true })}
            rows={4}
            className="input"
          />
        </div>

        {/* Employment Type & Application Process */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            {...register("employmentType", { required: true })}
            className="input"
            placeholder="Full-time / Part-time"
          />
          <input
            {...register("applicationProcess", { required: true })}
            className="input"
            placeholder="e.g. Walk-in interview"
          />
        </div>

        {/* Deadline */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Application Deadline
          </label>
          <input
            type="date"
            {...register("applicationDeadline", { required: true })}
            className="input"
          />
        </div>

        {/* Gender & Age */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select {...register("genderRequirement")} className="input">
            <option value="Any">Any</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <div className="flex gap-2">
            <input
              {...register("minAge", { valueAsNumber: true })}
              type="number"
              placeholder="Min Age"
              className="input"
            />
            <input
              {...register("maxAge", { valueAsNumber: true })}
              type="number"
              placeholder="Max Age"
              className="input"
            />
          </div>
        </div>

        {/* Salary */}
        <div className="flex gap-2">
          <input
            {...register("salaryMin", { valueAsNumber: true })}
            placeholder="Min Salary"
            className="input"
          />
          <input
            {...register("salaryMax", { valueAsNumber: true })}
            placeholder="Max Salary"
            className="input"
          />
        </div>

        {/* Working Hours */}
        <div className="flex gap-2">
          <input
            {...register("workingHoursMin", { valueAsNumber: true })}
            placeholder="Min Hrs"
            className="input"
          />
          <input
            {...register("workingHoursMax", { valueAsNumber: true })}
            placeholder="Max Hrs"
            className="input"
          />
        </div>

        {/* Experience */}
        <div className="flex gap-2">
          <input
            {...register("experienceMin", { valueAsNumber: true })}
            placeholder="Min Exp"
            className="input"
          />
          <input
            {...register("experienceMax", { valueAsNumber: true })}
            placeholder="Max Exp"
            className="input"
          />
        </div>

        {/* Benefits & Trades */}
        <textarea
          {...register("additionalBenefits")}
          placeholder="Benefits (optional)"
          className="input"
        />

        <div>
          <label className="block font-medium text-sm text-gray-700">
            Trade(s)
          </label>
          <select
            multiple
            {...register("tradeIds", { required: true })}
            className="input h-32"
          >
            {TRADE_OPTIONS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          {errors.tradeIds && (
            <p className="text-red-500">At least one trade is required</p>
          )}
        </div>

        {/* Checkboxes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" {...register("urgent")} /> Urgent
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" {...register("accommodationProvided")} />{" "}
            Accommodation Provided
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" {...register("apprenticesConsidered")} />{" "}
            Apprentices Considered
          </label>
        </div>

        {/* Submit */}
        <div className="pt-6 text-center">
          <button
            type="submit"
            className="px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md font-medium shadow transition"
          >
            Post Job / ఉద్యోగాన్ని పోస్ట్ చేయండి
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobPostCreateForm;
