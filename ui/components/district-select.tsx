import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import { districtService } from "../services/district-service";
import { District } from "@/types/district";

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
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const [previousStateId, setPreviousStateId] = useState<number | null>(null);

  useEffect(() => {
    // Only reset when state ID changes to a different value (not on initial load)
    if (!isInitialLoad && stateId !== previousStateId) {
      setSelectedOption(null);
      onChange(null);
      setPreviousStateId(stateId);
    } else if (isInitialLoad) {
      setIsInitialLoad(false);
      setPreviousStateId(stateId);
    }
  }, [stateId, previousStateId, isInitialLoad, onChange]);

  // Set selectedOption when value is changed from parent
  useEffect(() => {
    const fetchSelected = async () => {
      if (value && stateId) {
        try {
          const districts = await districtService.getDistrictsByStateId(
            stateId
          );
          const matched = districts.find((d: District) => d.id === value);
          if (matched) {
            setSelectedOption({
              value: matched.id,
              label: `${matched.name} (${matched.nameTelugu ?? ""})`,
            });
          } else {
            setSelectedOption(null);
          }
        } catch (err) {
          console.error("Failed to fetch districts", err);
        }
      } else {
        setSelectedOption(null);
      }
    };

    fetchSelected();
  }, [value, stateId]);

  const loadOptions = async (inputValue: string): Promise<OptionType[]> => {
    if (!stateId) return [];
    try {
      const districts = await districtService.searchDistrictsByState(
        stateId,
        inputValue
      );
      return districts.map((district: District) => ({
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
        key={stateId ?? "no-state"}
        classNamePrefix="react-select"
        cacheOptions
        defaultOptions
        loadOptions={loadOptions}
        placeholder="Start typing to search..."
        value={selectedOption}
        onChange={(option) => {
          console.log("DistrictAsyncSelect onChange called with:", option);
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
