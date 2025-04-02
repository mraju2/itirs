"use client";

import React from "react";
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
  placeholder = "Search e.g. name:ravi, phone:9538",
  keys,
  examples,
}) => {
  return (
    <div className="relative flex-1 min-w-[220px] overflow-visible">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pr-10 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 text-black"
      />
      <SearchTooltip keys={keys} examples={examples} />
    </div>
  );
};
