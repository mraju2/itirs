import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import { companyService } from "@/services/company-service";

type OptionType = {
  label: string;
  value: string;
};

interface Props {
  value: string | null;
  onChange: (value: string) => void;
}

export const CompanyAsyncSelect: React.FC<Props> = ({ value, onChange }) => {
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

  // Fetch initial option (when editing or default selected)
  useEffect(() => {
    const fetchInitial = async () => {
      if (value) {
        try {
          const res = await companyService.getCompanyById(value);
          setSelectedOption({ value: res.id, label: res.name });
        } catch (err) {
          console.error("Failed to fetch company by ID", err);
        }
      } else {
        setSelectedOption(null);
      }
    };
    fetchInitial();
  }, [value]);

  // Load options as user types
  const loadOptions = async (inputValue: string): Promise<OptionType[]> => {
    try {
      const res = await companyService.searchCompanies(inputValue);
      return res.map((company) => ({
        label: company.name,
        value: company.id,
      }));
    } catch (error) {
      console.error("Error loading companies:", error);
      return [];
    }
  };

  return (
    <div className="text-sm text-gray-700">
      <label className="block mb-1 font-medium">Select Company</label>
      <AsyncSelect
        classNamePrefix="react-select"
        cacheOptions
        defaultOptions
        loadOptions={loadOptions}
        placeholder="Start typing to search..."
        value={selectedOption}
        onChange={(option) => {
          if (option) {
            setSelectedOption(option);
            onChange(option.value);
          } else {
            setSelectedOption(null);
            onChange("");
          }
        }}
        isClearable
        styles={{
          control: (base, state) => ({
            ...base,
            borderRadius: "0.5rem",
            borderColor: state.isFocused ? "#6366F1" : "#d1d5db", // Tailwind: focus-indigo-500, default-gray-300
            boxShadow: state.isFocused ? "0 0 0 1px #6366F1" : "none",
            padding: "2px 4px",
            fontSize: "0.875rem",
          }),
          menu: (base) => ({
            ...base,
            zIndex: 20,
            fontSize: "0.875rem",
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
              ? "#6366F1"
              : state.isFocused
              ? "#E0E7FF"
              : "white",
            color: state.isSelected ? "white" : "#374151", // selected-white, text-gray-700
            padding: "10px 12px",
            cursor: "pointer",
          }),
        }}
        noOptionsMessage={() => "No companies found"}
      />
    </div>
  );
};
