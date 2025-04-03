"use client";

import { useForm } from "react-hook-form";
import { Company } from "../types/company";

interface CompanyEditFormProps {
  initialData: Company;
  onSubmit: (data: Company) => void;
  submitLabel?: string;
}

export const CompanyEditForm = ({
  initialData,
  onSubmit,
  submitLabel = "Save",
}: CompanyEditFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Company>({
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          {...register("name", { required: true })}
          className="w-full border rounded px-3 py-2"
        />
        {errors.name && (
          <p className="text-sm text-red-600">Name is required</p>
        )}
      </div>

      {/* Address and Location */}
      <div>
        <label className="block text-sm font-medium mb-1">Address</label>
        <input
          type="text"
          {...register("address")}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <input
            type="text"
            {...register("city")}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">State</label>
          <input
            type="text"
            {...register("state")}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Pincode</label>
          <input
            type="text"
            {...register("pincode")}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">District</label>
          <input
            type="text"
            {...register("district")}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      {/* Contact info (read-only) */}
      <div>
        <label className="block text-sm font-medium mb-1">Contact Email</label>
        <input
          type="email"
          {...register("contactEmail")}
          disabled
          className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-700"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Contact Phone</label>
        <input
          type="text"
          {...register("contactPhone")}
          disabled
          className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-700"
        />
      </div>

      {/* Website */}
      <div>
        <label className="block text-sm font-medium mb-1">Website URL</label>
        <input
          type="url"
          {...register("websiteUrl")}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <button type="submit">{submitLabel}</button>
    </form>
  );
};
