"use client";
import { UserRegistration } from "@/components/user-registration";
import { ToastProvider } from "@/components/toast-provider";

export default function RegisterPage() {
  return (
    <>
      <ToastProvider />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Registration Portal
            </h1>
            <p className="text-gray-600">Choose your registration type below</p>
          </div>

          {/* Registration Form */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <UserRegistration />
          </div>
        </div>
      </div>
    </>
  );
}
