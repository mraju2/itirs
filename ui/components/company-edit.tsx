"use client"
import { DISTRICT_OPTIONS } from "../app/constants/districts";
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
    <>
      <h2 className="text-xl font-bold text-gray-700 mb-4">Edit Company</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Name{" "}
              <span className="text-xs block text-gray-400">కంపెనీ పేరు</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-sm text-red-600">Name is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Address{" "}
              <span className="text-xs block text-gray-400">చిరునామా</span>
            </label>
            <input
              type="text"
              {...register("address")}
              className="w-full border border-gray-300 rounded px-3 py-2 text-black focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              City <span className="text-xs block text-gray-400">నగరం</span>
            </label>
            <input
              type="text"
              {...register("city")}
              className="w-full border border-gray-300 rounded px-3 py-2 text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              State{" "}
              <span className="text-xs block text-gray-400">రాష్ట్రం</span>
            </label>
            <input
              type="text"
              {...register("state")}
              className="w-full border border-gray-300 rounded px-3 py-2 text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Pincode{" "}
              <span className="text-xs block text-gray-400">పిన్ కోడ్</span>
            </label>
            <input
              type="text"
              {...register("pincode")}
              className="w-full border border-gray-300 rounded px-3 py-2 text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              District{" "}
              <span className="text-xs block text-gray-400">జిల్లా</span>
            </label>
            <select
              {...register("district")}
              className="w-full border border-gray-300 rounded px-3 py-2 text-black"
            >
              <option value="">Select District</option>
              {DISTRICT_OPTIONS.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Contact Email{" "}
              <span className="text-xs block text-gray-400">ఈమెయిల్</span>
            </label>
            <input
              type="email"
              {...register("contactEmail")}
              disabled
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Contact Phone{" "}
              <span className="text-xs block text-gray-400">ఫోన్ నంబర్</span>
            </label>
            <input
              type="text"
              {...register("contactPhone")}
              disabled
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Website URL{" "}
              <span className="text-xs block text-gray-400">
                వెబ్‌సైట్ (ఐచ్చికం)
              </span>
            </label>
            <input
              type="url"
              {...register("websiteUrl")}
              className="w-full border border-gray-300 rounded px-3 py-2 text-black"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow"
          >
            {submitLabel}
          </button>
        </div>
      </form>
    </>
  );
};
