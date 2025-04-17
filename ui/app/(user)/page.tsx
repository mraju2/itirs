"use client";
import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  Briefcase,
  Building,
  ChevronRight,
  Users,
  Award,
  CheckCircle,
} from "lucide-react";

export default function Home() {
  const [jobSearch, setJobSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");

  const popularCategories = [
    { name: "Electrical", count: 124, icon: "fas fa-bolt" },
    { name: "Mechanical", count: 98, icon: "fas fa-cogs" },
    { name: "Welding", count: 76, icon: "fas fa-fire" },
    { name: "Plumbing", count: 65, icon: "fas fa-faucet" },
  ];

  const featuredJobs = [
    {
      title: "Senior Software Engineer",
      company: "Tech Corp",
      location: "Bangalore",
      salary: "₹1500000 - ₹2500000",
      experience: "5+ yrs",
      posted: "20/04/2024",
    },
    {
      title: "ITI Electrician",
      company: "PowerSystems Ltd",
      location: "Chennai",
      salary: "₹350000 - ₹450000",
      experience: "2-3 yrs",
      posted: "18/04/2024",
    },
    {
      title: "CNC Machine Operator",
      company: "MetalWorks",
      location: "Pune",
      salary: "₹280000 - ₹350000",
      experience: "1-2 yrs",
      posted: "21/04/2024",
    },
  ];

  const successStats = [
    { number: "15,000+", label: "Candidates Placed" },
    { number: "1,200+", label: "Partner Companies" },
    { number: "94%", label: "Placement Rate" },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <Head>
        <title>SkillsConnect - Bridging ITI Talent with Industry</title>
        <meta
          name="description"
          content="Connect ITI graduates with verified recruiters offering real job opportunities"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          rel="stylesheet"
        />
      </Head>

      {/* Hero Section with Search */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Find Your Dream Job
            </h1>
            <p className="text-lg md:text-xl mb-8">
              One Connect, Many Opportunities.
              <span className="block text-sm mt-1 text-blue-200">
                ఒక్క క్లిక్, అనేక ఉద్యోగ అవకాశాలు
              </span>
            </p>

            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search
                    className="absolute left-3 top-3 text-slate-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Job title, keywords, or company"
                    className="w-full pl-10 pr-3 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={jobSearch}
                    onChange={(e) => setJobSearch(e.target.value)}
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin
                    className="absolute left-3 top-3 text-slate-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="City, state, or remote"
                    className="w-full pl-10 pr-3 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Separator */}
        <div className="h-16 w-full overflow-hidden">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              fill="#ffffff"
              opacity="1"
            ></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {successStats.map((stat, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 shadow-sm"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-700">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Value Proposition */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">
              Bridging ITI Talent with Industry
            </h2>
            <p className="text-slate-700 max-w-2xl mx-auto">
              SkillConnect is a platform that connects ITI graduates with
              verified recruiters offering real job opportunities.
              <span className="block text-sm mt-2 text-slate-500">
                ఐటీఐ విద్యార్థులకు సజీవైన ఉద్యోగ అవకాశాలను కలిపించే ముఖద్వార
                వేదిక.
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition text-center">
              <div className="inline-block p-4 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Users size={36} />
              </div>
              <h3 className="text-xl font-bold mb-3">Job Matching</h3>
              <p className="text-slate-700">
                Our AI-powered algorithm matches your skills with the right job
                opportunities.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition text-center">
              <div className="inline-block p-4 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Award size={36} />
              </div>
              <h3 className="text-xl font-bold mb-3">Verified Employers</h3>
              <p className="text-slate-700">
                All companies on our platform are verified to ensure legitimate
                opportunities.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition text-center">
              <div className="inline-block p-4 rounded-full bg-blue-100 text-blue-600 mb-4">
                <CheckCircle size={36} />
              </div>
              <h3 className="text-xl font-bold mb-3">Multilingual Support</h3>
              <p className="text-slate-700">
                Use our platform in Telugu, Hindi, and English for better
                accessibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Popular Categories</h2>
            <Link
              href="/categories"
              className="text-blue-600 hover:text-blue-700 flex items-center"
            >
              View All <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularCategories.map((category, index) => (
              <Link
                href={`/categories/${category.name.toLowerCase()}`}
                key={index}
              >
                <div className="p-6 border border-slate-200 rounded-lg hover:border-blue-400 hover:shadow-md transition text-center cursor-pointer">
                  <i
                    className={`${category.icon} text-3xl text-blue-600 mb-3`}
                  ></i>
                  <h3 className="font-medium mb-1">{category.name}</h3>
                  <p className="text-sm text-slate-500">
                    {category.count} jobs
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Jobs</h2>
            <Link
              href="/jobs"
              className="text-blue-600 hover:text-blue-700 flex items-center"
            >
              Browse All Jobs <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-md transition"
              >
                <div className="p-5">
                  <div className="mb-3 flex justify-between">
                    <h3 className="font-bold text-lg text-blue-600">
                      {job.title}
                    </h3>
                    <button className="text-slate-400 hover:text-blue-600">
                      <i className="far fa-bookmark"></i>
                    </button>
                  </div>

                  <div className="flex items-center text-slate-700 mb-2">
                    <Building size={16} className="mr-2" />
                    {job.company}
                  </div>

                  <div className="flex items-center text-slate-700 mb-4">
                    <MapPin size={16} className="mr-2" />
                    {job.location}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
                      <i className="fas fa-briefcase mr-1"></i> {job.experience}
                    </span>
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
                      <i className="fas fa-rupee-sign mr-1"></i> {job.salary}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">
                      Posted: {job.posted}
                    </span>
                    <Link
                      href={`/jobs/${index}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Find Your Perfect Job?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of ITI graduates who have found their dream jobs
            through SkillsConnect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-blue-600 hover:bg-slate-100 transition font-medium px-6 py-3 rounded-lg"
            >
              Register as Candidate
            </Link>
            <Link
              href="/jobs"
              className="bg-blue-500 bg-opacity-30 hover:bg-opacity-40 transition border border-white text-white font-medium px-6 py-3 rounded-lg"
            >
              View Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="bg-blue-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">
                  SC
                </div>
                <span className="text-white font-bold text-xl">
                  SkillsConnect
                </span>
              </Link>
              <p className="text-slate-400">
                Bridging the gap between ITI talent and industry requirements.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-slate-400 hover:text-white transition"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-slate-400 hover:text-white transition"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-slate-400 hover:text-white transition"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-slate-400 hover:text-white transition"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">For Candidates</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/jobs"
                    className="text-slate-400 hover:text-white transition"
                  >
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/companies"
                    className="text-slate-400 hover:text-white transition"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resources"
                    className="text-slate-400 hover:text-white transition"
                  >
                    Career Resources
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className="text-slate-400 hover:text-white transition"
                  >
                    My Profile
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">For Employers</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/post-job"
                    className="text-slate-400 hover:text-white transition"
                  >
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-slate-400 hover:text-white transition"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resources/employer"
                    className="text-slate-400 hover:text-white transition"
                  >
                    Resources
                  </Link>
                </li>
                <li>
                  <Link
                    href="/employer-login"
                    className="text-slate-400 hover:text-white transition"
                  >
                    Employer Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-400">
            <p>
              © {new Date().getFullYear()} SkillsConnect. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
