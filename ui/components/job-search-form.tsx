"use client";

import React from "react";
import { Search, MapPin } from "lucide-react";

export const JobsSearchForm = () => {
  return (
    <div className="bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-xl ring-1 ring-slate-900/5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // yourSearchFunction();
        }}
        className="flex flex-col md:flex-row gap-2 md:gap-2.5"
      >
        <div className="flex-1 flex gap-2">
          {/* Job Title Input */}
          <div className="relative flex-1">
            <Search
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Job title or keywords"
              className="w-full pl-8 pr-2.5 py-2.5 rounded-md bg-slate-50 border border-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-400 text-sm"
            />
          </div>

          {/* Location Input */}
          <div className="relative flex-1">
            <MapPin
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Location or remote"
              className="w-full pl-8 pr-2.5 py-2.5 rounded-md bg-slate-50 border border-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-400 text-sm"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-md transition-colors font-medium text-sm shadow-sm"
        >
          Search
        </button>
      </form>
    </div>
  );
};
