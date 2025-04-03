import React, { useState, useEffect } from "react";
import { SearchTooltip } from "./search-tool-tip";

interface SmartSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  keys: string[];
  examples?: string[];
  debounceTime?: number;
}

export const SmartSearchInput: React.FC<SmartSearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search e.g. name:ravi, phone:9538",
  keys,
  examples,
  debounceTime = 500, // Default debounce time of 500ms
}) => {
  const [inputValue, setInputValue] = useState(value);

  // Update local state when prop value changes (for resets)
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Debounce the onChange callback
  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue !== value) {
        onChange(inputValue);
      }
    }, debounceTime);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, value, onChange, debounceTime]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="relative flex-1 min-w-[220px] overflow-visible">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pr-10 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 text-black"
      />
      <SearchTooltip keys={keys} examples={examples} />
    </div>
  );
};
