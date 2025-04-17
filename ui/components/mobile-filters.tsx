// components/Filters/MobileFilters.tsx
"use client";
import { Filter, ChevronDown } from "lucide-react";
import { useState } from "react";

interface MobileFiltersProps {
  experienceOptions: string[];
  jobTypeOptions: string[];
  salaryRanges: string[];
  postedTimeOptions: string[];
}

export const MobileFilters = ({
  experienceOptions,
  jobTypeOptions,
  salaryRanges,
  postedTimeOptions,
}: MobileFiltersProps) => {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const renderTagGroup = (title: string, options: string[]) => (
    <div className="mb-5">
      <h4 className="font-medium mb-3">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {options.map((option, index) => (
          <button
            key={index}
            className="px-3 py-1 text-sm rounded-full border border-slate-300 hover:border-blue-500 hover:text-blue-600"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="lg:hidden mb-4">
      <button
        onClick={() => setFiltersOpen(!filtersOpen)}
        className="w-full flex items-center justify-center gap-2 bg-white border border-slate-300 py-3 rounded-lg shadow-sm"
      >
        <Filter size={18} />
        {filtersOpen ? "Hide Filters" : "Show Filters"}
        <ChevronDown
          size={18}
          className={`transform transition ${filtersOpen ? "rotate-180" : ""}`}
        />
      </button>

      {filtersOpen && (
        <div className="bg-white rounded-lg shadow-sm p-5 mt-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Filters</h3>
            <button className="text-blue-600 text-sm">Reset All</button>
          </div>
          {renderTagGroup("Experience", experienceOptions)}
          {renderTagGroup("Job Type", jobTypeOptions)}
          {renderTagGroup("Salary Range", salaryRanges)}
          {renderTagGroup("Posted Date", postedTimeOptions)}
        </div>
      )}
    </div>
  );
};
