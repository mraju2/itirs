"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { jobPostService } from "@/services/job-post-service";
import { TRADE_OPTIONS } from "@/app/constants/trades";
import { DistrictAsyncSelect } from "./district-select";
import { StateAsyncSelect } from "./state-select";
import { CompanyAsyncSelect } from "./company-select";

interface JobPostFormData {
  companyId: string;
  jobTitle: string;
  districtId: string;
  stateId: string;
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

export const JobPostCreateForm: React.FC = () => {
  const [stateId, setStateId] = useState<number | null>(null);
  const [districtId, setDistrictId] = useState<number | null>(null);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
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
        stateId: stateId!,
        districtId: districtId!,
        companyId: companyId!,
        applicationDeadlineUnix: Math.floor(
          new Date(data.applicationDeadline).getTime() / 1000
        ),
      };

      if (!companyId) {
        toast.error("Please select a company");
        return;
      }

      if (!stateId || !districtId || !companyId) {
        toast.error("Please select a state, district, and company.");
        return;
      }

      await jobPostService.createJob(payload);
      toast.success("Job posted successfully!");
      reset();
      setStateId(null);
      setDistrictId(null);
      setCompanyId(null);
    } catch (err) {
      console.error("Error creating job post:", err);
      toast.error("Failed to create job post.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10 text-black">
      <h2 className="text-2xl font-semibold text-center text-indigo-600 mb-6">
        Post a Job
        <br />
        <span className="text-base text-gray-500">
          ఉద్యోగాన్ని పోస్ట్ చేయండి
        </span>
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Job Title */}
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-500 mb-1">
            Job Title <span className="block text-xs">ఉద్యోగం పేరు</span>
          </label>
          <input
            {...register("jobTitle", { required: "Job title is required" })}
            className={`w-full px-4 py-2 border ${
              errors.jobTitle ? "border-red-500" : "border-gray-300"
            } rounded-md text-black`}
          />
          {errors.jobTitle && (
            <p className="text-sm text-red-600">{errors.jobTitle.message}</p>
          )}
        </div>

        {/* Company */}
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-500 mb-1">
            Company <span className="block text-xs">కంపెనీ</span>
          </label>
          <CompanyAsyncSelect
            value={companyId}
            onChange={(id) => setCompanyId(id)}
          />

          {errors.companyId && (
            <p className="text-sm text-red-600">{errors.companyId.message}</p>
          )}
        </div>

        {/* State */}
        <div>
          <label className="block text-sm text-gray-500 mb-1">
            State <span className="block text-xs">రాష్ట్రం</span>
          </label>
          <StateAsyncSelect onChange={(id) => setStateId(id)} value={stateId} />
          {errors.stateId && (
            <p className="text-sm text-red-600">{errors.stateId.message}</p>
          )}
        </div>

        {/* District */}
        <div>
          <label className="block text-sm text-gray-500 mb-1">
            District <span className="block text-xs">జిల్లా</span>
          </label>
          <DistrictAsyncSelect
            stateId={stateId}
            value={districtId}
            onChange={(id) => setDistrictId(id)}
          />

          {errors.districtId && (
            <p className="text-sm text-red-600">{errors.districtId.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">
            Job Location <span className="block text-xs">ఉద్యోగం స్థలం</span>
          </label>
          <input
            {...register("jobLocation", { required: true })}
            className={`w-full px-4 py-2 border ${
              errors.jobLocation ? "border-red-500" : "border-gray-300"
            } rounded-md text-black`}
          />
        </div>

        {/* Job Description */}
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-500 mb-1">
            Job Description{" "}
            <span className="block text-xs">ఉద్యోగ వివరాలు</span>
          </label>
          <textarea
            {...register("jobDescription", { required: true })}
            rows={4}
            className={`w-full px-4 py-2 border ${
              errors.jobDescription ? "border-red-500" : "border-gray-300"
            } rounded-md text-black`}
          />
        </div>

        {/* Employment Type & Process */}
        <div>
          <input
            {...register("employmentType", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
            placeholder="Full-time / Part-time"
          />
        </div>
        <div>
          <input
            {...register("applicationProcess", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
            placeholder="e.g. Walk-in interview"
          />
        </div>

        {/* Application Deadline */}
        <div>
          <label className="block text-sm text-gray-500 mb-1">
            Application Deadline{" "}
            <span className="block text-xs">దరఖాస్తు చివరి తేది</span>
          </label>
          <input
            type="date"
            {...register("applicationDeadline", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
          />
        </div>

        {/* Gender */}
        <div>
          <select
            {...register("genderRequirement")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
          >
            <option value="Any">Any</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Age Group */}
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-500 mb-1">
            Age Range <span className="block text-xs">వయస్సు</span>
          </label>
          <div className="flex gap-4">
            <input
              {...register("minAge", { valueAsNumber: true })}
              type="number"
              placeholder="Min Age"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
            />
            <input
              {...register("maxAge", { valueAsNumber: true })}
              type="number"
              placeholder="Max Age"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
            />
          </div>
        </div>

        {/* Salary Group */}
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-500 mb-1">
            Salary Range <span className="block text-xs">జీతం</span>
          </label>
          <div className="flex gap-4">
            <input
              {...register("salaryMin", { valueAsNumber: true })}
              placeholder="Min Salary"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
            />
            <input
              {...register("salaryMax", { valueAsNumber: true })}
              placeholder="Max Salary"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
            />
          </div>
        </div>

        {/* Working Hours Group */}
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-500 mb-1">
            Working Hours <span className="block text-xs">పనిచేసే గంటలు</span>
          </label>
          <div className="flex gap-4">
            <input
              {...register("workingHoursMin", { valueAsNumber: true })}
              placeholder="Min Hrs"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
            />
            <input
              {...register("workingHoursMax", { valueAsNumber: true })}
              placeholder="Max Hrs"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
            />
          </div>
        </div>

        {/* Experience Group */}
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-500 mb-1">
            Experience Required <span className="block text-xs">అనుభవం</span>
          </label>
          <div className="flex gap-4">
            <input
              {...register("experienceMin", { valueAsNumber: true })}
              placeholder="Min Exp"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
            />
            <input
              {...register("experienceMax", { valueAsNumber: true })}
              placeholder="Max Exp"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
            />
          </div>
        </div>

        {/* Benefits */}
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-500 mb-1">
            Additional Benefits <span className="block text-xs">లాభాలు</span>
          </label>
          <textarea
            {...register("additionalBenefits")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
          />
        </div>

        {/* Trades */}
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-500 mb-1">
            Trade(s) <span className="block text-xs">ట్రేడ్లు</span>
          </label>
          <select
            multiple
            onChange={(e) => {
              const selected = Array.from(e.target.selectedOptions).map((opt) =>
                parseInt(opt.value)
              );
              setValue("tradeIds", selected); // Set as numbers
            }}
            className="w-full h-32 px-4 py-2 border border-gray-300 rounded-md text-black"
          >
            {TRADE_OPTIONS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          {errors.tradeIds && (
            <p className="text-sm text-red-600">
              At least one trade is required
            </p>
          )}
        </div>

        {/* Checkboxes */}
        <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
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
        <div className="md:col-span-2 text-center mt-6">
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
          >
            Post Job / ఉద్యోగాన్ని పోస్ట్ చేయండి
          </button>
        </div>
      </form>
    </div>
  );
};
