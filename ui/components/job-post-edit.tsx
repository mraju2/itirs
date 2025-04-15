"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { jobPostService } from "@/services/job-post-service";
import { ToastProvider } from "./toast-provider";
import { JobPost, JobPostUpdate } from "@/types/jobpost";

const CompanyAsyncSelect = dynamic(
  () => import("./company-select").then((mod) => mod.CompanyAsyncSelect),
  { ssr: false }
);
const TradeAsyncSelect = dynamic(
  () => import("./trade-select").then((mod) => mod.TradeAsyncSelect),
  { ssr: false }
);
const StateAsyncSelect = dynamic(
  () => import("./state-select").then((mod) => mod.StateAsyncSelect),
  { ssr: false }
);
const DistrictAsyncSelect = dynamic(
  () => import("./district-select").then((mod) => mod.DistrictAsyncSelect),
  { ssr: false }
);

interface JobPostEditFormProps {
  initialValues: JobPost;
  onSuccess?: () => void;
  disableLocationEdit?: boolean; // optional flag to prevent editing state/district
}

interface JobPostFormData {
  companyId: string;
  jobTitle: string;
  districtId: number;
  stateId: string;
  jobLocation: string;
  jobDescription: string;
  employmentType: string;
  applicationProcess: string;
  applicationDeadline: string; // ✅ used in input[type=date]
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

export const JobPostEditForm: React.FC<JobPostEditFormProps> = ({
  initialValues,
  onSuccess,
}) => {
  const mappedDefaults: JobPostFormData = {
    companyId: initialValues.companyId,
    jobTitle: initialValues.jobTitle,
    districtId: initialValues.districtId,
    stateId: initialValues.stateId.toString(),
    jobLocation: initialValues.jobLocation,
    jobDescription: initialValues.jobDescription,
    employmentType: initialValues.employmentType,
    applicationProcess: initialValues.applicationProcess,
    applicationDeadline: new Date(initialValues.applicationDeadlineUnix * 1000)
      .toISOString()
      .split("T")[0], // ✅ Convert to "YYYY-MM-DD"
    additionalBenefits: initialValues.additionalBenefits || "",
    genderRequirement: initialValues.genderRequirement || "Any",
    minAge: initialValues.minAge,
    maxAge: initialValues.maxAge,
    salaryMin: initialValues.salaryMin,
    salaryMax: initialValues.salaryMax,
    accommodationProvided: initialValues.accommodationProvided,
    workingHoursMin: initialValues.workingHoursMin,
    workingHoursMax: initialValues.workingHoursMax,
    experienceMin: initialValues.experienceMin,
    experienceMax: initialValues.experienceMax,
    apprenticesConsidered: initialValues.apprenticesConsidered,
    urgent: initialValues.urgent,
    tradeIds: initialValues.trades
      .map((t) => Number(t.tradeId))
      .filter((id) => id != null),
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<JobPostFormData>({
    defaultValues: mappedDefaults,
  });

  const [stateId, setStateId] = useState<number | null>(initialValues.stateId);
  const [districtId, setDistrictId] = useState<number | null>(
    initialValues.districtId
  );
  const [companyId, setCompanyId] = useState<string | null>(
    initialValues.companyId
  );

  // Add this useEffect to ensure the initial values are properly maintained
  // Add this to ensure district is set after state is loaded
  useEffect(() => {
    // This ensures the district is set after state is loaded
    if (stateId && initialValues.districtId) {
      setDistrictId(initialValues.districtId);
      setValue("districtId", initialValues.districtId);
    }
  }, [stateId, initialValues.districtId, setValue]);

  const onSubmit: SubmitHandler<JobPostFormData> = async (data) => {
    try {
      if (!companyId || !stateId || !districtId || !initialValues.id) {
        toast.error("Missing required data");
        return;
      }

      const payload: JobPostUpdate = {
        id: initialValues.id,
        jobTitle: data.jobTitle,
        companyId: companyId,
        stateId: stateId,
        districtId: districtId,
        jobLocation: data.jobLocation,
        jobDescription: data.jobDescription,
        employmentType: data.employmentType,
        applicationProcess: data.applicationProcess,
        applicationDeadlineUnix: Math.floor(
          new Date(data.applicationDeadline).getTime() / 1000
        ),
        additionalBenefits: data.additionalBenefits,
        genderRequirement: data.genderRequirement,
        minAge: data.minAge,
        maxAge: data.maxAge,
        salaryMin: data.salaryMin,
        salaryMax: data.salaryMax,
        accommodationProvided: data.accommodationProvided,
        workingHoursMin: data.workingHoursMin,
        workingHoursMax: data.workingHoursMax,
        experienceMin: data.experienceMin,
        experienceMax: data.experienceMax,
        apprenticesConsidered: data.apprenticesConsidered,
        urgent: data.urgent,
        tradeIds: data.tradeIds.filter((id) => id != null),
      };

      await jobPostService.updateJob(initialValues.id, payload);

      toast.success("Job updated successfully!");
      onSuccess?.();
    } catch (err) {
      console.error("Error updating job post:", err);
      toast.error("Failed to update job post.");
    }
  };

  // Common form element classes for consistency - FIXED TEXT COLOR IN INPUTS
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const teluguClass = "block text-xs text-gray-500";
  const inputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-gray-800";
  const errorClass = "mt-1 text-xs text-red-600";
  const sectionClass = "mb-6 p-4 bg-gray-50 rounded-md";
  const sectionTitleClass = "text-lg font-medium text-indigo-700 mb-4";

  // You can reuse layout components and section blocks from JobPostCreateForm
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-2xl font-bold text-center text-indigo-600 mb-8">
        Edit Job Post
        <span className="block text-base text-gray-500 mt-1">
          ఉద్యోగాన్ని సవరించండి
        </span>
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Basic Job Information Section */}
        <div className={sectionClass}>
          <h2 className={sectionTitleClass}>Basic Job Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Job Title */}
            <div className="md:col-span-2">
              <label className={labelClass}>
                Job Title <span className={teluguClass}>ఉద్యోగం పేరు</span>
              </label>
              <input
                {...register("jobTitle", { required: "Job title is required" })}
                className={`${inputClass} ${
                  errors.jobTitle ? "border-red-500" : ""
                }`}
                placeholder="Enter job title"
              />
              {errors.jobTitle && (
                <p className={errorClass}>{errors.jobTitle.message}</p>
              )}
            </div>

            {/* Company */}
            <div className="md:col-span-2">
              <CompanyAsyncSelect
                value={companyId}
                onChange={(id) => setCompanyId(id)}
              />
              {errors.companyId && (
                <p className={errorClass}>{errors.companyId.message}</p>
              )}
            </div>

            {/* Employment Type */}
            <div>
              <label className={labelClass}>
                Employment Type <span className={teluguClass}>ఉద్యోగ రకం</span>
              </label>
              <select
                {...register("employmentType", {
                  required: "Employment type is required",
                })}
                className={inputClass}
              >
                <option value="">Select employment type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Temporary">Temporary</option>
                <option value="Internship">Internship</option>
              </select>
              {errors.employmentType && (
                <p className={errorClass}>{errors.employmentType.message}</p>
              )}
            </div>

            {/* Application Process */}
            <div>
              <label className={labelClass}>
                Application Process{" "}
                <span className={teluguClass}>దరఖాస్తు విధానం</span>
              </label>
              <input
                {...register("applicationProcess", {
                  required: "Application process is required",
                })}
                className={inputClass}
                placeholder="e.g. Walk-in interview, Email resume"
              />
              {errors.applicationProcess && (
                <p className={errorClass}>
                  {errors.applicationProcess.message}
                </p>
              )}
            </div>

            {/* Application Deadline */}
            <div>
              <label className={labelClass}>
                Application Deadline{" "}
                <span className={teluguClass}>దరఖాస్తు చివరి తేది</span>
              </label>
              <input
                type="date"
                {...register("applicationDeadline", {
                  required: "Application deadline is required",
                })}
                className={inputClass}
              />
              {errors.applicationDeadline && (
                <p className={errorClass}>
                  {errors.applicationDeadline.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className={sectionClass}>
          <h2 className={sectionTitleClass}>Job Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* State */}
            <div>
              <StateAsyncSelect
                onChange={(id) => setStateId(id)}
                value={stateId}
              />
              {errors.stateId && (
                <p className={errorClass}>{errors.stateId.message}</p>
              )}
            </div>

            {/* District */}
            <div>
              <DistrictAsyncSelect
                stateId={stateId}
                value={districtId}
                onChange={(id) => {
                  setDistrictId(id);
                  setValue("districtId", Number(id)); // Sync with form data
                }}
              />
              {errors.districtId && (
                <p className={errorClass}>{errors.districtId.message}</p>
              )}
            </div>

            {/* Specific Location */}
            <div className="md:col-span-2">
              <label className={labelClass}>
                Job Location <span className={teluguClass}>ఉద్యోగం స్థలం</span>
              </label>
              <input
                {...register("jobLocation", {
                  required: "Job location is required",
                })}
                className={`${inputClass} ${
                  errors.jobLocation ? "border-red-500" : ""
                }`}
                placeholder="Enter specific location (address, landmark, etc.)"
              />
              {errors.jobLocation && (
                <p className={errorClass}>{errors.jobLocation.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Job Details Section */}
        <div className={sectionClass}>
          <h2 className={sectionTitleClass}>Job Details</h2>
          <div className="grid grid-cols-1 gap-6">
            {/* Job Description */}
            <div>
              <label className={labelClass}>
                Job Description{" "}
                <span className={teluguClass}>ఉద్యోగ వివరాలు</span>
              </label>
              <textarea
                {...register("jobDescription", {
                  required: "Job description is required",
                })}
                rows={4}
                className={`${inputClass} ${
                  errors.jobDescription ? "border-red-500" : ""
                }`}
                placeholder="Describe the job responsibilities, requirements, etc."
              />
              {errors.jobDescription && (
                <p className={errorClass}>{errors.jobDescription.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Requirements Section */}
        <div className={sectionClass}>
          <h2 className={sectionTitleClass}>Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gender */}
            <div>
              <label className={labelClass}>
                Gender Requirement{" "}
                <span className={teluguClass}>లింగ అవసరం</span>
              </label>
              <select {...register("genderRequirement")} className={inputClass}>
                <option value="Any">Any Gender</option>
                <option value="Male">Male Only</option>
                <option value="Female">Female Only</option>
              </select>
            </div>

            {/* Trades */}
            <div className="md:col-span-2">
              <TradeAsyncSelect
                value={watch("tradeIds") || []}
                onChange={(ids) => setValue("tradeIds", ids)}
              />
              {errors.tradeIds && (
                <p className={errorClass}>At least one trade is required</p>
              )}
              {errors.tradeIds && (
                <p className={errorClass}>At least one trade is required</p>
              )}
            </div>

            {/* Age Range */}
            <div className="md:col-span-2">
              <label className={labelClass}>
                Age Range <span className={teluguClass}>వయస్సు</span>
              </label>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <input
                    {...register("minAge", {
                      valueAsNumber: true,
                      required: "Minimum age is required",
                    })}
                    type="number"
                    placeholder="Min Age"
                    className={inputClass}
                  />
                  {errors.minAge && (
                    <p className={errorClass}>{errors.minAge.message}</p>
                  )}
                </div>
                <div className="w-1/2">
                  <input
                    {...register("maxAge", { valueAsNumber: true })}
                    type="number"
                    placeholder="Max Age (optional)"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Experience Range */}
            <div className="md:col-span-2">
              <label className={labelClass}>
                Experience Required <span className={teluguClass}>అనుభవం</span>
              </label>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <input
                    {...register("experienceMin", {
                      valueAsNumber: true,
                      required: "Minimum experience is required",
                    })}
                    type="number"
                    placeholder="Min Experience (years)"
                    className={inputClass}
                  />
                  {errors.experienceMin && (
                    <p className={errorClass}>{errors.experienceMin.message}</p>
                  )}
                </div>
                <div className="w-1/2">
                  <input
                    {...register("experienceMax", { valueAsNumber: true })}
                    type="number"
                    placeholder="Max Experience (optional)"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compensation and Benefits Section */}
        <div className={sectionClass}>
          <h2 className={sectionTitleClass}>Compensation and Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Salary Range */}
            <div className="md:col-span-2">
              <label className={labelClass}>
                Salary Range (₹) <span className={teluguClass}>జీతం</span>
              </label>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <input
                    {...register("salaryMin", {
                      valueAsNumber: true,
                      required: "Minimum salary is required",
                    })}
                    type="number"
                    placeholder="Min Salary"
                    className={inputClass}
                  />
                  {errors.salaryMin && (
                    <p className={errorClass}>{errors.salaryMin.message}</p>
                  )}
                </div>
                <div className="w-1/2">
                  <input
                    {...register("salaryMax", {
                      valueAsNumber: true,
                      required: "Maximum salary is required",
                    })}
                    type="number"
                    placeholder="Max Salary"
                    className={inputClass}
                  />
                  {errors.salaryMax && (
                    <p className={errorClass}>{errors.salaryMax.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="md:col-span-2">
              <label className={labelClass}>
                Working Hours Per Day{" "}
                <span className={teluguClass}>పనిచేసే గంటలు</span>
              </label>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <input
                    {...register("workingHoursMin", {
                      valueAsNumber: true,
                      required: "Minimum working hours is required",
                    })}
                    type="number"
                    placeholder="Min Hours"
                    className={inputClass}
                  />
                  {errors.workingHoursMin && (
                    <p className={errorClass}>
                      {errors.workingHoursMin.message}
                    </p>
                  )}
                </div>
                <div className="w-1/2">
                  <input
                    {...register("workingHoursMax", {
                      valueAsNumber: true,
                      required: "Maximum working hours is required",
                    })}
                    type="number"
                    placeholder="Max Hours"
                    className={inputClass}
                  />
                  {errors.workingHoursMax && (
                    <p className={errorClass}>
                      {errors.workingHoursMax.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Benefits */}
            <div className="md:col-span-2">
              <label className={labelClass}>
                Additional Benefits{" "}
                <span className={teluguClass}>అదనపు లాభాలు</span>
              </label>
              <textarea
                {...register("additionalBenefits")}
                rows={3}
                className={inputClass}
                placeholder="Enter any additional benefits (e.g., insurance, bonuses, meals)"
              />
            </div>

            {/* Additional Options */}
            <div className="md:col-span-2">
              <label className={labelClass}>Additional Options</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <label className="flex items-center gap-2 text-sm text-gray-700 bg-gray-100 p-3 rounded-md hover:bg-gray-200 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("urgent")}
                    className="w-4 h-4 text-indigo-600"
                  />
                  <div>
                    <span className="font-medium">Urgent Hiring</span>
                    <span className={teluguClass}>అత్యవసర నియామకం</span>
                  </div>
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700 bg-gray-100 p-3 rounded-md hover:bg-gray-200 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("accommodationProvided")}
                    className="w-4 h-4 text-indigo-600"
                  />
                  <div>
                    <span className="font-medium">Accommodation Provided</span>
                    <span className={teluguClass}>వసతి సౌకర్యం</span>
                  </div>
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700 bg-gray-100 p-3 rounded-md hover:bg-gray-200 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("apprenticesConsidered")}
                    className="w-4 h-4 text-indigo-600"
                  />
                  <div>
                    <span className="font-medium">Apprentices Considered</span>
                    <span className={teluguClass}>
                      శిక్షణార్థులు పరిగణించబడతారు
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {!companyId && (
          <p className="text-red-600 text-sm">Company is required</p>
        )}
        {!stateId && <p className="text-red-600 text-sm">State is required</p>}
        {!districtId && (
          <p className="text-red-600 text-sm">District is required</p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 px-8 py-3 bg-indigo-600 text-white rounded-md"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
      <ToastProvider />
    </div>
  );
};
