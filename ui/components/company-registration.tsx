"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { companyService } from "../services/company-service";
import { CompanyCreate } from "@/types/company";
import { ToastProvider } from "./toast-provider";
const StateAsyncSelect = dynamic(
  () => import("./state-select").then((mod) => mod.StateAsyncSelect),
  { ssr: false }
);
const DistrictAsyncSelect = dynamic(
  () => import("./district-select").then((mod) => mod.DistrictAsyncSelect),
  { ssr: false }
);

interface CompanyRegistrationFormProps {
  onSuccess?: () => void;
}

export const CompanyRegistrationForm: React.FC<
  CompanyRegistrationFormProps
> = ({ onSuccess }) => {
  const errorClass = "mt-1 text-xs text-red-600";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stateId, setStateId] = useState<number | null>(null);
  const [districtId, setDistrictId] = useState<number | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<CompanyCreate>({
    defaultValues: {
      stateId: 1, // Assuming 1 is for Andhra Pradesh
      websiteUrl: "",
      secondaryContactPhone: "",
      locationDetails: "",
    },
  });

  useEffect(() => {
    // This ensures the district is set after state is loaded
    if (stateId && districtId) {
      setDistrictId(districtId);
      setValue("districtId", districtId);
    }
  }, [districtId, setValue, stateId]);

  const onSubmit: SubmitHandler<CompanyCreate> = async (data) => {
    if (!stateId || !districtId) {
      toast.error("Please select both state and district.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        stateId,
        districtId, // ✅ inject districtId here
      };
      await companyService.createCompany(payload);
      toast.success("Company registered!", {
        position: window.innerWidth < 640 ? "bottom-center" : "top-right",
      });
      reset();
      setStateId(1); // default back to AP
      setDistrictId(null);
      onSuccess?.();
    } catch (error) {
      console.error("Error registering company:", error);
      toast.error("Failed to register company. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-10 text-black">
      <h2 className="text-2xl font-semibold text-center text-indigo-600 mb-8">
        Register a New Company <br />
        <span className="text-base text-gray-500">
          కొత్త కంపెనీని నమోదు చేయండి
        </span>
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information Section */}
        <div className="bg-gray-50 p-6 rounded-md border border-gray-100">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name{" "}
                <span className="text-xs text-gray-500">கंपेनी पेरु</span>
              </label>
              <input
                {...register("name", { required: "Company name is required" })}
                className={`w-full px-4 py-2 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black`}
                placeholder="e.g. Tata Motors"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Website URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website URL{" "}
                <span className="text-xs text-gray-500">వెబ్‌సైట్</span>
              </label>
              <input
                {...register("websiteUrl")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black"
                placeholder="https://yourcompany.com"
              />
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="bg-gray-50 p-6 rounded-md border border-gray-100">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Address Information
          </h3>
          <div className="grid grid-cols-1 gap-6">
            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address <span className="text-xs text-gray-500">చిరునామా</span>
              </label>
              <textarea
                {...register("address", { required: "Address is required" })}
                className={`w-full px-4 py-2 border ${
                  errors.address ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black`}
                rows={3}
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    setDistrictId(id); // still update state for controlled behavior
                    if (id !== null) {
                      setValue("districtId", id); // ✅ this updates RHF form value
                    }
                  }}
                />
                {errors.districtId && (
                  <p className={errorClass}>{errors.districtId.message}</p>
                )}
              </div>

              {/* Pincode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pincode{" "}
                  <span className="text-xs text-gray-500">పిన్ కోడ్</span>
                </label>
                <input
                  {...register("pincode", {
                    required: "Pincode is required",
                    pattern: {
                      value: /^\d{6}$/,
                      message: "Please enter a valid 6-digit pincode",
                    },
                  })}
                  className={`w-full px-4 py-2 border ${
                    errors.pincode ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black`}
                  placeholder="500001"
                />
                {errors.pincode && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.pincode.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="bg-gray-50 p-6 rounded-md border border-gray-100">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Email{" "}
                <span className="text-xs text-gray-500">ఈమెయిల్</span>
              </label>
              <input
                type="email"
                {...register("contactEmail", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full px-4 py-2 border ${
                  errors.contactEmail ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black`}
                placeholder="company@example.com"
              />
              {errors.contactEmail && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.contactEmail.message}
                </p>
              )}
            </div>

            {/* Primary Contact Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Primary Contact Phone{" "}
                <span className="text-xs text-gray-500">
                  ప్రాథమిక ఫోన్ నంబర్
                </span>
              </label>
              <input
                {...register("primaryContactPhone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit phone number",
                  },
                })}
                className={`w-full px-4 py-2 border ${
                  errors.primaryContactPhone
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black`}
                placeholder="9876543210"
              />
              {errors.primaryContactPhone && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.primaryContactPhone.message}
                </p>
              )}
            </div>

            {/* Secondary Contact Phone */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Secondary Contact Phone{" "}
                <span className="text-xs text-gray-500">
                  ద్వితీయ ఫోన్ నంబర్ (ఐచ్ఛికం)
                </span>
              </label>
              <input
                {...register("secondaryContactPhone")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black"
                placeholder="Alternative contact number (optional)"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-200 
              ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              <span>Register Company / కంపెనీని నమోదు చేయండి</span>
            )}
          </button>
        </div>
      </form>
      <ToastProvider></ToastProvider>{" "}
    </div>
  );
};
