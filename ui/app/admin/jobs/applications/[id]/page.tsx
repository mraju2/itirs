"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { jobPostService } from "@/services/job-post-service";
import { JobApplication, JobPost } from "@/types/jobpost";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/table";
import Link from "next/link";

const JobApplicationsPage = () => {
  const { id } = useParams();
  const jobPostId = Array.isArray(id) ? id[0] : id ?? "";

  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [job, setJob] = useState<JobPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!jobPostId) return;

    const fetchData = async () => {
      try {
        const [jobData, apps] = await Promise.all([
          jobPostService.getJobById(jobPostId),
          jobPostService.getApplicationsByJobId(jobPostId),
        ]);
        setJob(jobData);
        setApplications(apps);
      } catch (err) {
        console.error("Failed to fetch applications:", err);
        setError("Unable to load applications");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [jobPostId]);

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-2">
        <Breadcrumbs
          items={[
            { label: "Admin", href: "/admin" },
            { label: "Jobs", href: "/admin/jobs" },
            { label: "Applications" },
          ]}
        />
        {loading ? (
          <p className="text-blue-600 text-sm animate-pulse">Loading...</p>
        ) : error ? (
          <p className="text-red-600 bg-red-100 px-4 py-2 rounded">{error}</p>
        ) : (
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">
              Applications for {job?.jobTitle}
            </h2>
            {applications.length === 0 ? (
              <p className="text-gray-600">No applications found.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="bg-slate-200 text-sm">Name</TableHead>
                    <TableHead className="bg-slate-200 text-sm">Phone</TableHead>
                    <TableHead className="bg-slate-200 text-sm">Email</TableHead>
                    <TableHead className="bg-slate-200 text-sm">Applied At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((app) => (
                    <TableRow key={app.id} className="text-sm">
                      <TableCell>{app.applicantName}</TableCell>
                      <TableCell>{app.applicantPhone}</TableCell>
                      <TableCell>{app.applicantEmail || "-"}</TableCell>
                      <TableCell>
                        {new Date(app.appliedAtUnix * 1000).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            <div className="mt-4">
              <Link href="/admin/jobs" className="text-blue-600 underline">
                &larr; Back to Jobs
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplicationsPage;
