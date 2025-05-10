"use client";
import { useState } from "react";
import { UserRegistration } from "@/components/user-registration";
import { CompanyRegistrationForm } from "@/components/company-registration";

export default function RegisterPage() {
  const [registrationType, setRegistrationType] = useState<"user" | "company">(
    "user"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Registration Portal
          </h1>
          <p className="text-gray-600">Choose your registration type below</p>
        </div>

        {/* Registration Type Selector */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setRegistrationType("user")}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              registrationType === "user"
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            User Registration
          </button>
          <button
            onClick={() => setRegistrationType("company")}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              registrationType === "company"
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Company Registration
          </button>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {registrationType === "user" ? (
            <UserRegistration />
          ) : (
            <CompanyRegistrationForm />
          )}
        </div>
      </div>
    </div>
  );
}
