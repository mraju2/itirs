// components/Filters/FiltersColumn.tsx
import { CheckBoxGroup } from "./check-box-group";

interface FiltersColumnProps {
  experienceOptions: string[];
  jobTypeOptions: string[];
  salaryRanges: string[];
  postedTimeOptions: string[];
}

export const FiltersColumn = ({
  experienceOptions,
  jobTypeOptions,
  salaryRanges,
  postedTimeOptions,
}: FiltersColumnProps) => {
  return (
    <aside className="w-full lg:w-1/4 hidden lg:block">
      <div className="bg-white rounded-lg shadow-sm p-5 sticky top-20">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Filters</h3>
          <button className="text-blue-600 text-sm">Reset All</button>
        </div>

        <CheckBoxGroup
          title="Experience"
          options={experienceOptions}
          groupKey="exp"
        />
        <CheckBoxGroup
          title="Job Type"
          options={jobTypeOptions}
          groupKey="type"
        />
        <CheckBoxGroup
          title="Salary Range"
          options={salaryRanges}
          groupKey="salary"
        />
        <CheckBoxGroup
          title="Posted Date"
          options={postedTimeOptions}
          groupKey="date"
        />
      </div>
    </aside>
  );
};
