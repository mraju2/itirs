import React from "react";
import { notFound } from "next/navigation";
import { companyService } from "@/services/company-service";
import { Company } from "../../../types/company"; // Adjust the import path as necessary`

type Params = {
  params: {
    id: string;
  };
};

const CompanyDetailsPage = async ({ params }: Params) => {
  const companyId = Number(params.id);

  if (isNaN(companyId)) return notFound();

  const company: Company | null = await companyService
    .getCompanyById(companyId)
    .catch(() => null);

  if (!company) return notFound();

  return (
    <main className="max-w-3xl mx-auto px-4 py-10 bg-white shadow rounded-md mt-6">
      <h1 className="text-3xl font-bold text-slate-800 mb-4">{company.name}</h1>

      <div className="text-slate-700 space-y-2">
        <p>
          <strong>Address:</strong> {company.address}, {company.city},{" "}
          {company.state}, {company.pincode}, {company.country}
        </p>
        <p>
          <strong>Email:</strong> {company.contactEmail}
        </p>
        <p>
          <strong>Phone:</strong> {company.contactPhone}
        </p>
        {company.websiteUrl && (
          <p>
            <strong>Website:</strong>{" "}
            <a
              href={company.websiteUrl}
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              {company.websiteUrl}
            </a>
          </p>
        )}
        {company.logoUrl && (
          <div className="mt-4">
            <strong>Company Logo:</strong>
            <img
              src={company.logoUrl}
              alt={`${company.name} Logo`}
              className="h-24 mt-2"
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default CompanyDetailsPage;
