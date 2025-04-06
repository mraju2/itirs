import React, { useState, useEffect, useRef } from "react";
import { SearchTooltip } from "./search-tool-tip";

interface SmartSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  keys: string[];
  examples?: string[];
}

export const SmartSearchInput: React.FC<SmartSearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search e.g. name:"John Doe", email:%gmail.com',
  keys,
  examples = [
    'name:"John Smith"',
    "city:Mumbai",
    "email:%gmail.com",
    "phone:9876543%",
  ],
}) => {
  // State for the input field
  const [inputValue, setInputValue] = useState(value);
  // Reference to the input field
  const inputRef = useRef<HTMLInputElement>(null);

  // Update local state when prop value changes (for resets)
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Handle changes to the input field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Process and execute the search
  const executeSearch = () => {
    onChange(inputValue);
  };

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      executeSearch();
    }
  };

  return (
    <div className="relative flex flex-row items-center gap-2 min-w-[280px]">
      <div className="relative flex-1">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pr-10 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 text-black"
        />

        <SearchTooltip keys={keys} examples={examples} />
      </div>

      <button
        onClick={executeSearch}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-md text-sm"
      >
        Search
      </button>
    </div>
  );
};
