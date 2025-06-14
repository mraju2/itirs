// pages/login.tsx
"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/superbase-clinet";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";
import { GoogleIcon } from "@/icons/google-icon";


const LoadingSpinner = () => (
  <div className="animate-spin h-5 w-5 border-2 border-slate-500 rounded-full border-t-transparent" />
);

export default function Login() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loginError = searchParams.get("error");
    if (loginError) {
      toast.error("Login failed");
    }
  }, [searchParams]);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/callback`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: redirectUrl },
      });

      if (error) throw error;
      toast.success("Redirecting to Google...");
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(error instanceof Error ? error.message : "Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-extrabold text-slate-900">
          Login to Your SkillsConnect Account
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Already registered?
          <br />
          <span className="text-xs text-slate-500">
            Sign in with Google to access your profile and apply for jobs.
          </span>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-white border border-slate-300 rounded-md shadow-sm py-2 px-4 text-sm font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <GoogleIcon className="w-5 h-5" />
                  Login with Google
                </>
              )}
            </button>
          </div>

          <div className="mt-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-blue-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    If your profile isn&apos;t complete, you&apos;ll be guided
                    to finish it after login.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
