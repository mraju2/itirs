// components/FeaturesSection.tsx
import React from "react";

interface Feature {
  title: string;
  description: string;
}

const featureData: Feature[] = [
  {
    title: "Job Postings",
    description: "Post and browse jobs tailored to ITI trades.",
  },
  {
    title: "Profile Creation",
    description: "Build a profile highlighting your qualifications.",
  },
  {
    title: "Application Tracking",
    description:
      "Easily track and manage job applications or candidate statuses.",
  },
  {
    title: "Notifications",
    description:
      "Stay updated with real-time alerts for new positions or new applicants.",
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-12 bg-slate-300">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-slate-900 mb-8">
          Platform Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureData.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded shadow p-6 text-center"
            >
              <h3 className="text-xl font-semibold mb-2 text-slate-900">
                {feature.title}
              </h3>
              <p className="text-slate-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
