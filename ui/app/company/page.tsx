"use client";

import React, { useEffect, useState } from "react";
import { Company } from "../../types/company"; // Adjust the import path as necessary
import { companyService } from "@/services/company-service";

const CompanyListPage: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    companyService.getAllCompanies().then(setCompanies).catch(console.error);
  }, []);

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">
        Registered Companies
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {companies.map((company) => (
          <div
            key={company.id}
            className="bg-white shadow rounded p-4 border border-slate-200"
          >
            <h2 className="text-lg font-semibold text-slate-900">
              {company.name}
            </h2>
            <p className="text-sm text-slate-600">
              {company.city}, {company.state}
            </p>
            <p className="text-sm text-slate-500">{company.contactEmail}</p>
            {company.websiteUrl && (
              <a
                href={company.websiteUrl}
                className="text-sm text-blue-600 hover:underline mt-1 block"
                target="_blank"
              >
                Visit Website
              </a>
            )}
          </div>
        ))}
      </div>
    </main>
  );
};

export default CompanyListPage;
