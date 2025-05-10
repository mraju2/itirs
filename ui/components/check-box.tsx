import React from "react";

interface CheckboxProps {
  id: string;
  label: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ id, label }) => (
  <div className="flex items-center mb-2">
    <input
      type="checkbox"
      id={id}
      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
    />
    <label htmlFor={id} className="ml-2 text-sm text-gray-700">
      {label}
    </label>
  </div>
);
