// pages/register.tsx
"use client";

import { supabase } from "@/lib/superbase-clinet";
import { GoogleIcon } from "@/icons/google-icon";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterPage() {
  const handleGoogleSignIn = async () => {
    try {
      console.log("=== GOOGLE SIGN IN START ===");
      console.log("Current URL:", window.location.href);
      const redirectUrl = `${window.location.origin}/callback`;
      console.log("Redirect URL:", redirectUrl);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      console.log("=== OAUTH RESPONSE ===");
      console.log("Data:", data);
      console.log("Error:", error);

      if (error) {
        console.error("Google OAuth error:", error);
        throw error;
      }

      if (data?.url) {
        console.log("=== REDIRECTING TO GOOGLE ===");
        console.log("Redirect URL:", data.url);
        window.location.href = data.url;
      } else {
        console.error("No redirect URL received from Supabase");
        throw new Error("No redirect URL received");
      }

      toast.success("Redirecting to Google...");
    } catch (error: unknown) {
      console.error("=== GOOGLE SIGN IN ERROR ===");
      console.error("Error details:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to initiate registration. Try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-extrabold text-slate-900">
          Join SkillsConnect
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Sign up with your Google account
          <br />
          <span className="text-xs text-slate-500">
            Then complete your profile with your ITI details, skills, and
            preferences.
          </span>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 bg-white border border-slate-300 rounded-md shadow-sm py-2 px-4 text-sm font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <GoogleIcon className="w-5 h-5" />
              Continue with Google
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
                    After signing in, you&apos;ll be guided to complete your
                    full profile before you can apply for jobs.
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
