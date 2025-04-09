"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { companyService } from "../services/company-service";
import { DISTRICT_OPTIONS } from "../app/constants/districts";

interface FormData {
  name: string;
  address: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  contactEmail: string;
  contactPhone: string;
  websiteUrl?: string;
}

interface CompanyRegistrationFormProps {
  onSuccess?: () => void;
}

export const CompanyRegistrationForm: React.FC<
  CompanyRegistrationFormProps
> = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await companyService.createCompany(data);
      toast.success("Company registered successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      reset();
      onSuccess?.();
    } catch (error) {
      console.error("Error registering company:", error);
      toast.error("Failed to register company. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10 text-black">
      <h2 className="text-2xl font-semibold text-center text-indigo-600 mb-6">
        Register a New Company <br />
        <span className="text-base text-gray-500">
          కొత్త కంపెనీని నమోదు చేయండి
        </span>
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Company Name */}
        <div>
          <label className="block text-sm text-gray-500 mb-1">
            Company Name <span className="block text-xs">కంపెనీ పేరు</span>
          </label>
          <input
            {...register("name", { required: "Company name is required" })}
            className={`w-full px-4 py-2 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-md text-black`}
            placeholder="e.g. Tata Motors"
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-500 mb-1">
            Address <span className="block text-xs">చిరునామా</span>
          </label>
          <textarea
            {...register("address", { required: "Address is required" })}
            className={`w-full px-4 py-2 border ${
              errors.address ? "border-red-500" : "border-gray-300"
            } rounded-md text-black`}
            rows={3}
          />
          {errors.address && (
            <p className="text-sm text-red-600">{errors.address.message}</p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block text-sm text-gray-500 mb-1">
            City <span className="block text-xs">నగరం</span>
          </label>
          <input
            {...register("city", { required: "City is required" })}
            className={`w-full px-4 py-2 border ${
              errors.city ? "border-red-500" : "border-gray-300"
            } rounded-md text-black`}
          />
          {errors.city && (
            <p className="text-sm text-red-600">{errors.city.message}</p>
          )}
        </div>

        {/* District */}
        <div>
          <label className="block text-sm text-gray-500 mb-1">
            District <span className="block text-xs">జిల్లా</span>
          </label>
          <select
            {...register("district", { required: "District is required" })}
            className={`w-full px-4 py-2 border ${
              errors.district ? "border-red-500" : "border-gray-300"
            } rounded-md text-black`}
          >
            <option value="">జిల్లాను ఎంచుకోండి</option>
            {DISTRICT_OPTIONS.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
          {errors.district && (
            <p className="text-sm text-red-600">{errors.district.message}</p>
          )}
        </div>

        {/* Pincode */}
        <div>
          <label className="block text-sm text-gray-500 mb-1">
            Pincode <span className="block text-xs">పిన్ కోడ్</span>
          </label>
          <input
            {...register("pincode", { required: "Pincode is required" })}
            className={`w-full px-4 py-2 border ${
              errors.pincode ? "border-red-500" : "border-gray-300"
            } rounded-md text-black`}
          />
          {errors.pincode && (
            <p className="text-sm text-red-600">{errors.pincode.message}</p>
          )}
        </div>

        {/* State */}
        <div>
          <label className="block text-sm text-gray-500 mb-1">
            State <span className="block text-xs">రాష్ట్రం</span>
          </label>
          <input
            {...register("state")}
            value="Andhra Pradesh"
            readOnly
            className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-md text-black"
          />
        </div>

        {/* Contact Email */}
        <div>
          <label className="block text-sm text-gray-500 mb-1">
            Contact Email <span className="block text-xs">ఈమెయిల్</span>
          </label>
          <input
            type="email"
            {...register("contactEmail", { required: "Email is required" })}
            className={`w-full px-4 py-2 border ${
              errors.contactEmail ? "border-red-500" : "border-gray-300"
            } rounded-md text-black`}
          />
          {errors.contactEmail && (
            <p className="text-sm text-red-600">
              {errors.contactEmail.message}
            </p>
          )}
        </div>

        {/* Contact Phone */}
        <div>
          <label className="block text-sm text-gray-500 mb-1">
            Contact Phone <span className="block text-xs">ఫోన్ నంబర్</span>
          </label>
          <input
            {...register("contactPhone", {
              required: "Phone number is required",
            })}
            className={`w-full px-4 py-2 border ${
              errors.contactPhone ? "border-red-500" : "border-gray-300"
            } rounded-md text-black`}
          />
          {errors.contactPhone && (
            <p className="text-sm text-red-600">
              {errors.contactPhone.message}
            </p>
          )}
        </div>

        {/* Website */}
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-500 mb-1">
            Website URL{" "}
            <span className="block text-xs">వెబ్‌సైట్ (ఐచ్చికం)</span>
          </label>
          <input
            {...register("websiteUrl")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
            placeholder="https://yourcompany.com"
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-center mt-6">
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
          >
            Register Company / కంపెనీని నమోదు చేయండి
          </button>
        </div>
      </form>
    </div>
  );
};
