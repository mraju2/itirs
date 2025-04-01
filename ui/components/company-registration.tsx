"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { companyService } from "../services/company-service";

interface FormData {
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  contactEmail: string;
  contactPhone: string;
  websiteUrl?: string;
  logoUrl?: string;
}

const CompanyRegistrationForm: React.FC = () => {
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
    } catch (error) {
      console.error("Error registering company:", error);
      toast.error("Failed to register company. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-center text-indigo-600 mb-6">
        Register a New Company
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Name
          </label>
          <input
            {...register("name", { required: "Company name is required" })}
            className={`w-full px-4 py-2 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-md`}
            placeholder="e.g. Tata Motors"
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            {...register("address", { required: "Address is required" })}
            className={`w-full px-4 py-2 border ${
              errors.address ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.address && (
            <p className="text-sm text-red-600">{errors.address.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            {...register("city", { required: "City is required" })}
            className={`w-full px-4 py-2 border ${
              errors.city ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.city && (
            <p className="text-sm text-red-600">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <input
            {...register("state", { required: "State is required" })}
            className={`w-full px-4 py-2 border ${
              errors.state ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.state && (
            <p className="text-sm text-red-600">{errors.state.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pincode
          </label>
          <input
            {...register("pincode", { required: "Pincode is required" })}
            className={`w-full px-4 py-2 border ${
              errors.pincode ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.pincode && (
            <p className="text-sm text-red-600">{errors.pincode.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <input
            {...register("country", { required: "Country is required" })}
            className={`w-full px-4 py-2 border ${
              errors.country ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.country && (
            <p className="text-sm text-red-600">{errors.country.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact Email
          </label>
          <input
            type="email"
            {...register("contactEmail", { required: "Email is required" })}
            className={`w-full px-4 py-2 border ${
              errors.contactEmail ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.contactEmail && (
            <p className="text-sm text-red-600">
              {errors.contactEmail.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact Phone
          </label>
          <input
            {...register("contactPhone", {
              required: "Phone number is required",
            })}
            className={`w-full px-4 py-2 border ${
              errors.contactPhone ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.contactPhone && (
            <p className="text-sm text-red-600">
              {errors.contactPhone.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Website URL
          </label>
          <input
            {...register("websiteUrl")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="https://yourcompany.com"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Logo URL
          </label>
          <input
            {...register("logoUrl")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="https://yourlogo.com/logo.png"
          />
        </div>

        <div className="md:col-span-2 flex justify-center mt-6">
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
          >
            Register Company
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyRegistrationForm;
