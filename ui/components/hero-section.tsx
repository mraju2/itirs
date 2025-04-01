// components/HeroSection.tsx
import React from "react";
import Link from "next/link";

const HeroSection: React.FC = () => {
  return (
    <section className="bg-blue-400 py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-950 mb-4">
          Bridging ITI Students & Consultancies
        </h1>
        <p className="text-slate-900 max-w-2xl mx-auto mb-8">
          Discover the right job opportunities tailored to your skillset or find
          the perfect candidate for your open positions.
        </p>
        <div className="space-x-4">
          <Link
            href="/jobs"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Find Jobs
          </Link>
          <Link
            href="/register"
            className="inline-block px-6 py-3 bg-slate-900 text-white rounded hover:bg-slate-700"
          >
            Post a Job
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
