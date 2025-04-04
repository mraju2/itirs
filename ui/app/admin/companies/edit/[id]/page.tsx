"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { companyService } from "@/services/company-service";
import { Company } from "@/types/company";
import { CompanyEditForm } from "@/components/company-edit"; // ✅ Import your form component
import { Breadcrumbs } from "@/components/breadcrumbs"; // adjust path if needed

const CompanyEditPage = () => {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <p className="p-4">Loading company...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;
  if (!company) return <p className="p-4">Company not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded shadow">
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
    </div>
  );
};

export default CompanyEditPage;
