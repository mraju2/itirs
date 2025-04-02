"use client";

import { useRouter } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CompanyRegistrationForm } from "../../../../components/company-registration";

const CreateCompanyPage = () => {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/admin/companies");
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <Breadcrumbs
          items={[
            { label: "Admin", href: "/admin" },
            { label: "Companies", href: "/admin/companies" },
            { label: "New Company" },
          ]}
        />

        <div className="bg-white p-6 rounded-lg shadow mt-4">
          <h1 className="text-xl font-semibold mb-4">Register a New Company</h1>
          <CompanyRegistrationForm onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  );
};

export default CreateCompanyPage;
