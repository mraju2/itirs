"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      console.log("Logging in with", data);
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full">
      {/* Banner Section - now on the left */}
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
            Sign in to access your dashboard and connect with employers looking
            for skilled ITI talent.
          </p>
        </div>
      </div>

      {/* Login Form Section - now on the right */}
      <div className="w-full lg:w-3/5 bg-gradient-to-br from-blue-50 to-indigo-100 py-4 px-2 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-24">
          <div className="px-4 py-6 sm:px-8 sm:py-8 bg-gradient-to-r from-indigo-600 to-blue-500">
            <h1 className="text-2xl font-bold text-white text-center">
              Login
              <span className="block text-sm font-medium mt-1 text-indigo-100">
                లాగిన్ చేయండి
              </span>
            </h1>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-4 py-6 sm:px-8 sm:py-8 space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                className={`block w-full rounded-md border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm text-gray-700`}
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                })}
                className={`block w-full rounded-md border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm text-gray-700`}
              />
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="px-6 py-2 text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md transition-all duration-200 ease-in-out transform hover:scale-105"
              >
                Login / లాగిన్
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
