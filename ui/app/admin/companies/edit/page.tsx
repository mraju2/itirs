"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { companyService } from "@/services/company-service";
import { Company } from "@/types/company";
import { CompanyEditForm } from "@/components/company-edit"; // ✅ Import your form component
import { Breadcrumbs } from "@/components/breadcrumbs"; // adjust path if needed

const CompanyEditPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const data = await companyService.getCompanyById(id as string);
        setCompany(data);
      } catch {
        setError("Failed to load company.");
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, [id]);

  const handleUpdate = async (data: Company) => {
    try {
      await companyService.updateCompany(id as string, data);
      alert("Company updated successfully.");
      router.push("/admin/companies");
    } catch {
      setError("Failed to update company.");
    }
  };

  const handleDelete = async () => {
    try {
      await companyService.deleteCompany(id as string);
      alert("Company deleted.");
      router.push("/admin/companies");
    } catch {
      setError("Failed to delete company.");
    }
  };

  if (loading) return <p className="p-4">Loading company...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;
  if (!company) return <p className="p-4">Company not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-xl font-semibold mb-4">Edit Company</h1>
      <Breadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          { label: "Companies", href: "/admin/companies" },
          { label: `Edit Company (${id})` },
        ]}
      />

      <CompanyEditForm
        initialData={company}
        onSubmit={handleUpdate}
        submitLabel="Save Changes"
      />

      <div className="flex justify-end mt-6">
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Delete Company
        </button>
      </div>

      {/* Delete confirmation dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md text-center space-y-4">
            <p className="text-lg font-medium text-red-600">
              Are you sure you want to delete this company?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyEditPage;
