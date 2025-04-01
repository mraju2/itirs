// components/CTASection.tsx
import React from "react";
import Link from "next/link";

const CTASection: React.FC = () => {
  return (
    <section className="bg-slate-400 py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Ready to Get Started?
        </h2>
        <p className="max-w-xl mx-auto mb-6 text-slate-800">
          Join our growing community of ITI students and consultancies.
        </p>
        <Link
          href="/register"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Register Now
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
