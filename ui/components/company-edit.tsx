"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { Company, CompanyUpdate } from "@/types/company";
import { companyService } from "@/services/company-service";

const StateAsyncSelect = dynamic(
  () => import("./state-select").then((mod) => mod.StateAsyncSelect),
  { ssr: false }
);
const DistrictAsyncSelect = dynamic(
  () => import("./district-select").then((mod) => mod.DistrictAsyncSelect),
  { ssr: false }
);

interface CompanyEditFormProps {
  initialValues: Company;
  onSuccess?: () => void;
  disableLocationEdit?: boolean; // optional flag to prevent editing state/district
}

export const CompanyEditForm: React.FC<CompanyEditFormProps> = ({
  initialValues,
  onSuccess,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<CompanyUpdate>({
    defaultValues: initialValues,
  });
  const [stateId, setStateId] = useState<number | null>(initialValues.stateId);
  const [districtId, setDistrictId] = useState<number | null>(
    initialValues.districtId
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

  const onSubmit: SubmitHandler<CompanyUpdate> = async (data) => {
    try {
      const payload = {
        ...data,
        id: initialValues.id,
        stateId: stateId ?? undefined,
        districtId: districtId ?? undefined,
      };
  
      await companyService.updateCompany(initialValues.id!, payload);
      toast.success("Company updated successfully!");
      onSuccess?.();
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update company.");
    }
  };

  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const teluguClass = "text-xs text-gray-500";
  const inputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black";
  const errorClass = "mt-1 text-xs text-red-600";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 bg-white p-6 rounded shadow-md"
    >
      <h2 className="text-2xl font-semibold text-indigo-600 text-center mb-6">
        Edit Company Details
        <div className="text-base text-gray-500">కంపెనీ వివరాలను సవరించండి</div>
      </h2>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>
            Company Name <span className={teluguClass}>పేరు</span>
          </label>
          <input
            {...register("name", { required: "Company name is required" })}
            className={`${inputClass} ${errors.name ? "border-red-500" : ""}`}
          />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>

        <div>
          <label className={labelClass}>
            Website URL <span className={teluguClass}>వెబ్‌సైట్</span>
          </label>
          <input {...register("websiteUrl")} className={inputClass} />
        </div>
      </div>

      {/* Address */}
      <div>
        <label className={labelClass}>
          Address <span className={teluguClass}>చిరునామా</span>
        </label>
        <textarea
          {...register("address", { required: "Address is required" })}
          className={`${inputClass} ${errors.address ? "border-red-500" : ""}`}
          rows={3}
        />
        {errors.address && (
          <p className={errorClass}>{errors.address.message}</p>
        )}
      </div>
      {/* Location Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <StateAsyncSelect
            value={stateId}
            onChange={(val) => {
              setStateId(val);
              setValue("stateId", val as number); // Also sync this
            }}
          />
        </div>
        <div>
          <DistrictAsyncSelect
            stateId={stateId}
            value={districtId}
            onChange={(value: number | null) => {
              setDistrictId(value);
              setValue("districtId", value as number); // Sync with form data
            }}
          />
        </div>
        <div>
          <label className={labelClass}>
            Pincode <span className={teluguClass}>పిన్ కోడ్</span>
          </label>
          <input
            {...register("pincode", {
              required: "Pincode is required",
              pattern: {
                value: /^\d{6}$/,
                message: "Enter valid 6-digit pincode",
              },
            })}
            className={`${inputClass} ${
              errors.pincode ? "border-red-500" : ""
            }`}
          />
          {errors.pincode && (
            <p className={errorClass}>{errors.pincode.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>
            Location Details <span className={teluguClass}>వివరాలు</span>
          </label>
          <input {...register("locationDetails")} className={inputClass} />
        </div>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>
            Contact Email <span className={teluguClass}>ఈమెయిల్</span>
          </label>
          <input
            type="email"
            {...register("contactEmail", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email format",
              },
            })}
            className={`${inputClass} ${
              errors.contactEmail ? "border-red-500" : ""
            }`}
          />
          {errors.contactEmail && (
            <p className={errorClass}>{errors.contactEmail.message}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>
            Primary Phone <span className={teluguClass}>ఫోన్</span>
          </label>
          <input
            {...register("primaryContactPhone", {
              required: "Primary phone is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter valid 10-digit number",
              },
            })}
            className={`${inputClass} ${
              errors.primaryContactPhone ? "border-red-500" : ""
            }`}
          />
          {errors.primaryContactPhone && (
            <p className={errorClass}>{errors.primaryContactPhone.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>
            Secondary Phone <span className={teluguClass}>ఐచ్ఛికం</span>
          </label>
          <input
            {...register("secondaryContactPhone")}
            className={inputClass}
          />
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-center pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-3 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition ${
            isSubmitting ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Updating..." : "Update Company"}
        </button>
      </div>
    </form>
  );
};
