"use client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserRegistrationData } from "@/types/user";
import { TRADE_OPTIONS } from "../app/constants/trades"; // Ensure the correct path

interface FormData {
  firstName: string;
  lastName: string;
  fatherName: string;
  dateOfBirth: string;
  trade: string;
  otherTrade?: string;
  address: string;
  mandal: string;
  district: string;
  passYear: string;
  percentage: string;
  experience: string;
  salaryExpectation: string;
  workLocation: string;
  phoneNumber: string;
  email: string;
  itiName: string;
  about: string;
}

const UserRegistration: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      fatherName: "",
      dateOfBirth: "",
      trade: "",
      address: "",
      mandal: "",
      district: "",
      passYear: "",
      percentage: "",
      experience: "",
      salaryExpectation: "",
      workLocation: "",
      phoneNumber: "",
      email: "",
      itiName: "",
      about: "",
    },
  });

  const selectedTrade = watch("trade");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const formattedData: UserRegistrationData = {
        ...data,
        dateOfBirth: Math.floor(new Date(data.dateOfBirth).getTime() / 1000), // Convert to Unix timestamp (seconds)
        passYear: Number(data.passYear), // Ensure numeric fields are properly formatted
        percentage: Number(data.percentage),
        salaryExpectation: Number(data.salaryExpectation),
      };

      if (!formattedData.otherTrade) {
        delete formattedData.otherTrade; // Remove otherTrade if empty
      }

      toast.success("Form submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit the form. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Calculate max and min dates for date of birth input
  const calculateDateLimits = () => {
    const today = new Date();

    // Min date (50 years ago)
    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 50);

    // Max date (15 years ago)
    const maxDate = new Date();
    maxDate.setFullYear(today.getFullYear() - 15);

    return {
      min: minDate.toISOString().split("T")[0],
      max: maxDate.toISOString().split("T")[0],
    };
  };

  const dateLimits = calculateDateLimits();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full">
      {/* Form Section - Now 50% width */}
      <div className="w-full lg:w-3/5 bg-gradient-to-br from-blue-50 to-indigo-100 py-4 px-2 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-4 py-6 sm:px-8 sm:py-8 bg-gradient-to-r from-indigo-600 to-blue-500">
            <h1 className="text-2xl font-bold text-white text-center">
              User Registration Form
              <span className="block text-sm font-medium mt-1 text-indigo-100">
                ఐటిఐ దరఖాస్తు ఫారం
              </span>
            </h1>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-2 py-4 sm:px-8 sm:py-8 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  a. First Name (as per SSC)
                  <span className="block text-xs text-gray-500 mt-1">
                    మొదటి పేరు (SSC ప్రకారం)
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  {...register("firstName", {
                    required: "First name is required",
                    minLength: {
                      value: 2,
                      message: "First name must be at least 2 characters",
                    },
                    pattern: {
                      value: /^[A-Za-z]+$/i,
                      message: "First name must contain only letters",
                    },
                  })}
                  className={`block w-full rounded-md border ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm text-gray-700`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  b. Last Name (as per SSC)
                  <span className="block text-xs text-gray-500 mt-1">
                    ఇంటి పేరు (SSC ప్రకారం)
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  {...register("lastName", {
                    required: "Last name is required",
                    minLength: {
                      value: 2,
                      message: "Last name must be at least 2 characters",
                    },
                    pattern: {
                      value: /^[A-Za-z]+$/i,
                      message: "Last name must contain only letters",
                    },
                  })}
                  className={`block w-full rounded-md border ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm text-gray-700`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              {/* Father's Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  c. Father&apos;s Name
                  <span className="block text-xs text-gray-500 mt-1">
                    తండ్రి పేరు
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your father's name"
                  {...register("fatherName", {
                    required: "Father's name is required",
                    minLength: {
                      value: 2,
                      message: "Father's name must be at least 2 characters",
                    },
                  })}
                  className={`block w-full rounded-md border ${
                    errors.fatherName ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm text-gray-700`}
                />
                {errors.fatherName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.fatherName.message}
                  </p>
                )}
              </div>

              {/* DOB */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  d. Date of Birth
                  <span className="block text-xs text-gray-500 mt-1">
                    పుట్టిన తేది
                  </span>
                </label>
                <input
                  type="date"
                  min={dateLimits.min}
                  max={dateLimits.max}
                  {...register("dateOfBirth", {
                    required: "Date of birth is required",
                  })}
                  className={`block w-full rounded-md border ${
                    errors.dateOfBirth ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm text-gray-700`}
                />
                {errors.dateOfBirth && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.dateOfBirth.message}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Age must be between 15-50 years
                </p>
              </div>

              {/* Trade */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  e. Trade
                  <span className="block text-xs text-gray-500 mt-1">
                    వృత్తి
                  </span>
                </label>
                <select
                  {...register("trade", {
                    required: "Trade selection is required",
                  })}
                  className={`block w-full rounded-md border ${
                    errors.trade ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm appearance-none bg-white text-gray-700`}
                >
                  <option value="">Select Trade / వృత్తిని ఎంచుకోండి</option>
                  {TRADE_OPTIONS.map((trade) => (
                    <option key={trade.value} value={trade.value}>
                      {trade.label}
                    </option>
                  ))}
                </select>

                {errors.trade && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.trade.message}
                  </p>
                )}

                {selectedTrade === "Others" && (
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Specify your trade / మీ వృత్తిని పేర్కొనండి"
                      {...register("otherTrade", {
                        required:
                          selectedTrade === "Others"
                            ? "Please specify your trade"
                            : false,
                      })}
                      className={`block w-full rounded-md border ${
                        errors.otherTrade ? "border-red-500" : "border-gray-300"
                      } px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm text-gray-700`}
                    />
                    {errors.otherTrade && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.otherTrade.message}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  f. Address
                  <span className="block text-xs text-gray-500 mt-1">
                    చిరునామా
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your full address"
                  {...register("address", {
                    required: "Address is required",
                  })}
                  className={`block w-full rounded-md border ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm text-gray-700`}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* Mandal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  g. Mandal
                  <span className="block text-xs text-gray-500 mt-1">
                    మండలం
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your mandal"
                  {...register("mandal", {
                    required: "Mandal is required",
                  })}
                  className={`block w-full rounded-md border ${
                    errors.mandal ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm text-gray-700`}
                />
                {errors.mandal && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.mandal.message}
                  </p>
                )}
              </div>

              {/* District */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  h. District
                  <span className="block text-xs text-gray-500 mt-1">
                    జిల్లా
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your district"
                  {...register("district", {
                    required: "District is required",
                  })}
                  className={`block w-full rounded-md border ${
                    errors.district ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm text-gray-700`}
                />
                {errors.district && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.district.message}
                  </p>
                )}
              </div>

              {/* Year of Pass and Percentage */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    i. Year of Pass
                    <span className="block text-xs text-gray-500 mt-1">
                      ఉత్తీర్ణత సంవత్సరం
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="YYYY"
                    {...register("passYear", {
                      required: "Year of pass is required",
                      pattern: {
                        value: /^(19|20)\d{2}$/,
                        message: "Enter a valid year (1900-2099)",
                      },
                      validate: (value) => {
                        const currentYear = new Date().getFullYear();
                        return (
                          Number(value) <= currentYear ||
                          "Year cannot be in the future"
                        );
                      },
                    })}
                    className={`block w-full rounded-md border ${
                      errors.passYear ? "border-red-500" : "border-gray-300"
                    } px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm text-gray-700`}
                  />
                  {errors.passYear && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.passYear.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Percentage
                    <span className="block text-xs text-gray-500 mt-1">
                      శాతం
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 85.5"
                    {...register("percentage", {
                      required: "Percentage is required",
                      pattern: {
                        value: /^(100(\.0{1,2})?|[1-9]?\d(\.\d{1,2})?)$/,
                        message: "Enter a valid percentage (0-100)",
                      },
                    })}
                    className={`block w-full rounded-md border ${
                      errors.percentage ? "border-red-500" : "border-gray-300"
                    } px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm text-gray-700`}
                  />
                  {errors.percentage && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.percentage.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  j. Experience (optional)
                  <span className="block text-xs text-gray-500 mt-1">
                    అనుభవం (ఐచ్ఛికం)
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2 years in electrical maintenance"
                  {...register("experience")}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm text-gray-700"
                />
              </div>

              {/* Salary Expectation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  k. Salary Expectation
                  <span className="block text-xs text-gray-500 mt-1">
                    జీతపు అంచనా
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 15000"
                  {...register("salaryExpectation", {
                    required: "Salary expectation is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Enter a valid amount (numbers only)",
                    },
                  })}
                  className={`block w-full rounded-md border ${
                    errors.salaryExpectation
                      ? "border-red-500"
                      : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm text-gray-700`}
                />
                {errors.salaryExpectation && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.salaryExpectation.message}
                  </p>
                )}
              </div>

              {/* Interested to work */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  l. Interested to work
                  <span className="block text-xs text-gray-500 mt-1">
                    పని చేయడానికి ఆసక్తి
                  </span>
                </label>
                <select
                  {...register("workLocation", {
                    required: "Work location is required",
                  })}
                  className={`block w-full rounded-md border ${
                    errors.workLocation ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm appearance-none bg-white text-gray-700`}
                >
                  <option value="">
                    Select Location / ప్రదేశాన్ని ఎంచుకోండి
                  </option>
                  <option value="Bangalore">Bangalore / బెంగళూరు</option>
                  <option value="Hyderabad">Hyderabad / హైదరాబాద్</option>
                  <option value="Sriciry">Sriciry / శ్రీసిటి</option>
                  <option value="Local district">
                    Local district / స్థానిక జిల్లా
                  </option>
                </select>
                {errors.workLocation && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.workLocation.message}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  m. Valid Phone No
                  <span className="block text-xs text-gray-500 mt-1">
                    చెల్లుబాటు అయ్యే ఫోన్ నంబర్
                  </span>
                </label>
                <input
                  type="tel"
                  placeholder="10-digit number starting with 6, 7, 8, or 9"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[6-9]\d{9}$/,
                      message: "Enter a valid 10-digit Indian mobile number",
                    },
                    onChange: (e) => {
                      // Remove any non-digit characters
                      e.target.value = e.target.value.replace(/\D/g, "");
                      // Limit to 10 digits
                      if (e.target.value.length > 10) {
                        e.target.value = e.target.value.slice(0, 10);
                      }
                    },
                  })}
                  maxLength={10}
                  className={`block w-full rounded-md border ${
                    errors.phoneNumber ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm text-gray-700`}
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  n. Email ID
                  <span className="block text-xs text-gray-500 mt-1">
                    ఇమెయిల్ ఐడి
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  className={`block w-full rounded-md border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm text-gray-700`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* ITI Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  o. Name of the ITI studied
                  <span className="block text-xs text-gray-500 mt-1">
                    చదివిన ITI పేరు
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter ITI institution name"
                  {...register("itiName", {
                    required: "ITI name is required",
                  })}
                  className={`block w-full rounded-md border ${
                    errors.itiName ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm text-gray-700`}
                />
                {errors.itiName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.itiName.message}
                  </p>
                )}
              </div>

              {/* About You */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  p. About you
                  <span className="block text-xs text-gray-500 mt-1">
                    మీ గురించి చెప్పండి
                  </span>
                </label>
                <textarea
                  placeholder="Brief description about yourself, skills, and career goals"
                  {...register("about", {
                    required: "About section is required",
                  })}
                  className={`block w-full rounded-md border ${
                    errors.about ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm text-gray-700`}
                  rows={3}
                />
                {errors.about && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.about.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-center pt-8">
              <button
                type="submit"
                className="px-8 py-3 text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md transition-all duration-200 ease-in-out transform hover:scale-105"
              >
                Submit / సమర్పించండి
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Banner Section - Now 50% width */}
      <div className="w-full lg:w-2/5 bg-black text-white flex flex-col justify-center items-center relative min-h-[300px] lg:min-h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=2070&auto=format&fit=crop)",
            opacity: 0.5,
          }}
        />
        <div className="w-full lg:w-2/5 bg-black text-white flex flex-col justify-center items-center relative min-h-[300px] lg:min-h-screen">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=2070&auto=format&fit=crop)",
              opacity: 0.5,
            }}
          />
          <div className="relative z-10 text-center max-w-lg">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-wider">
              SKILLS<span className="text-indigo-400">CONNECT</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl font-light mb-8">
              ONE CONNECT, MANY OPPORTUNITIES
            </p>
            <div className="w-24 h-1 bg-indigo-500 mx-auto mb-8"></div>
            <p className="text-sm sm:text-base max-w-md mx-auto">
              Register today to connect with top employers looking for skilled
              ITI professionals across various industries.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-black bg-opacity-50 p-4 rounded-lg border border-indigo-300">
                <h3 className="text-indigo-300 font-semibold mb-2">
                  Career Growth
                </h3>
                <p className="text-sm">
                  Access to quality job opportunities with trusted employers
                </p>
              </div>
              <div className="bg-black bg-opacity-50 p-4 rounded-lg border border-indigo-300">
                <h3 className="text-indigo-300 font-semibold mb-2">
                  Skill Development
                </h3>
                <p className="text-sm">
                  Enhance your technical expertise through industry experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
