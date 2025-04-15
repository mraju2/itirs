"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Company } from "@/types/company";
import { companyService } from "@/services/company-service";
import { CompanyEditForm } from "../../../../../components/company-edit";
import { Breadcrumbs } from "@/components/breadcrumbs";

const CompanyEditPage = () => {
  const { id } = useParams(); // expects /admin/companies/edit/:id
  const router = useRouter();

  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      if (!id) return;

      try {
        const res = await companyService.getCompanyById(id as string);
        setCompany(res);
      } catch (err) {
        console.error("Failed to fetch company:", err);
        setError("Unable to load company details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id]);

  return (
    <div className="min-h-screen bg-blue-50 py-6 px-4">
      <div className="max-w-5xl mx-auto">
        <Breadcrumbs
          items={[
            { label: "Admin", href: "/admin" },
            { label: "Companies", href: "/admin/companies" },
            { label: "Edit Company" },
          ]}
        />

        {loading ? (
          <p className="text-indigo-600 text-sm animate-pulse">
            Loading company...
          </p>
        ) : error ? (
          <p className="text-red-600 bg-red-100 p-3 rounded">{error}</p>
        ) : company ? (
          <CompanyEditForm
            initialValues={company}
            onSuccess={() => router.push("/admin/companies")}
          />
        ) : (
          <p className="text-gray-600">Company not found.</p>
        )}
      </div>
    </div>
  );
};

export default CompanyEditPage;
