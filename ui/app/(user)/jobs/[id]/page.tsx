"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { jobPostService } from "../../../../services/job-post-service";
import { supabase } from "../../../../lib/superbase-clinet";
import { JobPost } from "../../../../types/jobpost";
import {
  CalendarIcon,
  RupeeIcon as CurrencyRupeeIcon,
  MapPinIcon,
  CheckCircleIcon,
} from "../../../../icons";
import { userService } from "@/services/user-service";

const JobDetailsPage = () => {
  const [job, setJob] = useState<JobPost | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasApplied, setHasApplied] = useState(false);

  const { id } = useParams(); // ✅ Safe usage for App Router client components

  const jobPostId = Array.isArray(id) ? id[0] : id ?? "";

  useEffect(() => {
    if (!jobPostId) return;

    const fetchJobAndApplicationStatus = async () => {
      setIsLoading(true);
      try {
        const jobData = await jobPostService.getJobById(jobPostId);
        setJob(jobData || null);

        // Check if user has applied
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          const applications = await jobPostService.getApplicationsByJobId(
            jobPostId
          );
          const hasUserApplied = applications.some(
            (app: { userId: string }) => app.userId === user.id
          );
          setHasApplied(hasUserApplied);
        }
      } catch (error) {
        console.error("Error fetching job:", error);
        setJob(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobAndApplicationStatus();
  }, [jobPostId]);

  const handleApplyClick = async () => {
    setIsSubmitting(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error("Error fetching user:", userError);
    }

    if (!user) {
      alert("You must be logged in to apply.");
      setIsSubmitting(false);
      return;
    }

    try {
      const profile = await userService.getRegistrationById(user.id);

      const isProfileComplete = Boolean(
        profile.firstName &&
          profile.lastName &&
          profile.phoneNumber &&
          profile.email
      );

      if (!isProfileComplete) {
        alert("Please complete your profile before applying.");
        setIsSubmitting(false);
        return;
      }

      await jobPostService.applyForJob({
        jobPostId: jobPostId,
        userId: user.id,
        applicantName: profile.firstName + " " + profile.lastName,
        applicantPhone: profile.phoneNumber,
        applicantEmail: profile.email,
      });

      setHasApplied(true);
      alert("Application submitted successfully!");
    } catch (err) {
      console.error("❌ Failed to apply:", err);
      alert("Something went wrong while applying.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Not found fallback
  if (!job) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-xl">
        Job not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header Section */}
      <div className="border-b pb-6">
        <h1 className="text-4xl font-bold text-slate-800">{job.jobTitle}</h1>
        <div className="flex items-center mt-3 text-slate-600">
          <MapPinIcon className="h-5 w-5 mr-2" />
          <p>{job.jobLocation}</p>
        </div>
      </div>

      {/* Job Details Section */}
      <div className="grid md:grid-cols-3 gap-8 mt-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Job Description</h2>
          <div className="prose max-w-none text-slate-700">
            <p className="whitespace-pre-wrap">{job.jobDescription}</p>
          </div>
        </div>

        {/* Job Summary Card */}
        <div className="bg-slate-50 rounded-lg p-6 h-fit">
          <h3 className="text-lg font-semibold mb-4">Job Summary</h3>

          <div className="space-y-4">
            <div className="flex items-center">
              <CurrencyRupeeIcon className="h-5 w-5 text-slate-600 mr-3" />
              <div>
                <p className="text-sm text-slate-600">Salary Range</p>
                <p className="font-medium">
                  ₹{job.salaryMin.toLocaleString()} – ₹
                  {job.salaryMax.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <CalendarIcon className="h-5 w-5 text-slate-600 mr-3" />
              <div>
                <p className="text-sm text-slate-600">Application Deadline</p>
                <p className="font-medium">
                  {new Date(job.applicationDeadlineUnix).toLocaleDateString(
                    "en-US",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </p>
              </div>
            </div>

            {job.urgent && (
              <div className="flex items-center text-amber-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11a1 1 0 11-2 0V7a1 1 0 112 0v6zm-1-10a1.5 1.5 0 110 3A1.5 1.5 0 019 3z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="font-medium">Urgent Hiring</p>
              </div>
            )}
          </div>

          {/* Apply Button */}
          {hasApplied ? (
            <div className="mt-6 flex items-center justify-center space-x-2 text-green-600 bg-green-50 px-6 py-3 rounded-lg">
              <CheckCircleIcon className="h-5 w-5" />
              <span className="font-medium">Application Submitted</span>
            </div>
          ) : (
            <button
              onClick={handleApplyClick}
              disabled={isSubmitting}
              className={`w-full mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium 
              hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Submitting..." : "Apply Now"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
