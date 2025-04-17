"use client";
import Link from "next/link";

export const JobCallToAction = () => {
  return (
    <section className="py-12 bg-gradient-to-br from-blue-600 to-blue-700 text-white mt-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Not finding what you're looking for?
        </h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Upload your resume and get notified when relevant jobs match your
          skills.
        </p>
        <Link
          href="/register"
          className="bg-white text-blue-600 hover:bg-slate-100 transition font-medium px-6 py-3 rounded-lg"
        >
          Create Your Profile
        </Link>
      </div>
    </section>
  );
};
