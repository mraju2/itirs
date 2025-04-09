import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import { districtService } from "../services/district-service";

type OptionType = {
  label: string;
  value: number;
};

interface Props {
  stateId: number | null;
  value: number | null;
  onChange: (value: number | null) => void;
}

export const DistrictAsyncSelect: React.FC<Props> = ({
  stateId,
  value,
  onChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

  useEffect(() => {
    const fetchInitial = async () => {
      if (value !== null && stateId !== null) {
        try {
          const res = await districtService.getDistrictById(value);
          setSelectedOption({
            value: res.id,
            label: `${res.name} (${res.nameTelugu ?? ""})`,
          });
        } catch (err) {
          console.error("Failed to fetch district by ID", err);
        }
      } else {
        setSelectedOption(null);
      }
    };
    fetchInitial();
  }, [value, stateId]);

  const loadOptions = async (inputValue: string): Promise<OptionType[]> => {
    if (!stateId) return [];
    try {
      const res = await districtService.searchDistrictsByState(
        stateId,
        inputValue
      );
      return res.map((district) => ({
        label: `${district.name} (${district.nameTelugu ?? ""})`,
        value: district.id,
      }));
    } catch (error) {
      console.error("Error loading districts:", error);
      return [];
    }
  };

  return (
    <div className="text-sm text-gray-700">
      <label className="block mb-1 font-medium">Select District</label>
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
            onChange(null);
          }
        }}
        isClearable
        styles={{
          control: (base, state) => ({
            ...base,
            borderRadius: "0.5rem",
            borderColor: state.isFocused ? "#6366F1" : "#d1d5db",
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
            color: state.isSelected ? "white" : "#374151",
            padding: "10px 12px",
            cursor: "pointer",
          }),
        }}
        noOptionsMessage={() => "No districts found"}
      />
    </div>
  );
};
