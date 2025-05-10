import { FiltersColumn } from "@/components/filters-column";
import { MobileFilters } from "@/components/mobile-filters";

const experienceOptions = ["0–1 years", "1–3 years", "3–5 years", "5+ years"];
const jobTypeOptions = ["Full-time", "Part-time", "Contract", "Internship"];
const salaryRanges = ["Below ₹1L", "₹1L–3L", "₹3L–5L", "Above ₹5L"];
const postedTimeOptions = [
  "Today",
  "This Week",
  "Last 15 Days",
  "Last 30 Days",
];

export const FiltersLayout = () => {
  return (
    <>
      <MobileFilters
        experienceOptions={experienceOptions}
        jobTypeOptions={jobTypeOptions}
        salaryRanges={salaryRanges}
        postedTimeOptions={postedTimeOptions}
      />
      <FiltersColumn
        experienceOptions={experienceOptions}
        jobTypeOptions={jobTypeOptions}
        salaryRanges={salaryRanges}
        postedTimeOptions={postedTimeOptions}
      />
    </>
  );
};
